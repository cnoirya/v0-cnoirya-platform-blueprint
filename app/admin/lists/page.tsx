'use client'

import { useState } from 'react'
import { Users, Plus, Search, Edit2, Trash2, Download, Mail, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const lists = [
  {
    id: 1,
    name: 'High Spenders',
    description: 'Subscribers with $500+ lifetime spend',
    memberCount: 234,
    type: 'dynamic',
    criteria: 'spend >= 500',
    createdAt: 'Jan 15, 2026',
  },
  {
    id: 2,
    name: 'VIP Tier',
    description: 'All VIP subscription members',
    memberCount: 389,
    type: 'dynamic',
    criteria: 'tier = VIP',
    createdAt: 'Feb 1, 2026',
  },
  {
    id: 3,
    name: 'Engaged Fans',
    description: 'High engagement users (10+ interactions/week)',
    memberCount: 567,
    type: 'dynamic',
    criteria: 'weekly_interactions >= 10',
    createdAt: 'Feb 10, 2026',
  },
  {
    id: 4,
    name: 'New This Month',
    description: 'Subscribers who joined this month',
    memberCount: 178,
    type: 'dynamic',
    criteria: 'join_date >= month_start',
    createdAt: 'Mar 1, 2026',
  },
  {
    id: 5,
    name: 'Favorites',
    description: 'Hand-picked favorite subscribers',
    memberCount: 47,
    type: 'static',
    criteria: 'manual',
    createdAt: 'Dec 20, 2025',
  },
  {
    id: 6,
    name: 'At Risk',
    description: 'Subscribers with declining engagement',
    memberCount: 89,
    type: 'dynamic',
    criteria: 'engagement_trend = declining',
    createdAt: 'Feb 28, 2026',
  },
]

export default function ListsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-sm font-bold tracking-tight">SUBSCRIBER LISTS</h1>
            <p className="text-xs text-muted-foreground mt-1">Organize and segment your audience</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} className="text-xs h-8">
            <Plus className="h-3 w-3 mr-1" />
            Create List
          </Button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="Search lists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Filter className="h-3 w-3 mr-1" />
            Filter
          </Button>
        </div>

        {/* Lists Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {lists.map((list) => (
            <div key={list.id} className="border border-border p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-medium">{list.name}</h3>
                    <span className={`text-[10px] px-1.5 py-0.5 border border-border ${
                      list.type === 'dynamic' ? 'bg-muted' : ''
                    }`}>
                      {list.type}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{list.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 hover:bg-muted">
                    <Edit2 className="h-3 w-3" />
                  </button>
                  <button className="p-1.5 hover:bg-muted text-red-600">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[10px] text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {list.memberCount.toLocaleString()} members
                </span>
                <span>Created {list.createdAt}</span>
              </div>

              {list.type === 'dynamic' && (
                <div className="text-[10px] bg-muted p-2 mb-3 font-mono">
                  {list.criteria}
                </div>
              )}

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-[10px] h-7">
                  <Mail className="h-3 w-3 mr-1" />
                  Message All
                </Button>
                <Button variant="outline" size="sm" className="text-[10px] h-7">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Create List Modal Placeholder */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background border border-border p-6 w-full max-w-md">
              <h2 className="text-sm font-bold mb-4">Create New List</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">List Name</label>
                  <Input placeholder="e.g., Top Supporters" className="h-8 text-xs" />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Description</label>
                  <Input placeholder="Describe this list..." className="h-8 text-xs" />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">List Type</label>
                  <div className="flex gap-2">
                    <button className="flex-1 p-3 border border-foreground text-xs">
                      <p className="font-medium">Dynamic</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Auto-updates based on criteria</p>
                    </button>
                    <button className="flex-1 p-3 border border-border text-xs hover:border-foreground/50">
                      <p className="font-medium">Static</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Manually managed members</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Filter Criteria</label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <select className="flex-1 h-8 text-xs border border-border bg-background px-2">
                        <option>Subscription Tier</option>
                        <option>Lifetime Spend</option>
                        <option>Join Date</option>
                        <option>Engagement Score</option>
                        <option>Last Active</option>
                      </select>
                      <select className="w-24 h-8 text-xs border border-border bg-background px-2">
                        <option>=</option>
                        <option>&gt;=</option>
                        <option>&lt;=</option>
                        <option>contains</option>
                      </select>
                      <Input placeholder="Value" className="w-24 h-8 text-xs" />
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs h-7">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Condition
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6">
                <Button variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1 text-xs h-8">
                  Cancel
                </Button>
                <Button className="flex-1 text-xs h-8">
                  Create List
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
