"use client"

import { useState } from "react"
import { Target, Heart, Users, Clock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Campaign {
  id: string
  title: string
  description: string
  goal: number
  raised: number
  backers: number
  daysLeft: number
  rewards: Reward[]
  active: boolean
}

interface Reward {
  id: string
  title: string
  amount: number
  description: string
  claimed: number
  limit?: number
}

export default function FundraisePage() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [pledgeAmount, setPledgeAmount] = useState("")
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)

  const campaigns: Campaign[] = [
    {
      id: "1",
      title: "Studio Upgrade 2026",
      description: "Help me upgrade my studio equipment for better quality content. New cameras, lighting, and audio gear to bring you the best possible experience.",
      goal: 10000,
      raised: 7250,
      backers: 142,
      daysLeft: 12,
      active: true,
      rewards: [
        { id: "r1", title: "Supporter", amount: 25, description: "Thank you message + name in credits", claimed: 89 },
        { id: "r2", title: "Bronze Backer", amount: 50, description: "Exclusive behind-the-scenes video + all previous", claimed: 34 },
        { id: "r3", title: "Silver Patron", amount: 100, description: "Custom thank you video + signed photo + all previous", claimed: 15, limit: 50 },
        { id: "r4", title: "Gold VIP", amount: 250, description: "Private video call + VIP badge + all previous", claimed: 4, limit: 10 }
      ]
    },
    {
      id: "2",
      title: "Travel Content Series",
      description: "Fund my exotic location shoot for exclusive travel content series.",
      goal: 5000,
      raised: 5000,
      backers: 78,
      daysLeft: 0,
      active: false,
      rewards: [
        { id: "r5", title: "Early Access", amount: 25, description: "See content 1 week early", claimed: 78 }
      ]
    }
  ]

  const handlePledge = () => {
    // Handle pledge submission
    console.log("Pledge:", pledgeAmount, "Reward:", selectedReward)
    setPledgeAmount("")
    setSelectedReward(null)
    setSelectedCampaign(null)
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-sm font-bold uppercase tracking-widest mb-8">Fundraising Campaigns</h1>

        {/* Active Campaigns */}
        <div className="space-y-6 mb-8">
          {campaigns.filter(c => c.active).map(campaign => (
            <div key={campaign.id} className="border border-black">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-bold">{campaign.title}</h2>
                    <p className="text-xs text-neutral-500 mt-1">{campaign.daysLeft} days left</p>
                  </div>
                  <Target className="w-5 h-5" />
                </div>
                
                <p className="text-xs text-neutral-600 mb-4">{campaign.description}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <p className="text-2xl font-bold font-mono">${campaign.raised.toLocaleString()}</p>
                      <p className="text-xs text-neutral-500">of ${campaign.goal.toLocaleString()} goal</p>
                    </div>
                    <p className="text-xs text-neutral-500">{Math.round((campaign.raised / campaign.goal) * 100)}%</p>
                  </div>
                  <div className="h-2 bg-neutral-200">
                    <div 
                      className="h-full bg-black transition-all" 
                      style={{ width: `${Math.min(100, (campaign.raised / campaign.goal) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-neutral-400" />
                    <span className="text-xs">{campaign.backers} backers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span className="text-xs">{campaign.daysLeft} days left</span>
                  </div>
                </div>

                <Button 
                  onClick={() => setSelectedCampaign(campaign)}
                  className="w-full bg-black text-white text-xs uppercase tracking-widest"
                >
                  Back This Project
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Past Campaigns */}
        {campaigns.some(c => !c.active) && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-neutral-400">Completed Campaigns</h2>
            <div className="space-y-4">
              {campaigns.filter(c => !c.active).map(campaign => (
                <div key={campaign.id} className="border border-neutral-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold">{campaign.title}</p>
                      <p className="text-xs text-neutral-500">
                        ${campaign.raised.toLocaleString()} raised from {campaign.backers} backers
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-neutral-100 text-xs">Funded</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pledge Modal */}
        {selectedCampaign && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCampaign(null)}
          >
            <div 
              className="bg-white max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-black">
                <h2 className="text-sm font-bold uppercase tracking-widest">Back {selectedCampaign.title}</h2>
              </div>

              <div className="p-6">
                {/* Reward Tiers */}
                <div className="mb-6">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest mb-3">Select a Reward</p>
                  <div className="space-y-2">
                    {selectedCampaign.rewards.map(reward => {
                      const soldOut = reward.limit && reward.claimed >= reward.limit
                      return (
                        <button
                          key={reward.id}
                          onClick={() => !soldOut && setSelectedReward(reward)}
                          disabled={soldOut}
                          className={`w-full p-4 border text-left ${
                            selectedReward?.id === reward.id 
                              ? "bg-black text-white border-black" 
                              : soldOut 
                                ? "border-neutral-200 opacity-50 cursor-not-allowed"
                                : "border-neutral-300 hover:border-black"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-xs font-bold">{reward.title}</p>
                              <p className="text-xs opacity-70 mt-1">{reward.description}</p>
                            </div>
                            <p className="text-sm font-mono font-bold">${reward.amount}</p>
                          </div>
                          <div className="mt-2 flex items-center justify-between text-xs opacity-60">
                            <span>{reward.claimed} claimed</span>
                            {reward.limit && (
                              <span>{soldOut ? "Sold out" : `${reward.limit - reward.claimed} left`}</span>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="mb-6">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Or Enter Custom Amount</p>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                    <Input
                      type="number"
                      value={pledgeAmount}
                      onChange={(e) => {
                        setPledgeAmount(e.target.value)
                        setSelectedReward(null)
                      }}
                      placeholder="0.00"
                      className="pl-7 border-black"
                      min="1"
                    />
                  </div>
                </div>

                {/* Summary */}
                {(selectedReward || pledgeAmount) && (
                  <div className="mb-6 p-4 bg-neutral-50 border border-neutral-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs">Your Pledge</span>
                      <span className="text-sm font-bold font-mono">
                        ${selectedReward ? selectedReward.amount : pledgeAmount}
                      </span>
                    </div>
                    {selectedReward && (
                      <div className="text-xs text-neutral-600">
                        <Check className="w-3 h-3 inline mr-1" />
                        {selectedReward.title} reward
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedCampaign(null)}
                    className="flex-1 border-black text-xs uppercase tracking-widest"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handlePledge}
                    disabled={!selectedReward && !pledgeAmount}
                    className="flex-1 bg-black text-white text-xs uppercase tracking-widest"
                  >
                    <Heart className="w-3 h-3 mr-2" />
                    Pledge
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
