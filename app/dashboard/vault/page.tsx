'use client'

import { useState } from 'react'
import { Folder, Image as ImageIcon, Video, FileText, Download, Search, Grid, List, Calendar, SortAsc, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const folders = [
  { id: 1, name: 'Purchased Photos', count: 47, size: '234 MB' },
  { id: 2, name: 'Purchased Videos', count: 12, size: '1.2 GB' },
  { id: 3, name: 'Custom Orders', count: 3, size: '456 MB' },
  { id: 4, name: 'PPV Unlocks', count: 28, size: '892 MB' },
  { id: 5, name: 'Message Media', count: 156, size: '2.1 GB' },
]

const recentItems = [
  { id: 1, name: 'exclusive_set_042.jpg', type: 'image', folder: 'Purchased Photos', date: '2 hours ago', size: '4.2 MB' },
  { id: 2, name: 'bts_video_march.mp4', type: 'video', folder: 'Purchased Videos', date: '1 day ago', size: '128 MB' },
  { id: 3, name: 'custom_request_final.mp4', type: 'video', folder: 'Custom Orders', date: '3 days ago', size: '256 MB' },
  { id: 4, name: 'ppv_special_012.jpg', type: 'image', folder: 'PPV Unlocks', date: '5 days ago', size: '3.8 MB' },
  { id: 5, name: 'voice_message_001.mp3', type: 'audio', folder: 'Message Media', date: '1 week ago', size: '1.2 MB' },
]

export default function VaultPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-sm font-bold tracking-tight">MY VAULT</h1>
            <p className="text-xs text-muted-foreground mt-1">All your purchased content</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="text-xs h-7">
              Back to Feed
            </Button>
          </Link>
        </div>

        {/* Storage Overview */}
        <div className="border border-border p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium">Storage Used</span>
            <span className="text-xs text-muted-foreground">4.9 GB / Unlimited</span>
          </div>
          <div className="h-1 bg-muted overflow-hidden">
            <div className="h-full bg-foreground" style={{ width: '15%' }} />
          </div>
          <div className="flex items-center justify-between mt-3 text-[10px] text-muted-foreground">
            <span>246 items</span>
            <Button variant="ghost" size="sm" className="h-6 text-[10px]">
              <Download className="h-3 w-3 mr-1" />
              Export All
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>
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
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <SortAsc className="h-3 w-3 mr-1" />
            Sort
          </Button>
        </div>

        {/* Folders */}
        <div className="mb-8">
          <h2 className="text-xs font-medium text-muted-foreground mb-4">FOLDERS</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(selectedFolder === folder.id ? null : folder.id)}
                className={`p-4 border text-left transition-colors ${
                  selectedFolder === folder.id
                    ? 'border-foreground bg-muted'
                    : 'border-border hover:border-foreground/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Folder className="h-4 w-4" />
                  <span className="text-xs font-medium">{folder.name}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{folder.count} items</span>
                  <span>{folder.size}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Items */}
        <div>
          <h2 className="text-xs font-medium text-muted-foreground mb-4 flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            RECENT FILES
          </h2>
          
          {viewMode === 'list' ? (
            <div className="border border-border divide-y divide-border">
              {recentItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted flex items-center justify-center">
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <p className="text-xs font-medium">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">{item.folder}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] text-muted-foreground">{item.date}</p>
                      <p className="text-[10px] text-muted-foreground">{item.size}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {recentItems.map((item) => (
                <div key={item.id} className="border border-border p-3 hover:border-foreground/50">
                  <div className="aspect-square bg-muted flex items-center justify-center mb-2">
                    {getTypeIcon(item.type)}
                  </div>
                  <p className="text-[10px] font-medium truncate">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground">{item.size}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DRM Notice */}
        <div className="mt-8 p-4 border border-border bg-muted/30">
          <div className="flex items-start gap-3">
            <Lock className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs font-medium">Content Protection</p>
              <p className="text-[10px] text-muted-foreground mt-1">
                All content is protected with DRM and watermarked. Unauthorized distribution 
                is prohibited and may result in account termination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
