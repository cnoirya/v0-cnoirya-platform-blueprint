'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    username: 'member_user',
    email: 'user@email.com',
    displayName: 'Premium Member'
  })

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 pb-24 md:pb-8">
      <h1 className="text-sm font-bold mb-6">Profile Settings</h1>

      <div className="space-y-6">
        {/* Avatar */}
        <div className="border border-border p-4">
          <h2 className="text-xs font-bold mb-4">Avatar</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-secondary flex items-center justify-center text-lg">
              {profile.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <Button variant="outline" size="sm" className="text-xs">
                Upload New
              </Button>
              <p className="text-[10px] text-muted-foreground mt-2">
                JPG, PNG. Max 2MB.
              </p>
            </div>
          </div>
        </div>

        {/* Account info */}
        <div className="border border-border p-4 space-y-4">
          <h2 className="text-xs font-bold">Account Information</h2>
          
          <div>
            <label className="block text-xs mb-2">Username</label>
            <Input
              value={profile.username}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              className="text-sm"
            />
          </div>

          <div>
            <label className="block text-xs mb-2">Display Name</label>
            <Input
              value={profile.displayName}
              onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
              className="text-sm"
            />
          </div>

          <div>
            <label className="block text-xs mb-2">Email</label>
            <Input
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              type="email"
              className="text-sm"
            />
          </div>

          <Button size="sm" className="text-xs">
            Save Changes
          </Button>
        </div>

        {/* Subscription */}
        <div className="border border-border p-4">
          <h2 className="text-xs font-bold mb-4">Subscription</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Current Plan</span>
              <span className="font-bold">Premium</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Price</span>
              <span>$29.99/month</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Next Billing</span>
              <span>April 15, 2026</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Member Since</span>
              <span>January 2024</span>
            </div>
            <div className="pt-3 border-t border-border flex gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                Upgrade Plan
              </Button>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                Cancel Subscription
              </Button>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="border border-border p-4 space-y-4">
          <h2 className="text-xs font-bold">Privacy</h2>
          
          <label className="flex items-center justify-between">
            <span className="text-xs">Hide activity from other members</span>
            <input type="checkbox" className="rounded" />
          </label>
          
          <label className="flex items-center justify-between">
            <span className="text-xs">Allow creator to see my email</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </label>
          
          <label className="flex items-center justify-between">
            <span className="text-xs">Receive email notifications</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </label>
        </div>

        {/* Danger zone */}
        <div className="border border-destructive/20 p-4">
          <h2 className="text-xs font-bold text-destructive mb-4">Danger Zone</h2>
          <p className="text-xs text-muted-foreground mb-4">
            Permanently delete your account and all associated data.
          </p>
          <Button variant="outline" size="sm" className="text-xs text-destructive border-destructive/20">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}
