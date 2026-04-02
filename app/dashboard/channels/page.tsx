'use client'

import { useState } from 'react'
import { Hash, Lock, Users, MessageCircle, Crown, Star, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const channels = [
  {
    id: 1,
    name: 'general',
    description: 'General discussion for all members',
    memberCount: 4521,
    messageCount: 12453,
    isLocked: false,
    tier: null,
    lastActivity: '2 min ago',
  },
  {
    id: 2,
    name: 'announcements',
    description: 'Important updates and news',
    memberCount: 4521,
    messageCount: 234,
    isLocked: false,
    tier: null,
    lastActivity: '1 hour ago',
  },
  {
    id: 3,
    name: 'premium-lounge',
    description: 'Exclusive chat for Premium members',
    memberCount: 1247,
    messageCount: 5678,
    isLocked: true,
    tier: 'Premium',
    lastActivity: '5 min ago',
  },
  {
    id: 4,
    name: 'vip-room',
    description: 'Private discussions for VIP tier',
    memberCount: 389,
    messageCount: 2341,
    isLocked: true,
    tier: 'VIP',
    lastActivity: '15 min ago',
  },
  {
    id: 5,
    name: 'elite-inner-circle',
    description: 'Most exclusive community space',
    memberCount: 47,
    messageCount: 892,
    isLocked: true,
    tier: 'Elite',
    lastActivity: '30 min ago',
  },
  {
    id: 6,
    name: 'content-requests',
    description: 'Submit and vote on content ideas',
    memberCount: 3245,
    messageCount: 1567,
    isLocked: false,
    tier: null,
    lastActivity: '10 min ago',
  },
]

const recentMessages = [
  { channel: 'general', user: 'user_***42', message: 'Love the new content!', time: '2 min ago' },
  { channel: 'premium-lounge', user: 'fan_***89', message: 'Thanks for the exclusive set', time: '5 min ago' },
  { channel: 'content-requests', user: 'sub_***17', message: 'Would love more BTS content', time: '10 min ago' },
]

export default function ChannelsPage() {
  const [activeChannel, setActiveChannel] = useState<number | null>(null)

  const getTierIcon = (tier: string | null) => {
    switch (tier) {
      case 'Premium': return <Star className="h-3 w-3" />
      case 'VIP': return <Crown className="h-3 w-3" />
      case 'Elite': return <Crown className="h-3 w-3" />
      default: return <Hash className="h-3 w-3" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-sm font-bold tracking-tight">COMMUNITY CHANNELS</h1>
            <p className="text-xs text-muted-foreground mt-1">Join the conversation</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="text-xs h-7">
              Back to Feed
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Channel List */}
          <div className="md:col-span-2">
            <h2 className="text-xs font-medium text-muted-foreground mb-4">ALL CHANNELS</h2>
            <div className="space-y-2">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  disabled={channel.isLocked}
                  className={`w-full text-left p-4 border transition-colors ${
                    activeChannel === channel.id
                      ? 'border-foreground bg-muted'
                      : channel.isLocked
                      ? 'border-border opacity-60'
                      : 'border-border hover:border-foreground/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {channel.isLocked ? (
                        <Lock className="h-3 w-3 text-muted-foreground" />
                      ) : (
                        getTierIcon(channel.tier)
                      )}
                      <span className="text-xs font-medium">#{channel.name}</span>
                      {channel.tier && (
                        <span className="text-[10px] border border-border px-1.5 py-0.5">
                          {channel.tier}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{channel.lastActivity}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 ml-5">
                    {channel.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 ml-5 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-2.5 w-2.5" />
                      {channel.memberCount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-2.5 w-2.5" />
                      {channel.messageCount.toLocaleString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Recent Activity */}
            <div className="mb-6">
              <h2 className="text-xs font-medium text-muted-foreground mb-4">RECENT ACTIVITY</h2>
              <div className="space-y-3">
                {recentMessages.map((msg, idx) => (
                  <div key={idx} className="p-3 border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-muted-foreground">#{msg.channel}</span>
                      <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-xs">
                      <span className="font-medium">{msg.user}:</span> {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tier Access Info */}
            <div className="p-4 border border-border bg-muted/30">
              <h3 className="text-xs font-medium mb-3">CHANNEL ACCESS</h3>
              <div className="space-y-2 text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Hash className="h-3 w-3" />
                    Public
                  </span>
                  <span className="text-muted-foreground">All Members</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Star className="h-3 w-3" />
                    Premium
                  </span>
                  <span className="text-muted-foreground">$14.99+/mo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Crown className="h-3 w-3" />
                    VIP
                  </span>
                  <span className="text-muted-foreground">$29.99+/mo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Crown className="h-3 w-3" />
                    Elite
                  </span>
                  <span className="text-muted-foreground">$99.99+/mo</span>
                </div>
              </div>
              <Link href="/subscribe">
                <Button className="w-full mt-4 text-xs h-8">
                  Upgrade Tier
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
