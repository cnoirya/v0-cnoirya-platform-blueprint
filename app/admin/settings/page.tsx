'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState({
    displayName: 'CNOIRYA',
    bio: 'Premium adult content creator. Exclusive behind the scenes, photosets, videos, and more.',
    website: 'https://cnoirya.com',
    twitter: '@cnoirya'
  })

  const [pricing, setPricing] = useState({
    standard: '14.99',
    premium: '29.99',
    vip: '99.99'
  })

  return (
    <div className="p-6 pb-24 lg:pb-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-sm font-bold mb-6">Creator Settings</h1>

        <div className="space-y-6">
          {/* Profile */}
          <div className="border border-border p-4 space-y-4">
            <h2 className="text-xs font-bold">Profile</h2>

            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-secondary flex items-center justify-center text-2xl shrink-0">
                C
              </div>
              <div className="flex-1">
                <Button variant="outline" size="sm" className="text-xs mb-2">
                  Change Avatar
                </Button>
                <p className="text-[10px] text-muted-foreground">
                  Recommended: 400x400px, JPG or PNG
                </p>
              </div>
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
              <label className="block text-xs mb-2">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={3}
                className="w-full border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-2">Website</label>
                <Input
                  value={profile.website}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-2">Twitter</label>
                <Input
                  value={profile.twitter}
                  onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                  className="text-sm"
                />
              </div>
            </div>

            <Button size="sm" className="text-xs">Save Profile</Button>
          </div>

          {/* Subscription pricing */}
          <div className="border border-border p-4 space-y-4">
            <h2 className="text-xs font-bold">Subscription Pricing</h2>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs mb-2">Standard</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                  <Input
                    value={pricing.standard}
                    onChange={(e) => setPricing({ ...pricing, standard: e.target.value })}
                    type="number"
                    className="pl-7 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-2">Premium</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                  <Input
                    value={pricing.premium}
                    onChange={(e) => setPricing({ ...pricing, premium: e.target.value })}
                    type="number"
                    className="pl-7 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-2">VIP</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                  <Input
                    value={pricing.vip}
                    onChange={(e) => setPricing({ ...pricing, vip: e.target.value })}
                    type="number"
                    className="pl-7 text-sm"
                  />
                </div>
              </div>
            </div>

            <Button size="sm" className="text-xs">Update Pricing</Button>
          </div>

          {/* Content settings */}
          <div className="border border-border p-4 space-y-4">
            <h2 className="text-xs font-bold">Content Settings</h2>
            
            <label className="flex items-center justify-between">
              <div>
                <span className="text-xs">Allow comments on content</span>
                <p className="text-[10px] text-muted-foreground">Members can comment on your posts</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="text-xs">Watermark images</span>
                <p className="text-[10px] text-muted-foreground">Add invisible watermark to photos</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="text-xs">DRM protection for videos</span>
                <p className="text-[10px] text-muted-foreground">Enable VdoCipher DRM</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
          </div>

          {/* Payout settings */}
          <div className="border border-border p-4 space-y-4">
            <h2 className="text-xs font-bold">Payout Settings</h2>
            
            <div className="text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payment Processor</span>
                <span>CCBill</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payout Method</span>
                <span>Bank Transfer (ACH)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payout Schedule</span>
                <span>Bi-weekly</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Minimum Payout</span>
                <span>$100</span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="text-xs">
              Edit Payout Settings
            </Button>
          </div>

          {/* Geo-blocking */}
          <div className="border border-border p-4 space-y-4">
            <h2 className="text-xs font-bold">Geo-Blocking</h2>
            <p className="text-[10px] text-muted-foreground">
              Block access from specific regions for privacy or compliance
            </p>
            
            <div className="flex flex-wrap gap-2">
              {['United States', 'Canada'].map((country) => (
                <span key={country} className="text-xs px-2 py-1 bg-secondary flex items-center gap-2">
                  {country}
                  <button className="text-muted-foreground hover:text-foreground">x</button>
                </span>
              ))}
            </div>

            <Button variant="outline" size="sm" className="text-xs">
              Add Blocked Region
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
