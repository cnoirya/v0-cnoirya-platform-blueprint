"use client"

import { useState } from "react"
import { Phone, Video, Clock, DollarSign, Calendar, Check, X, PhoneIncoming, PhoneOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ScheduledCall {
  id: string
  user: string
  type: "video" | "audio"
  scheduledAt: string
  duration: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  rate: number
}

interface CallHistory {
  id: string
  user: string
  type: "video" | "audio"
  date: string
  duration: string
  earnings: number
}

export default function AdminCallsPage() {
  const [videoRate, setVideoRate] = useState("5.99")
  const [audioRate, setAudioRate] = useState("3.99")
  const [availability, setAvailability] = useState({
    mon: true,
    tue: true,
    wed: false,
    thu: true,
    fri: true,
    sat: false,
    sun: false
  })
  const [showIncoming, setShowIncoming] = useState(false)

  const scheduledCalls: ScheduledCall[] = [
    { id: "1", user: "User_A1B2", type: "video", scheduledAt: "Apr 3, 2026 3:00 PM", duration: 30, status: "confirmed", rate: 5.99 },
    { id: "2", user: "User_C3D4", type: "audio", scheduledAt: "Apr 4, 2026 7:00 PM", duration: 15, status: "pending", rate: 3.99 },
    { id: "3", user: "User_E5F6", type: "video", scheduledAt: "Apr 5, 2026 2:00 PM", duration: 60, status: "confirmed", rate: 5.99 },
  ]

  const callHistory: CallHistory[] = [
    { id: "1", user: "User_G7H8", type: "video", date: "Mar 30, 2026", duration: "45:22", earnings: 271.85 },
    { id: "2", user: "User_A1B2", type: "audio", date: "Mar 29, 2026", duration: "18:45", earnings: 74.81 },
    { id: "3", user: "User_I9J0", type: "video", date: "Mar 28, 2026", duration: "12:34", earnings: 75.17 },
    { id: "4", user: "User_K1L2", type: "audio", date: "Mar 27, 2026", duration: "32:10", earnings: 128.27 },
    { id: "5", user: "User_M3N4", type: "video", date: "Mar 26, 2026", duration: "8:55", earnings: 53.41 },
  ]

  const totalEarnings = callHistory.reduce((sum, c) => sum + c.earnings, 0)
  const totalMinutes = callHistory.reduce((sum, c) => {
    const [mins, secs] = c.duration.split(":").map(Number)
    return sum + mins + secs / 60
  }, 0)

  const days = [
    { key: "mon", label: "M" },
    { key: "tue", label: "T" },
    { key: "wed", label: "W" },
    { key: "thu", label: "T" },
    { key: "fri", label: "F" },
    { key: "sat", label: "S" },
    { key: "sun", label: "S" },
  ]

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-sm font-bold uppercase tracking-widest">Call Management</h1>
          <Button 
            onClick={() => setShowIncoming(true)}
            className="bg-black text-white text-xs uppercase tracking-widest"
          >
            <PhoneIncoming className="w-4 h-4 mr-2" />
            Simulate Incoming
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">This Month</p>
            <p className="text-2xl font-bold font-mono mt-1">${totalEarnings.toFixed(2)}</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Total Minutes</p>
            <p className="text-2xl font-bold font-mono mt-1">{Math.round(totalMinutes)}</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Avg/Call</p>
            <p className="text-2xl font-bold font-mono mt-1">${(totalEarnings / callHistory.length).toFixed(2)}</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Pending</p>
            <p className="text-2xl font-bold font-mono mt-1">{scheduledCalls.filter(c => c.status === "pending").length}</p>
          </div>
        </div>

        {/* Rates & Availability */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Rates */}
          <div className="border border-black p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4">Call Rates</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                  Video Call (per minute)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                  <Input
                    type="number"
                    value={videoRate}
                    onChange={(e) => setVideoRate(e.target.value)}
                    className="pl-7 border-black"
                    step="0.01"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                  Audio Call (per minute)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                  <Input
                    type="number"
                    value={audioRate}
                    onChange={(e) => setAudioRate(e.target.value)}
                    className="pl-7 border-black"
                    step="0.01"
                  />
                </div>
              </div>
              <Button className="w-full bg-black text-white text-xs uppercase tracking-widest">
                Update Rates
              </Button>
            </div>
          </div>

          {/* Availability */}
          <div className="border border-black p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4">Availability</h2>
            <div className="flex gap-2 mb-4">
              {days.map(day => (
                <button
                  key={day.key}
                  onClick={() => setAvailability(prev => ({ ...prev, [day.key]: !prev[day.key as keyof typeof prev] }))}
                  className={`w-10 h-10 flex items-center justify-center text-xs font-bold ${
                    availability[day.key as keyof typeof availability]
                      ? "bg-black text-white"
                      : "border border-neutral-300"
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
            <div className="space-y-2 text-xs text-neutral-500">
              <p>Available hours: 12:00 PM - 10:00 PM EST</p>
              <p>Max session: 60 minutes</p>
            </div>
            <Button variant="outline" className="w-full mt-4 border-black text-xs uppercase tracking-widest">
              Edit Hours
            </Button>
          </div>
        </div>

        {/* Scheduled Calls */}
        <div className="border border-black mb-8">
          <div className="border-b border-black p-4">
            <h2 className="text-xs font-bold uppercase tracking-widest">Upcoming Calls</h2>
          </div>
          <div className="divide-y divide-neutral-200">
            {scheduledCalls.map(call => (
              <div key={call.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 border flex items-center justify-center ${
                    call.type === "video" ? "border-black" : "border-neutral-300"
                  }`}>
                    {call.type === "video" ? <Video className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold">{call.user}</p>
                    <p className="text-xs text-neutral-500">{call.scheduledAt} • {call.duration} min</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-xs ${
                    call.status === "confirmed" ? "bg-black text-white" : "border border-neutral-300"
                  }`}>
                    {call.status}
                  </span>
                  {call.status === "pending" && (
                    <div className="flex gap-1">
                      <button className="w-8 h-8 border border-black flex items-center justify-center hover:bg-black hover:text-white">
                        <Check className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 border border-neutral-300 flex items-center justify-center hover:bg-neutral-100">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {call.status === "confirmed" && (
                    <Button className="bg-black text-white text-xs uppercase tracking-widest">
                      Start Call
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call History */}
        <div className="border border-black">
          <div className="border-b border-black p-4">
            <h2 className="text-xs font-bold uppercase tracking-widest">Call History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-neutral-200">
                <tr>
                  <th className="text-left text-xs font-bold uppercase tracking-widest p-4">User</th>
                  <th className="text-left text-xs font-bold uppercase tracking-widest p-4">Type</th>
                  <th className="text-left text-xs font-bold uppercase tracking-widest p-4">Date</th>
                  <th className="text-left text-xs font-bold uppercase tracking-widest p-4">Duration</th>
                  <th className="text-right text-xs font-bold uppercase tracking-widest p-4">Earnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {callHistory.map(call => (
                  <tr key={call.id}>
                    <td className="p-4 text-xs font-mono">{call.user}</td>
                    <td className="p-4 text-xs capitalize">{call.type}</td>
                    <td className="p-4 text-xs text-neutral-500">{call.date}</td>
                    <td className="p-4 text-xs font-mono">{call.duration}</td>
                    <td className="p-4 text-xs font-mono text-right">${call.earnings.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Incoming Call Modal */}
        {showIncoming && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div className="text-center text-white">
              <div className="w-24 h-24 border-2 border-white mx-auto mb-6 flex items-center justify-center animate-pulse">
                <span className="text-3xl font-bold">U</span>
              </div>
              <p className="text-sm font-bold mb-1">User_A1B2</p>
              <p className="text-xs text-neutral-400 mb-8">Incoming Video Call</p>
              <div className="flex items-center justify-center gap-4">
                <button 
                  onClick={() => setShowIncoming(false)}
                  className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <PhoneOff className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setShowIncoming(false)}
                  className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center"
                >
                  <Phone className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
