'use client'

import { useState } from 'react'
import { Grid, List, Lock, Play, Image as ImageIcon, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const collections = [
  {
    id: 1,
    title: 'Best of 2025',
    description: 'Curated highlights from the past year',
    itemCount: 48,
    thumbnail: null,
    isLocked: false,
    type: 'mixed',
    updatedAt: '2 days ago',
  },
  {
    id: 2,
    title: 'Behind the Scenes',
    description: 'Exclusive BTS content from all shoots',
    itemCount: 156,
    thumbnail: null,
    isLocked: false,
    type: 'video',
    updatedAt: '1 week ago',
  },
  {
    id: 3,
    title: 'VIP Exclusives',
    description: 'Content only available to VIP members',
    itemCount: 72,
    thumbnail: null,
    isLocked: true,
    requiredTier: 'VIP',
    type: 'mixed',
    updatedAt: '3 days ago',
  },
  {
    id: 4,
    title: 'Photoshoot Series',
    description: 'Full sets from professional shoots',
    itemCount: 234,
    thumbnail: null,
    isLocked: false,
    type: 'image',
    updatedAt: '5 days ago',
  },
  {
    id: 5,
    title: 'Fan Favorites',
    description: 'Most liked and requested content',
    itemCount: 89,
    thumbnail: null,
    isLocked: false,
    type: 'mixed',
    updatedAt: '1 day ago',
  },
  {
    id: 6,
    title: 'Elite Collection',
    description: 'Premium content for Elite tier',
    itemCount: 34,
    thumbnail: null,
    isLocked: true,
    requiredTier: 'Elite',
    type: 'video',
    updatedAt: '4 days ago',
  },
]

const series = [
  {
    id: 1,
    title: 'Weekly Diaries',
    description: 'Personal vlogs every week',
    episodeCount: 52,
    currentEpisode: 52,
    isComplete: false,
  },
  {
    id: 2,
    title: 'Transformation Series',
    description: 'Fitness journey documentation',
    episodeCount: 24,
    currentEpisode: 24,
    isComplete: true,
  },
  {
    id: 3,
    title: 'Travel Adventures',
    description: 'Content from around the world',
    episodeCount: 18,
    currentEpisode: 12,
    isComplete: false,
  },
]

export default function CollectionsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeTab, setActiveTab] = useState<'collections' | 'series'>('collections')

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-3 w-3" />
      case 'image': return <ImageIcon className="h-3 w-3" />
      default: return <Grid className="h-3 w-3" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-sm font-bold tracking-tight">COLLECTIONS</h1>
            <p className="text-xs text-muted-foreground mt-1">Organized content albums</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="text-xs h-7">
              Back to Feed
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab('collections')}
            className={`pb-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'collections'
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            Collections
          </button>
          <button
            onClick={() => setActiveTab('series')}
            className={`pb-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'series'
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            Series
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-1 border border-border mb-2">
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
        </div>

        {activeTab === 'collections' ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {collections.map((collection) => (
                <Link 
                  key={collection.id} 
                  href={collection.isLocked ? '#' : `/dashboard/collections/${collection.id}`}
                  className={`border border-border hover:border-foreground/50 transition-colors ${
                    collection.isLocked ? 'opacity-70' : ''
                  }`}
                >
                  <div className="aspect-video bg-muted flex items-center justify-center relative">
                    {collection.isLocked ? (
                      <Lock className="h-6 w-6 text-muted-foreground" />
                    ) : (
                      getTypeIcon(collection.type)
                    )}
                    {collection.isLocked && (
                      <span className="absolute top-2 right-2 text-[10px] bg-foreground text-background px-1.5 py-0.5">
                        {collection.requiredTier}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-medium mb-1">{collection.title}</h3>
                    <p className="text-[10px] text-muted-foreground mb-2 line-clamp-2">
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{collection.itemCount} items</span>
                      <span>{collection.updatedAt}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {collections.map((collection) => (
                <Link 
                  key={collection.id} 
                  href={collection.isLocked ? '#' : `/dashboard/collections/${collection.id}`}
                  className={`flex items-center justify-between p-4 border border-border hover:border-foreground/50 transition-colors ${
                    collection.isLocked ? 'opacity-70' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted flex items-center justify-center">
                      {collection.isLocked ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        getTypeIcon(collection.type)
                      )}
                    </div>
                    <div>
                      <h3 className="text-xs font-medium">{collection.title}</h3>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {collection.description}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                        <span>{collection.itemCount} items</span>
                        <span>{collection.updatedAt}</span>
                      </div>
                    </div>
                  </div>
                  {collection.isLocked && (
                    <span className="text-[10px] border border-border px-2 py-1">
                      {collection.requiredTier} Only
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )
        ) : (
          <div className="space-y-4">
            {series.map((s) => (
              <div key={s.id} className="border border-border p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-medium">{s.title}</h3>
                      {s.isComplete && (
                        <span className="text-[10px] bg-muted px-1.5 py-0.5">COMPLETE</span>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {s.description}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    Watch
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1 bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-foreground"
                      style={{ width: `${(s.currentEpisode / s.episodeCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {s.currentEpisode} / {s.episodeCount} episodes
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
