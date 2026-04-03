import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get profile with balance
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    // Get subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single()

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        is_admin: user.user_metadata?.is_admin || false,
      },
      profile: profile || { balance: 0 },
      subscription: subscription || null,
    })
  } catch (error) {
    console.error('User API error:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}
