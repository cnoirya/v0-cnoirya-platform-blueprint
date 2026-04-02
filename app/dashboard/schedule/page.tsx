"use client"

import { useState } from "react"
import { Calendar, Video, Phone, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScheduledItem {
  id: string
  type: "live" | "video_call" | "audio_call"
  title: string
  date: string
  time: string
  duration?: number
  status: "upcoming" | "confirmed" | "past"
}

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3, 1)) // April 2026

  const schedule: ScheduledItem[] = [
    { id: "1", type: "live", title: "Weekly Live Stream", date: "2026-04-03", time: "8:00 PM EST", status: "upcoming" },
    { id: "2", type: "video_call", title: "Private Video Call", date: "2026-04-05", time: "3:00 PM EST", duration: 30, status: "confirmed" },
    { id: "3", type: "live", title: "Q&A Session", date: "2026-04-07", time: "7:00 PM EST", status: "upcoming" },
    { id: "4", type: "audio_call", title: "Audio Call", date: "2026-04-10", time: "6:00 PM EST", duration: 15, status: "confirmed" },
  ]

  const getIcon = (type: ScheduledItem["type"]) => {
    switch (type) {
      case "live": return <Video className="w-4 h-4" />
      case "video_call": return <Video className="w-4 h-4" />
      case "audio_call": return <Phone className="w-4 h-4" />
    }
  }

  const getTypeLabel = (type: ScheduledItem["type"]) => {
    switch (type) {
      case "live": return "Live Stream"
      case "video_call": return "Video Call"
      case "audio_call": return "Audio Call"
    }
  }

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: (number | null)[] = []
    
    // Add empty days for padding
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }
    
    // Add actual days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i)
    }
    
    return days
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const hasEvent = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return schedule.some(s => s.date === dateStr)
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-sm font-bold uppercase tracking-widest mb-8">Schedule</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="border border-black">
            <div className="border-b border-black p-4 flex items-center justify-between">
              <button onClick={prevMonth} className="p-1 hover:bg-neutral-100">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold uppercase tracking-widest">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <button onClick={nextMonth} className="p-1 hover:bg-neutral-100">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <div key={i} className="text-center text-xs text-neutral-500 py-2">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, i) => (
                  <div key={i} className="aspect-square">
                    {day && (
                      <button
                        onClick={() => setSelectedDate(`${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`)}
                        className={`w-full h-full flex items-center justify-center text-xs relative ${
                          hasEvent(day) 
                            ? "bg-black text-white" 
                            : "hover:bg-neutral-100"
                        }`}
                      >
                        {day}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="border border-black">
            <div className="border-b border-black p-4">
              <h2 className="text-xs font-bold uppercase tracking-widest">Upcoming</h2>
            </div>
            {schedule.filter(s => s.status !== "past").length === 0 ? (
              <div className="p-12 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-4 text-neutral-300" />
                <p className="text-xs text-neutral-500">No upcoming events</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-200">
                {schedule.filter(s => s.status !== "past").map(item => (
                  <div key={item.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 border flex items-center justify-center shrink-0 ${
                        item.type === "live" ? "border-black" : "border-neutral-300"
                      }`}>
                        {getIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs font-bold">{item.title}</p>
                            <p className="text-xs text-neutral-500">{getTypeLabel(item.type)}</p>
                          </div>
                          <span className={`px-2 py-0.5 text-xs ${
                            item.status === "confirmed" 
                              ? "bg-black text-white" 
                              : "border border-neutral-300"
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.time}
                          </span>
                          {item.duration && (
                            <span>{item.duration} min</span>
                          )}
                        </div>
                        {item.type !== "live" && item.status === "confirmed" && (
                          <Button className="mt-3 bg-black text-white text-xs uppercase tracking-widest w-full">
                            Join Call
                          </Button>
                        )}
                        {item.type === "live" && (
                          <Button variant="outline" className="mt-3 border-black text-xs uppercase tracking-widest w-full">
                            Set Reminder
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Schedule a Call */}
        <div className="mt-6 border border-black p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4">Request a Private Call</h2>
          <p className="text-xs text-neutral-600 mb-4">
            Book a private video or audio call. Available slots are shown on the calendar.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-black text-xs uppercase tracking-widest">
              <Video className="w-4 h-4 mr-2" />
              Book Video Call - $5.99/min
            </Button>
            <Button variant="outline" className="border-black text-xs uppercase tracking-widest">
              <Phone className="w-4 h-4 mr-2" />
              Book Audio Call - $3.99/min
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
