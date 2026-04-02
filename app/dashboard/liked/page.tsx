"use client"

import { useState } from "react"
import { Heart, Grid, List, Play, Image, Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const likedContent = [
  { id: 1, type: "photo", date: "Apr 1, 2026", likes: 234 },
  { id: 2, type: "video", date: "Mar 28, 2026", duration: "2:45", likes: 567 },
  { id: 3, type: "photo", date: "Mar 25, 2026", likes: 189 },
  { id: 4, type: "photo", date: "Mar 22, 2026", likes: 445 },
  { id: 5, type: "video", date: "Mar 20, 2026", duration: "5:12", likes: 892 },
  { id: 6, type: "photo", date: "Mar 18, 2026", likes: 334 },
  { id: 7, type: "photo", date: "Mar 15, 2026", likes: 223 },
  { id: 8, type: "video", date: "Mar 12, 2026", duration: "1:30", likes: 456 },
  { id: 9, type: "photo", date: "Mar 10, 2026", likes: 178 },
]

export default function LikedPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState<"all" | "photos" | "videos">("all")

  const filteredContent = likedContent.filter((item) => {
    if (filter === "all") return true
    if (filter === "photos") return item.type === "photo"
    if (filter === "videos") return item.type === "video"
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-sm font-bold tracking-tight flex items-center gap-2">
              <Heart className="h-4 w-4" />
              LIKED CONTENT
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {likedContent.length} items saved
            </p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  <Filter className="h-3 w-3 mr-1" />
                  {filter === "all" ? "All" : filter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter("all")}>
                  All Content
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("photos")}>
                  Photos Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("videos")}>
                  Videos Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant={view === "grid" ? "outline" : "ghost"}
              size="sm"
              onClick={() => setView("grid")}
              className="h-7 w-7 p-0"
            >
              <Grid className="h-3 w-3" />
            </Button>
            <Button
              variant={view === "list" ? "outline" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
              className="h-7 w-7 p-0"
            >
              <List className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Content Grid/List */}
        {view === "grid" ? (
          <div className="grid grid-cols-3 gap-2">
            {filteredContent.map((item) => (
              <Link
                key={item.id}
                href={`/dashboard/content/${item.id}`}
                className="aspect-square bg-muted relative group"
              >
                {item.type === "video" && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] bg-background/80 px-1.5 py-0.5">
                    <Play className="h-2.5 w-2.5" fill="currentColor" />
                    {item.duration}
                  </div>
                )}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-1 text-xs">
                    <Heart className="h-3 w-3" fill="currentColor" />
                    {item.likes}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredContent.map((item) => (
              <Link
                key={item.id}
                href={`/dashboard/content/${item.id}`}
                className="flex items-center gap-3 p-2 border hover:border-foreground transition-colors"
              >
                <div className="w-16 h-16 bg-muted flex-shrink-0 relative">
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-4 w-4" fill="currentColor" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {item.type === "video" ? (
                      <Play className="h-3 w-3" />
                    ) : (
                      <Image className="h-3 w-3" />
                    )}
                    <span className="text-xs font-medium capitalize">
                      {item.type}
                    </span>
                    {item.duration && (
                      <span className="text-[10px] text-muted-foreground">
                        {item.duration}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-2.5 w-2.5" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-2.5 w-2.5" />
                      {item.likes}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xs font-bold mb-4">LIKE STATS</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="border p-4">
              <div className="text-2xl font-bold">{likedContent.length}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Total Liked
              </div>
            </div>
            <div className="border p-4">
              <div className="text-2xl font-bold">
                {likedContent.filter((i) => i.type === "photo").length}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Photos
              </div>
            </div>
            <div className="border p-4">
              <div className="text-2xl font-bold">
                {likedContent.filter((i) => i.type === "video").length}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Videos
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
