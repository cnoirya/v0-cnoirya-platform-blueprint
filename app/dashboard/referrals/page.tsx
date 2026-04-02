"use client"

import { useState } from "react"
import { Copy, Check, Users, DollarSign, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false)
  const referralCode = "CNOIRYA-USER123"
  const referralLink = `https://member.cnoirya.com/ref/${referralCode}`

  const stats = {
    referred: 5,
    active: 3,
    earned: 45.00,
    pending: 15.00
  }

  const referrals = [
    { id: "1", user: "User_***B2", date: "Mar 25, 2026", status: "active", earned: 15.00 },
    { id: "2", user: "User_***D4", date: "Mar 20, 2026", status: "active", earned: 15.00 },
    { id: "3", user: "User_***F6", date: "Mar 15, 2026", status: "active", earned: 15.00 },
    { id: "4", user: "User_***H8", date: "Mar 10, 2026", status: "pending", earned: 0 },
    { id: "5", user: "User_***J0", date: "Mar 5, 2026", status: "pending", earned: 0 },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-sm font-bold uppercase tracking-widest mb-8">Referral Program</h1>

        {/* How it Works */}
        <div className="border border-black p-6 mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4">How It Works</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-10 h-10 border border-black mx-auto mb-3 flex items-center justify-center">
                <span className="text-sm font-bold">1</span>
              </div>
              <p className="text-xs font-bold">Share</p>
              <p className="text-xs text-neutral-500">Share your unique link</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 border border-black mx-auto mb-3 flex items-center justify-center">
                <span className="text-sm font-bold">2</span>
              </div>
              <p className="text-xs font-bold">Subscribe</p>
              <p className="text-xs text-neutral-500">Friend signs up</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 border border-black mx-auto mb-3 flex items-center justify-center">
                <span className="text-sm font-bold">3</span>
              </div>
              <p className="text-xs font-bold">Earn</p>
              <p className="text-xs text-neutral-500">Get $15 credit each</p>
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="border border-black p-6 mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4">Your Referral Link</h2>
          <div className="flex gap-2 mb-4">
            <Input 
              value={referralLink} 
              readOnly 
              className="border-black font-mono text-xs"
            />
            <Button 
              onClick={() => copyToClipboard(referralLink)}
              className="bg-black text-white text-xs uppercase tracking-widest shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">Code:</span>
            <code className="text-xs font-mono bg-neutral-100 px-2 py-1">{referralCode}</code>
            <button 
              onClick={() => copyToClipboard(referralCode)}
              className="text-xs text-neutral-500 hover:text-black"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Referred</p>
            <p className="text-2xl font-bold font-mono mt-1">{stats.referred}</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Active</p>
            <p className="text-2xl font-bold font-mono mt-1">{stats.active}</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Earned</p>
            <p className="text-2xl font-bold font-mono mt-1">${stats.earned}</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Pending</p>
            <p className="text-2xl font-bold font-mono mt-1">${stats.pending}</p>
          </div>
        </div>

        {/* Referral History */}
        <div className="border border-black">
          <div className="border-b border-black p-4">
            <h2 className="text-xs font-bold uppercase tracking-widest">Your Referrals</h2>
          </div>
          {referrals.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-8 h-8 mx-auto mb-4 text-neutral-300" />
              <p className="text-xs text-neutral-500">No referrals yet</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-200">
              {referrals.map(referral => (
                <div key={referral.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border border-neutral-300 flex items-center justify-center">
                      <Users className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div>
                      <p className="text-xs font-mono">{referral.user}</p>
                      <p className="text-xs text-neutral-500">{referral.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-0.5 text-xs ${
                      referral.status === "active" 
                        ? "bg-black text-white" 
                        : "border border-neutral-300"
                    }`}>
                      {referral.status}
                    </span>
                    <span className="text-xs font-mono">
                      {referral.earned > 0 ? `+$${referral.earned}` : "-"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Terms */}
        <div className="mt-6 p-4 bg-neutral-50 border border-neutral-200">
          <p className="text-xs text-neutral-600">
            <strong>Referral Terms:</strong> Credits are applied when your referral maintains an active subscription for 30 days. 
            Credits can be used for subscriptions, PPV content, or tips. Credits are non-transferable and have no cash value.
          </p>
        </div>
      </div>
    </div>
  )
}
