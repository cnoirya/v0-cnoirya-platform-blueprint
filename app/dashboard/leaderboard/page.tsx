"use client"

import { useState } from "react"
import { Trophy, Crown, Star, Heart, Eye, Calendar, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const leaderboard = [
  { rank: 1, username: "top_supporter_1", amount: 2450, change: 0, badge: "diamond", anonymous: false },
  { rank: 2, username: "Anonymous", amount: 1890, change: 1, badge: "diamond", anonymous: true },
  { rank: 3, username: "loyal_fan_23", amount: 1654, change: -1, badge: "platinum", anonymous: false },
  { rank: 4, username: "super_tipper", amount: 1234, change: 2, badge: "platinum", anonymous: false },
  { rank: 5, username: "Anonymous", amount: 987, change: 0, badge: "gold", anonymous: true },
  { rank: 6, username: "best_supporter", amount: 876, change: -2, badge: "gold", anonymous: false },
  { rank: 7, username: "vip_member_x", amount: 765, change: 1, badge: "gold", anonymous: false },
  { rank: 8, username: "generous_one", amount: 654, change: 3, badge: "silver", anonymous: false },
  { rank: 9, username: "Anonymous", amount: 543, change: -1, badge: "silver", anonymous: true },
  { rank: 10, username: "dedicated_fan", amount: 432, change: 0, badge: "silver", anonymous: false },
]

const milestones = [
  { amount: 100, reward: "Shoutout in next post", claimed: true },
  { amount: 500, reward: "Exclusive photo set", claimed: true },
  { amount: 1000, reward: "Personalized video message", claimed: false },
  { amount: 2500, reward: "1-on-1 video call (15 min)", claimed: false },
  { amount: 5000, reward: "Custom content of your choice", claimed: false },
]

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<"monthly" | "alltime">("monthly")
  const userRank = 24
  const userAmount = 156

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-sm font-bold tracking-tight flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              SUPPORTER LEADERBOARD
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Top supporters ranked by contribution
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={period === "monthly" ? "outline" : "ghost"}
              size="sm"
              onClick={() => setPeriod("monthly")}
              className="text-xs h-7"
            >
              This Month
            </Button>
            <Button
              variant={period === "alltime" ? "outline" : "ghost"}
              size="sm"
              onClick={() => setPeriod("alltime")}
              className="text-xs h-7"
            >
              All Time
            </Button>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* 2nd Place */}
          <div className="border p-4 text-center mt-8">
            <div className="text-3xl font-bold mb-2">2</div>
            <div className="h-12 w-12 mx-auto bg-muted flex items-center justify-center mb-2">
              <Star className="h-5 w-5" />
            </div>
            <div className="text-xs font-medium truncate">{leaderboard[1].username}</div>
            <div className="text-[10px] text-muted-foreground">${leaderboard[1].amount}</div>
            <span className="text-[10px] px-1.5 py-0.5 border uppercase mt-2 inline-block">
              {leaderboard[1].badge}
            </span>
          </div>
          
          {/* 1st Place */}
          <div className="border border-foreground p-4 text-center bg-foreground text-background">
            <div className="text-4xl font-bold mb-2 flex items-center justify-center">
              <Crown className="h-6 w-6 mr-1" />1
            </div>
            <div className="h-14 w-14 mx-auto bg-background text-foreground flex items-center justify-center mb-2">
              <Crown className="h-6 w-6" />
            </div>
            <div className="text-xs font-medium truncate">{leaderboard[0].username}</div>
            <div className="text-[10px] opacity-80">${leaderboard[0].amount}</div>
            <span className="text-[10px] px-1.5 py-0.5 bg-background text-foreground uppercase mt-2 inline-block">
              {leaderboard[0].badge}
            </span>
          </div>
          
          {/* 3rd Place */}
          <div className="border p-4 text-center mt-8">
            <div className="text-3xl font-bold mb-2">3</div>
            <div className="h-12 w-12 mx-auto bg-muted flex items-center justify-center mb-2">
              <Star className="h-5 w-5" />
            </div>
            <div className="text-xs font-medium truncate">{leaderboard[2].username}</div>
            <div className="text-[10px] text-muted-foreground">${leaderboard[2].amount}</div>
            <span className="text-[10px] px-1.5 py-0.5 border uppercase mt-2 inline-block">
              {leaderboard[2].badge}
            </span>
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="border">
          <div className="grid grid-cols-12 gap-2 p-3 border-b bg-muted text-[10px] uppercase tracking-wider">
            <div className="col-span-1">Rank</div>
            <div className="col-span-6">Supporter</div>
            <div className="col-span-3 text-right">Amount</div>
            <div className="col-span-2 text-right">Change</div>
          </div>
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`grid grid-cols-12 gap-2 p-3 border-b last:border-b-0 text-xs items-center ${
                entry.rank <= 3 ? "bg-muted/50" : ""
              }`}
            >
              <div className="col-span-1 font-bold">#{entry.rank}</div>
              <div className="col-span-6 flex items-center gap-2">
                <div className="h-6 w-6 bg-muted flex items-center justify-center text-[10px]">
                  {entry.anonymous ? "?" : entry.username.charAt(0).toUpperCase()}
                </div>
                <span className={entry.anonymous ? "italic text-muted-foreground" : ""}>
                  {entry.username}
                </span>
                <span className="text-[10px] px-1 py-0.5 border uppercase">
                  {entry.badge}
                </span>
              </div>
              <div className="col-span-3 text-right font-medium">${entry.amount}</div>
              <div className="col-span-2 text-right flex items-center justify-end gap-1">
                {entry.change > 0 ? (
                  <>
                    <ChevronUp className="h-3 w-3 text-foreground" />
                    <span>{entry.change}</span>
                  </>
                ) : entry.change < 0 ? (
                  <>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    <span>{Math.abs(entry.change)}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Your Position */}
        <div className="mt-6 border border-dashed p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-medium">Your Position</h3>
              <p className="text-[10px] text-muted-foreground mt-1">
                Rank #{userRank} with ${userAmount} contributed this month
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">#{userRank}</div>
              <div className="text-[10px] text-muted-foreground">
                ${344 - userAmount} to reach Top 10
              </div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xs font-bold mb-4">SUPPORTER MILESTONES</h2>
          <div className="space-y-3">
            {milestones.map((milestone, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-3 border ${
                  milestone.claimed ? "bg-muted/50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 flex items-center justify-center border ${
                    milestone.claimed ? "bg-foreground text-background" : ""
                  }`}>
                    {milestone.claimed ? "✓" : `$${milestone.amount}`}
                  </div>
                  <div>
                    <div className="text-xs font-medium">{milestone.reward}</div>
                    <div className="text-[10px] text-muted-foreground">
                      Unlock at ${milestone.amount} total
                    </div>
                  </div>
                </div>
                {milestone.claimed ? (
                  <span className="text-[10px] px-1.5 py-0.5 bg-foreground text-background">
                    CLAIMED
                  </span>
                ) : (
                  <span className="text-[10px] text-muted-foreground">
                    ${milestone.amount - userAmount} away
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
