import { DollarSign, TrendingUp, CreditCard, Coins } from 'lucide-react'
import { Button } from '@/components/ui/button'

const earningsSummary = {
  totalRevenue: '$24,847',
  pendingPayout: '$4,212',
  lastPayout: '$8,421',
  lastPayoutDate: 'Mar 15, 2026'
}

const revenueBreakdown = [
  { source: 'Subscriptions', amount: '$14,847', percentage: 60 },
  { source: 'Tips', amount: '$4,212', percentage: 17 },
  { source: 'PPV Content', amount: '$3,847', percentage: 15 },
  { source: 'Custom Orders', amount: '$1,521', percentage: 6 },
  { source: 'Messages', amount: '$420', percentage: 2 },
]

const recentTransactions = [
  { id: '1', type: 'Subscription', user: 'vip_user', amount: '+$99.99', time: '2 hours ago' },
  { id: '2', type: 'Tip', user: 'fan_123', amount: '+$50.00', time: '3 hours ago' },
  { id: '3', type: 'PPV', user: 'member_456', amount: '+$14.99', time: '5 hours ago' },
  { id: '4', type: 'Subscription', user: 'new_sub', amount: '+$29.99', time: '8 hours ago' },
  { id: '5', type: 'Custom Order', user: 'premium_fan', amount: '+$75.00', time: '1 day ago' },
  { id: '6', type: 'Payout', user: 'CCBill', amount: '-$8,421.00', time: 'Mar 15' },
]

export default function AdminEarningsPage() {
  return (
    <div className="p-6 pb-24 lg:pb-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-sm font-bold">Earnings</h1>
          <Button size="sm" className="text-xs">
            Request Payout
          </Button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="border border-border p-4">
            <DollarSign className="h-4 w-4 text-muted-foreground mb-2" />
            <p className="text-2xl font-bold">{earningsSummary.totalRevenue}</p>
            <p className="text-[10px] text-muted-foreground">Total Revenue (MTD)</p>
          </div>
          <div className="border border-border p-4">
            <TrendingUp className="h-4 w-4 text-muted-foreground mb-2" />
            <p className="text-2xl font-bold">{earningsSummary.pendingPayout}</p>
            <p className="text-[10px] text-muted-foreground">Pending Payout</p>
          </div>
          <div className="border border-border p-4">
            <CreditCard className="h-4 w-4 text-muted-foreground mb-2" />
            <p className="text-2xl font-bold">{earningsSummary.lastPayout}</p>
            <p className="text-[10px] text-muted-foreground">Last Payout</p>
          </div>
          <div className="border border-border p-4">
            <Coins className="h-4 w-4 text-muted-foreground mb-2" />
            <p className="text-sm font-bold">{earningsSummary.lastPayoutDate}</p>
            <p className="text-[10px] text-muted-foreground">Payout Date</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue breakdown */}
          <div className="border border-border p-4">
            <h2 className="text-xs font-bold mb-4">Revenue Breakdown</h2>
            <div className="space-y-4">
              {revenueBreakdown.map((item) => (
                <div key={item.source}>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span>{item.source}</span>
                    <span className="font-bold">{item.amount}</span>
                  </div>
                  <div className="h-2 bg-secondary">
                    <div 
                      className="h-full bg-foreground"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent transactions */}
          <div className="border border-border p-4">
            <h2 className="text-xs font-bold mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className={`w-20 text-[10px] ${
                      tx.type === 'Payout' ? 'text-muted-foreground' : 'text-foreground'
                    }`}>
                      {tx.type}
                    </span>
                    <span className="text-muted-foreground">{tx.user}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`font-bold ${
                      tx.amount.startsWith('-') ? 'text-muted-foreground' : ''
                    }`}>
                      {tx.amount}
                    </span>
                    <span className="text-[10px] text-muted-foreground w-16 text-right">{tx.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payout settings */}
        <div className="border border-border p-4 mt-6">
          <h2 className="text-xs font-bold mb-4">Payout Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="text-muted-foreground mb-1">Payment Method</p>
              <p className="font-bold">Bank Transfer (ACH)</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Payout Schedule</p>
              <p className="font-bold">Bi-weekly (1st & 15th)</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Revenue Split</p>
              <p className="font-bold">80% Creator / 20% Platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
