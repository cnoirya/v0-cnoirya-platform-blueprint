import { NextRequest, NextResponse } from 'next/server'
import { createUSDTPayment } from '@/lib/nowpayments'
import { createClient } from '@/lib/supabase/server'

/**
 * Create a new USDT payment via NOWPayments
 * 
 * POST /api/payments/create
 * Body: { amount: number, type: 'subscription' | 'wallet_topup' | 'ppv', tierId?: string }
 */

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { amount, type, tierId, contentId } = body

    // Validate input
    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    if (!['subscription', 'wallet_topup', 'ppv', 'tip', 'custom_order'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid payment type' },
        { status: 400 }
      )
    }

    // Generate order ID
    const orderId = `${type}_${user.id}_${Date.now()}`

    // Generate description based on type
    let description = 'CNOIRYA Payment'
    switch (type) {
      case 'subscription':
        description = `CNOIRYA ${tierId || 'Chosen'} Tier Subscription`
        break
      case 'wallet_topup':
        description = `CNOIRYA Wallet Top-up: $${amount} USDT`
        break
      case 'ppv':
        description = `CNOIRYA Content Unlock`
        break
      case 'tip':
        description = `CNOIRYA Tip: $${amount}`
        break
      case 'custom_order':
        description = `CNOIRYA Custom Order`
        break
    }

    // Create payment with NOWPayments
    const payment = await createUSDTPayment(
      amount,
      orderId,
      description,
      'TRC20' // Default to TRC20 for lower fees
    )

    // Store payment record in database
    await supabase.from('payments').insert({
      user_id: user.id,
      payment_id: payment.payment_id,
      amount,
      currency: 'USDT',
      status: 'pending',
      payment_type: type,
      metadata: {
        tier_id: tierId,
        content_id: contentId,
        pay_address: payment.pay_address,
        pay_amount: payment.pay_amount
      }
    })

    return NextResponse.json({
      success: true,
      payment: {
        payment_id: payment.payment_id,
        pay_address: payment.pay_address,
        pay_amount: payment.pay_amount,
        pay_currency: payment.pay_currency,
        expires_at: payment.expiration_estimate_date,
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
