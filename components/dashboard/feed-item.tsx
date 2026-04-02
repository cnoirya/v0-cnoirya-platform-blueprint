'use client'

import Link from 'next/link'
import { Heart, MessageCircle, Lock, Play, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FeedItemProps {
  id: string
  type: 'photo' | 'video' | 'ppv'
  thumbnail: string | null
  title: string
  description: string
  likes: number
  comments: number
  timestamp: string
  isLocked?: boolean
  price?: number
  duration?: string
}

export function FeedItem({
  id,
  type,
  title,
  description,
  likes,
  comments,
  timestamp,
  isLocked,
  price,
  duration
}: FeedItemProps) {
  return (
    <article className="border border-border">
      {/* Content preview */}
      <Link href={`/dashboard/content/${id}`}>
        <div className="aspect-[4/3] bg-secondary flex items-center justify-center relative">
          {isLocked ? (
            <div className="text-center">
              <Lock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Unlock for ${price}</p>
            </div>
          ) : (
            <>
              {type === 'video' ? (
                <div className="text-center">
                  <Play className="h-8 w-8 mx-auto text-muted-foreground" strokeWidth={1.5} />
                  {duration && (
                    <span className="absolute bottom-3 right-3 text-[10px] bg-background/90 px-2 py-1">
                      {duration}
                    </span>
                  )}
                </div>
              ) : (
                <ImageIcon className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
              )}
            </>
          )}
          
          {/* Type badge */}
          <span className="absolute top-3 left-3 text-[10px] tracking-wider uppercase bg-background px-2 py-1">
            {type}
          </span>
        </div>
      </Link>

      {/* Content info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h2 className="text-sm font-bold">{title}</h2>
          <span className="text-[10px] text-muted-foreground whitespace-nowrap">{timestamp}</span>
        </div>
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Heart className="h-4 w-4" strokeWidth={1.5} />
              {likes}
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              {comments}
            </button>
          </div>

          {isLocked && (
            <Button size="sm" className="text-xs h-7">
              Unlock ${price}
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
