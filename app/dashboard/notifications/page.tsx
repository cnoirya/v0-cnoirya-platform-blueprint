"use client"

import { useState } from "react"
import { Bell, Heart, MessageCircle, Video, DollarSign, Star, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  type: "like" | "comment" | "message" | "live" | "tip" | "content"
  title: string
  description: string
  time: string
  read: boolean
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", type: "live", title: "Going Live Soon", description: "CNOIRYA will be live in 30 minutes", time: "5m ago", read: false },
    { id: "2", type: "content", title: "New Content", description: "New exclusive photoset just dropped", time: "2h ago", read: false },
    { id: "3", type: "message", title: "New Message", description: "You have a new direct message", time: "4h ago", read: false },
    { id: "4", type: "tip", title: "Tip Received", description: "Thank you for your recent tip!", time: "1d ago", read: true },
    { id: "5", type: "content", title: "New Video", description: "Exclusive video content now available", time: "2d ago", read: true },
    { id: "6", type: "live", title: "Live Stream Replay", description: "Missed the stream? Watch the replay now", time: "3d ago", read: true },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like": return <Heart className="w-4 h-4" />
      case "comment": return <MessageCircle className="w-4 h-4" />
      case "message": return <MessageCircle className="w-4 h-4" />
      case "live": return <Video className="w-4 h-4" />
      case "tip": return <DollarSign className="w-4 h-4" />
      case "content": return <Star className="w-4 h-4" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-bold uppercase tracking-widest">Notifications</h1>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-black text-white text-xs">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={markAllRead}
              className="border-black text-xs uppercase tracking-widest"
              disabled={unreadCount === 0}
            >
              <Check className="w-3 h-3 mr-1" />
              Mark All Read
            </Button>
            <Button 
              variant="outline" 
              onClick={clearAll}
              className="border-neutral-300 text-xs uppercase tracking-widest"
              disabled={notifications.length === 0}
            >
              Clear All
            </Button>
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="border border-black p-12 text-center">
            <Bell className="w-8 h-8 mx-auto mb-4 text-neutral-300" />
            <p className="text-xs text-neutral-500">No notifications</p>
          </div>
        ) : (
          <div className="border border-black divide-y divide-neutral-200">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 flex items-start gap-4 ${
                  !notification.read ? "bg-neutral-50" : ""
                }`}
              >
                <div className={`w-10 h-10 border flex items-center justify-center shrink-0 ${
                  !notification.read ? "border-black" : "border-neutral-200"
                }`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`text-xs ${!notification.read ? "font-bold" : ""}`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {notification.description}
                      </p>
                    </div>
                    <span className="text-xs text-neutral-400 whitespace-nowrap">
                      {notification.time}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {!notification.read && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs text-neutral-500 hover:text-black"
                      >
                        Mark read
                      </button>
                    )}
                    <button 
                      onClick={() => deleteNotification(notification.id)}
                      className="text-xs text-neutral-400 hover:text-black"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notification Settings */}
        <div className="mt-8 border border-black p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4">Notification Preferences</h2>
          <div className="space-y-3">
            {[
              { label: "New Content", description: "When new content is posted" },
              { label: "Live Streams", description: "When a live stream starts" },
              { label: "Messages", description: "When you receive a message" },
              { label: "Promotions", description: "Sales and special offers" },
            ].map((pref, i) => (
              <label key={i} className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-xs font-bold">{pref.label}</p>
                  <p className="text-xs text-neutral-500">{pref.description}</p>
                </div>
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="w-4 h-4 border-black"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
