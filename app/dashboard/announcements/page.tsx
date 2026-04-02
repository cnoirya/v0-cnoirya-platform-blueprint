'use client'

import { Megaphone, Clock, Pin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const announcements = [
  {
    id: 1,
    title: 'New Content Schedule',
    content: 'Starting next week, I\'ll be posting new content every Monday, Wednesday, and Friday. Premium members get early access 24 hours before public release.',
    date: 'Apr 1, 2026',
    isPinned: true,
    isNew: true,
  },
  {
    id: 2,
    title: 'VIP Live Stream This Weekend',
    content: 'Special VIP-only stream this Saturday at 8 PM EST. We\'ll be doing a Q&A and I have some exclusive announcements to share. Mark your calendars!',
    date: 'Mar 28, 2026',
    isPinned: true,
    isNew: true,
  },
  {
    id: 3,
    title: 'Custom Orders Temporarily Closed',
    content: 'Due to high demand, custom orders are temporarily closed until April 15th. All existing orders will be completed on schedule. Thank you for your patience!',
    date: 'Mar 25, 2026',
    isPinned: false,
    isNew: false,
  },
  {
    id: 4,
    title: 'New Merchandise Drop',
    content: 'Excited to announce the spring collection is now available in the shop! Limited quantities available. Signed items selling fast.',
    date: 'Mar 20, 2026',
    isPinned: false,
    isNew: false,
  },
  {
    id: 5,
    title: 'Platform Update',
    content: 'We\'ve added new features including voice messages, improved video quality, and faster loading times. Let me know if you experience any issues!',
    date: 'Mar 15, 2026',
    isPinned: false,
    isNew: false,
  },
  {
    id: 6,
    title: 'Thank You for 5K Subscribers!',
    content: 'We did it! Thank you all so much for the incredible support. As a thank you, all subscribers will receive a free exclusive photo set this week.',
    date: 'Mar 10, 2026',
    isPinned: false,
    isNew: false,
  },
]

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-sm font-bold tracking-tight flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              ANNOUNCEMENTS
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Important updates and news</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="text-xs h-7">
              Back to Feed
            </Button>
          </Link>
        </div>

        {/* Pinned Announcements */}
        {announcements.filter(a => a.isPinned).length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-medium text-muted-foreground mb-4 flex items-center gap-2">
              <Pin className="h-3 w-3" />
              PINNED
            </h2>
            <div className="space-y-3">
              {announcements.filter(a => a.isPinned).map((announcement) => (
                <div key={announcement.id} className="border-2 border-foreground p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-medium">{announcement.title}</h3>
                      {announcement.isNew && (
                        <span className="text-[10px] bg-foreground text-background px-1.5 py-0.5">NEW</span>
                      )}
                    </div>
                    <Pin className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {announcement.content}
                  </p>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    {announcement.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Announcements */}
        <div>
          <h2 className="text-xs font-medium text-muted-foreground mb-4">ALL ANNOUNCEMENTS</h2>
          <div className="space-y-3">
            {announcements.filter(a => !a.isPinned).map((announcement) => (
              <div key={announcement.id} className="border border-border p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xs font-medium">{announcement.title}</h3>
                  <span className="text-[10px] text-muted-foreground">{announcement.date}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {announcement.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
