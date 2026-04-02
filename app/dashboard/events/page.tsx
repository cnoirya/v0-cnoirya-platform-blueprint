"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users, Ticket, Video, Lock, ChevronRight, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const events = [
  {
    id: 1,
    title: "Exclusive Live Q&A Session",
    description: "Ask me anything - personal questions, content requests, life updates",
    date: "April 15, 2026",
    time: "8:00 PM EST",
    type: "live",
    access: "all",
    attendees: 234,
    maxCapacity: 500,
    status: "upcoming",
    rsvp: false,
  },
  {
    id: 2,
    title: "VIP Meet & Greet Video Call",
    description: "Small group video call with top supporters",
    date: "April 20, 2026",
    time: "7:00 PM EST",
    type: "video",
    access: "platinum",
    attendees: 12,
    maxCapacity: 20,
    status: "upcoming",
    rsvp: true,
  },
  {
    id: 3,
    title: "Behind the Scenes Photoshoot Stream",
    description: "Watch the entire photoshoot process live",
    date: "April 25, 2026",
    time: "3:00 PM EST",
    type: "live",
    access: "ticket",
    ticketPrice: 25,
    attendees: 89,
    maxCapacity: 200,
    status: "upcoming",
    rsvp: false,
  },
  {
    id: 4,
    title: "Monthly Subscriber Appreciation",
    description: "Special content reveal and giveaways",
    date: "April 30, 2026",
    time: "9:00 PM EST",
    type: "live",
    access: "gold",
    attendees: 156,
    maxCapacity: 300,
    status: "upcoming",
    rsvp: true,
  },
]

const pastEvents = [
  {
    id: 1,
    title: "March Q&A Session",
    date: "March 15, 2026",
    type: "live",
    attendees: 412,
    recorded: true,
  },
  {
    id: 2,
    title: "Cosplay Reveal Stream",
    date: "March 8, 2026",
    type: "live",
    attendees: 567,
    recorded: true,
  },
]

export default function EventsPage() {
  const [filter, setFilter] = useState<"all" | "rsvp">("all")

  const filteredEvents = filter === "rsvp" ? events.filter((e) => e.rsvp) : events

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-sm font-bold tracking-tight">EVENTS</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Upcoming live events and ticketed sessions
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "outline" : "ghost"}
              size="sm"
              onClick={() => setFilter("all")}
              className="text-xs h-7"
            >
              All Events
            </Button>
            <Button
              variant={filter === "rsvp" ? "outline" : "ghost"}
              size="sm"
              onClick={() => setFilter("rsvp")}
              className="text-xs h-7"
            >
              My RSVPs
            </Button>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="border p-4 hover:border-foreground transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 uppercase tracking-wider ${
                        event.type === "live"
                          ? "bg-foreground text-background"
                          : "border"
                      }`}
                    >
                      {event.type}
                    </span>
                    {event.access !== "all" && (
                      <span className="text-[10px] px-1.5 py-0.5 border uppercase tracking-wider">
                        {event.access === "ticket"
                          ? `$${event.ticketPrice} Ticket`
                          : event.access}
                      </span>
                    )}
                    {event.rsvp && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-muted">
                        RSVP&apos;d
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-medium">{event.title}</h3>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {event.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {event.attendees}/{event.maxCapacity}
                </span>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-dashed">
                <div className="h-1 flex-1 bg-muted mr-4 overflow-hidden">
                  <div
                    className="h-full bg-foreground"
                    style={{
                      width: `${(event.attendees / event.maxCapacity) * 100}%`,
                    }}
                  />
                </div>
                {event.rsvp ? (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-xs h-7">
                      <Bell className="h-3 w-3 mr-1" />
                      Remind Me
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      Add to Calendar
                    </Button>
                  </div>
                ) : event.access === "ticket" ? (
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    <Ticket className="h-3 w-3 mr-1" />
                    Buy Ticket ${event.ticketPrice}
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    RSVP Now
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Past Events */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xs font-bold mb-4">PAST EVENTS</h2>
          <div className="space-y-2">
            {pastEvents.map((event) => (
              <Link
                key={event.id}
                href={`/dashboard/events/${event.id}`}
                className="flex items-center justify-between py-3 border-b border-dashed hover:bg-muted/50 px-2 -mx-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Video className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs font-medium">{event.title}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {event.date} - {event.attendees} attended
                    </div>
                  </div>
                </div>
                {event.recorded && (
                  <span className="text-[10px] px-1.5 py-0.5 border">
                    Watch Recording
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Calendar View Link */}
        <div className="mt-6 border border-dashed p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-medium">Full Calendar View</h3>
              <p className="text-[10px] text-muted-foreground mt-1">
                See all scheduled content, streams, and events
              </p>
            </div>
            <Link href="/dashboard/schedule">
              <Button variant="outline" size="sm" className="text-xs">
                Open Calendar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
