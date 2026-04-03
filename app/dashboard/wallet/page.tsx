"use client"

import { useState, useEffect } from "react"
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, Copy, ExternalLink, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

export default function WalletPage() {
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [topUpAmount, setTopUpAmount] = useState("")
  const [showTopUp, setShowTopUp] = useState(false)
  const [copied, setCopied] = useState(false)
  const [paymentInitiated, setPaymentInitiated] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentData, setPaymentData] = useState<{
    pay_address: string
    pay_amount: number
    payment_id: string
  } | null>(null)
  const [transactions, setTransactions] = useState<any[]>([])

  const presetAmounts = [25, 50, 100, 250, 500, 1000]

  useEffect(() => {
    loadWalletData()
  }, [])

  const loadWalletData = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      // Get profile with balance
      const { data: profile } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', user.id)
        .single()
      
      if (profile) {
        setBalance(profile.balance || 0)
      }

      // Get transactions
      const { data: txns } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)
      
      if (txns) {
        setTransactions(txns)
      }
    }
    setLoading(false)
  }

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInitiatePayment = async () => {
    const amount = parseFloat(topUpAmount)
    if (amount < 10) return

    setPaymentLoading(true)
    
    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          type: 'wallet_topup'
        })
      })

      const data = await response.json()
      
      if (data.success && data.payment) {
        setPaymentData({
          pay_address: data.payment.pay_address,
          pay_amount: data.payment.pay_amount,
          payment_id: data.payment.payment_id
        })
        setPaymentInitiated(true)
      }
    } catch (error) {
      console.error('Payment error:', error)
    }
    
    setPaymentLoading(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
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
              <p className="text-4xl font-bold mt-2">${(balance || 0).toFixed(2)}</p>
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
                    disabled={!topUpAmount || parseFloat(topUpAmount) < 10 || paymentLoading}
                    className="flex-1 bg-black text-white text-xs uppercase tracking-widest"
                  >
                    {paymentLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Continue'}
                  </Button>
                </div>
              </>
            ) : paymentData ? (
              <>
                {/* Payment Details */}
                <div className="mb-6 p-4 bg-neutral-50 border border-neutral-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold">Amount to Send</span>
                    <span className="text-lg font-bold">{paymentData.pay_amount} USDT</span>
                  </div>
                  
                  <p className="text-xs text-neutral-600 mb-4">
                    Send exactly {paymentData.pay_amount} USDT to the address below. Your balance will update automatically after confirmation.
                  </p>

                  <div className="p-3 bg-white border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold">USDT (TRC20)</span>
                      <span className="text-xs text-green-600">Low fees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs flex-1 truncate bg-neutral-100 p-2">
                        {paymentData.pay_address}
                      </code>
                      <button 
                        onClick={() => handleCopyAddress(paymentData.pay_address)}
                        className="p-2 border hover:bg-neutral-100"
                      >
                        {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-500 mt-3">
                    Payment ID: {paymentData.payment_id}
                  </p>
                </div>

                <div className="p-4 border border-yellow-300 bg-yellow-50 mb-6">
                  <p className="text-xs text-yellow-800">
                    <strong>Important:</strong> Send only USDT to this address. Sending other tokens will result in permanent loss.
                  </p>
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setPaymentInitiated(false)
                    setPaymentData(null)
                    setShowTopUp(false)
                    loadWalletData()
                  }}
                  className="w-full border-black text-xs uppercase tracking-widest"
                >
                  Done
                </Button>

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
            ) : null}
          </div>
        )}

        {/* Transaction History */}
        <div className="border border-black">
          <div className="border-b border-black p-4 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest">Transaction History</h2>
          </div>
          {transactions.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-xs text-neutral-500">No transactions yet</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-200">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between">
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
                      <p className="text-xs text-neutral-500">{formatDate(tx.created_at)}</p>
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
          )}
        </div>
      </div>
    </div>
  )
}
