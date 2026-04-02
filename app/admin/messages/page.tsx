'use client'

import { useState } from 'react'
import { Search, Send, Image as ImageIcon, DollarSign, Lock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const conversations = [
  { id: '1', user: 'vip_fan_01', lastMessage: 'Thanks for the custom content!', time: '2m', unread: 2, tier: 'VIP' },
  { id: '2', user: 'premium_user', lastMessage: 'Can I request something?', time: '15m', unread: 1, tier: 'Premium' },
  { id: '3', user: 'member_123', lastMessage: 'Love your work!', time: '1h', unread: 0, tier: 'Standard' },
  { id: '4', user: 'superfan_x', lastMessage: 'Sent you a tip!', time: '3h', unread: 0, tier: 'VIP' },
  { id: '5', user: 'new_sub', lastMessage: 'Hey, just subscribed!', time: '1d', unread: 0, tier: 'Premium' },
]

const mockMessages = [
  { id: '1', sender: 'user', content: 'Hi! I absolutely love your content.', time: '15m ago' },
  { id: '2', sender: 'creator', content: 'Thank you so much! Means a lot to me.', time: '10m ago' },
  { id: '3', sender: 'user', content: 'Can I request something custom?', time: '5m ago' },
]

export default function AdminMessagesPage() {
  const [selectedConvo, setSelectedConvo] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState('')
  const [search, setSearch] = useState('')
  const [isPPV, setIsPPV] = useState(false)
  const [ppvPrice, setPpvPrice] = useState('5')

  return (
    <div className="h-[calc(100vh-4rem)] flex pb-16 lg:pb-0">
      {/* Conversations list */}
      <div className="w-full md:w-80 border-r border-border flex flex-col shrink-0">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="pl-10 text-xs"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((convo) => (
            <button
              key={convo.id}
              onClick={() => setSelectedConvo(convo)}
              className={`w-full p-4 flex items-start gap-3 border-b border-border text-left transition-colors ${
                selectedConvo.id === convo.id ? 'bg-secondary' : 'hover:bg-secondary/50'
              }`}
            >
              <div className="w-10 h-10 bg-secondary flex items-center justify-center text-xs shrink-0">
                {convo.user.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{convo.user}</span>
                  <span className="text-[10px] text-muted-foreground">{convo.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-muted-foreground truncate">{convo.lastMessage}</p>
                  {convo.unread > 0 && (
                    <span className="w-4 h-4 bg-foreground text-background text-[10px] flex items-center justify-center shrink-0">
                      {convo.unread}
                    </span>
                  )}
                </div>
                <span className={`text-[9px] mt-1 inline-block px-1.5 py-0.5 ${
                  convo.tier === 'VIP' ? 'bg-foreground text-background' :
                  convo.tier === 'Premium' ? 'bg-secondary text-foreground' :
                  'bg-secondary/50 text-muted-foreground'
                }`}>
                  {convo.tier}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Mass message button */}
        <div className="p-4 border-t border-border">
          <Button variant="outline" className="w-full text-xs">
            <Users className="h-3 w-3 mr-2" />
            Mass Message
          </Button>
        </div>
      </div>

      {/* Chat area */}
      <div className="hidden md:flex flex-1 flex-col">
        {/* Chat header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-secondary flex items-center justify-center text-xs">
              {selectedConvo.user.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-bold">{selectedConvo.user}</p>
              <p className="text-[10px] text-muted-foreground">{selectedConvo.tier} Member</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'creator' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[60%] p-3 ${
                  msg.sender === 'creator'
                    ? 'bg-foreground text-background'
                    : 'border border-border'
                }`}
              >
                <p className="text-xs">{msg.content}</p>
                <p className={`text-[10px] mt-1 ${
                  msg.sender === 'creator' ? 'text-background/60' : 'text-muted-foreground'
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-border space-y-3">
          {/* PPV toggle */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={isPPV}
                onChange={(e) => setIsPPV(e.target.checked)}
                className="rounded"
              />
              <Lock className="h-3 w-3" />
              PPV Message
            </label>
            {isPPV && (
              <div className="flex items-center gap-2">
                <span className="text-xs">$</span>
                <Input
                  value={ppvPrice}
                  onChange={(e) => setPpvPrice(e.target.value)}
                  className="w-16 text-xs h-7"
                  type="number"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="shrink-0">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="shrink-0">
              <DollarSign className="h-4 w-4" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="text-xs"
            />
            <Button size="sm" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
