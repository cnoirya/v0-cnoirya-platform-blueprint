"use client"

import { useState } from "react"
import { Hexagon, ExternalLink, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NFT {
  id: string
  name: string
  edition: string
  price: number
  image: string
  owned: boolean
  totalSupply: number
  minted: number
  perks: string[]
}

export default function NFTPage() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)
  const [walletConnected, setWalletConnected] = useState(false)

  const nfts: NFT[] = [
    {
      id: "1",
      name: "Genesis Collection #001",
      edition: "1/50",
      price: 0.5,
      image: "/nft-1.jpg",
      owned: false,
      totalSupply: 50,
      minted: 34,
      perks: [
        "Lifetime VIP access",
        "Exclusive Discord channel",
        "Monthly custom content",
        "Priority DM responses"
      ]
    },
    {
      id: "2",
      name: "Exclusive Access Pass",
      edition: "1/100",
      price: 0.25,
      image: "/nft-2.jpg",
      owned: true,
      totalSupply: 100,
      minted: 100,
      perks: [
        "6 months VIP access",
        "Exclusive content drops",
        "Member-only livestreams"
      ]
    },
    {
      id: "3",
      name: "Limited Artwork #042",
      edition: "42/100",
      price: 0.15,
      image: "/nft-3.jpg",
      owned: false,
      totalSupply: 100,
      minted: 67,
      perks: [
        "Collectible artwork",
        "High-res download",
        "Signed certificate"
      ]
    },
    {
      id: "4",
      name: "Supporter Badge",
      edition: "1/500",
      price: 0.05,
      image: "/nft-4.jpg",
      owned: true,
      totalSupply: 500,
      minted: 289,
      perks: [
        "Profile badge",
        "Early access to drops",
        "Community voting rights"
      ]
    }
  ]

  const connectWallet = () => {
    setWalletConnected(true)
  }

  const mintNFT = (nft: NFT) => {
    if (!walletConnected) {
      connectWallet()
      return
    }
    // Handle minting
    console.log("Minting:", nft.name)
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-sm font-bold uppercase tracking-widest">NFT Collection</h1>
            <p className="text-xs text-neutral-500 mt-1">Exclusive digital collectibles on Solana</p>
          </div>
          {walletConnected ? (
            <div className="flex items-center gap-2 px-3 py-2 border border-black">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span className="text-xs font-mono">7EcD...8vK3</span>
            </div>
          ) : (
            <Button 
              onClick={connectWallet}
              className="bg-black text-white text-xs uppercase tracking-widest"
            >
              Connect Wallet
            </Button>
          )}
        </div>

        {/* Owned NFTs */}
        {nfts.some(n => n.owned) && (
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4">Your Collection</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {nfts.filter(n => n.owned).map(nft => (
                <div 
                  key={nft.id} 
                  className="border border-black cursor-pointer hover:bg-neutral-50"
                  onClick={() => setSelectedNFT(nft)}
                >
                  <div className="aspect-square bg-neutral-100 flex items-center justify-center">
                    <Hexagon className="w-12 h-12 text-neutral-300" />
                  </div>
                  <div className="p-3 border-t border-black">
                    <p className="text-xs font-bold truncate">{nft.name}</p>
                    <p className="text-xs text-neutral-500">{nft.edition}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available NFTs */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4">Available to Mint</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nfts.filter(n => !n.owned && n.minted < n.totalSupply).map(nft => (
              <div key={nft.id} className="border border-black">
                <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                  <Hexagon className="w-16 h-16 text-neutral-300" />
                </div>
                <div className="p-4 border-t border-black">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-bold">{nft.name}</p>
                      <p className="text-xs text-neutral-500">{nft.minted}/{nft.totalSupply} minted</p>
                    </div>
                    <p className="text-sm font-bold font-mono">{nft.price} SOL</p>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-1 bg-neutral-200 mb-4">
                    <div 
                      className="h-full bg-black" 
                      style={{ width: `${(nft.minted / nft.totalSupply) * 100}%` }}
                    />
                  </div>

                  {/* Perks */}
                  <div className="mb-4">
                    <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Includes</p>
                    <ul className="space-y-1">
                      {nft.perks.map((perk, i) => (
                        <li key={i} className="text-xs flex items-center gap-2">
                          <Check className="w-3 h-3" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => mintNFT(nft)}
                    className="w-full bg-black text-white text-xs uppercase tracking-widest"
                  >
                    {walletConnected ? "Mint Now" : "Connect to Mint"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sold Out */}
        {nfts.some(n => !n.owned && n.minted >= n.totalSupply) && (
          <div className="mt-8">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-neutral-400">Sold Out</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50">
              {nfts.filter(n => !n.owned && n.minted >= n.totalSupply).map(nft => (
                <div key={nft.id} className="border border-neutral-300">
                  <div className="aspect-square bg-neutral-100 flex items-center justify-center">
                    <Hexagon className="w-12 h-12 text-neutral-200" />
                  </div>
                  <div className="p-3 border-t border-neutral-300">
                    <p className="text-xs font-bold truncate">{nft.name}</p>
                    <p className="text-xs text-neutral-400">Sold Out</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NFT Detail Modal */}
        {selectedNFT && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedNFT(null)}
          >
            <div 
              className="bg-white max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-square bg-neutral-100 flex items-center justify-center">
                <Hexagon className="w-24 h-24 text-neutral-300" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-bold">{selectedNFT.name}</p>
                    <p className="text-xs text-neutral-500">{selectedNFT.edition}</p>
                  </div>
                  {selectedNFT.owned && (
                    <span className="px-2 py-1 bg-black text-white text-xs">Owned</span>
                  )}
                </div>
                
                <div className="mb-4">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Perks</p>
                  <ul className="space-y-1">
                    {selectedNFT.perks.map((perk, i) => (
                      <li key={i} className="text-xs flex items-center gap-2">
                        <Check className="w-3 h-3" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    className="flex-1 border-black text-xs uppercase tracking-widest"
                  >
                    <ExternalLink className="w-3 h-3 mr-2" />
                    View on Explorer
                  </Button>
                  <Button 
                    onClick={() => setSelectedNFT(null)}
                    className="flex-1 bg-black text-white text-xs uppercase tracking-widest"
                  >
                    Close
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
