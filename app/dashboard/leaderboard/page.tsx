'use client'

import { useState } from 'react'
import { Trophy, Crown, Star, TrendingUp, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const leaderboardData = {
  allTime: [
    { rank: 1, name: 'user_***47', amount: '$12,456', badge: 'diamond' },
    { rank: 2, name: 'fan_***82', amount: '$8,923', badge: 'platinum' },
    { rank: 3, name: 'sub_***19', amount: '$7,234', badge: 'gold' },
    { rank: 4, name: 'member_***56', amount: '$5,678', badge: 'gold' },
    { rank: 5, name: 'user_***31', amount: '$4,567', badge: 'silver' },
    { rank: 6, name: 'fan_***94', amount: '$3,890', badge: 'silver' },
    { rank: 7, name: 'sub_***67', amount: '$3,234', badge: 'bronze' },
    { rank: 8, name: 'member_***28', amount: '$2,890', badge: 'bronze' },
    { rank: 9, name: 'user_***73', amount: '$2,456', badge: 'bronze' },
    { rank: 10, name: 'fan_***15', amount: '$2,123', badge: 'bronze' },
  ],
  monthly: [
    { rank: 1, name: 'fan_***82', amount: '$1,234', badge: 'gold' },
    { rank: 2, name: 'user_***47', amount: '$987', badge: 'silver' },
    { rank: 3, name: 'sub_***19', amount: '$756', badge: 'bronze' },
    { rank: 4, name: 'member_***56', amount: '$543', badge: null },
    { rank: 5, name: 'user_***31', amount: '$432', badge: null },
  ],
  weekly: [
    { rank: 1, name: 'sub_***19', amount: '$345', badge: 'gold' },
    { rank: 2, name: 'fan_***82', amount: '$234', badge: 'silver' },
    { rank: 3, name: 'user_***47', amount: '$189', badge: 'bronze' },
    { rank: 4, name: 'member_***56', amount: '$156', badge: null },
    { rank: 5, name: 'user_***31', amount: '$123', badge: null },
  ],
}

const getBadgeStyle = (badge: string | null) => {
  switch (badge) {
    case 'diamond': return 'bg-purple-100 text-purple-800'
    case 'platinum': return 'bg-slate-100 text-slate-800'
    case 'gold': return 'bg-amber-100 text-amber-800'
    case 'silver': return 'bg-gray-100 text-gray-800'
    case 'bronze': return 'bg-orange-100 text-orange-800'
    default: return ''
  }
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return <Crown className="h-4 w-4 text-amber-500" />
    case 2: return <Crown className="h-4 w-4 text-gray-400" />
    case 3: return <Crown className="h-4 w-4 text-orange-400" />
    default: return <span className="text-xs font-medium w-4 text-center">{rank}</span>
  }
}

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<'allTime' | 'monthly' | 'weekly'>('monthly')

  const data = leaderboardData[period]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-sm font-bold tracking-tight flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              TOP SUPPORTERS
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Leaderboard of contributions</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="text-xs h-7">
              Back to Feed
            </Button>
          </Link>
        </div>

        {/* Period Tabs */}
        <div className="flex items-center gap-1 border border-border p-1 mb-6 w-fit">
          <button
            onClick={() => setPeriod('weekly')}
            className={`px-3 py-1.5 text-xs ${period === 'weekly' ? 'bg-foreground text-background' : ''}`}
          >
            This Week
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-3 py-1.5 text-xs ${period === 'monthly' ? 'bg-foreground text-background' : ''}`}
          >
            This Month
          </button>
          <button
            onClick={() => setPeriod('allTime')}
            className={`px-3 py-1.5 text-xs ${period === 'allTime' ? 'bg-foreground text-background' : ''}`}
          >
            All Time
          </button>
        </div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 mb-8 pt-8">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-muted border border-border flex items-center justify-center mb-2">
              <Crown className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-xs font-medium">{data[1]?.name}</p>
            <p className="text-[10px] text-muted-foreground">{data[1]?.amount}</p>
            <div className="w-16 h-16 bg-muted mt-2" />
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-muted border-2 border-foreground flex items-center justify-center mb-2">
              <Crown className="h-8 w-8 text-amber-500" />
            </div>
            <p className="text-xs font-bold">{data[0]?.name}</p>
            <p className="text-xs">{data[0]?.amount}</p>
            <div className="w-20 h-24 bg-foreground mt-2" />
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-muted border border-border flex items-center justify-center mb-2">
              <Crown className="h-6 w-6 text-orange-400" />
            </div>
            <p className="text-xs font-medium">{data[2]?.name}</p>
            <p className="text-[10px] text-muted-foreground">{data[2]?.amount}</p>
            <div className="w-16 h-12 bg-muted mt-2" />
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="border border-border">
          <div className="flex items-center justify-between p-3 border-b border-border text-[10px] text-muted-foreground">
            <span>RANK</span>
            <span>SUPPORTER</span>
            <span>TOTAL</span>
          </div>
          {data.map((entry, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-between p-3 border-b border-border last:border-0 ${
                idx < 3 ? 'bg-muted/30' : ''
              }`}
            >
              <div className="flex items-center gap-3 w-12">
                {getRankIcon(entry.rank)}
              </div>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-xs">{entry.name}</span>
                {entry.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 ${getBadgeStyle(entry.badge)}`}>
                    {entry.badge.toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{entry.amount}</span>
            </div>
          ))}
        </div>

        {/* Your Rank */}
        <div className="mt-6 p-4 border border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium">Your Rank</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {period === 'weekly' ? 'This week' : period === 'monthly' ? 'This month' : 'All time'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold">#47</p>
              <p className="text-[10px] text-muted-foreground">$234 contributed</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <TrendingUp className="h-3 w-3 text-green-600" />
            <span className="text-[10px] text-green-600">Up 5 positions from last {period === 'weekly' ? 'week' : 'month'}</span>
          </div>
        </div>

        {/* Privacy Note */}
        <p className="text-[10px] text-muted-foreground mt-4 text-center">
          Usernames are anonymized for privacy. Opt out of the leaderboard in settings.
        </p>
      </div>
    </div>
  )
}
