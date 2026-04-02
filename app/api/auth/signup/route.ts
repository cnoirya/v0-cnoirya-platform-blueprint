import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, password, tier } = await request.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        tier: tier || 'devotee'
      }
    }
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  // If email confirmation is disabled, we can set cookies immediately
  if (data.session) {
    const response = NextResponse.json({ 
      user: data.user,
      session: data.session,
      success: true 
    })

    response.cookies.set('sb-access-token', data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    })

    response.cookies.set('sb-refresh-token', data.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    })

    return response
  }

  // If email confirmation is required
  return NextResponse.json({ 
    user: data.user,
    message: 'Please check your email to confirm your account',
    success: true 
  })
}
