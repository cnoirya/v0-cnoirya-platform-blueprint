'use client'

import { useState } from 'react'
import { Video, Settings, Users, DollarSign, MessageCircle, Play, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AdminLivePage() {
  const [isLive, setIsLive] = useState(false)
  const [streamSettings, setStreamSettings] = useState({
    title: 'Friday Night Stream',
    description: 'Q&A + Special Content',
    tipGoal: '1000',
    tipGoalReward: 'Special surprise content unlock'
  })

  return (
    <div className="p-6 pb-24 lg:pb-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-sm font-bold">Go Live</h1>
          {isLive && (
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              LIVE
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Preview */}
          <div className="lg:col-span-2">
            <div className="border border-border">
              <div className="aspect-video bg-secondary flex items-center justify-center relative">
                <Video className="h-12 w-12 text-muted-foreground" strokeWidth={1} />
                {isLive && (
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-xs bg-background px-2 py-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      LIVE
                    </span>
                    <span className="flex items-center gap-1.5 text-xs bg-background px-2 py-1">
                      <Users className="h-3 w-3" />
                      0
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold">{streamSettings.title}</h2>
                    <p className="text-xs text-muted-foreground">{streamSettings.description}</p>
                  </div>
                  <Button 
                    onClick={() => setIsLive(!isLive)}
                    variant={isLive ? 'destructive' : 'default'}
                    size="sm" 
                    className="text-xs"
                  >
                    {isLive ? (
                      <>
                        <Square className="h-3 w-3 mr-2" />
                        End Stream
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3 mr-2" />
                        Go Live
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Stream stats (only when live) */}
            {isLive && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="border border-border p-3 text-center">
                  <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-lg font-bold">0</p>
                  <p className="text-[10px] text-muted-foreground">Viewers</p>
                </div>
                <div className="border border-border p-3 text-center">
                  <DollarSign className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-lg font-bold">$0</p>
                  <p className="text-[10px] text-muted-foreground">Tips</p>
                </div>
                <div className="border border-border p-3 text-center">
                  <MessageCircle className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-lg font-bold">0</p>
                  <p className="text-[10px] text-muted-foreground">Messages</p>
                </div>
                <div className="border border-border p-3 text-center">
                  <Video className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-lg font-bold">00:00</p>
                  <p className="text-[10px] text-muted-foreground">Duration</p>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <div className="border border-border p-4 space-y-4">
              <h3 className="text-xs font-bold flex items-center gap-2">
                <Settings className="h-3 w-3" />
                Stream Settings
              </h3>

              <div>
                <label className="block text-xs mb-2">Title</label>
                <Input
                  value={streamSettings.title}
                  onChange={(e) => setStreamSettings({ ...streamSettings, title: e.target.value })}
                  className="text-sm"
                  disabled={isLive}
                />
              </div>

              <div>
                <label className="block text-xs mb-2">Description</label>
                <Input
                  value={streamSettings.description}
                  onChange={(e) => setStreamSettings({ ...streamSettings, description: e.target.value })}
                  className="text-sm"
                  disabled={isLive}
                />
              </div>
            </div>

            <div className="border border-border p-4 space-y-4">
              <h3 className="text-xs font-bold">Tip Goal</h3>

              <div>
                <label className="block text-xs mb-2">Goal Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                  <Input
                    value={streamSettings.tipGoal}
                    onChange={(e) => setStreamSettings({ ...streamSettings, tipGoal: e.target.value })}
                    type="number"
                    className="pl-7 text-sm"
                    disabled={isLive}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs mb-2">Goal Reward</label>
                <Input
                  value={streamSettings.tipGoalReward}
                  onChange={(e) => setStreamSettings({ ...streamSettings, tipGoalReward: e.target.value })}
                  className="text-sm"
                  disabled={isLive}
                />
              </div>

              {isLive && (
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span>Progress</span>
                    <span>$0 / ${streamSettings.tipGoal}</span>
                  </div>
                  <div className="h-2 bg-secondary">
                    <div className="h-full bg-foreground w-0" />
                  </div>
                </div>
              )}
            </div>

            <div className="border border-border p-4 space-y-3">
              <h3 className="text-xs font-bold">Stream Key</h3>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value="sk_live_xxxxxxxxxxxxxxxx"
                  readOnly
                  className="text-xs"
                />
                <Button variant="outline" size="sm" className="text-xs shrink-0">
                  Copy
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Use OBS or similar software with RTMP
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
