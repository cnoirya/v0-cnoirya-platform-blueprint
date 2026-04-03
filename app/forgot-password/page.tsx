'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }

      setIsSubmitted(true)
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="w-12 h-12 border border-foreground flex items-center justify-center mx-auto mb-6">
            <Check className="w-6 h-6" strokeWidth={1} />
          </div>
          
          <h1 className="text-sm font-bold tracking-tight mb-3">
            Check your email
          </h1>
          
          <p className="text-xs text-muted-foreground mb-8 leading-relaxed">
            If an account exists for {email}, you will receive a password reset link shortly.
          </p>

          <Link href="/login">
            <Button variant="outline" className="text-xs">
              Return to login
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link 
          href="/login" 
          className="inline-flex items-center gap-2 text-[10px] tracking-wider uppercase text-muted-foreground hover:text-foreground mb-12"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </Link>

        <div className="mb-10">
          <h1 className="text-sm font-bold tracking-tight mb-2">
            Reset password
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Enter your email address and we will send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-[10px] text-red-600 border border-red-200 p-3">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-[10px] tracking-wider uppercase text-muted-foreground mb-2">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="text-sm h-11 border-foreground/20 focus:border-foreground"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full text-xs h-11 tracking-wider uppercase"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send reset link'}
          </Button>
        </form>

        <p className="text-center text-[10px] text-muted-foreground mt-10">
          Remember your password?{' '}
          <Link href="/login" className="text-foreground hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
