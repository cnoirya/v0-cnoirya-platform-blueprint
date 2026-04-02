"use client"

import { useState } from "react"
import { Lock, Grid, List, Play, Image, ChevronRight, Heart, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const collections = [
  {
    id: 1,
    title: "Cosplay Series",
    itemCount: 24,
    thumbnail: "/api/placeholder/300/200",
    access: "gold",
    description: "Complete cosplay photoshoots and behind the scenes",
  },
  {
    id: 2,
    title: "Behind The Scenes",
    itemCount: 56,
    thumbnail: "/api/placeholder/300/200",
    access: "silver",
    description: "Exclusive BTS content from all shoots",
  },
  {
    id: 3,
    title: "Exclusive Videos",
    itemCount: 18,
    thumbnail: "/api/placeholder/300/200",
    access: "platinum",
    description: "Premium video content for top tier members",
  },
  {
    id: 4,
    title: "Lifestyle",
    itemCount: 89,
    thumbnail: "/api/placeholder/300/200",
    access: "all",
    description: "Day to day lifestyle content",
  },
  {
    id: 5,
    title: "Archived Streams",
    itemCount: 32,
    thumbnail: "/api/placeholder/300/200",
    access: "gold",
    description: "All past live stream recordings",
  },
  {
    id: 6,
    title: "Special Releases",
    itemCount: 8,
    thumbnail: "/api/placeholder/300/200",
    access: "ppv",
    price: 25,
    description: "Limited edition content drops",
  },
]

const series = [
  {
    id: 1,
    title: "The Journey - Season 1",
    episodes: 12,
    progress: 8,
    thumbnail: "/api/placeholder/400/200",
  },
  {
    id: 2,
    title: "Day in My Life",
    episodes: 24,
    progress: 24,
    thumbnail: "/api/placeholder/400/200",
  },
]

export default function CollectionsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-sm font-bold tracking-tight">COLLECTIONS</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Organized content albums and series
            </p>
          </div>
          <div className="flex items-center gap-2">
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

        {/* Series Section */}
        <div className="mb-8">
          <h2 className="text-xs font-bold mb-4 flex items-center gap-2">
            <Play className="h-3 w-3" />
            EPISODIC SERIES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {series.map((s) => (
              <Link
                key={s.id}
                href={`/dashboard/collections/series/${s.id}`}
                className="border group hover:border-foreground transition-colors"
              >
                <div className="aspect-[2/1] bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-8 w-8 opacity-50" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium group-hover:underline">
                    {s.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-muted-foreground">
                      {s.episodes} episodes
                    </span>
                    <span className="text-[10px]">
                      {s.progress}/{s.episodes} watched
                    </span>
                  </div>
                  <div className="mt-2 h-1 bg-muted overflow-hidden">
                    <div
                      className="h-full bg-foreground"
                      style={{ width: `${(s.progress / s.episodes) * 100}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Collections Grid */}
        <div>
          <h2 className="text-xs font-bold mb-4 flex items-center gap-2">
            <Image className="h-3 w-3" />
            ALBUMS
          </h2>
          <div
            className={
              view === "grid"
                ? "grid grid-cols-2 md:grid-cols-3 gap-4"
                : "space-y-2"
            }
          >
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/dashboard/collections/${collection.id}`}
                className={`border group hover:border-foreground transition-colors ${
                  view === "list" ? "flex items-center" : ""
                }`}
              >
                {view === "grid" ? (
                  <>
                    <div className="aspect-[3/2] bg-muted relative">
                      {collection.access === "ppv" ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                          <div className="text-center">
                            <Lock className="h-4 w-4 mx-auto mb-1" />
                            <span className="text-[10px]">${collection.price}</span>
                          </div>
                        </div>
                      ) : collection.access !== "all" ? (
                        <div className="absolute top-2 right-2">
                          <span className="text-[10px] px-1.5 py-0.5 bg-background border uppercase">
                            {collection.access}
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-medium group-hover:underline">
                        {collection.title}
                      </h3>
                      <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">
                        {collection.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-muted-foreground">
                          {collection.itemCount} items
                        </span>
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-14 bg-muted flex-shrink-0 relative">
                      {collection.access === "ppv" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                          <Lock className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-medium group-hover:underline">
                          {collection.title}
                        </h3>
                        <span className="text-[10px] text-muted-foreground">
                          {collection.itemCount} items
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {collection.access !== "all" && (
                          <span className="text-[10px] px-1.5 py-0.5 border uppercase">
                            {collection.access === "ppv"
                              ? `$${collection.price}`
                              : collection.access}
                          </span>
                        )}
                        <ChevronRight className="h-3 w-3" />
                      </div>
                    </div>
                  </>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Saved/Liked Content */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xs font-bold mb-4">YOUR SAVED CONTENT</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/dashboard/liked"
              className="border p-4 flex items-center gap-3 hover:border-foreground transition-colors"
            >
              <Heart className="h-5 w-5" />
              <div>
                <div className="text-sm font-medium">Liked Content</div>
                <div className="text-[10px] text-muted-foreground">
                  147 items
                </div>
              </div>
            </Link>
            <Link
              href="/dashboard/bookmarks"
              className="border p-4 flex items-center gap-3 hover:border-foreground transition-colors"
            >
              <Bookmark className="h-5 w-5" />
              <div>
                <div className="text-sm font-medium">Bookmarked</div>
                <div className="text-[10px] text-muted-foreground">
                  32 items
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
