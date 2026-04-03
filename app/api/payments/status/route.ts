import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY!

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const paymentId = searchParams.get('payment_id')

  if (!paymentId) {
    return NextResponse.json({ error: 'Payment ID required' }, { status: 400 })
  }

  try {
    // Check NOWPayments status
    const response = await fetch(`https://api.nowpayments.io/v1/payment/${paymentId}`, {
      headers: {
        'x-api-key': NOWPAYMENTS_API_KEY,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch payment status')
    }

    const payment = await response.json()

    // If payment is confirmed, update Supabase
    if (payment.payment_status === 'finished' || payment.payment_status === 'confirmed') {
      const supabase = createClient()
      
      // Update payment record
      await supabase
        .from('payments')
        .update({ 
          status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('nowpayments_id', paymentId)

      // Get the payment to find user and tier
      const { data: paymentRecord } = await supabase
        .from('payments')
        .select('user_id, metadata')
        .eq('nowpayments_id', paymentId)
        .single()

      if (paymentRecord) {
        const tier = paymentRecord.metadata?.tier || 'devotee'
        
        // Create or update subscription
        await supabase
          .from('subscriptions')
          .upsert({
            user_id: paymentRecord.user_id,
            tier: tier,
            status: 'active',
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id'
          })
      }
    }

    return NextResponse.json({
      status: payment.payment_status,
      pay_amount: payment.pay_amount,
      pay_currency: payment.pay_currency,
      actually_paid: payment.actually_paid,
    })
  } catch (error) {
    console.error('Payment status error:', error)
    return NextResponse.json({ error: 'Failed to check payment' }, { status: 500 })
  }
}
