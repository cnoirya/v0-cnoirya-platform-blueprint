'use client'

import { useState } from 'react'
import { Plus, MoreHorizontal, Eye, Heart, DollarSign, Trash, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const contentItems = [
  { id: '1', title: 'Photoset #42', type: 'Photo', status: 'Published', views: 12847, earnings: '$847', date: 'Apr 1' },
  { id: '2', title: 'Full Video #41', type: 'Video', status: 'Published', views: 8432, earnings: '$621', date: 'Mar 28' },
  { id: '3', title: 'PPV Special', type: 'PPV', status: 'Published', views: 3421, earnings: '$4,210', date: 'Mar 25' },
  { id: '4', title: 'Draft Photoset', type: 'Photo', status: 'Draft', views: 0, earnings: '-', date: 'Mar 24' },
  { id: '5', title: 'BTS Video', type: 'Video', status: 'Published', views: 6721, earnings: '$512', date: 'Mar 22' },
  { id: '6', title: 'Scheduled Post', type: 'Photo', status: 'Scheduled', views: 0, earnings: '-', date: 'Apr 5' },
]

type FilterStatus = 'all' | 'published' | 'draft' | 'scheduled'

export default function AdminContentPage() {
  const [filter, setFilter] = useState<FilterStatus>('all')

  const filteredContent = contentItems.filter(item => 
    filter === 'all' || item.status.toLowerCase() === filter
  )

  return (
    <div className="p-6 pb-24 lg:pb-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-sm font-bold">Content Manager</h1>
          <Button size="sm" className="text-xs">
            <Plus className="h-3 w-3 mr-2" />
            New Post
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
          {(['all', 'published', 'draft', 'scheduled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`text-xs px-3 py-1.5 transition-colors ${
                filter === status 
                  ? 'bg-foreground text-background' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Content table */}
        <div className="border border-border">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 border-b border-border text-[10px] text-muted-foreground uppercase tracking-wider">
            <div className="col-span-4">Content</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Views</div>
            <div className="col-span-1">Earnings</div>
            <div className="col-span-1"></div>
          </div>

          {/* Rows */}
          {filteredContent.map((item) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 py-4 border-b border-border last:border-b-0">
              <div className="md:col-span-4">
                <p className="text-xs font-bold">{item.title}</p>
                <p className="text-[10px] text-muted-foreground md:hidden">{item.date}</p>
              </div>
              <div className="md:col-span-2 flex items-center">
                <span className="text-xs text-muted-foreground">{item.type}</span>
              </div>
              <div className="md:col-span-2 flex items-center">
                <span className={`text-[10px] px-2 py-0.5 ${
                  item.status === 'Published' ? 'bg-foreground text-background' :
                  item.status === 'Draft' ? 'bg-secondary text-foreground' :
                  'bg-secondary text-muted-foreground'
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="md:col-span-2 flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="h-3 w-3" />
                {item.views.toLocaleString()}
              </div>
              <div className="md:col-span-1 flex items-center text-xs font-bold">
                {item.earnings}
              </div>
              <div className="md:col-span-1 flex items-center justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-xs">
                      <Edit className="h-3 w-3 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs">
                      <Eye className="h-3 w-3 mr-2" />
                      View Stats
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs text-destructive">
                      <Trash className="h-3 w-3 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
