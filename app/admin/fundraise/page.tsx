"use client"

import { useState } from "react"
import { Target, Plus, Edit, Trash2, Users, DollarSign } from "lucide-react"
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
  active: boolean
}

interface Reward {
  id: string
  title: string
  amount: number
  description: string
  limit?: number
}

export default function AdminFundraisePage() {
  const [showNewCampaign, setShowNewCampaign] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [goal, setGoal] = useState("")
  const [duration, setDuration] = useState("30")
  const [rewards, setRewards] = useState<Reward[]>([
    { id: "1", title: "Supporter", amount: 25, description: "Thank you message" }
  ])

  const campaigns: Campaign[] = [
    {
      id: "1",
      title: "Studio Upgrade 2026",
      description: "Help me upgrade my studio equipment for better quality content.",
      goal: 10000,
      raised: 7250,
      backers: 142,
      daysLeft: 12,
      active: true
    },
    {
      id: "2",
      title: "Travel Content Series",
      description: "Fund my exotic location shoot for exclusive travel content series.",
      goal: 5000,
      raised: 5000,
      backers: 78,
      daysLeft: 0,
      active: false
    }
  ]

  const addReward = () => {
    setRewards([...rewards, {
      id: Date.now().toString(),
      title: "",
      amount: 0,
      description: ""
    }])
  }

  const updateReward = (id: string, field: keyof Reward, value: string | number) => {
    setRewards(rewards.map(r => r.id === id ? { ...r, [field]: value } : r))
  }

  const removeReward = (id: string) => {
    setRewards(rewards.filter(r => r.id !== id))
  }

  const handleCreateCampaign = () => {
    console.log("Creating campaign:", { title, description, goal, duration, rewards })
    setShowNewCampaign(false)
    setTitle("")
    setDescription("")
    setGoal("")
    setDuration("30")
    setRewards([{ id: "1", title: "Supporter", amount: 25, description: "Thank you message" }])
  }

  const totalRaised = campaigns.reduce((sum, c) => sum + c.raised, 0)
  const totalBackers = campaigns.reduce((sum, c) => sum + c.backers, 0)

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-sm font-bold uppercase tracking-widest">Fundraising</h1>
          <Button 
            onClick={() => setShowNewCampaign(true)}
            className="bg-black text-white text-xs uppercase tracking-widest"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Total Raised</p>
            <p className="text-2xl font-bold font-mono mt-1">${totalRaised.toLocaleString()}</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Total Backers</p>
            <p className="text-2xl font-bold font-mono mt-1">{totalBackers}</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Active Campaigns</p>
            <p className="text-2xl font-bold font-mono mt-1">{campaigns.filter(c => c.active).length}</p>
          </div>
        </div>

        {/* Campaigns */}
        <div className="space-y-4">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="border border-black">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-sm font-bold">{campaign.title}</h2>
                      {campaign.active ? (
                        <span className="px-2 py-0.5 bg-black text-white text-xs">Active</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-neutral-100 text-xs">Ended</span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500">{campaign.description}</p>
                  </div>
                  {campaign.active && (
                    <div className="flex gap-1">
                      <button className="w-8 h-8 border border-neutral-300 flex items-center justify-center hover:border-black">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <p className="text-xl font-bold font-mono">${campaign.raised.toLocaleString()}</p>
                      <p className="text-xs text-neutral-500">of ${campaign.goal.toLocaleString()}</p>
                    </div>
                    <p className="text-sm font-mono">{Math.round((campaign.raised / campaign.goal) * 100)}%</p>
                  </div>
                  <div className="h-2 bg-neutral-200">
                    <div 
                      className="h-full bg-black" 
                      style={{ width: `${Math.min(100, (campaign.raised / campaign.goal) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 text-xs text-neutral-500">
                  <span><Users className="w-3 h-3 inline mr-1" />{campaign.backers} backers</span>
                  <span>{campaign.daysLeft > 0 ? `${campaign.daysLeft} days left` : "Ended"}</span>
                </div>

                {campaign.active && (
                  <div className="mt-4 pt-4 border-t border-neutral-200 flex gap-2">
                    <Button variant="outline" className="border-black text-xs uppercase tracking-widest">
                      View Backers
                    </Button>
                    <Button variant="outline" className="border-neutral-300 text-xs uppercase tracking-widest">
                      Send Update
                    </Button>
                    <Button variant="outline" className="border-neutral-300 text-neutral-500 text-xs uppercase tracking-widest">
                      End Campaign
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* New Campaign Modal */}
        {showNewCampaign && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewCampaign(false)}
          >
            <div 
              className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-black">
                <h2 className="text-sm font-bold uppercase tracking-widest">Create Campaign</h2>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                      Campaign Title
                    </label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Studio Upgrade 2026"
                      className="border-black"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="What are you raising funds for?"
                      className="w-full p-3 border border-black text-sm min-h-[100px] resize-none focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                        Goal Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                        <Input
                          type="number"
                          value={goal}
                          onChange={(e) => setGoal(e.target.value)}
                          placeholder="5000"
                          className="pl-7 border-black"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                        Duration (days)
                      </label>
                      <Input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="border-black"
                        min="1"
                        max="90"
                      />
                    </div>
                  </div>
                </div>

                {/* Reward Tiers */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs text-neutral-500 uppercase tracking-widest">
                      Reward Tiers
                    </label>
                    <button 
                      onClick={addReward}
                      className="text-xs text-neutral-500 hover:text-black"
                    >
                      + Add Tier
                    </button>
                  </div>
                  <div className="space-y-3">
                    {rewards.map((reward, index) => (
                      <div key={reward.id} className="p-3 border border-neutral-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-neutral-500">Tier {index + 1}</span>
                          {rewards.length > 1 && (
                            <button 
                              onClick={() => removeReward(reward.id)}
                              className="text-neutral-400 hover:text-black"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <Input
                            value={reward.title}
                            onChange={(e) => updateReward(reward.id, "title", e.target.value)}
                            placeholder="Tier name"
                            className="text-xs"
                          />
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">$</span>
                            <Input
                              type="number"
                              value={reward.amount || ""}
                              onChange={(e) => updateReward(reward.id, "amount", parseInt(e.target.value) || 0)}
                              placeholder="Amount"
                              className="pl-5 text-xs"
                            />
                          </div>
                        </div>
                        <Input
                          value={reward.description}
                          onChange={(e) => updateReward(reward.id, "description", e.target.value)}
                          placeholder="What backers receive"
                          className="text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setShowNewCampaign(false)}
                    className="flex-1 border-black text-xs uppercase tracking-widest"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateCampaign}
                    disabled={!title || !description || !goal}
                    className="flex-1 bg-black text-white text-xs uppercase tracking-widest"
                  >
                    Launch Campaign
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
