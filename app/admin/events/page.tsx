'use client'

import { useState } from 'react'
import { Calendar, Plus, Clock, Users, DollarSign, Edit2, Trash2, Video, Ticket, Play, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const events = [
  {
    id: 1,
    title: 'Exclusive Live Q&A',
    date: 'Apr 15, 2026',
    time: '8:00 PM EST',
    type: 'livestream',
    ticketPrice: null,
    tierRequired: 'Premium',
    spotsTotal: 500,
    spotsTaken: 342,
    revenue: '$0',
    status: 'scheduled',
  },
  {
    id: 2,
    title: 'Private Viewing Party',
    date: 'Apr 20, 2026',
    time: '9:00 PM EST',
    type: 'livestream',
    ticketPrice: '$19.99',
    tierRequired: null,
    spotsTotal: 200,
    spotsTaken: 156,
    revenue: '$3,118',
    status: 'scheduled',
  },
  {
    id: 3,
    title: 'VIP Meet & Greet',
    date: 'Apr 25, 2026',
    time: '7:00 PM EST',
    type: 'video_call',
    ticketPrice: '$99.99',
    tierRequired: 'VIP',
    spotsTotal: 20,
    spotsTaken: 18,
    revenue: '$1,799',
    status: 'scheduled',
  },
  {
    id: 4,
    title: 'March Q&A Session',
    date: 'Mar 15, 2026',
    time: '8:00 PM EST',
    type: 'livestream',
    ticketPrice: null,
    tierRequired: 'Basic',
    spotsTotal: null,
    spotsTaken: 423,
    revenue: '$0',
    status: 'completed',
  },
]

export default function AdminEventsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-sm font-bold tracking-tight flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              EVENT MANAGEMENT
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Create and manage ticketed events</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} className="text-xs h-8">
            <Plus className="h-3 w-3 mr-1" />
            Create Event
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="border border-border p-4">
            <p className="text-[10px] text-muted-foreground uppercase">Upcoming Events</p>
            <p className="text-lg font-bold mt-1">{events.filter(e => e.status === 'scheduled').length}</p>
          </div>
          <div className="border border-border p-4">
            <p className="text-[10px] text-muted-foreground uppercase">Total Registrations</p>
            <p className="text-lg font-bold mt-1">{events.reduce((acc, e) => acc + e.spotsTaken, 0)}</p>
          </div>
          <div className="border border-border p-4">
            <p className="text-[10px] text-muted-foreground uppercase">Ticket Revenue</p>
            <p className="text-lg font-bold mt-1">$4,917</p>
          </div>
          <div className="border border-border p-4">
            <p className="text-[10px] text-muted-foreground uppercase">Avg. Attendance</p>
            <p className="text-lg font-bold mt-1">85%</p>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className={`border p-4 ${event.status === 'completed' ? 'border-border opacity-60' : 'border-border'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xs font-medium">{event.title}</h3>
                    <span className={`text-[10px] px-1.5 py-0.5 ${
                      event.status === 'scheduled' ? 'bg-green-100 text-green-800' : 'bg-muted'
                    }`}>
                      {event.status.toUpperCase()}
                    </span>
                    {event.tierRequired && (
                      <span className="text-[10px] border border-border px-1.5 py-0.5">
                        {event.tierRequired}+
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Video className="h-3 w-3" />
                      {event.type === 'livestream' ? 'Livestream' : 'Video Call'}
                    </span>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-[10px] text-muted-foreground">Registrations</p>
                      <p className="text-xs font-medium">
                        {event.spotsTaken}{event.spotsTotal ? `/${event.spotsTotal}` : ''}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Ticket Price</p>
                      <p className="text-xs font-medium">{event.ticketPrice || 'Included'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Revenue</p>
                      <p className="text-xs font-medium">{event.revenue}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {event.status === 'scheduled' && (
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      <Play className="h-3 w-3 mr-1" />
                      Start
                    </Button>
                  )}
                  {event.status === 'completed' && (
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      <Eye className="h-3 w-3 mr-1" />
                      Recording
                    </Button>
                  )}
                  <button className="p-1.5 hover:bg-muted">
                    <Edit2 className="h-3 w-3" />
                  </button>
                  <button className="p-1.5 hover:bg-muted text-red-600">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Event Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background border border-border p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-sm font-bold mb-4">Create Event</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Event Title</label>
                  <Input placeholder="e.g., VIP Q&A Session" className="h-8 text-xs" />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Description</label>
                  <textarea 
                    placeholder="Describe the event..."
                    className="w-full h-20 text-xs border border-border p-2 bg-background resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Date</label>
                    <Input type="date" className="h-8 text-xs" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Time</label>
                    <Input type="time" className="h-8 text-xs" />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Event Type</label>
                  <div className="flex gap-2">
                    <button className="flex-1 p-3 border border-foreground text-xs">
                      <Video className="h-4 w-4 mx-auto mb-1" />
                      Livestream
                    </button>
                    <button className="flex-1 p-3 border border-border text-xs hover:border-foreground/50">
                      <Users className="h-4 w-4 mx-auto mb-1" />
                      Video Call
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Access</label>
                  <select className="w-full h-8 text-xs border border-border bg-background px-2">
                    <option>All Subscribers</option>
                    <option>Premium+</option>
                    <option>VIP+</option>
                    <option>Elite Only</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Ticket Price (optional)</label>
                    <Input type="number" placeholder="$0.00" className="h-8 text-xs" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Max Spots (optional)</label>
                    <Input type="number" placeholder="Unlimited" className="h-8 text-xs" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6">
                <Button variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1 text-xs h-8">
                  Cancel
                </Button>
                <Button className="flex-1 text-xs h-8">
                  Create Event
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
