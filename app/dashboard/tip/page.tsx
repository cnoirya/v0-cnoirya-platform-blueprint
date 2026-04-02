'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const presetAmounts = [5, 10, 25, 50, 100]

export default function TipPage() {
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null)

  const handlePresetClick = (value: number) => {
    setSelectedPreset(value)
    setAmount(value.toString())
  }

  const handleCustomAmount = (value: string) => {
    setSelectedPreset(null)
    setAmount(value)
  }

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="max-w-md mx-auto px-6 py-8">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to dashboard
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-secondary mx-auto mb-4 flex items-center justify-center">
            <Heart className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h1 className="text-lg font-bold mb-1">Send a Tip</h1>
          <p className="text-xs text-muted-foreground">Show your appreciation</p>
        </div>

        <div className="space-y-6">
          {/* Preset amounts */}
          <div>
            <label className="block text-xs mb-3">Select amount</label>
            <div className="grid grid-cols-5 gap-2">
              {presetAmounts.map((value) => (
                <button
                  key={value}
                  onClick={() => handlePresetClick(value)}
                  className={`py-3 border text-sm transition-colors ${
                    selectedPreset === value 
                      ? 'border-foreground bg-foreground text-background' 
                      : 'border-border hover:border-foreground/30'
                  }`}
                >
                  ${value}
                </button>
              ))}
            </div>
          </div>

          {/* Custom amount */}
          <div>
            <label className="block text-xs mb-2">Or enter custom amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
              <Input
                value={amount}
                onChange={(e) => handleCustomAmount(e.target.value)}
                type="number"
                min="1"
                placeholder="0"
                className="pl-7 text-sm"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs mb-2">Add a message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say something nice..."
              rows={3}
              className="w-full border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            />
          </div>

          {/* Summary */}
          {amount && Number(amount) > 0 && (
            <div className="border border-border p-4">
              <div className="flex items-center justify-between mb-2 text-xs">
                <span className="text-muted-foreground">Tip Amount</span>
                <span className="font-bold">${amount}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Processing Fee</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-border mt-2 pt-2 flex items-center justify-between text-sm">
                <span className="font-bold">Total</span>
                <span className="font-bold">${amount}</span>
              </div>
            </div>
          )}

          {/* Submit */}
          <Button 
            className="w-full text-sm" 
            disabled={!amount || Number(amount) <= 0}
          >
            Send ${amount || '0'} Tip
          </Button>

          <p className="text-center text-[10px] text-muted-foreground">
            Payments processed securely. Creator receives 80% of tips.
          </p>
        </div>
      </div>
    </div>
  )
}
