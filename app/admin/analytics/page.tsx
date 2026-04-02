'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Users, DollarSign, Eye, Heart, MessageCircle, Download, Calendar, BarChart3, PieChart, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'

const overviewStats = [
  { label: 'Total Revenue', value: '$124,567', change: '+12.4%', trend: 'up', period: 'vs last month' },
  { label: 'Active Subscribers', value: '4,521', change: '+8.2%', trend: 'up', period: 'vs last month' },
  { label: 'Content Views', value: '892K', change: '+23.1%', trend: 'up', period: 'vs last month' },
  { label: 'Engagement Rate', value: '34.2%', change: '-2.1%', trend: 'down', period: 'vs last month' },
]

const revenueBreakdown = [
  { source: 'Subscriptions', amount: '$78,234', percentage: 62.8 },
  { source: 'PPV Content', amount: '$21,456', percentage: 17.2 },
  { source: 'Tips', amount: '$12,345', percentage: 9.9 },
  { source: 'Messages', amount: '$6,789', percentage: 5.4 },
  { source: 'Custom Orders', amount: '$4,123', percentage: 3.3 },
  { source: 'Calls', amount: '$1,620', percentage: 1.3 },
]

const contentPerformance = [
  { title: 'Summer Set Preview', views: 12453, likes: 2341, comments: 456, revenue: '$2,345' },
  { title: 'BTS Video Ep. 24', views: 8921, likes: 1892, comments: 234, revenue: '$1,890' },
  { title: 'Exclusive Photoshoot', views: 7654, likes: 1567, comments: 189, revenue: '$1,567' },
  { title: 'Q&A Session Replay', views: 6543, likes: 1234, comments: 567, revenue: '$1,234' },
  { title: 'Morning Routine', views: 5432, likes: 987, comments: 123, revenue: '$987' },
]

const subscriberMetrics = [
  { tier: 'Basic', count: 2341, churn: '4.2%', ltv: '$89' },
  { tier: 'Premium', count: 1247, churn: '2.8%', ltv: '$234' },
  { tier: 'VIP', count: 389, churn: '1.2%', ltv: '$567' },
  { tier: 'Elite', count: 47, churn: '0.5%', ltv: '$1,234' },
]

const trafficSources = [
  { source: 'Direct', visits: 45234, conversions: 1234, rate: '2.7%' },
  { source: 'Twitter/X', visits: 23456, conversions: 567, rate: '2.4%' },
  { source: 'Instagram', visits: 18765, conversions: 456, rate: '2.4%' },
  { source: 'TikTok', visits: 12345, conversions: 234, rate: '1.9%' },
  { source: 'Referral', visits: 5678, conversions: 189, rate: '3.3%' },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d')

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-sm font-bold tracking-tight">ANALYTICS</h1>
            <p className="text-xs text-muted-foreground mt-1">Performance insights and metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border border-border text-xs">
              {['7d', '30d', '90d', '1y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1.5 ${dateRange === range ? 'bg-foreground text-background' : ''}`}
                >
                  {range}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="text-xs h-8">
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {overviewStats.map((stat, idx) => (
            <div key={idx} className="border border-border p-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              <p className="text-lg font-bold mt-1">{stat.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className={`text-[10px] ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-[10px] text-muted-foreground">{stat.period}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Revenue Breakdown */}
          <div className="border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-medium flex items-center gap-2">
                <PieChart className="h-3 w-3" />
                REVENUE BREAKDOWN
              </h2>
              <span className="text-xs text-muted-foreground">Total: $124,567</span>
            </div>
            <div className="space-y-3">
              {revenueBreakdown.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs">{item.source}</span>
                    <span className="text-xs font-medium">{item.amount}</span>
                  </div>
                  <div className="h-1.5 bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-foreground"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.percentage}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subscriber Metrics */}
          <div className="border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-medium flex items-center gap-2">
                <Users className="h-3 w-3" />
                SUBSCRIBER METRICS
              </h2>
              <span className="text-xs text-muted-foreground">By Tier</span>
            </div>
            <div className="space-y-3">
              {subscriberMetrics.map((tier, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 border border-border">
                  <div>
                    <p className="text-xs font-medium">{tier.tier}</p>
                    <p className="text-[10px] text-muted-foreground">{tier.count.toLocaleString()} subscribers</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs">Churn: {tier.churn}</p>
                    <p className="text-[10px] text-muted-foreground">LTV: {tier.ltv}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Performance */}
        <div className="border border-border p-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-medium flex items-center gap-2">
              <BarChart3 className="h-3 w-3" />
              TOP PERFORMING CONTENT
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-[10px] text-muted-foreground font-medium pb-2">Content</th>
                  <th className="text-right text-[10px] text-muted-foreground font-medium pb-2">Views</th>
                  <th className="text-right text-[10px] text-muted-foreground font-medium pb-2">Likes</th>
                  <th className="text-right text-[10px] text-muted-foreground font-medium pb-2">Comments</th>
                  <th className="text-right text-[10px] text-muted-foreground font-medium pb-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {contentPerformance.map((content, idx) => (
                  <tr key={idx} className="border-b border-border last:border-0">
                    <td className="py-2 text-xs">{content.title}</td>
                    <td className="py-2 text-xs text-right">{content.views.toLocaleString()}</td>
                    <td className="py-2 text-xs text-right">{content.likes.toLocaleString()}</td>
                    <td className="py-2 text-xs text-right">{content.comments.toLocaleString()}</td>
                    <td className="py-2 text-xs text-right font-medium">{content.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-medium flex items-center gap-2">
              <Activity className="h-3 w-3" />
              TRAFFIC SOURCES
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-[10px] text-muted-foreground font-medium pb-2">Source</th>
                  <th className="text-right text-[10px] text-muted-foreground font-medium pb-2">Visits</th>
                  <th className="text-right text-[10px] text-muted-foreground font-medium pb-2">Conversions</th>
                  <th className="text-right text-[10px] text-muted-foreground font-medium pb-2">Rate</th>
                </tr>
              </thead>
              <tbody>
                {trafficSources.map((source, idx) => (
                  <tr key={idx} className="border-b border-border last:border-0">
                    <td className="py-2 text-xs">{source.source}</td>
                    <td className="py-2 text-xs text-right">{source.visits.toLocaleString()}</td>
                    <td className="py-2 text-xs text-right">{source.conversions.toLocaleString()}</td>
                    <td className="py-2 text-xs text-right font-medium">{source.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
