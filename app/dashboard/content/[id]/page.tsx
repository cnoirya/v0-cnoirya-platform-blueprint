'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, MessageCircle, Share2, ChevronLeft, ChevronRight, Play, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Mock data for a photo set
const mockContent = {
  id: '1',
  type: 'photo' as const,
  title: 'Photoset #42',
  description: 'Exclusive behind the scenes from the latest shoot. Shot in natural lighting with a minimalist aesthetic.',
  timestamp: 'April 1, 2026',
  likes: 847,
  comments: [
    { id: '1', user: 'member_xxx', text: 'Amazing set!', time: '2h ago' },
    { id: '2', user: 'vip_user', text: 'Best one yet', time: '3h ago' },
    { id: '3', user: 'premium_fan', text: 'Worth every penny', time: '5h ago' },
  ],
  images: Array.from({ length: 24 }, (_, i) => ({ id: i + 1, index: i })),
  isLocked: false
}

export default function ContentViewerPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState(false)
  const [comment, setComment] = useState('')
  const [showComments, setShowComments] = useState(false)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mockContent.images.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < mockContent.images.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-background border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/dashboard/content" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3 w-3" />
            Back to Content
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setLiked(!liked)} className="text-xs">
              <Heart className={`h-4 w-4 mr-1 ${liked ? 'fill-current' : ''}`} />
              {liked ? mockContent.likes + 1 : mockContent.likes}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)} className="text-xs">
              <MessageCircle className="h-4 w-4 mr-1" />
              {mockContent.comments.length}
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main viewer */}
          <div className="lg:col-span-2">
            {/* Content display */}
            <div className="relative border border-border mb-4">
              <div className="aspect-[4/3] bg-secondary flex items-center justify-center">
                {mockContent.isLocked ? (
                  <div className="text-center">
                    <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Unlock to view</p>
                  </div>
                ) : mockContent.type === 'video' ? (
                  <Play className="h-12 w-12 text-muted-foreground" strokeWidth={1} />
                ) : (
                  <span className="text-6xl font-bold text-muted-foreground/20">
                    {currentIndex + 1}
                  </span>
                )}
              </div>

              {/* Navigation arrows */}
              {!mockContent.isLocked && mockContent.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 border border-border flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 border border-border flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}

              {/* Counter */}
              {!mockContent.isLocked && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background/80 px-3 py-1 text-xs">
                  {currentIndex + 1} / {mockContent.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {!mockContent.isLocked && mockContent.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {mockContent.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-16 h-16 shrink-0 bg-secondary border flex items-center justify-center text-xs ${
                      idx === currentIndex ? 'border-foreground' : 'border-border'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Content info */}
            <div className="border border-border p-4">
              <h1 className="text-sm font-bold mb-2">{mockContent.title}</h1>
              <p className="text-[10px] text-muted-foreground mb-4">{mockContent.timestamp}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {mockContent.description}
              </p>
            </div>

            {/* Comments */}
            <div className="border border-border p-4">
              <h3 className="text-xs font-bold mb-4">Comments ({mockContent.comments.length})</h3>
              
              <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                {mockContent.comments.map((c) => (
                  <div key={c.id} className="text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold">{c.user}</span>
                      <span className="text-[10px] text-muted-foreground">{c.time}</span>
                    </div>
                    <p className="text-muted-foreground">{c.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="text-xs"
                />
                <Button size="sm" className="text-xs shrink-0">
                  Post
                </Button>
              </div>
            </div>

            {/* Tip */}
            <div className="border border-border p-4">
              <h3 className="text-xs font-bold mb-2">Show Appreciation</h3>
              <p className="text-[10px] text-muted-foreground mb-4">
                Loved this content? Send a tip!
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs">$5</Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs">$10</Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs">$25</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
