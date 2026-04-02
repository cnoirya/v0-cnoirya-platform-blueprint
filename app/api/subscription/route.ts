import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getNOWPaymentsClient } from '@/lib/nowpayments'

const TIER_PRICES: Record<string, number> = {
  devotee: 14.99,
  chosen: 29.99,
  'inner-circle': 99.99,
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { tier, network } = body

    const price = TIER_PRICES[tier]
    if (!price) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    // Create NOWPayments invoice
    const client = getNOWPaymentsClient()
    const payment = await client.createPayment({
      price_amount: price,
      price_currency: 'usd',
      pay_currency: network === 'trc20' ? 'usdttrc20' : network === 'bep20' ? 'usdtbsc' : 'usdterc20',
      order_id: `sub_${user.id}_${tier}`,
      order_description: `CNOIRYA ${tier} subscription - $${price}/month`,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://member.cnoirya.com'}/api/webhooks/nowpayments`,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://member.cnoirya.com'}/dashboard?subscribed=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://member.cnoirya.com'}/subscribe?cancelled=true`,
    })

    // Record payment
    await supabase.from('payments').insert({
      user_id: user.id,
      amount: price,
      currency: 'USDT',
      status: 'pending',
      payment_method: 'nowpayments',
      nowpayments_id: payment.payment_id,
      metadata: { tier, network, payment_address: payment.pay_address }
    })

    return NextResponse.json({
      payment_id: payment.payment_id,
      pay_address: payment.pay_address,
      pay_amount: payment.pay_amount,
      pay_currency: payment.pay_currency,
      invoice_url: payment.invoice_url,
    })
  } catch (error) {
    console.error('Subscription API error:', error)
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single()

    return NextResponse.json({ subscription })
  } catch (error) {
    console.error('Subscription GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 })
  }
}
