'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Moon, Sun, Users, Plus, Bell, Globe, Shield, Download, Trash2 } from 'lucide-react'

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [invisibleMode, setInvisibleMode] = useState(false)
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 pb-24 md:pb-8">
      <h1 className="text-sm font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="border border-border p-4">
          <h2 className="text-xs font-bold mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <div>
                <p className="text-xs">Dark Mode</p>
                <p className="text-[10px] text-muted-foreground">Switch between light and dark theme</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-6 rounded-full transition-colors ${darkMode ? 'bg-foreground' : 'bg-muted'}`}
            >
              <div className={`w-4 h-4 bg-background rounded-full transition-transform mx-1 ${darkMode ? 'translate-x-4' : ''}`} />
            </button>
          </div>
        </div>

        {/* Multiple Accounts */}
        <div className="border border-border p-4">
          <h2 className="text-xs font-bold mb-4 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Linked Accounts
          </h2>
          <p className="text-[10px] text-muted-foreground mb-4">
            Switch between accounts without logging out
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between p-3 border border-foreground">
              <div>
                <p className="text-xs font-medium">user@email.com</p>
                <p className="text-[10px] text-muted-foreground">Current account</p>
              </div>
              <span className="text-[10px] bg-foreground text-background px-2 py-0.5">ACTIVE</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            <Plus className="h-3 w-3 mr-1" />
            Add Another Account
          </Button>
        </div>

        {/* Privacy */}
        <div className="border border-border p-4">
          <h2 className="text-xs font-bold mb-4 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs">Invisible Mode</p>
                <p className="text-[10px] text-muted-foreground">Hide your online status</p>
              </div>
              <button
                onClick={() => setInvisibleMode(!invisibleMode)}
                className={`w-10 h-6 rounded-full transition-colors ${invisibleMode ? 'bg-foreground' : 'bg-muted'}`}
              >
                <div className={`w-4 h-4 bg-background rounded-full transition-transform mx-1 ${invisibleMode ? 'translate-x-4' : ''}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs">Show on Leaderboard</p>
                <p className="text-[10px] text-muted-foreground">Display your anonymized rank</p>
              </div>
              <button className="w-10 h-6 rounded-full bg-foreground">
                <div className="w-4 h-4 bg-background rounded-full translate-x-5 mx-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="border border-border p-4">
          <h2 className="text-xs font-bold mb-4 flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </h2>
          <div className="space-y-3">
            {[
              { label: 'New content', description: 'When new posts are published', enabled: true },
              { label: 'Messages', description: 'Direct message notifications', enabled: true },
              { label: 'Live streams', description: 'When live streams start', enabled: true },
              { label: 'Comments', description: 'Replies to your comments', enabled: false },
              { label: 'Marketing', description: 'Promotions and offers', enabled: false },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div>
                  <p className="text-xs">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.description}</p>
                </div>
                <button className={`w-10 h-6 rounded-full transition-colors ${item.enabled ? 'bg-foreground' : 'bg-muted'}`}>
                  <div className={`w-4 h-4 bg-background rounded-full transition-transform mx-1 ${item.enabled ? 'translate-x-4' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="border border-border p-4">
          <h2 className="text-xs font-bold mb-4 flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Language & Region
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Display Language</label>
              <select className="w-full h-8 text-xs border border-border bg-background px-2">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Portuguese</option>
                <option>Japanese</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Timezone</label>
              <select className="w-full h-8 text-xs border border-border bg-background px-2">
                <option>Eastern Time (ET)</option>
                <option>Pacific Time (PT)</option>
                <option>Central European Time (CET)</option>
                <option>Japan Standard Time (JST)</option>
              </select>
            </div>
          </div>
        </div>
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

        {/* Data & Privacy */}
        <div className="border border-border p-4">
          <h2 className="text-xs font-bold mb-4">Data & Privacy</h2>
          <div className="space-y-3">
            <Button variant="outline" size="sm" className="text-xs w-full justify-start">
              <Download className="h-3 w-3 mr-2" />
              Download My Data (GDPR)
            </Button>
            <Button variant="outline" size="sm" className="text-xs w-full justify-start text-red-600 hover:text-red-600">
              <Trash2 className="h-3 w-3 mr-2" />
              Delete Account
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-3">
            Deleting your account will remove all your data permanently. This action cannot be undone.
          </p>
        </div>
      </div>
    </div>
  )
}
