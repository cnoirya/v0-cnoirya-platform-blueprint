import { NextRequest, NextResponse } from 'next/server'
import { createUSDTPayment } from '@/lib/nowpayments'

/**
 * Create a new USDT payment via NOWPayments
 * 
 * POST /api/payments/create
 * Body: { amount: number, type: 'subscription' | 'topup', tierId?: string, network?: 'TRC20' | 'ERC20' | 'BEP20' }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, type, tierId, network = 'TRC20' } = body

    // Validate input
    if (!amount || amount < 10) {
      return NextResponse.json(
        { error: 'Minimum amount is $10 USDT' },
        { status: 400 }
      )
    }

    if (!['subscription', 'topup'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid payment type' },
        { status: 400 }
      )
    }

    // TODO: Get actual user ID from session/auth
    const userId = 'demo_user'

    // Generate order ID
    const orderId = type === 'subscription' 
      ? `subscription_${userId}_${tierId}_${Date.now()}`
      : `topup_${userId}_${amount}_${Date.now()}`

    // Generate description
    const description = type === 'subscription'
      ? `CNOIRYA ${tierId} Subscription`
      : `CNOIRYA Wallet Top-up: $${amount}`

    // Create payment with NOWPayments
    const payment = await createUSDTPayment(
      amount,
      orderId,
      description,
      network
    )

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.payment_id,
        address: payment.pay_address,
        amount: payment.pay_amount,
        currency: payment.pay_currency,
        expiresAt: payment.expiration_estimate_date,
      }
    })
  } catch (error) {
    console.error('[Payments] Create payment error:', error)
    
    // Check if it's a missing API key error
    if (error instanceof Error && error.message.includes('NOWPAYMENTS_API_KEY')) {
      return NextResponse.json(
        { error: 'Payment system not configured. Please contact support.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    )
  }
}
