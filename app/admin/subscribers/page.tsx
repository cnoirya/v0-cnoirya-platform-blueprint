'use client'

import { useState } from 'react'
import { Search, MoreHorizontal, MessageCircle, Ban, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const subscribers = [
  { id: '1', username: 'vip_fan_01', email: 'vip@email.com', tier: 'VIP', since: 'Jan 2024', spent: '$1,847', status: 'active' },
  { id: '2', username: 'premium_user', email: 'premium@email.com', tier: 'Premium', since: 'Feb 2024', spent: '$647', status: 'active' },
  { id: '3', username: 'member_123', email: 'member@email.com', tier: 'Standard', since: 'Mar 2024', spent: '$147', status: 'active' },
  { id: '4', username: 'superfan_x', email: 'super@email.com', tier: 'VIP', since: 'Dec 2023', spent: '$2,847', status: 'active' },
  { id: '5', username: 'expired_user', email: 'expired@email.com', tier: 'Standard', since: 'Jan 2024', spent: '$87', status: 'expired' },
  { id: '6', username: 'new_sub', email: 'new@email.com', tier: 'Premium', since: 'Apr 2024', spent: '$29', status: 'active' },
]

type FilterTier = 'all' | 'vip' | 'premium' | 'standard'

export default function AdminSubscribersPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterTier>('all')

  const filteredSubs = subscribers.filter(sub => {
    const matchesSearch = sub.username.toLowerCase().includes(search.toLowerCase()) || 
                         sub.email.toLowerCase().includes(search.toLowerCase())
    const matchesTier = filter === 'all' || sub.tier.toLowerCase() === filter
    return matchesSearch && matchesTier
  })

  return (
    <div className="p-6 pb-24 lg:pb-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-sm font-bold">Subscribers</h1>
          <div className="text-xs text-muted-foreground">
            {subscribers.filter(s => s.status === 'active').length} active
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by username or email..."
              className="pl-10 text-xs"
            />
          </div>
          <div className="flex items-center gap-2">
            {(['all', 'vip', 'premium', 'standard'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setFilter(tier)}
                className={`text-xs px-3 py-1.5 transition-colors ${
                  filter === tier 
                    ? 'bg-foreground text-background' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tier.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Subscribers table */}
        <div className="border border-border">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 border-b border-border text-[10px] text-muted-foreground uppercase tracking-wider">
            <div className="col-span-3">User</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-2">Tier</div>
            <div className="col-span-2">Total Spent</div>
            <div className="col-span-1">Since</div>
            <div className="col-span-1"></div>
          </div>

          {/* Rows */}
          {filteredSubs.map((sub) => (
            <div key={sub.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 py-4 border-b border-border last:border-b-0">
              <div className="md:col-span-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary flex items-center justify-center text-[10px] shrink-0">
                  {sub.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-bold">{sub.username}</p>
                  <p className="text-[10px] text-muted-foreground md:hidden">{sub.email}</p>
                </div>
              </div>
              <div className="hidden md:flex md:col-span-3 items-center text-xs text-muted-foreground">
                {sub.email}
              </div>
              <div className="md:col-span-2 flex items-center">
                <span className={`text-[10px] px-2 py-0.5 ${
                  sub.tier === 'VIP' ? 'bg-foreground text-background' :
                  sub.tier === 'Premium' ? 'bg-secondary text-foreground' :
                  'bg-secondary/50 text-muted-foreground'
                }`}>
                  {sub.tier}
                </span>
                {sub.status === 'expired' && (
                  <span className="text-[10px] px-2 py-0.5 ml-2 bg-destructive/10 text-destructive">
                    Expired
                  </span>
                )}
              </div>
              <div className="md:col-span-2 flex items-center text-xs font-bold">
                {sub.spent}
              </div>
              <div className="md:col-span-1 flex items-center text-xs text-muted-foreground">
                {sub.since}
              </div>
              <div className="md:col-span-1 flex items-center justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-xs">
                      <MessageCircle className="h-3 w-3 mr-2" />
                      Message
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs">
                      <Gift className="h-3 w-3 mr-2" />
                      Send Gift
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs text-destructive">
                      <Ban className="h-3 w-3 mr-2" />
                      Block
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
