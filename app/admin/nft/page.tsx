"use client"

import { useState } from "react"
import { Hexagon, Plus, ExternalLink, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NFTCollection {
  id: string
  name: string
  supply: number
  minted: number
  price: number
  revenue: number
  active: boolean
}

export default function AdminNFTPage() {
  const [showNewDrop, setShowNewDrop] = useState(false)
  const [name, setName] = useState("")
  const [supply, setSupply] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")

  const collections: NFTCollection[] = [
    { id: "1", name: "Genesis Collection", supply: 50, minted: 34, price: 0.5, revenue: 17, active: true },
    { id: "2", name: "Exclusive Access Pass", supply: 100, minted: 100, price: 0.25, revenue: 25, active: false },
    { id: "3", name: "Limited Artwork Series", supply: 100, minted: 67, price: 0.15, revenue: 10.05, active: true },
    { id: "4", name: "Supporter Badge", supply: 500, minted: 289, price: 0.05, revenue: 14.45, active: true },
  ]

  const totalRevenue = collections.reduce((sum, c) => sum + c.revenue, 0)
  const totalMinted = collections.reduce((sum, c) => sum + c.minted, 0)
  const totalHolders = 312 // Unique holders

  const handleCreateDrop = () => {
    console.log("Creating NFT drop:", { name, supply, price, description })
    setShowNewDrop(false)
    setName("")
    setSupply("")
    setPrice("")
    setDescription("")
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-sm font-bold uppercase tracking-widest">NFT Management</h1>
            <p className="text-xs text-neutral-500 mt-1">Solana blockchain</p>
          </div>
          <Button 
            onClick={() => setShowNewDrop(true)}
            className="bg-black text-white text-xs uppercase tracking-widest"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Drop
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Total Revenue</p>
            <p className="text-2xl font-bold font-mono mt-1">{totalRevenue.toFixed(2)} SOL</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">NFTs Minted</p>
            <p className="text-2xl font-bold font-mono mt-1">{totalMinted}</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Unique Holders</p>
            <p className="text-2xl font-bold font-mono mt-1">{totalHolders}</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Collections</p>
            <p className="text-2xl font-bold font-mono mt-1">{collections.length}</p>
          </div>
        </div>

        {/* Wallet Connection */}
        <div className="border border-black p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest">Creator Wallet</p>
              <code className="text-xs text-neutral-500 font-mono mt-1 block">7EcDhSYGxXyscszYEp35KHN8vfMnPQR9JTvzLWspeGPM</code>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span className="text-xs">Connected</span>
            </div>
          </div>
        </div>

        {/* Collections */}
        <div className="border border-black">
          <div className="border-b border-black p-4">
            <h2 className="text-xs font-bold uppercase tracking-widest">Collections</h2>
          </div>
          <div className="divide-y divide-neutral-200">
            {collections.map(collection => (
              <div key={collection.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center">
                      <Hexagon className="w-6 h-6 text-neutral-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold">{collection.name}</p>
                        {collection.active ? (
                          <span className="px-2 py-0.5 bg-black text-white text-xs">Active</span>
                        ) : (
                          <span className="px-2 py-0.5 bg-neutral-100 text-xs">Sold Out</span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {collection.minted}/{collection.supply} minted • {collection.price} SOL
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold font-mono">{collection.revenue.toFixed(2)} SOL</p>
                    <p className="text-xs text-neutral-500">revenue</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="h-1 bg-neutral-200">
                    <div 
                      className="h-full bg-black" 
                      style={{ width: `${(collection.minted / collection.supply) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="border-black text-xs uppercase tracking-widest">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View on Explorer
                  </Button>
                  <Button variant="outline" className="border-neutral-300 text-xs uppercase tracking-widest">
                    <Users className="w-3 h-3 mr-1" />
                    View Holders
                  </Button>
                  {collection.active && (
                    <Button variant="outline" className="border-neutral-300 text-xs uppercase tracking-widest">
                      Pause Minting
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Drop Modal */}
        {showNewDrop && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewDrop(false)}
          >
            <div 
              className="bg-white max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-black">
                <h2 className="text-sm font-bold uppercase tracking-widest">Create NFT Drop</h2>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                      Collection Name
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Exclusive Collection"
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
                      placeholder="What makes this collection special?"
                      className="w-full p-3 border border-black text-sm min-h-[80px] resize-none focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                        Supply
                      </label>
                      <Input
                        type="number"
                        value={supply}
                        onChange={(e) => setSupply(e.target.value)}
                        placeholder="100"
                        className="border-black"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                        Price (SOL)
                      </label>
                      <Input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.5"
                        className="border-black"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                      Artwork
                    </label>
                    <div className="border border-dashed border-neutral-300 p-6 text-center hover:border-black cursor-pointer">
                      <Hexagon className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
                      <p className="text-xs text-neutral-500">Click to upload artwork</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                      Holder Perks
                    </label>
                    <textarea
                      placeholder="List the benefits for NFT holders..."
                      className="w-full p-3 border border-black text-sm min-h-[60px] resize-none focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setShowNewDrop(false)}
                    className="flex-1 border-black text-xs uppercase tracking-widest"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateDrop}
                    disabled={!name || !supply || !price}
                    className="flex-1 bg-black text-white text-xs uppercase tracking-widest"
                  >
                    Create Drop
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
