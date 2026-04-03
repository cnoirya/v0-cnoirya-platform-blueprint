'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
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
        setLoading(false)
        return
      }

      // Check if user is admin
      const isAdmin = data.user?.user_metadata?.is_admin === true
      if (!isAdmin) {
        await fetch('/api/auth/logout', { method: 'POST' })
        setError('Access denied. Admin privileges required.')
        setLoading(false)
        return
      }

      window.location.href = '/admin'
    } catch {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[10px] tracking-wider uppercase text-muted-foreground hover:text-foreground mb-12"
        >
          <ArrowLeft className="w-3 h-3" strokeWidth={1} />
          Back to site
        </Link>

        <div className="border border-border p-10">
          <div className="text-center mb-10">
            <h1 className="text-sm tracking-[0.1em] font-light">CNOIRYA</h1>
            <div className="w-8 h-px bg-foreground/20 mx-auto mt-4 mb-4" />
            <p className="text-[10px] tracking-wider uppercase text-muted-foreground">Sovereign Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-[10px] tracking-wider uppercase text-muted-foreground mb-2 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cnoirya.com"
                className="h-11 text-sm border-foreground/20 focus:border-foreground"
                required
              />
            </div>

            <div>
              <label className="text-[10px] tracking-wider uppercase text-muted-foreground mb-2 block">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="h-11 text-sm pr-10 border-foreground/20 focus:border-foreground"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" strokeWidth={1} /> : <Eye className="w-4 h-4" strokeWidth={1} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-[10px] text-red-600">{error}</p>
            )}

            <div className="flex justify-end">
              <Link 
                href="/forgot-password" 
                className="text-[10px] tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-foreground text-background hover:bg-foreground/90 text-xs h-11 tracking-wider uppercase"
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Access Admin Panel'}
            </Button>
          </form>

          <p className="text-[10px] text-muted-foreground text-center mt-8 tracking-wider uppercase">
            Sovereign access only
          </p>
        </div>
      </div>
    </main>
  )
}
