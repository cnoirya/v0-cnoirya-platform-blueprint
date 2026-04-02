'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 pb-24 md:pb-8">
      <h1 className="text-sm font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Password */}
        <div className="border border-border p-4 space-y-4">
          <h2 className="text-xs font-bold">Change Password</h2>
          
          <div>
            <label className="block text-xs mb-2">Current Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs mb-2">New Password</label>
            <Input
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              className="text-sm"
            />
          </div>

          <div>
            <label className="block text-xs mb-2">Confirm New Password</label>
            <Input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              className="text-sm"
            />
          </div>

          <Button size="sm" className="text-xs">
            Update Password
          </Button>
        </div>

        {/* Two-factor */}
        <div className="border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xs font-bold">Two-Factor Authentication</h2>
              <p className="text-[10px] text-muted-foreground mt-1">
                Add an extra layer of security to your account
              </p>
            </div>
            <span className="text-[10px] px-2 py-1 bg-secondary text-muted-foreground">
              Disabled
            </span>
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            Enable 2FA
          </Button>
        </div>

        {/* Payment methods */}
        <div className="border border-border p-4">
          <h2 className="text-xs font-bold mb-4">Payment Methods</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-secondary flex items-center justify-center text-[10px]">
                  VISA
                </div>
                <div>
                  <p className="text-xs">**** **** **** 4242</p>
                  <p className="text-[10px] text-muted-foreground">Expires 12/27</p>
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground">Default</span>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              Add Payment Method
            </Button>
          </div>
        </div>

        {/* Billing history */}
        <div className="border border-border p-4">
          <h2 className="text-xs font-bold mb-4">Billing History</h2>
          <div className="space-y-2">
            {[
              { date: 'Mar 15, 2026', description: 'Premium Subscription', amount: '$29.99' },
              { date: 'Feb 15, 2026', description: 'Premium Subscription', amount: '$29.99' },
              { date: 'Feb 10, 2026', description: 'PPV Content', amount: '$9.99' },
              { date: 'Jan 15, 2026', description: 'Premium Subscription', amount: '$29.99' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-border last:border-0">
                <div>
                  <p>{item.description}</p>
                  <p className="text-[10px] text-muted-foreground">{item.date}</p>
                </div>
                <span className="font-bold">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sessions */}
        <div className="border border-border p-4">
          <h2 className="text-xs font-bold mb-4">Active Sessions</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div>
                <p>Chrome on macOS</p>
                <p className="text-[10px] text-muted-foreground">Current session</p>
              </div>
              <span className="text-[10px] text-muted-foreground">Active now</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div>
                <p>Safari on iPhone</p>
                <p className="text-[10px] text-muted-foreground">192.168.1.xxx</p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-7">
                Revoke
              </Button>
            </div>
          </div>
          <Button variant="outline" size="sm" className="text-xs mt-4">
            Sign Out All Devices
          </Button>
        </div>
      </div>
    </div>
  )
}
