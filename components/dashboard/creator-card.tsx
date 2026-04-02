import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageCircle, Heart, Video } from 'lucide-react'

export function CreatorCard() {
  return (
    <div className="border border-border p-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-secondary flex items-center justify-center text-xs">
          C
        </div>
        <div>
          <h3 className="text-sm font-bold">CNOIRYA</h3>
          <p className="text-[10px] text-muted-foreground">Creator</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="p-2 border border-border">
          <p className="text-sm font-bold">842</p>
          <p className="text-[10px] text-muted-foreground">Posts</p>
        </div>
        <div className="p-2 border border-border">
          <p className="text-sm font-bold">24K</p>
          <p className="text-[10px] text-muted-foreground">Likes</p>
        </div>
        <div className="p-2 border border-border">
          <p className="text-sm font-bold">5.2K</p>
          <p className="text-[10px] text-muted-foreground">Members</p>
        </div>
      </div>

      <div className="space-y-2">
        <Link href="/dashboard/messages">
          <Button variant="outline" size="sm" className="w-full text-xs">
            <MessageCircle className="h-3 w-3 mr-2" />
            Message
          </Button>
        </Link>
        <Link href="/dashboard/tip">
          <Button variant="outline" size="sm" className="w-full text-xs">
            <Heart className="h-3 w-3 mr-2" />
            Send Tip
          </Button>
        </Link>
        <Link href="/dashboard/live">
          <Button size="sm" className="w-full text-xs">
            <Video className="h-3 w-3 mr-2" />
            Live Now
          </Button>
        </Link>
      </div>
    </div>
  )
}
