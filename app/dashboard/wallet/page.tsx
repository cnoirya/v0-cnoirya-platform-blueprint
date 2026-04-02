"use client"

import { useState } from "react"
import { CreditCard, Wallet, ArrowUpRight, ArrowDownLeft, Plus, Bitcoin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function WalletPage() {
  const [balance, setBalance] = useState(45.00)
  const [topUpAmount, setTopUpAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card")
  const [showTopUp, setShowTopUp] = useState(false)

  const presetAmounts = [10, 25, 50, 100, 250, 500]

  const transactions = [
    { type: "topup", description: "Balance Top Up", amount: 50.00, date: "Mar 30, 2026", method: "Visa ****4242" },
    { type: "spend", description: "Video Call - 12:34", amount: -74.88, date: "Mar 28, 2026" },
    { type: "spend", description: "PPV: Behind the Scenes", amount: -15.00, date: "Mar 27, 2026" },
    { type: "spend", description: "Tip", amount: -25.00, date: "Mar 26, 2026" },
    { type: "spend", description: "Audio Call - 8:15", amount: -32.92, date: "Mar 25, 2026" },
    { type: "topup", description: "Balance Top Up", amount: 100.00, date: "Mar 24, 2026", method: "BTC" },
    { type: "spend", description: "Custom Request Deposit", amount: -50.00, date: "Mar 23, 2026" },
    { type: "spend", description: "Gated DM Unlock", amount: -10.00, date: "Mar 22, 2026" },
  ]

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount)
    if (amount > 0) {
      setBalance(prev => prev + amount)
      setTopUpAmount("")
      setShowTopUp(false)
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-sm font-bold uppercase tracking-widest mb-8">Wallet</h1>

        {/* Balance Card */}
        <div className="border border-black p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-widest">Available Balance</p>
              <p className="text-4xl font-bold mt-2">${balance.toFixed(2)}</p>
            </div>
            <Wallet className="w-6 h-6" />
          </div>
          <Button 
            onClick={() => setShowTopUp(!showTopUp)}
            className="w-full bg-black text-white text-xs uppercase tracking-widest"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Funds
          </Button>
        </div>

        {/* Top Up Form */}
        {showTopUp && (
          <div className="border border-black p-6 mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4">Add Funds</h2>

            {/* Amount Presets */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {presetAmounts.map(amount => (
                <button
                  key={amount}
                  onClick={() => setTopUpAmount(amount.toString())}
                  className={`p-3 border text-sm font-mono ${
                    topUpAmount === amount.toString() 
                      ? "bg-black text-white border-black" 
                      : "border-neutral-300 hover:border-black"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-4">
              <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                Custom Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                <Input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  placeholder="0.00"
                  className="pl-7 border-black"
                  min="1"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 border flex items-center gap-3 ${
                    paymentMethod === "card" 
                      ? "bg-black text-white border-black" 
                      : "border-neutral-300 hover:border-black"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <div className="text-left">
                    <p className="text-xs font-bold">Card</p>
                    <p className="text-xs opacity-70">Visa, MC, Amex</p>
                  </div>
                </button>
                <button
                  onClick={() => setPaymentMethod("crypto")}
                  className={`p-4 border flex items-center gap-3 ${
                    paymentMethod === "crypto" 
                      ? "bg-black text-white border-black" 
                      : "border-neutral-300 hover:border-black"
                  }`}
                >
                  <Bitcoin className="w-5 h-5" />
                  <div className="text-left">
                    <p className="text-xs font-bold">Crypto</p>
                    <p className="text-xs opacity-70">BTC, ETH, SOL</p>
                  </div>
                </button>
              </div>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                    Card Number
                  </label>
                  <Input placeholder="4242 4242 4242 4242" className="border-black font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                      Expiry
                    </label>
                    <Input placeholder="MM/YY" className="border-black font-mono" />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                      CVC
                    </label>
                    <Input placeholder="123" className="border-black font-mono" />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "crypto" && (
              <div className="mb-6 p-4 bg-neutral-50 border border-neutral-200">
                <p className="text-xs text-neutral-600 mb-3">
                  Send payment to the following address. Your balance will update after 1 confirmation.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white border">
                    <span className="text-xs font-bold">BTC</span>
                    <code className="text-xs">bc1qxy2kgdygjrsqtzq2n0yrf...</code>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white border">
                    <span className="text-xs font-bold">ETH</span>
                    <code className="text-xs">0x742d35Cc6634C0532925a3b...</code>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white border">
                    <span className="text-xs font-bold">SOL</span>
                    <code className="text-xs">7EcDhSYGxXyscszYEp35KHN8...</code>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowTopUp(false)}
                className="flex-1 border-black text-xs uppercase tracking-widest"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleTopUp}
                disabled={!topUpAmount || parseFloat(topUpAmount) <= 0}
                className="flex-1 bg-black text-white text-xs uppercase tracking-widest"
              >
                {paymentMethod === "card" ? "Pay" : "I&apos;ve Sent Payment"}
              </Button>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">This Month</p>
            <p className="text-xl font-bold mt-1">$207.80</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Total Spent</p>
            <p className="text-xl font-bold mt-1">$1,842.50</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Member Since</p>
            <p className="text-xl font-bold mt-1">142d</p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="border border-black">
          <div className="border-b border-black p-4 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest">Transaction History</h2>
            <button className="text-xs text-neutral-500 hover:text-black">Export</button>
          </div>
          <div className="divide-y divide-neutral-200">
            {transactions.map((tx, i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 border flex items-center justify-center ${
                    tx.type === "topup" ? "border-black" : "border-neutral-300"
                  }`}>
                    {tx.type === "topup" ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold">{tx.description}</p>
                    <p className="text-xs text-neutral-500">{tx.date} {tx.method && `• ${tx.method}`}</p>
                  </div>
                </div>
                <p className={`text-sm font-mono font-bold ${
                  tx.amount > 0 ? "text-black" : "text-neutral-500"
                }`}>
                  {tx.amount > 0 ? "+" : ""}{tx.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-black p-4 text-center">
            <button className="text-xs text-neutral-500 hover:text-black uppercase tracking-widest">
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
