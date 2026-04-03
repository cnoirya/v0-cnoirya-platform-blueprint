import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getNOWPaymentsClient } from '@/lib/nowpayments'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { amount, network } = body

    if (!amount || amount < 5) {
      return NextResponse.json({ error: 'Minimum top-up is $5 USDT' }, { status: 400 })
    }

    // Create NOWPayments invoice
    const client = getNOWPaymentsClient()
    const payment = await client.createPayment({
      price_amount: amount,
      price_currency: 'usd',
      pay_currency: network === 'trc20' ? 'usdttrc20' : network === 'bep20' ? 'usdtbsc' : 'usdterc20',
      order_id: `wallet_${user.id}_${Date.now()}`,
      order_description: `Wallet top-up: $${amount} USDT`,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://member.cnoirya.com'}/api/webhooks/nowpayments`,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://member.cnoirya.com'}/dashboard/wallet?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://member.cnoirya.com'}/dashboard/wallet?cancelled=true`,
    })

    // Record pending transaction
    await supabase.from('wallet_transactions').insert({
      user_id: user.id,
      type: 'topup',
      amount: amount,
      currency: 'USDT',
      status: 'pending',
      nowpayments_id: payment.payment_id,
      metadata: { network, payment_address: payment.pay_address }
    })

    return NextResponse.json({
      payment_id: payment.payment_id,
      pay_address: payment.pay_address,
      pay_amount: payment.pay_amount,
      pay_currency: payment.pay_currency,
      invoice_url: payment.invoice_url,
    })
  } catch (error) {
    console.error('Wallet top-up error:', error)
    return NextResponse.json({ error: 'Failed to create top-up' }, { status: 500 })
  }
}
