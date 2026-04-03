import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

/**
 * NOWPayments IPN (Instant Payment Notification) Webhook Handler
 * Uses service role key to bypass RLS for webhook processing
 */

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface IPNPayload {
  payment_id: number
  payment_status: 'waiting' | 'confirming' | 'confirmed' | 'sending' | 'partially_paid' | 'finished' | 'failed' | 'refunded' | 'expired'
  pay_address: string
  price_amount: number
  price_currency: string
  pay_amount: number
  actually_paid: number
  pay_currency: string
  order_id: string
  order_description: string
  purchase_id: string
  outcome_amount: number
  outcome_currency: string
}

function verifyIPNSignature(payload: string, signature: string | null): boolean {
  if (!signature) return false
  
  const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET
  if (!ipnSecret) {
    console.error('[NOWPayments] IPN secret not configured')
    return false
  }

  const sortedPayload = JSON.stringify(
    Object.keys(JSON.parse(payload))
      .sort()
      .reduce((acc: Record<string, unknown>, key) => {
        acc[key] = JSON.parse(payload)[key]
        return acc
      }, {})
  )

  const hmac = crypto.createHmac('sha512', ipnSecret)
  hmac.update(sortedPayload)
  const calculatedSignature = hmac.digest('hex')

  return calculatedSignature === signature
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text()
    const signature = request.headers.get('x-nowpayments-sig')

    // Verify signature
    if (!verifyIPNSignature(payload, signature)) {
      console.error('[NOWPayments] Invalid IPN signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const data: IPNPayload = JSON.parse(payload)

    console.log('[NOWPayments] Received IPN:', {
      payment_id: data.payment_id,
      status: data.payment_status,
      order_id: data.order_id,
      amount: data.actually_paid,
    })

    // Find payment record by payment_id
    const { data: payment } = await supabaseAdmin
      .from('payments')
      .select('*')
      .eq('payment_id', data.payment_id.toString())
      .single()

    if (!payment) {
      console.error('[NOWPayments] Payment not found:', data.payment_id)
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    // Update payment status
    const newStatus = data.payment_status === 'finished' ? 'completed' : data.payment_status
    await supabaseAdmin
      .from('payments')
      .update({ 
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('payment_id', data.payment_id.toString())

    // Handle successful payments
    if (data.payment_status === 'finished') {
      await handleSuccessfulPayment(payment, data)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[NOWPayments] Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handleSuccessfulPayment(payment: any, data: IPNPayload) {
  const { user_id, payment_type, amount, metadata } = payment

  switch (payment_type) {
    case 'subscription':
      await handleSubscription(user_id, metadata?.tier_id || 'chosen', amount)
      break
    case 'wallet_topup':
      await handleWalletTopup(user_id, amount)
      break
    case 'ppv':
      await handlePPVPurchase(user_id, metadata?.content_id, amount)
      break
    case 'tip':
      await handleTip(user_id, amount)
      break
    default:
      console.log(`[NOWPayments] Unknown payment type: ${payment_type}`)
  }
}

async function handleSubscription(userId: string, tier: string, amount: number) {
  const startDate = new Date()
  const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

  // Check if subscription exists
  const { data: existing } = await supabaseAdmin
    .from('subscriptions')
    .select('id')
    .eq('user_id', userId)
    .single()

  if (existing) {
    // Update existing
    await supabaseAdmin
      .from('subscriptions')
      .update({
        tier: tier,
        status: 'active',
        started_at: startDate.toISOString(),
        expires_at: endDate.toISOString(),
        amount: amount,
        currency: 'USDT'
      })
      .eq('user_id', userId)
  } else {
    // Insert new
    await supabaseAdmin
      .from('subscriptions')
      .insert({
        user_id: userId,
        tier: tier,
        status: 'active',
        started_at: startDate.toISOString(),
        expires_at: endDate.toISOString(),
        amount: amount,
        currency: 'USDT'
      })
  }

  // Update profile tier
  await supabaseAdmin
    .from('profiles')
    .update({ tier: tier })
    .eq('id', userId)

  console.log(`[NOWPayments] Activated ${tier} subscription for user ${userId}`)
}

async function handleWalletTopup(userId: string, amount: number) {
  // Create wallet transaction
  await supabaseAdmin
    .from('wallet_transactions')
    .insert({
      user_id: userId,
      amount: amount,
      type: 'topup',
      description: `USDT Deposit: $${amount}`
    })

  // Update user balance
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('balance')
    .eq('id', userId)
    .single()

  const currentBalance = profile?.balance || 0
  const newBalance = currentBalance + amount

  await supabaseAdmin
    .from('profiles')
    .update({ 
      balance: newBalance,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)

  console.log(`[NOWPayments] Added $${amount} to wallet for user ${userId}. New balance: $${newBalance}`)
}

async function handlePPVPurchase(userId: string, contentId: string, amount: number) {
  if (!contentId) return

  await supabaseAdmin
    .from('ppv_purchases')
    .insert({
      user_id: userId,
      content_id: contentId,
      amount: amount
    })

  console.log(`[NOWPayments] PPV purchase for user ${userId}, content ${contentId}`)
}

async function handleTip(userId: string, amount: number) {
  // Record tip in wallet transactions as a spend
  await supabaseAdmin
    .from('wallet_transactions')
    .insert({
      user_id: userId,
      amount: -amount,
      type: 'spend',
      description: `Tip: $${amount}`
    })

  console.log(`[NOWPayments] Tip of $${amount} from user ${userId}`)
}

export async function GET() {
  return NextResponse.json({ 
    message: 'NOWPayments webhook endpoint',
    status: 'active'
  })
}
