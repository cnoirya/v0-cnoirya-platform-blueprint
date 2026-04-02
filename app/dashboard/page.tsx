import { FeedItem } from '@/components/dashboard/feed-item'
import { CreatorCard } from '@/components/dashboard/creator-card'

const feedItems = [
  {
    id: '1',
    type: 'photo' as const,
    thumbnail: null,
    title: 'New visual series released',
    description: 'Behind the veil. 24 frames from the latest artistic session.',
    likes: 847,
    comments: 52,
    timestamp: '2 hours ago',
    isLocked: false
  },
  {
    id: '2',
    type: 'video' as const,
    thumbnail: null,
    title: 'Full transmission unlocked',
    description: 'The complete 12 minute visual journey.',
    likes: 1243,
    comments: 98,
    timestamp: '1 day ago',
    isLocked: false,
    duration: '12:34'
  },
  {
    id: '3',
    type: 'ppv' as const,
    thumbnail: null,
    title: 'Vault Access',
    description: 'Unlock this rare archive. Chosen and Inner Circle only.',
    likes: 432,
    comments: 21,
    timestamp: '3 days ago',
    isLocked: true,
    price: 9.99
  },
  {
    id: '4',
    type: 'photo' as const,
    thumbnail: null,
    title: 'Weekly release',
    description: 'New frames from this week. Natural light series.',
    likes: 621,
    comments: 34,
    timestamp: '5 days ago',
    isLocked: false
  }
]

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 pb-24 md:pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-bold">Feed</h1>
            <select className="text-xs bg-transparent border border-border px-3 py-1.5">
              <option>All Content</option>
              <option>Photos</option>
              <option>Videos</option>
              <option>PPV</option>
            </select>
          </div>
          
          <div className="space-y-6">
            {feedItems.map((item) => (
              <FeedItem key={item.id} {...item} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <CreatorCard />
          
          <div className="border border-border p-4">
            <h3 className="text-xs font-bold mb-3">Quick Stats</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Your Layer</span>
                <span>Chosen</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Member Since</span>
                <span>Jan 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Next Billing</span>
                <span>Apr 15</span>
              </div>
            </div>
          </div>

          <div className="border border-border p-4">
            <h3 className="text-xs font-bold mb-3">Upcoming</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 border border-border flex items-center justify-center text-[10px]">
                  <span>04</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold">Live Transmission</p>
                  <p className="text-[10px] text-muted-foreground">Friday 8PM EST</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 border border-border flex items-center justify-center text-[10px]">
                  <span>07</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold">New Release</p>
                  <p className="text-[10px] text-muted-foreground">Monday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
