'use client'

import { useState } from 'react'
import { Heart, Grid, List, Play, Image as ImageIcon, Clock, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const likedContent = [
  { id: 1, title: 'Summer vibes set', type: 'image', likedAt: '2 hours ago', isLocked: false },
  { id: 2, title: 'BTS video ep. 24', type: 'video', likedAt: '5 hours ago', isLocked: false },
  { id: 3, title: 'Exclusive photoshoot', type: 'image', likedAt: '1 day ago', isLocked: false },
  { id: 4, title: 'Q&A session replay', type: 'video', likedAt: '2 days ago', isLocked: false },
  { id: 5, title: 'VIP only content', type: 'image', likedAt: '3 days ago', isLocked: true },
  { id: 6, title: 'Morning routine vlog', type: 'video', likedAt: '4 days ago', isLocked: false },
  { id: 7, title: 'Beach set preview', type: 'image', likedAt: '5 days ago', isLocked: false },
  { id: 8, title: 'Elite exclusive', type: 'video', likedAt: '1 week ago', isLocked: true },
]

export default function LikesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-sm font-bold tracking-tight flex items-center gap-2">
              <Heart className="h-4 w-4" />
              LIKED CONTENT
            </h1>
            <p className="text-xs text-muted-foreground mt-1">{likedContent.length} items</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border border-border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 ${viewMode === 'grid' ? 'bg-foreground text-background' : ''}`}
              >
                <Grid className="h-3 w-3" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 ${viewMode === 'list' ? 'bg-foreground text-background' : ''}`}
              >
                <List className="h-3 w-3" />
              </button>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="text-xs h-7">
                Back to Feed
              </Button>
            </Link>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {likedContent.map((item) => (
              <Link
                key={item.id}
                href={`/dashboard/content/${item.id}`}
                className="group border border-border hover:border-foreground/50 transition-colors"
              >
                <div className="aspect-square bg-muted flex items-center justify-center relative">
                  {item.type === 'video' ? (
                    <Play className="h-6 w-6 text-muted-foreground" />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  )}
                  {item.isLocked && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Lock className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                </div>
                <div className="p-2">
                  <p className="text-[10px] font-medium truncate">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground">{item.likedAt}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {likedContent.map((item) => (
              <Link
                key={item.id}
                href={`/dashboard/content/${item.id}`}
                className="flex items-center justify-between p-3 border border-border hover:border-foreground/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center relative">
                    {item.type === 'video' ? (
                      <Play className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                    {item.isLocked && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Lock className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Clock className="h-2.5 w-2.5" />
                      {item.likedAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {item.isLocked && (
                    <span className="text-[10px] border border-border px-2 py-0.5">LOCKED</span>
                  )}
                  <Heart className="h-4 w-4 fill-current" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
