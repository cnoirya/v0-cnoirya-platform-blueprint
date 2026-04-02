'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Home, Grid, MessageCircle, Video, User, Settings, LogOut, Phone, Wallet, ShoppingBag, Hexagon, FileText, Target, Heart, Bell, Calendar, Users, Trophy, Megaphone, Ticket, Hash, FolderOpen, BarChart3, Eye } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/dashboard', label: 'Feed', icon: Home },
  { href: '/dashboard/content', label: 'Content', icon: Grid },
  { href: '/dashboard/messages', label: 'Messages', icon: MessageCircle },
  { href: '/dashboard/live', label: 'Live', icon: Video },
  { href: '/dashboard/calls', label: 'Calls', icon: Phone },
]

const moreItems = [
  { href: '/dashboard/wallet', label: 'Wallet', icon: Wallet },
  { href: '/dashboard/shop', label: 'Shop', icon: ShoppingBag },
  { href: '/dashboard/custom', label: 'Custom', icon: FileText },
  { href: '/dashboard/nft', label: 'NFTs', icon: Hexagon },
  { href: '/dashboard/fundraise', label: 'Fundraise', icon: Target },
  { href: '/dashboard/tip', label: 'Tip', icon: Heart },
  { href: '/dashboard/schedule', label: 'Schedule', icon: Calendar },
  { href: '/dashboard/referrals', label: 'Referrals', icon: Users },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { href: '/dashboard/stories', label: 'Stories', icon: Eye },
  { href: '/dashboard/polls', label: 'Polls', icon: BarChart3 },
  { href: '/dashboard/vault', label: 'Vault', icon: FolderOpen },
  { href: '/dashboard/collections', label: 'Collections', icon: Grid },
  { href: '/dashboard/likes', label: 'Likes', icon: Heart },
  { href: '/dashboard/channels', label: 'Channels', icon: Hash },
  { href: '/dashboard/events', label: 'Events', icon: Ticket },
  { href: '/dashboard/announcements', label: 'News', icon: Megaphone },
  { href: '/dashboard/leaderboard', label: 'Leaderboard', icon: Trophy },
]

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="text-lg tracking-tight">
          CNOIRYA
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 text-xs transition-colors ${
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                {item.label}
              </Link>
            )
          })}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-muted-foreground hover:text-foreground">
                More
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-40">
              {moreItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="flex items-center gap-2 text-xs">
                    <item.icon className="h-3 w-3" />
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-2 text-xs">
              <p className="font-bold">user@email.com</p>
              <p className="text-muted-foreground">Premium Member</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="flex items-center gap-2 text-xs">
                <User className="h-3 w-3" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center gap-2 text-xs">
                <Settings className="h-3 w-3" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-xs text-destructive cursor-pointer">
              <LogOut className="h-3 w-3" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border">
          <div className="flex items-center justify-around py-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                  <span className="text-[10px]">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}
