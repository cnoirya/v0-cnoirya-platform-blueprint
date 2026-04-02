'use client'

import { useState } from 'react'
import { Send, Image as ImageIcon, DollarSign, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const messages = [
  {
    id: '1',
    sender: 'creator',
    content: 'Hey! Thanks for subscribing. Feel free to reach out anytime.',
    time: '2 days ago',
    isLocked: false
  },
  {
    id: '2',
    sender: 'user',
    content: 'Thanks! Love your content. Keep it up!',
    time: '2 days ago',
    isLocked: false
  },
  {
    id: '3',
    sender: 'creator',
    content: 'Thank you so much for the kind words! I have some exclusive content coming up next week that I think you will really enjoy.',
    time: '1 day ago',
    isLocked: false
  },
  {
    id: '4',
    sender: 'user',
    content: 'Can not wait! Is there any way to get early access?',
    time: '1 day ago',
    isLocked: false
  },
  {
    id: '5',
    sender: 'creator',
    content: 'Premium and VIP members get early access! You can also unlock this exclusive message for $5.',
    time: '20 hours ago',
    isLocked: false
  },
  {
    id: '6',
    sender: 'creator',
    content: 'Exclusive preview just for you...',
    time: '20 hours ago',
    isLocked: true,
    price: 5
  }
]

export default function MessagesPage() {
  const [newMessage, setNewMessage] = useState('')

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col pb-16 md:pb-0">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary flex items-center justify-center text-xs">
            C
          </div>
          <div>
            <h1 className="text-sm font-bold">CNOIRYA</h1>
            <p className="text-[10px] text-muted-foreground">Creator</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          <DollarSign className="h-3 w-3 mr-1" />
          Send Tip
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] md:max-w-[60%] ${
                msg.sender === 'user'
                  ? 'bg-foreground text-background'
                  : 'border border-border'
              }`}
            >
              {msg.isLocked ? (
                <div className="p-4 text-center">
                  <Lock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs mb-2">{msg.content}</p>
                  <Button size="sm" className="text-xs" variant={msg.sender === 'user' ? 'secondary' : 'default'}>
                    Unlock ${msg.price}
                  </Button>
                </div>
              ) : (
                <div className="p-3">
                  <p className="text-xs leading-relaxed">{msg.content}</p>
                </div>
              )}
              <div className={`px-3 pb-2 text-[10px] ${
                msg.sender === 'user' ? 'text-background/60' : 'text-muted-foreground'
              }`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border p-4 shrink-0">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="shrink-0">
            <ImageIcon className="h-4 w-4" />
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
        <p className="text-[10px] text-muted-foreground mt-2">
          Gated messages cost $2 per message. Media messages cost extra.
        </p>
      </div>
    </div>
  )
}
