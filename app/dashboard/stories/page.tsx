"use client"

import { useState } from "react"
import { Play, Clock, Eye, Heart, X, ChevronLeft, ChevronRight, Lock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const stories = [
  {
    id: 1,
    thumbnail: "/api/placeholder/200/300",
    time: "2h ago",
    viewed: false,
    type: "photo",
    isLocked: false,
  },
  {
    id: 2,
    thumbnail: "/api/placeholder/200/300",
    time: "4h ago",
    viewed: true,
    type: "video",
    duration: "0:45",
    isLocked: false,
  },
  {
    id: 3,
    thumbnail: "/api/placeholder/200/300",
    time: "8h ago",
    viewed: true,
    type: "photo",
    isLocked: true,
    price: 5,
  },
  {
    id: 4,
    thumbnail: "/api/placeholder/200/300",
    time: "12h ago",
    viewed: false,
    type: "video",
    duration: "1:20",
    isLocked: false,
  },
  {
    id: 5,
    thumbnail: "/api/placeholder/200/300",
    time: "18h ago",
    viewed: true,
    type: "photo",
    isLocked: true,
    price: 10,
  },
]

export default function StoriesPage() {
  const [activeStory, setActiveStory] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)

  const openStory = (index: number) => {
    setActiveStory(index)
    setProgress(0)
  }

  const closeStory = () => {
    setActiveStory(null)
    setProgress(0)
  }

  const nextStory = () => {
    if (activeStory !== null && activeStory < stories.length - 1) {
      setActiveStory(activeStory + 1)
      setProgress(0)
    } else {
      closeStory()
    }
  }

  const prevStory = () => {
    if (activeStory !== null && activeStory > 0) {
      setActiveStory(activeStory - 1)
      setProgress(0)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-sm font-bold tracking-tight">STORIES</h1>
          <p className="text-xs text-muted-foreground mt-1">
            24-hour updates - {stories.filter(s => !s.viewed).length} new
          </p>
        </div>

        {/* Story Thumbnails */}
        <div className="grid grid-cols-5 gap-3">
          {stories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => openStory(index)}
              className={`relative aspect-[3/4] border overflow-hidden transition-all hover:opacity-80 ${
                story.viewed ? "border-muted" : "border-foreground"
              }`}
            >
              <div className="absolute inset-0 bg-muted" />
              
              {story.type === "video" && (
                <div className="absolute top-2 right-2">
                  <Play className="h-3 w-3" fill="currentColor" />
                </div>
              )}
              
              {story.isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <div className="text-center">
                    <Lock className="h-4 w-4 mx-auto mb-1" />
                    <span className="text-[10px]">${story.price}</span>
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-background/80">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock className="h-2.5 w-2.5" />
                  {story.time}
                </div>
              </div>
              
              {!story.viewed && (
                <div className="absolute top-2 left-2 h-2 w-2 bg-foreground rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Story Stats */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xs font-bold mb-4">STORY STATS</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="border p-4">
              <div className="text-2xl font-bold">{stories.length}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Active Stories</div>
            </div>
            <div className="border p-4">
              <div className="text-2xl font-bold">2.4K</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Views</div>
            </div>
            <div className="border p-4">
              <div className="text-2xl font-bold">18h</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Watch Time</div>
            </div>
          </div>
        </div>

        {/* Expired Stories */}
        <div className="mt-8">
          <h2 className="text-xs font-bold mb-4">RECENTLY EXPIRED</h2>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-dashed">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-muted" />
                  <div>
                    <div className="text-xs">Story #{i}</div>
                    <div className="text-[10px] text-muted-foreground">Expired {i} day ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {Math.floor(Math.random() * 500) + 100}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen Story Viewer */}
      {activeStory !== null && (
        <div className="fixed inset-0 bg-background z-50">
          {/* Progress Bars */}
          <div className="absolute top-4 left-4 right-4 flex gap-1">
            {stories.map((_, index) => (
              <div key={index} className="flex-1 h-0.5 bg-muted overflow-hidden">
                <div
                  className={`h-full bg-foreground transition-all duration-100 ${
                    index < activeStory ? "w-full" : index === activeStory ? "" : "w-0"
                  }`}
                  style={index === activeStory ? { width: `${progress}%` } : {}}
                />
              </div>
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={closeStory}
            className="absolute top-10 right-4 p-2 hover:bg-muted transition-colors z-10"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Story Content */}
          <div className="h-full flex items-center justify-center">
            {stories[activeStory].isLocked ? (
              <div className="text-center">
                <Lock className="h-8 w-8 mx-auto mb-4" />
                <p className="text-sm mb-4">Unlock this story</p>
                <Button variant="outline" size="sm" className="text-xs">
                  Pay ${stories[activeStory].price} to view
                </Button>
              </div>
            ) : (
              <div className="aspect-[9/16] max-h-[80vh] bg-muted flex items-center justify-center">
                {stories[activeStory].type === "video" ? (
                  <Play className="h-12 w-12" />
                ) : (
                  <span className="text-xs text-muted-foreground">Photo Content</span>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <button
            onClick={prevStory}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-4 hover:bg-muted/50"
            disabled={activeStory === 0}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextStory}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-4 hover:bg-muted/50"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Bottom Actions */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Reply to story..."
              className="flex-1 bg-transparent border px-3 py-2 text-xs focus:outline-none"
            />
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>

          {/* Story Info */}
          <div className="absolute top-12 left-4">
            <div className="text-xs font-bold">@cnoirya</div>
            <div className="text-[10px] text-muted-foreground">{stories[activeStory].time}</div>
          </div>
        </div>
      )}
    </div>
  )
}
