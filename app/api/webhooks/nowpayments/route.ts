import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * NOWPayments IPN (Instant Payment Notification) Webhook Handler
 * 
 * This endpoint receives payment status updates from NOWPayments.
 * Configure this URL in your NOWPayments dashboard under IPN settings.
 * 
 * Webhook URL: https://yourdomain.com/api/webhooks/nowpayments
 */

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

  // Sort payload keys and create signature
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

    // Handle different payment statuses
    switch (data.payment_status) {
      case 'waiting':
        // Payment created, waiting for funds
        console.log(`[NOWPayments] Payment ${data.payment_id} waiting for funds`)
        break

      case 'confirming':
        // Payment received, waiting for confirmations
        console.log(`[NOWPayments] Payment ${data.payment_id} confirming`)
        break

      case 'confirmed':
        // Payment confirmed on blockchain
        console.log(`[NOWPayments] Payment ${data.payment_id} confirmed`)
        break

      case 'sending':
        // Funds being sent to your wallet
        console.log(`[NOWPayments] Payment ${data.payment_id} sending to wallet`)
        break

      case 'finished':
        // Payment complete - activate subscription/add balance
        console.log(`[NOWPayments] Payment ${data.payment_id} finished!`)
        await handleSuccessfulPayment(data)
        break

      case 'partially_paid':
        // User sent less than required
        console.log(`[NOWPayments] Payment ${data.payment_id} partially paid: ${data.actually_paid}/${data.pay_amount}`)
        break

      case 'failed':
        // Payment failed
        console.log(`[NOWPayments] Payment ${data.payment_id} failed`)
        await handleFailedPayment(data)
        break

      case 'refunded':
        // Payment refunded
        console.log(`[NOWPayments] Payment ${data.payment_id} refunded`)
        break

      case 'expired':
        // Payment expired
        console.log(`[NOWPayments] Payment ${data.payment_id} expired`)
        break

      default:
        console.log(`[NOWPayments] Unknown status: ${data.payment_status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[NOWPayments] Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handleSuccessfulPayment(data: IPNPayload) {
  // Parse order_id to determine payment type
  // Format: "subscription_userId_tierId" or "topup_userId_amount"
  const parts = data.order_id.split('_')
  const type = parts[0]
  const userId = parts[1]

  if (type === 'subscription') {
    const tierId = parts[2]
    // TODO: Activate subscription in database
    console.log(`[NOWPayments] Activating subscription for user ${userId}, tier ${tierId}`)
    
    // Example database call:
    // await db.subscriptions.create({
    //   userId,
    //   tierId,
    //   paymentId: data.payment_id.toString(),
    //   amount: data.price_amount,
    //   status: 'active',
    //   startDate: new Date(),
    //   endDate: addMonths(new Date(), 1),
    // })
  } else if (type === 'topup') {
    const amount = parseFloat(parts[2])
    // TODO: Add balance to user's wallet
    console.log(`[NOWPayments] Adding $${amount} to user ${userId}'s wallet`)
    
    // Example database call:
    // await db.users.update({
    //   where: { id: userId },
    //   data: { balance: { increment: amount } }
    // })
    // 
    // await db.transactions.create({
    //   userId,
    //   type: 'topup',
    //   amount,
    //   paymentId: data.payment_id.toString(),
    //   status: 'completed',
    // })
  }
}

async function handleFailedPayment(data: IPNPayload) {
  // Log failed payment for monitoring
  console.log(`[NOWPayments] Recording failed payment: ${data.order_id}`)
  
  // TODO: Update payment record as failed
  // await db.payments.update({
  //   where: { orderId: data.order_id },
  //   data: { status: 'failed' }
  // })
}

// GET endpoint for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'NOWPayments webhook endpoint',
    status: 'active'
  })
}
