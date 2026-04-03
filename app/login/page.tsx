'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        setIsLoading(false)
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <Link href="/" className="text-sm tracking-[0.1em] font-light">
            CNOIRYA
          </Link>
          <div className="w-8 h-px bg-foreground/20 mx-auto mt-4 mb-4" />
          <p className="text-[10px] tracking-wider uppercase text-muted-foreground">
            Enter the inner world
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="text-[10px] text-red-600 border border-red-200 p-3">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-[10px] tracking-wider uppercase text-muted-foreground mb-2">
              Email
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

          <div>
            <label htmlFor="password" className="block text-[10px] tracking-wider uppercase text-muted-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="text-sm h-11 pr-10 border-foreground/20 focus:border-foreground"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={1} /> : <Eye className="h-4 w-4" strokeWidth={1} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-3 h-3 border border-foreground/30 bg-transparent" />
              <span className="text-muted-foreground tracking-wide">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full text-xs h-11 tracking-wider uppercase" disabled={isLoading}>
            {isLoading ? 'Entering...' : 'Enter'}
          </Button>
        </form>

        <p className="text-center text-[10px] text-muted-foreground mt-10 tracking-wide">
          Don&apos;t have an account?{' '}
          <Link href="/subscribe" className="text-foreground hover:underline">
            Subscribe
          </Link>
        </p>

        <p className="text-center text-[10px] text-muted-foreground mt-12 tracking-wider uppercase">
          Restricted access
        </p>
      </div>
    </main>
  )
}
