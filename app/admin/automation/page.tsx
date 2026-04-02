'use client'

import { useState } from 'react'
import { Zap, Plus, Play, Pause, Edit2, Trash2, Clock, Users, MessageCircle, DollarSign, Calendar, Mail, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const automations = [
  {
    id: 1,
    name: 'Welcome Message',
    trigger: 'New Subscriber',
    action: 'Send welcome DM with media',
    isActive: true,
    runs: 4521,
    lastRun: '2 min ago',
  },
  {
    id: 2,
    name: 'Renewal Reminder',
    trigger: '3 days before expiration',
    action: 'Send renewal reminder with discount',
    isActive: true,
    runs: 892,
    lastRun: '1 hour ago',
  },
  {
    id: 3,
    name: 'Re-engagement',
    trigger: '7 days inactive',
    action: 'Send personalized message',
    isActive: true,
    runs: 567,
    lastRun: '3 hours ago',
  },
  {
    id: 4,
    name: 'Birthday Message',
    trigger: 'Subscriber birthday',
    action: 'Send birthday greeting + discount',
    isActive: true,
    runs: 234,
    lastRun: '1 day ago',
  },
  {
    id: 5,
    name: 'High Spender Reward',
    trigger: 'Spend reaches $500',
    action: 'Upgrade to VIP list + bonus content',
    isActive: false,
    runs: 89,
    lastRun: '3 days ago',
  },
  {
    id: 6,
    name: 'Churn Prevention',
    trigger: 'Subscription cancelled',
    action: 'Send retention offer',
    isActive: true,
    runs: 156,
    lastRun: '5 hours ago',
  },
]

const triggers = [
  { id: 'new_sub', label: 'New Subscriber', icon: Users },
  { id: 'expiring', label: 'Subscription Expiring', icon: Clock },
  { id: 'inactive', label: 'User Inactive', icon: Users },
  { id: 'spend', label: 'Spend Threshold', icon: DollarSign },
  { id: 'birthday', label: 'Birthday', icon: Calendar },
  { id: 'cancelled', label: 'Subscription Cancelled', icon: Users },
]

const actions = [
  { id: 'send_dm', label: 'Send Direct Message', icon: MessageCircle },
  { id: 'send_email', label: 'Send Email', icon: Mail },
  { id: 'add_list', label: 'Add to List', icon: Users },
  { id: 'give_content', label: 'Unlock Content', icon: Gift },
  { id: 'apply_discount', label: 'Apply Discount', icon: DollarSign },
]

export default function AutomationPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  const toggleAutomation = (id: number) => {
    // Would toggle in API
    console.log('Toggle automation', id)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-sm font-bold tracking-tight flex items-center gap-2">
              <Zap className="h-4 w-4" />
              AUTOMATION
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Automated workflows and sequences</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} className="text-xs h-8">
            <Plus className="h-3 w-3 mr-1" />
            Create Automation
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="border border-border p-4">
            <p className="text-[10px] text-muted-foreground uppercase">Active Automations</p>
            <p className="text-lg font-bold mt-1">{automations.filter(a => a.isActive).length}</p>
          </div>
          <div className="border border-border p-4">
            <p className="text-[10px] text-muted-foreground uppercase">Total Runs (30d)</p>
            <p className="text-lg font-bold mt-1">{automations.reduce((acc, a) => acc + a.runs, 0).toLocaleString()}</p>
          </div>
          <div className="border border-border p-4">
            <p className="text-[10px] text-muted-foreground uppercase">Conversion Rate</p>
            <p className="text-lg font-bold mt-1">24.5%</p>
          </div>
        </div>

        {/* Automation List */}
        <div className="space-y-3">
          {automations.map((automation) => (
            <div key={automation.id} className={`border p-4 ${automation.isActive ? 'border-border' : 'border-border opacity-60'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xs font-medium">{automation.name}</h3>
                    <span className={`text-[10px] px-1.5 py-0.5 ${automation.isActive ? 'bg-green-100 text-green-800' : 'bg-muted'}`}>
                      {automation.isActive ? 'ACTIVE' : 'PAUSED'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-[10px] text-muted-foreground">
                    <span>Trigger: {automation.trigger}</span>
                    <span>Action: {automation.action}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-[10px] text-muted-foreground">
                    <span>{automation.runs.toLocaleString()} runs</span>
                    <span>Last run: {automation.lastRun}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleAutomation(automation.id)}
                    className="p-1.5 hover:bg-muted"
                    title={automation.isActive ? 'Pause' : 'Activate'}
                  >
                    {automation.isActive ? (
                      <Pause className="h-3 w-3" />
                    ) : (
                      <Play className="h-3 w-3" />
                    )}
                  </button>
                  <button className="p-1.5 hover:bg-muted">
                    <Edit2 className="h-3 w-3" />
                  </button>
                  <button className="p-1.5 hover:bg-muted text-red-600">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background border border-border p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <h2 className="text-sm font-bold mb-4">Create Automation</h2>

              <div className="space-y-6">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Automation Name</label>
                  <Input placeholder="e.g., VIP Welcome Sequence" className="h-8 text-xs" />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Select Trigger</label>
                  <div className="grid grid-cols-2 gap-2">
                    {triggers.map((trigger) => (
                      <button
                        key={trigger.id}
                        onClick={() => setSelectedTrigger(trigger.id)}
                        className={`p-3 border text-left ${
                          selectedTrigger === trigger.id ? 'border-foreground bg-muted' : 'border-border hover:border-foreground/50'
                        }`}
                      >
                        <trigger.icon className="h-4 w-4 mb-1" />
                        <p className="text-xs">{trigger.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedTrigger && (
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Trigger Settings</label>
                    <div className="border border-border p-3 space-y-2">
                      {selectedTrigger === 'inactive' && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs">After</span>
                          <Input type="number" defaultValue={7} className="w-16 h-7 text-xs" />
                          <span className="text-xs">days of inactivity</span>
                        </div>
                      )}
                      {selectedTrigger === 'spend' && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs">When spend reaches $</span>
                          <Input type="number" defaultValue={500} className="w-20 h-7 text-xs" />
                        </div>
                      )}
                      {selectedTrigger === 'expiring' && (
                        <div className="flex items-center gap-2">
                          <Input type="number" defaultValue={3} className="w-16 h-7 text-xs" />
                          <span className="text-xs">days before expiration</span>
                        </div>
                      )}
                      {(selectedTrigger === 'new_sub' || selectedTrigger === 'cancelled' || selectedTrigger === 'birthday') && (
                        <p className="text-xs text-muted-foreground">No additional settings needed</p>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Select Action</label>
                  <div className="grid grid-cols-2 gap-2">
                    {actions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => setSelectedAction(action.id)}
                        className={`p-3 border text-left ${
                          selectedAction === action.id ? 'border-foreground bg-muted' : 'border-border hover:border-foreground/50'
                        }`}
                      >
                        <action.icon className="h-4 w-4 mb-1" />
                        <p className="text-xs">{action.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedAction === 'send_dm' && (
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Message Content</label>
                    <textarea 
                      placeholder="Hi {name}, welcome to my page! ..."
                      className="w-full h-24 text-xs border border-border p-2 bg-background resize-none"
                    />
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Variables: {'{name}'}, {'{tier}'}, {'{join_date}'}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-6">
                <Button variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1 text-xs h-8">
                  Cancel
                </Button>
                <Button className="flex-1 text-xs h-8">
                  Create Automation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
