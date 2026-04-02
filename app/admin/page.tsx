import { TrendingUp, TrendingDown, Users, DollarSign, Eye, MessageCircle } from 'lucide-react'

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

export default function AdminDashboardPage() {
  return (
    <div className="p-6 pb-24 lg:pb-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-sm font-bold mb-6">Dashboard</h1>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent activity */}
          <div className="border border-border p-4">
            <h2 className="text-xs font-bold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className={`w-16 text-[10px] tracking-wider uppercase ${
                      activity.type === 'subscription' ? 'text-foreground' :
                      activity.type === 'tip' ? 'text-foreground' :
                      'text-muted-foreground'
                    }`}>
                      {activity.type}
                    </span>
                    <span className="text-muted-foreground">{activity.user}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">
                      {'tier' in activity ? activity.tier : 
                       'amount' in activity ? activity.amount : 
                       'content' in activity ? activity.content : ''}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top content */}
          <div className="border border-border p-4">
            <h2 className="text-xs font-bold mb-4">Top Content (This Month)</h2>
            <div className="space-y-3">
              {topContent.map((content, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 bg-secondary flex items-center justify-center text-[10px]">
                      {i + 1}
                    </span>
                    <span>{content.title}</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span>{content.views} views</span>
                    <span className="font-bold text-foreground">{content.earnings}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue chart placeholder */}
        <div className="border border-border p-4 mt-6">
          <h2 className="text-xs font-bold mb-4">Revenue (Last 30 Days)</h2>
          <div className="h-48 flex items-end justify-between gap-1">
            {Array.from({ length: 30 }, (_, i) => {
              const height = 20 + Math.random() * 80
              return (
                <div
                  key={i}
                  className="flex-1 bg-foreground/20 hover:bg-foreground/40 transition-colors"
                  style={{ height: `${height}%` }}
                />
              )
            })}
          </div>
          <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
            <span>Mar 3</span>
            <span>Apr 2</span>
          </div>
        </div>
      </div>
    </div>
  )
}
