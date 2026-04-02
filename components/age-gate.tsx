"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function AgeGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState<boolean | null>(null)
  const [declined, setDeclined] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("age_verified")
    if (stored === "true") {
      setVerified(true)
    } else {
      setVerified(false)
    }
  }, [])

  const handleVerify = () => {
    localStorage.setItem("age_verified", "true")
    setVerified(true)
  }

  const handleDecline = () => {
    setDeclined(true)
  }

  if (verified === null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-4 h-4 border border-black border-t-transparent animate-spin" />
      </div>
    )
  }

  if (declined) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <p className="text-sm font-bold mb-2">Access Denied</p>
          <p className="text-xs text-neutral-500">
            You must be 18 years or older to access this content.
          </p>
        </div>
      </div>
    )
  }

  if (!verified) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-sm w-full text-center">
          <div className="mb-8">
            <p className="text-lg tracking-tight mb-2">CNOIRYA</p>
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Age Verification Required</p>
          </div>

          <div className="border border-black p-6 mb-6">
            <p className="text-xs mb-4">
              This is a sovereign space. By entering, you confirm you meet the age requirements and accept our Terms of Service.
            </p>
            <div className="text-xs text-neutral-500 space-y-1">
              <p>- Premium patron-only content</p>
              <p>- Dark feminine artistic expression</p>
              <p>- Verification required for access</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleDecline}
              variant="outline"
              className="flex-1 border-black text-xs uppercase tracking-widest"
            >
              Exit
            </Button>
            <Button
              onClick={handleVerify}
              className="flex-1 bg-black text-white text-xs uppercase tracking-widest"
            >
              Enter
            </Button>
          </div>

          <p className="text-xs text-neutral-400 mt-6">
            By entering you agree to our{" "}
            <a href="/terms" className="underline">Terms</a> and{" "}
            <a href="/privacy" className="underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
