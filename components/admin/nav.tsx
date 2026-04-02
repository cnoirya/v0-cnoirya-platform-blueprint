'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Users, 
  DollarSign, 
  MessageCircle,
  Video,
  Settings,
  ArrowLeft,
  Phone,
  FileText,
  Target,
  ShoppingBag,
  Hexagon,
  Calendar,
  BarChart3,
  List,
  Zap
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/content', label: 'Content', icon: ImageIcon },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
  { href: '/admin/earnings', label: 'Earnings', icon: DollarSign },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/messages', label: 'Messages', icon: MessageCircle },
  { href: '/admin/calls', label: 'Calls', icon: Phone },
  { href: '/admin/custom', label: 'Custom Orders', icon: FileText },
  { href: '/admin/shop', label: 'Shop', icon: ShoppingBag },
  { href: '/admin/fundraise', label: 'Fundraise', icon: Target },
  { href: '/admin/nft', label: 'NFTs', icon: Hexagon },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/lists', label: 'Lists', icon: List },
  { href: '/admin/automation', label: 'Automation', icon: Zap },
  { href: '/admin/live', label: 'Go Live', icon: Video },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-16">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-lg tracking-tight">
              CNOIRYA
            </Link>
            <span className="text-[10px] tracking-wider text-muted-foreground">ADMIN</span>
          </div>
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            View Site
          </Link>
        </div>
      </header>

      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex fixed top-16 left-0 bottom-0 w-56 border-r border-border flex-col">
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-xs transition-colors ${
                  isActive 
                    ? 'bg-foreground text-background' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <item.icon className="h-4 w-4" strokeWidth={1.5} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Bottom nav - mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 transition-colors ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" strokeWidth={1.5} />
                <span className="text-[9px]">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
