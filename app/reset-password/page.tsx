'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }

      setIsSubmitted(true)
      setTimeout(() => {
        router.push('/login')
      }, 3000)
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
            Password updated
          </h1>
          
          <p className="text-xs text-muted-foreground mb-8 leading-relaxed">
            Your password has been successfully reset. Redirecting to login...
          </p>

          <Link href="/login">
            <Button variant="outline" className="text-xs">
              Go to login
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/" className="text-lg tracking-tight">
            CNOIRYA
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-sm font-bold tracking-tight mb-2">
            Set new password
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="text-[10px] text-red-600 border border-red-200 p-3">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-[10px] tracking-wider uppercase text-muted-foreground mb-2">
              New password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                required
                className="text-sm h-11 border-foreground/20 focus:border-foreground pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-[10px] tracking-wider uppercase text-muted-foreground mb-2">
              Confirm password
            </label>
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              required
              className="text-sm h-11 border-foreground/20 focus:border-foreground"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full text-xs h-11 tracking-wider uppercase"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update password'}
          </Button>
        </form>
      </div>
    </main>
  )
}
