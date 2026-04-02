"use client"

import { useState } from "react"
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, Copy, ExternalLink, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function WalletPage() {
  const [balance, setBalance] = useState(45.00)
  const [topUpAmount, setTopUpAmount] = useState("")
  const [showTopUp, setShowTopUp] = useState(false)
  const [copied, setCopied] = useState(false)
  const [paymentInitiated, setPaymentInitiated] = useState(false)

  const presetAmounts = [25, 50, 100, 250, 500, 1000]

  const transactions = [
    { type: "topup", description: "USDT Deposit", amount: 50.00, date: "Mar 30, 2026", method: "TRC20" },
    { type: "spend", description: "Video Call - 12:34", amount: -74.88, date: "Mar 28, 2026" },
    { type: "spend", description: "PPV: Behind the Scenes", amount: -15.00, date: "Mar 27, 2026" },
    { type: "spend", description: "Tip", amount: -25.00, date: "Mar 26, 2026" },
    { type: "spend", description: "Audio Call - 8:15", amount: -32.92, date: "Mar 25, 2026" },
    { type: "topup", description: "USDT Deposit", amount: 100.00, date: "Mar 24, 2026", method: "ERC20" },
    { type: "spend", description: "Custom Request Deposit", amount: -50.00, date: "Mar 23, 2026" },
    { type: "spend", description: "Gated DM Unlock", amount: -10.00, date: "Mar 22, 2026" },
  ]

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInitiatePayment = () => {
    // This would trigger NOWPayments API
    setPaymentInitiated(true)
  }

  const handleConfirmPayment = () => {
    const amount = parseFloat(topUpAmount)
    if (amount > 0) {
      setBalance(prev => prev + amount)
      setTopUpAmount("")
      setShowTopUp(false)
      setPaymentInitiated(false)
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
              <p className="text-xs text-neutral-500 mt-1">USDT equivalent</p>
            </div>
            <Wallet className="w-6 h-6" />
          </div>
          <Button 
            onClick={() => setShowTopUp(!showTopUp)}
            className="w-full bg-black text-white text-xs uppercase tracking-widest"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add USDT
          </Button>
        </div>

        {/* Top Up Form - USDT Only */}
        {showTopUp && (
          <div className="border border-black p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest">Add USDT</h2>
              <span className="text-xs text-neutral-500">Powered by NOWPayments</span>
            </div>

            {!paymentInitiated ? (
              <>
                {/* Amount Presets */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {presetAmounts.map(amount => (
                    <button
                      key={amount}
                      onClick={() => setTopUpAmount(amount.toString())}
                      className={`p-3 border text-sm ${
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
                <div className="mb-6">
                  <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                    Custom Amount (USDT)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                    <Input
                      type="number"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                      placeholder="0.00"
                      className="pl-7 border-black"
                      min="10"
                    />
                  </div>
                  <p className="text-xs text-neutral-500 mt-2">Minimum deposit: $10 USDT</p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowTopUp(false)}
                    className="flex-1 border-black text-xs uppercase tracking-widest"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleInitiatePayment}
                    disabled={!topUpAmount || parseFloat(topUpAmount) < 10}
                    className="flex-1 bg-black text-white text-xs uppercase tracking-widest"
                  >
                    Continue
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Payment Details */}
                <div className="mb-6 p-4 bg-neutral-50 border border-neutral-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold">Amount to Send</span>
                    <span className="text-lg font-bold">{topUpAmount} USDT</span>
                  </div>
                  
                  <p className="text-xs text-neutral-600 mb-4">
                    Send exactly {topUpAmount} USDT to one of the addresses below. Your balance will update automatically after confirmation.
                  </p>

                  <div className="space-y-3">
                    {/* TRC20 */}
                    <div className="p-3 bg-white border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold">USDT (TRC20)</span>
                        <span className="text-xs text-green-600">Recommended - Low fees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs flex-1 truncate bg-neutral-100 p-2">
                          TJYvPzVXxxxxxxxxxxxxxxxxxxxxxxxxxx
                        </code>
                        <button 
                          onClick={() => handleCopyAddress("TJYvPzVXxxxxxxxxxxxxxxxxxxxxxxxxxx")}
                          className="p-2 border hover:bg-neutral-100"
                        >
                          {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* ERC20 */}
                    <div className="p-3 bg-white border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold">USDT (ERC20)</span>
                        <span className="text-xs text-neutral-500">Ethereum network</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs flex-1 truncate bg-neutral-100 p-2">
                          0x742d35Ccxxxxxxxxxxxxxxxxxxxxxxxxxx
                        </code>
                        <button 
                          onClick={() => handleCopyAddress("0x742d35Ccxxxxxxxxxxxxxxxxxxxxxxxxxx")}
                          className="p-2 border hover:bg-neutral-100"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* BEP20 */}
                    <div className="p-3 bg-white border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold">USDT (BEP20)</span>
                        <span className="text-xs text-neutral-500">BNB Smart Chain</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs flex-1 truncate bg-neutral-100 p-2">
                          0x8B3aEcxxxxxxxxxxxxxxxxxxxxxxxxxx
                        </code>
                        <button 
                          onClick={() => handleCopyAddress("0x8B3aEcxxxxxxxxxxxxxxxxxxxxxxxxxx")}
                          className="p-2 border hover:bg-neutral-100"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-yellow-300 bg-yellow-50 mb-6">
                  <p className="text-xs text-yellow-800">
                    <strong>Important:</strong> Send only USDT to these addresses. Sending other tokens will result in permanent loss.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setPaymentInitiated(false)}
                    className="flex-1 border-black text-xs uppercase tracking-widest"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleConfirmPayment}
                    className="flex-1 bg-black text-white text-xs uppercase tracking-widest"
                  >
                    I&apos;ve Sent Payment
                  </Button>
                </div>

                <div className="mt-4 text-center">
                  <a 
                    href="https://nowpayments.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-500 hover:text-black inline-flex items-center gap-1"
                  >
                    Powered by NOWPayments <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </>
            )}
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
                <p className={`text-sm font-bold ${
                  tx.amount > 0 ? "text-black" : "text-neutral-500"
                }`}>
                  {tx.amount > 0 ? "+" : ""}{tx.amount.toFixed(2)} USDT
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
