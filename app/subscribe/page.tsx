'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, ArrowLeft, Copy, CheckCircle, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const tiers = [
  {
    id: 'devotee',
    name: 'Devotee',
    price: 14.99,
    features: ['Visual archive access', 'Weekly releases', 'Community channels']
  },
  {
    id: 'chosen',
    name: 'Chosen',
    price: 29.99,
    features: ['Everything in Devotee', 'Private messaging', 'Weekly transmissions']
  },
  {
    id: 'inner-circle',
    name: 'Inner Circle',
    price: 99.99,
    features: ['Everything in Chosen', 'Commissioned works', 'Private sessions']
  }
]

function SubscribeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTier = searchParams.get('tier') || 'chosen'
  const [selectedTier, setSelectedTier] = useState(initialTier)
  const [step, setStep] = useState(1)
  const [ageVerified, setAgeVerified] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [signUpSuccess, setSignUpSuccess] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  })

  const selectedPlan = tiers.find(t => t.id === selectedTier) || tiers[1]

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCreateAccount = async () => {
    setIsLoading(true)
    setError('')

    const supabase = createClient()
    
    const { error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          username: formData.username,
          tier: selectedTier,
        },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setIsLoading(false)
      return
    }

    setSignUpSuccess(true)
    setStep(3)
    setIsLoading(false)
  }

  const handlePaymentSent = async () => {
    setIsLoading(true)
    
    // Create payment record via API
    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: selectedTier,
          amount: selectedPlan.price,
          email: formData.email,
        }),
      })

      if (response.ok) {
        // Redirect to pending page
        router.push('/subscribe/pending')
      }
    } catch {
      setError('Failed to process. Please try again.')
    }
    
    setIsLoading(false)
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-3 w-3" />
          Back to home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-xl font-bold tracking-tight mb-2">Enter the Inner World</h1>
          <p className="text-xs text-muted-foreground">
            Step {step} of 3
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 border border-red-200 bg-red-50 text-red-600 text-xs">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <p className="text-xs text-muted-foreground text-center">
              Select your access layer
            </p>
            
            <div className="space-y-3">
              {tiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`w-full p-4 border text-left transition-colors ${
                    selectedTier === tier.id ? 'border-foreground' : 'border-border hover:border-foreground/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold">{tier.name}</span>
                    <span className="text-sm">${tier.price} USDT/mo</span>
                  </div>
                  <ul className="space-y-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="h-3 w-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            <Button onClick={() => setStep(2)} className="w-full text-sm">
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <p className="text-xs text-muted-foreground text-center">
              Create your account
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-2">Username</label>
                <Input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Choose a username"
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-2">Password</label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Create a password (min 6 characters)"
                  className="text-sm"
                />
              </div>
              
              <label className="flex items-start gap-2 text-xs">
                <input 
                  type="checkbox" 
                  checked={ageVerified}
                  onChange={(e) => setAgeVerified(e.target.checked)}
                  className="mt-0.5"
                />
                <span className="text-muted-foreground">
                  I confirm I meet the age requirements and agree to the{' '}
                  <Link href="/terms" className="text-foreground hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-foreground hover:underline">Privacy Policy</Link>.
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 text-sm">
                Back
              </Button>
              <Button 
                onClick={handleCreateAccount} 
                className="flex-1 text-sm"
                disabled={!ageVerified || !formData.email || !formData.password || !formData.username || isLoading}
              >
                {isLoading ? 'Creating...' : 'Continue'}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            {signUpSuccess && (
              <div className="p-3 border border-green-400 bg-green-50 text-green-800 text-xs mb-4">
                <strong>Account created!</strong> Check your email to confirm, then complete payment below.
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center">
              Complete payment with USDT
            </p>
            
            <div className="border border-foreground p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold">{selectedPlan.name} Plan</span>
                <span className="text-sm font-bold">${selectedPlan.price} USDT</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Monthly subscription. Cancel anytime.
              </p>
            </div>

            <div className="border border-border p-4 bg-muted/30">
              <p className="text-xs text-muted-foreground mb-4">
                Send exactly <strong>${selectedPlan.price} USDT</strong> to one of the addresses below:
              </p>

              <div className="space-y-3">
                {/* TRC20 */}
                <div className="p-3 bg-background border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold">USDT (TRC20)</span>
                    <span className="text-xs text-green-600">Low fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs flex-1 truncate bg-muted p-2">
                      TJYvPzVXxxxxxxxxxxxxxxxxxxxxxxxxxx
                    </code>
                    <button 
                      onClick={() => handleCopyAddress("TJYvPzVXxxxxxxxxxxxxxxxxxxxxxxxxxx")}
                      className="p-2 border hover:bg-muted"
                    >
                      {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* ERC20 */}
                <div className="p-3 bg-background border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold">USDT (ERC20)</span>
                    <span className="text-xs text-muted-foreground">Ethereum</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs flex-1 truncate bg-muted p-2">
                      0x742d35Ccxxxxxxxxxxxxxxxxxxxxxxxxxx
                    </code>
                    <button 
                      onClick={() => handleCopyAddress("0x742d35Ccxxxxxxxxxxxxxxxxxxxxxxxxxx")}
                      className="p-2 border hover:bg-muted"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 border border-yellow-400 bg-yellow-50 text-yellow-800">
              <p className="text-xs">
                <strong>Note:</strong> Your subscription will activate automatically after payment confirmation (typically 1-5 minutes).
              </p>
            </div>

            <Button onClick={handlePaymentSent} disabled={isLoading} className="w-full text-sm">
              {isLoading ? 'Processing...' : "I've Sent Payment"}
            </Button>

            <Button variant="ghost" onClick={() => setStep(2)} className="w-full text-sm">
              Back
            </Button>

            <div className="text-center">
              <a 
                href="https://nowpayments.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              >
                Powered by NOWPayments <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default function SubscribePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background px-6 py-12">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-xs text-muted-foreground">Loading...</p>
        </div>
      </main>
    }>
      <SubscribeContent />
    </Suspense>
  )
}
