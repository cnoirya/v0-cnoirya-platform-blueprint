'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, ArrowLeft } from 'lucide-react'

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

export default function SubscribePage() {
  const searchParams = useSearchParams()
  const initialTier = searchParams.get('tier') || 'chosen'
  const [selectedTier, setSelectedTier] = useState(initialTier)
  const [step, setStep] = useState(1)
  const [ageVerified, setAgeVerified] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  })

  const selectedPlan = tiers.find(t => t.id === selectedTier) || tiers[1]

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
                    <span className="text-sm">${tier.price}/mo</span>
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
                  placeholder="Create a password"
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
                onClick={() => setStep(3)} 
                className="flex-1 text-sm"
                disabled={!ageVerified || !formData.email || !formData.password || !formData.username}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <p className="text-xs text-muted-foreground text-center">
              Complete payment
            </p>
            
            <div className="border border-border p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold">{selectedPlan.name} Plan</span>
                <span className="text-sm">${selectedPlan.price}/mo</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Billed monthly. Cancel anytime. Discreet billing.
              </p>
            </div>

            <div className="space-y-3">
              <Button className="w-full text-sm">
                Pay with Card
              </Button>
              <Button variant="outline" className="w-full text-sm">
                Pay with Crypto
              </Button>
            </div>

            <Button variant="ghost" onClick={() => setStep(2)} className="w-full text-sm">
              Back
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Payments processed securely via CCBill / NowPayments
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
