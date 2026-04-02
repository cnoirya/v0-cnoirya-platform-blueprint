'use client'

import { useState } from 'react'
import { Video, Heart, Gift, MessageCircle, Users, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockChat = [
  { id: 1, user: 'fan_123', message: 'Hey everyone!', tip: null },
  { id: 2, user: 'vip_member', message: 'So excited for this stream', tip: null },
  { id: 3, user: 'premium_user', message: 'Love the setup', tip: 25 },
  { id: 4, user: 'member_456', message: 'First time here, hi!', tip: null },
  { id: 5, user: 'superfan', message: 'You look amazing', tip: 50 },
]

const tipGoal = {
  current: 847,
  target: 1000,
  reward: 'Special surprise content unlock'
}

export default function LivePage() {
  const [message, setMessage] = useState('')
  const [isLive, setIsLive] = useState(true)

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      {/* Video area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 bg-secondary flex items-center justify-center relative">
          {isLive ? (
            <>
              <Video className="h-16 w-16 text-muted-foreground" strokeWidth={1} />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs bg-background px-2 py-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  LIVE
                </span>
                <span className="flex items-center gap-1.5 text-xs bg-background px-2 py-1">
                  <Users className="h-3 w-3" />
                  1,247
                </span>
              </div>
            </>
          ) : (
            <div className="text-center">
              <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" strokeWidth={1} />
              <p className="text-sm font-bold mb-1">Stream Offline</p>
              <p className="text-xs text-muted-foreground">Next stream: Friday 8PM EST</p>
            </div>
          )}
        </div>

        {/* Stream info & goals */}
        <div className="border-t border-border p-4 bg-background">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-sm font-bold">Friday Night Stream</h1>
                <p className="text-xs text-muted-foreground">Q&A + Special Content</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Heart className="h-3 w-3 mr-1" />
                  Follow
                </Button>
                <Button size="sm" className="text-xs">
                  <Gift className="h-3 w-3 mr-1" />
                  Send Tip
                </Button>
              </div>
            </div>

            {/* Tip goal */}
            <div className="border border-border p-3">
              <div className="flex items-center justify-between mb-2 text-xs">
                <span className="font-bold">Tip Goal</span>
                <span>${tipGoal.current} / ${tipGoal.target}</span>
              </div>
              <div className="h-2 bg-secondary mb-2">
                <div 
                  className="h-full bg-foreground"
                  style={{ width: `${(tipGoal.current / tipGoal.target) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground">{tipGoal.reward}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat sidebar */}
      <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border flex flex-col bg-background">
        <div className="p-4 border-b border-border">
          <h2 className="text-xs font-bold flex items-center gap-2">
            <MessageCircle className="h-3 w-3" />
            Live Chat
          </h2>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[300px] lg:max-h-none">
          {mockChat.map((msg) => (
            <div key={msg.id} className="text-xs">
              {msg.tip && (
                <div className="bg-secondary p-2 mb-1 text-center">
                  <Gift className="h-3 w-3 mx-auto mb-1" />
                  <span className="font-bold">${msg.tip} tip</span>
                </div>
              )}
              <p>
                <span className={`font-bold ${msg.tip ? 'text-foreground' : ''}`}>{msg.user}: </span>
                <span className="text-muted-foreground">{msg.message}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Chat input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2 mb-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say something..."
              className="text-xs"
            />
            <Button size="sm" className="shrink-0">
              <Send className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 text-[10px]">$5</Button>
            <Button variant="outline" size="sm" className="flex-1 text-[10px]">$10</Button>
            <Button variant="outline" size="sm" className="flex-1 text-[10px]">$25</Button>
            <Button variant="outline" size="sm" className="flex-1 text-[10px]">$50</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
