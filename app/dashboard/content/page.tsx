'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Grid, List, Play, Lock, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const contentItems = [
  { id: '1', type: 'photo', title: 'Photoset #42', count: 24, locked: false },
  { id: '2', type: 'video', title: 'Full Video', duration: '12:34', locked: false },
  { id: '3', type: 'photo', title: 'Photoset #41', count: 18, locked: false },
  { id: '4', type: 'ppv', title: 'PPV Exclusive', price: 9.99, locked: true },
  { id: '5', type: 'video', title: 'BTS Video', duration: '8:21', locked: false },
  { id: '6', type: 'photo', title: 'Photoset #40', count: 32, locked: false },
  { id: '7', type: 'ppv', title: 'Premium Set', price: 14.99, locked: true },
  { id: '8', type: 'video', title: 'Video #38', duration: '15:47', locked: false },
  { id: '9', type: 'photo', title: 'Photoset #39', count: 28, locked: false },
  { id: '10', type: 'video', title: 'Video #37', duration: '10:12', locked: false },
  { id: '11', type: 'photo', title: 'Photoset #38', count: 20, locked: false },
  { id: '12', type: 'ppv', title: 'VIP Only', price: 19.99, locked: true },
]

type FilterType = 'all' | 'photo' | 'video' | 'ppv'

export default function ContentPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredContent = contentItems.filter(item => 
    filter === 'all' || item.type === filter
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-sm font-bold">Content Library</h1>
        <div className="flex items-center gap-4">
          <select 
            className="text-xs bg-transparent border border-border px-3 py-1.5"
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterType)}
          >
            <option value="all">All Content</option>
            <option value="photo">Photos</option>
            <option value="video">Videos</option>
            <option value="ppv">PPV</option>
          </select>
          <div className="flex border border-border">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-foreground text-background' : ''}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-foreground text-background' : ''}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredContent.map((item) => (
            <Link key={item.id} href={`/dashboard/content/${item.id}`}>
              <div className="border border-border hover:border-foreground/30 transition-colors">
                <div className="aspect-square bg-secondary flex items-center justify-center relative">
                  {item.locked ? (
                    <Lock className="h-6 w-6 text-muted-foreground" />
                  ) : item.type === 'video' ? (
                    <Play className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
                  )}
                  
                  <span className="absolute top-2 left-2 text-[9px] tracking-wider uppercase bg-background px-1.5 py-0.5">
                    {item.type}
                  </span>
                  
                  {item.type === 'video' && 'duration' in item && (
                    <span className="absolute bottom-2 right-2 text-[9px] bg-background px-1.5 py-0.5">
                      {item.duration}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold truncate">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {item.locked && 'price' in item ? `$${item.price}` : 
                     'count' in item ? `${item.count} photos` : 
                     'duration' in item ? item.duration : ''}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredContent.map((item) => (
            <Link key={item.id} href={`/dashboard/content/${item.id}`}>
              <div className="border border-border hover:border-foreground/30 transition-colors p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                    {item.locked ? (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    ) : item.type === 'video' ? (
                      <Play className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                    ) : (
                      <ImageIcon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs">
                    {item.locked && 'price' in item ? `$${item.price}` : 
                     'count' in item ? `${item.count} photos` : 
                     'duration' in item ? item.duration : ''}
                  </p>
                  {item.locked && (
                    <Button size="sm" className="mt-2 text-xs h-7">Unlock</Button>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
