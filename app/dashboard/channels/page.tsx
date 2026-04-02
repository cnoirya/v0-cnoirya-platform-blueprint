"use client"

import { useState } from "react"
import { Lock, Users, MessageCircle, Crown, Star, Hash, Send, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const channels = [
  {
    id: 1,
    name: "General Chat",
    description: "Open discussion for all members",
    members: 1245,
    messages: 24892,
    access: "all",
    lastMessage: "2 min ago",
    unread: 12,
  },
  {
    id: 2,
    name: "Gold Lounge",
    description: "Exclusive chat for Gold tier and above",
    members: 456,
    messages: 8934,
    access: "gold",
    lastMessage: "5 min ago",
    unread: 3,
  },
  {
    id: 3,
    name: "Platinum VIP",
    description: "Direct access to creator, priority responses",
    members: 89,
    messages: 2341,
    access: "platinum",
    lastMessage: "12 min ago",
    unread: 0,
  },
  {
    id: 4,
    name: "Diamond Inner Circle",
    description: "Most exclusive community, limited spots",
    members: 24,
    messages: 567,
    access: "diamond",
    lastMessage: "1 hour ago",
    unread: 0,
    limited: true,
    spotsLeft: 6,
  },
]

const eventChannels = [
  {
    id: 1,
    name: "Live Stream Chat - April Event",
    description: "Event-specific discussion",
    members: 234,
    expiresIn: "2 days",
    access: "ticket",
    ticketPrice: 15,
  },
  {
    id: 2,
    name: "NFT Holders Only",
    description: "Exclusive channel for NFT collectors",
    members: 67,
    access: "nft",
  },
]

export default function ChannelsPage() {
  const [activeChannel, setActiveChannel] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-sm font-bold tracking-tight">COMMUNITY CHANNELS</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Join tier-gated group discussions
          </p>
        </div>

        {/* Tier Channels */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold flex items-center gap-2">
            <Hash className="h-3 w-3" />
            PERMANENT CHANNELS
          </h2>
          {channels.map((channel) => (
            <Link
              key={channel.id}
              href={`/dashboard/channels/${channel.id}`}
              className="block border p-4 hover:border-foreground transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium">{channel.name}</h3>
                    {channel.access !== "all" && (
                      <span className="text-[10px] px-1.5 py-0.5 border uppercase tracking-wider flex items-center gap-1">
                        {channel.access === "diamond" && <Crown className="h-2.5 w-2.5" />}
                        {channel.access === "platinum" && <Star className="h-2.5 w-2.5" />}
                        {channel.access}
                      </span>
                    )}
                    {channel.limited && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-foreground text-background">
                        {channel.spotsLeft} spots left
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {channel.description}
                  </p>
                </div>
                {channel.unread > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-foreground text-background">
                    {channel.unread}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {channel.members}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {channel.messages.toLocaleString()}
                </span>
                <span>Last: {channel.lastMessage}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Event Channels */}
        <div className="mt-8 space-y-3">
          <h2 className="text-xs font-bold flex items-center gap-2">
            <Star className="h-3 w-3" />
            SPECIAL ACCESS CHANNELS
          </h2>
          {eventChannels.map((channel) => (
            <div
              key={channel.id}
              className="border p-4 hover:border-foreground transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium">{channel.name}</h3>
                    <span className="text-[10px] px-1.5 py-0.5 border uppercase tracking-wider">
                      {channel.access === "ticket" ? `$${channel.ticketPrice}` : channel.access}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {channel.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {channel.members}
                  </span>
                  {channel.expiresIn && (
                    <span>Expires in {channel.expiresIn}</span>
                  )}
                </div>
                {channel.access === "ticket" ? (
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    Buy Access ${channel.ticketPrice}
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    Join Channel
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Channel Stats */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xs font-bold mb-4">YOUR CHANNEL ACTIVITY</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="border p-4">
              <div className="text-2xl font-bold">3</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Channels Joined
              </div>
            </div>
            <div className="border p-4">
              <div className="text-2xl font-bold">156</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Messages Sent
              </div>
            </div>
            <div className="border p-4">
              <div className="text-2xl font-bold">Gold</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Access Level
              </div>
            </div>
            <div className="border p-4">
              <div className="text-2xl font-bold">2</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Locked Channels
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade Prompt */}
        <div className="mt-6 border border-dashed p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-medium">Unlock More Channels</h3>
              <p className="text-[10px] text-muted-foreground mt-1">
                Upgrade to Platinum for access to VIP channels and priority responses
              </p>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              Upgrade Tier
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
