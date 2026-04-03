import Link from 'next/link'
import { Clock, CheckCircle, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PendingPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 mx-auto mb-6 border-2 border-foreground rounded-full flex items-center justify-center">
          <Clock className="w-8 h-8" />
        </div>

        <h1 className="text-xl font-bold tracking-tight mb-4">
          Payment Pending
        </h1>

        <p className="text-sm text-muted-foreground mb-8">
          We&apos;re waiting for your USDT payment to be confirmed on the blockchain. 
          This usually takes 1-5 minutes.
        </p>

        <div className="space-y-3 text-left border border-border p-4 mb-8">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
            <div>
              <p className="text-xs font-bold">Account created</p>
              <p className="text-xs text-muted-foreground">Your account is ready</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-xs font-bold">Confirm your email</p>
              <p className="text-xs text-muted-foreground">Check your inbox for verification link</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-muted-foreground mt-0.5 animate-pulse" />
            <div>
              <p className="text-xs font-bold">Payment processing</p>
              <p className="text-xs text-muted-foreground">Waiting for blockchain confirmation</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-6">
          You&apos;ll receive an email once your payment is confirmed and your subscription is active.
        </p>

        <div className="flex gap-3">
          <Link href="/login" className="flex-1">
            <Button variant="outline" className="w-full text-sm">
              Go to Login
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button variant="ghost" className="w-full text-sm">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
