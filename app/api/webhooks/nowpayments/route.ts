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

    // Update payment record status
    await supabaseAdmin
      .from('payments')
      .update({ 
        status: data.payment_status === 'finished' ? 'completed' : data.payment_status,
        updated_at: new Date().toISOString()
      })
      .eq('nowpayments_id', data.payment_id.toString())

    // Handle successful payments
    if (data.payment_status === 'finished') {
      await handleSuccessfulPayment(data)
    }

    // Handle wallet top-ups
    if (data.payment_status === 'finished' && data.order_id.startsWith('wallet_')) {
      await handleWalletTopup(data)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[NOWPayments] Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handleSuccessfulPayment(data: IPNPayload) {
  const parts = data.order_id.split('_')
  const type = parts[0]

  if (type === 'sub') {
    // Subscription payment: sub_userId_tier
    const userId = parts[1]
    const tier = parts[2]

    // Create/update subscription
    const startDate = new Date()
    const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

    await supabaseAdmin
      .from('subscriptions')
      .upsert({
        user_id: userId,
        tier: tier,
        status: 'active',
        current_period_start: startDate.toISOString(),
        current_period_end: endDate.toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })

    // Update payment record
    await supabaseAdmin
      .from('payments')
      .update({ 
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('nowpayments_id', data.payment_id.toString())

    console.log(`[NOWPayments] Activated ${tier} subscription for user ${userId}`)
  }
}

async function handleWalletTopup(data: IPNPayload) {
  const parts = data.order_id.split('_')
  // wallet_userId_timestamp
  const userId = parts[1]

  // Get the transaction to find amount
  const { data: transaction } = await supabaseAdmin
    .from('wallet_transactions')
    .select('amount')
    .eq('nowpayments_id', data.payment_id.toString())
    .single()

  if (transaction) {
    // Update transaction status
    await supabaseAdmin
      .from('wallet_transactions')
      .update({ 
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('nowpayments_id', data.payment_id.toString())

    // Update user balance in profile
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('balance')
      .eq('id', userId)
      .single()

    const currentBalance = profile?.balance || 0
    const newBalance = currentBalance + transaction.amount

    await supabaseAdmin
      .from('profiles')
      .update({ 
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    console.log(`[NOWPayments] Added $${transaction.amount} to wallet for user ${userId}. New balance: $${newBalance}`)
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'NOWPayments webhook endpoint',
    status: 'active'
  })
}
