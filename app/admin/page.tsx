import { TrendingUp, TrendingDown, Users, DollarSign, Eye, MessageCircle, Lock, FileUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stats = [
  { 
    label: 'Total Revenue', 
    value: '$24,847', 
    change: '+12.4%', 
    trend: 'up',
    icon: DollarSign 
  },
  { 
    label: 'Active Subscribers', 
    value: '5,247', 
    change: '+8.2%', 
    trend: 'up',
    icon: Users 
  },
  { 
    label: 'Content Views', 
    value: '142K', 
    change: '+24.1%', 
    trend: 'up',
    icon: Eye 
  },
  { 
    label: 'Messages', 
    value: '847', 
    change: '-2.3%', 
    trend: 'down',
    icon: MessageCircle 
  },
]

const recentActivity = [
  { type: 'subscription', user: 'user_xxx', tier: 'Premium', time: '2 min ago' },
  { type: 'tip', user: 'fan_123', amount: '$50', time: '15 min ago' },
  { type: 'ppv', user: 'member_456', content: 'PPV Special', time: '1 hour ago' },
  { type: 'subscription', user: 'new_user', tier: 'VIP', time: '2 hours ago' },
  { type: 'message', user: 'vip_member', content: 'Custom request', time: '3 hours ago' },
]

const topContent = [
  { title: 'Photoset #42', views: 12847, likes: 847, earnings: '$2,847' },
  { title: 'Full Video #41', views: 8432, likes: 621, earnings: '$1,892' },
  { title: 'PPV Special', views: 3421, likes: 432, earnings: '$4,210' },
  { title: 'BTS Video', views: 6721, likes: 512, earnings: '$847' },
]

const upcomingTasks = [
  { label: 'Live Transmission', date: 'Today 8PM', priority: 'high' },
  { label: 'Content Approval Pending', count: 3, priority: 'medium' },
  { label: 'Payout Settlement', date: 'Apr 15', priority: 'medium' },
  { label: 'Subscriber Churn Alert', count: 12, priority: 'low' }
]

export default function AdminDashboardPage() {
  return (
    <div className="p-6 pb-24 lg:pb-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-sm font-bold mb-1">Dashboard</h1>
            <p className="text-[10px] text-muted-foreground">April 2026 • 30 days overview</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-xs">Export Report</Button>
            <Button size="sm" className="text-xs">Quick Upload</Button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                <span className={`flex items-center gap-1 text-[10px] ${
                  stat.trend === 'up' ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Recent activity */}
          <div className="border border-border p-4">
            <h2 className="text-xs font-bold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center justify-between text-xs border-b border-border pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className={`w-14 text-[10px] tracking-wider uppercase font-bold ${
                      activity.type === 'subscription' ? 'text-foreground' :
                      activity.type === 'tip' ? 'text-foreground' :
                      'text-muted-foreground'
                    }`}>
                      {activity.type}
                    </span>
                    <span className="text-muted-foreground truncate">{activity.user}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-right">
                      {'tier' in activity ? activity.tier : 
                       'amount' in activity ? activity.amount : 
                       'content' in activity ? activity.content : ''}
                    </span>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top content */}
          <div className="border border-border p-4">
            <h2 className="text-xs font-bold mb-4">Top Content</h2>
            <div className="space-y-3">
              {topContent.map((content, i) => (
                <div key={i} className="flex items-center justify-between text-xs border-b border-border pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 bg-secondary flex items-center justify-center text-[10px] font-bold">
                      {i + 1}
                    </span>
                    <span className="truncate">{content.title}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="text-[10px]">{content.views} views</span>
                    <span className="font-bold text-foreground whitespace-nowrap">{content.earnings}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming tasks */}
          <div className="border border-border p-4">
            <h2 className="text-xs font-bold mb-4">Upcoming</h2>
            <div className="space-y-3">
              {upcomingTasks.map((task, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-border pb-3 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                    task.priority === 'high' ? 'bg-foreground' :
                    task.priority === 'medium' ? 'bg-foreground/60' :
                    'bg-foreground/30'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{task.label}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {'date' in task ? task.date : `${task.count} pending`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue chart */}
        <div className="border border-border p-4">
          <h2 className="text-xs font-bold mb-4">Revenue (Last 30 Days)</h2>
          <div className="h-48 flex items-end justify-between gap-1">
            {Array.from({ length: 30 }, (_, i) => {
              const height = 20 + Math.random() * 80
              return (
                <div
                  key={i}
                  className="flex-1 bg-foreground/20 hover:bg-foreground/40 transition-colors rounded-t cursor-pointer"
                  style={{ height: `${height}%` }}
                  title={`Day ${i + 1}`}
                />
              )
            })}
          </div>
          <div className="flex items-center justify-between mt-4 text-[10px] text-muted-foreground">
            <span>Mar 3</span>
            <span className="font-bold text-foreground">$24,847 total</span>
            <span>Apr 2</span>
          </div>
        </div>
      </div>
    </div>
  )
}
