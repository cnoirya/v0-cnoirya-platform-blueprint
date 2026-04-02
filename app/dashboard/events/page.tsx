'use client'

import { useState } from 'react'
import { Calendar, Clock, Users, Ticket, MapPin, Video, Lock, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const upcomingEvents = [
  {
    id: 1,
    title: 'Exclusive Live Q&A',
    description: 'Ask me anything session - subscribers only',
    date: 'Apr 15, 2026',
    time: '8:00 PM EST',
    type: 'livestream',
    ticketPrice: null,
    tierRequired: 'Premium',
    spotsTotal: 500,
    spotsTaken: 342,
    hasTicket: true,
  },
  {
    id: 2,
    title: 'Private Viewing Party',
    description: 'Watch party for new content release',
    date: 'Apr 20, 2026',
    time: '9:00 PM EST',
    type: 'livestream',
    ticketPrice: '$19.99',
    tierRequired: null,
    spotsTotal: 200,
    spotsTaken: 156,
    hasTicket: false,
  },
  {
    id: 3,
    title: 'VIP Meet & Greet',
    description: 'Virtual meet and greet with video call',
    date: 'Apr 25, 2026',
    time: '7:00 PM EST',
    type: 'video_call',
    ticketPrice: '$99.99',
    tierRequired: 'VIP',
    spotsTotal: 20,
    spotsTaken: 18,
    hasTicket: false,
  },
  {
    id: 4,
    title: 'Behind the Scenes Stream',
    description: 'Live photoshoot session',
    date: 'May 1, 2026',
    time: '3:00 PM EST',
    type: 'livestream',
    ticketPrice: null,
    tierRequired: 'Basic',
    spotsTotal: null,
    spotsTaken: null,
    hasTicket: true,
  },
]

const pastEvents = [
  {
    id: 101,
    title: 'March Q&A Session',
    date: 'Mar 15, 2026',
    attendees: 423,
    hasRecording: true,
  },
  {
    id: 102,
    title: 'Birthday Stream',
    date: 'Mar 1, 2026',
    attendees: 892,
    hasRecording: true,
  },
]

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-sm font-bold tracking-tight flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              EVENTS
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Live events and ticketed experiences</p>
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
            onClick={() => setActiveTab('upcoming')}
            className={`pb-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'upcoming' ? 'border-foreground' : 'border-transparent text-muted-foreground'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`pb-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'past' ? 'border-foreground' : 'border-transparent text-muted-foreground'
            }`}
          >
            Past Events
          </button>
        </div>

        {activeTab === 'upcoming' ? (
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border border-border p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-medium">{event.title}</h3>
                      {event.tierRequired && (
                        <span className="text-[10px] border border-border px-1.5 py-0.5">
                          {event.tierRequired}+
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{event.description}</p>
                  </div>
                  {event.hasTicket && (
                    <span className="text-[10px] bg-foreground text-background px-2 py-0.5 flex items-center gap-1">
                      <Check className="h-2.5 w-2.5" />
                      REGISTERED
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-[10px] text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    {event.type === 'livestream' ? (
                      <Video className="h-3 w-3" />
                    ) : (
                      <Video className="h-3 w-3" />
                    )}
                    {event.type === 'livestream' ? 'Livestream' : 'Video Call'}
                  </span>
                  {event.spotsTotal && (
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.spotsTaken}/{event.spotsTotal} spots
                    </span>
                  )}
                </div>

                {event.spotsTotal && (
                  <div className="mb-4">
                    <div className="h-1 bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-foreground"
                        style={{ width: `${(event.spotsTaken / event.spotsTotal) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {event.hasTicket ? (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="flex-1 text-xs h-8">
                      Add to Calendar
                    </Button>
                    <Button variant="outline" className="text-xs h-8">
                      View Ticket
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">
                      {event.ticketPrice ? event.ticketPrice : 'Included with subscription'}
                    </span>
                    <Button className="text-xs h-8">
                      {event.ticketPrice ? 'Buy Ticket' : 'Register'}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {pastEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border border-border">
                <div>
                  <h3 className="text-xs font-medium">{event.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                    <span>{event.date}</span>
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
                {event.hasRecording && (
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    Watch Recording
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
