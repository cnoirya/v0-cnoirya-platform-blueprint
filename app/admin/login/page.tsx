'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

// CHANGE THIS PASSWORD - This is just for demo purposes
const ADMIN_PASSWORD = 'cnoirya2024'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simple password check - replace with proper auth later
    if (password === ADMIN_PASSWORD) {
      // Set a simple cookie/localStorage flag
      localStorage.setItem('cnoirya_admin_auth', 'true')
      localStorage.setItem('cnoirya_admin_auth_time', Date.now().toString())
      router.push('/admin')
    } else {
      setError('Invalid password')
    }
    
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to site
        </Link>

        <div className="border border-border p-8">
          <div className="text-center mb-8">
            <h1 className="text-lg font-bold tracking-tight">CNOIRYA</h1>
            <p className="text-xs text-muted-foreground mt-1">Creator Admin</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="h-10 text-sm pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}

            <Button 
              type="submit" 
              className="w-full bg-foreground text-background hover:bg-foreground/90 text-sm"
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Access Admin Panel'}
            </Button>
          </form>

          <p className="text-[10px] text-muted-foreground text-center mt-6">
            Sovereign access only
          </p>
        </div>
      </div>
    </main>
  )
}
