'use client'

import { useState } from 'react'
import { Play, Eye, Clock, ChevronLeft, ChevronRight, X, Heart, MessageCircle, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const stories = [
  { id: 1, preview: 'Behind the scenes...', time: '2h ago', views: 1247, isNew: true, isPremium: false },
  { id: 2, preview: 'New set preview...', time: '5h ago', views: 892, isNew: true, isPremium: true },
  { id: 3, preview: 'Morning routine...', time: '12h ago', views: 2103, isNew: false, isPremium: false },
  { id: 4, preview: 'Q&A time...', time: '18h ago', views: 1567, isNew: false, isPremium: true },
  { id: 5, preview: 'Exclusive sneak peek...', time: '23h ago', views: 3421, isNew: false, isPremium: true },
]

export default function StoriesPage() {
  const [activeStory, setActiveStory] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)

  const openStory = (id: number) => {
    setActiveStory(id)
    setProgress(0)
  }

  const closeStory = () => {
    setActiveStory(null)
    setProgress(0)
  }

  const nextStory = () => {
    if (activeStory && activeStory < stories.length) {
      setActiveStory(activeStory + 1)
      setProgress(0)
    } else {
      closeStory()
    }
  }

  const prevStory = () => {
    if (activeStory && activeStory > 1) {
      setActiveStory(activeStory - 1)
      setProgress(0)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-sm font-bold tracking-tight">STORIES</h1>
            <p className="text-xs text-muted-foreground mt-1">24-hour updates</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="text-xs h-7">
              Back to Feed
            </Button>
          </Link>
        </div>

        {/* Story Ring */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => openStory(story.id)}
              className="flex-shrink-0 flex flex-col items-center gap-2"
            >
              <div className={`w-16 h-16 rounded-full border-2 ${story.isNew ? 'border-foreground' : 'border-muted'} p-0.5`}>
                <div className="w-full h-full rounded-full bg-muted flex items-center justify-center relative">
                  {story.isPremium && (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  )}
                  {!story.isPremium && (
                    <Play className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground">{story.time}</span>
            </button>
          ))}
        </div>

        {/* Story List */}
        <div className="space-y-2">
          <h2 className="text-xs font-medium text-muted-foreground mb-4">ALL STORIES</h2>
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => openStory(story.id)}
              className="w-full flex items-center justify-between p-4 border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full border ${story.isNew ? 'border-foreground' : 'border-muted'} flex items-center justify-center`}>
                  {story.isPremium ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium">{story.preview}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{story.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span className="text-[10px]">{story.views.toLocaleString()}</span>
                </div>
                {story.isPremium && (
                  <span className="text-[10px] border border-border px-2 py-0.5">PREMIUM</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Story Viewer Modal */}
        {activeStory && (
          <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            {/* Progress bars */}
            <div className="absolute top-4 left-4 right-4 flex gap-1">
              {stories.map((story, idx) => (
                <div key={story.id} className="flex-1 h-0.5 bg-white/30 overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-100"
                    style={{ 
                      width: idx + 1 < activeStory ? '100%' : idx + 1 === activeStory ? `${progress}%` : '0%'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Close button */}
            <button onClick={closeStory} className="absolute top-8 right-4 text-white">
              <X className="h-6 w-6" />
            </button>

            {/* Story info */}
            <div className="absolute top-8 left-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20" />
              <div>
                <p className="text-white text-xs font-medium">@cnoirya</p>
                <p className="text-white/60 text-[10px]">{stories[activeStory - 1]?.time}</p>
              </div>
            </div>

            {/* Navigation */}
            <button 
              onClick={prevStory}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button 
              onClick={nextStory}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Story content */}
            <div className="w-full max-w-sm aspect-[9/16] bg-neutral-900 flex items-center justify-center">
              {stories[activeStory - 1]?.isPremium ? (
                <div className="text-center p-8">
                  <Lock className="h-8 w-8 text-white/40 mx-auto mb-4" />
                  <p className="text-white text-xs mb-4">Premium Story</p>
                  <Button variant="outline" size="sm" className="text-xs bg-white text-black hover:bg-white/90">
                    Unlock for $2.99
                  </Button>
                </div>
              ) : (
                <p className="text-white/60 text-xs">{stories[activeStory - 1]?.preview}</p>
              )}
            </div>

            {/* Bottom actions */}
            <div className="absolute bottom-8 left-4 right-4 flex items-center justify-center gap-6">
              <button className="text-white/80 hover:text-white flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span className="text-xs">Like</span>
              </button>
              <button className="text-white/80 hover:text-white flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs">Reply</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
