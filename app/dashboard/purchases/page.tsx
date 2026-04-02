"use client"

import { useState } from "react"
import { ShoppingBag, Download, Play, Image, Calendar, DollarSign, FileText, Lock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const purchases = [
  {
    id: 1,
    title: "Exclusive Photo Set #42",
    type: "ppv",
    contentType: "photos",
    itemCount: 24,
    price: 15,
    date: "Apr 1, 2026",
    status: "unlocked",
  },
  {
    id: 2,
    title: "Behind The Scenes Video",
    type: "ppv",
    contentType: "video",
    duration: "12:45",
    price: 25,
    date: "Mar 28, 2026",
    status: "unlocked",
  },
  {
    id: 3,
    title: "Custom Video Request",
    type: "custom",
    contentType: "video",
    duration: "5:00",
    price: 150,
    date: "Mar 20, 2026",
    status: "unlocked",
  },
  {
    id: 4,
    title: "DM Media Bundle",
    type: "dm",
    contentType: "photos",
    itemCount: 8,
    price: 20,
    date: "Mar 15, 2026",
    status: "unlocked",
  },
  {
    id: 5,
    title: "Limited Edition NFT #34",
    type: "nft",
    contentType: "nft",
    price: 0.5,
    currency: "SOL",
    date: "Mar 10, 2026",
    status: "owned",
  },
  {
    id: 6,
    title: "VIP Event Ticket - April",
    type: "ticket",
    contentType: "event",
    price: 50,
    date: "Mar 5, 2026",
    status: "redeemed",
  },
]

const totalSpent = purchases.reduce((sum, p) => sum + (p.currency ? 0 : p.price), 0)

export default function PurchasesPage() {
  const [filter, setFilter] = useState<string>("all")

  const filteredPurchases = filter === "all" 
    ? purchases 
    : purchases.filter((p) => p.type === filter)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-sm font-bold tracking-tight flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              PURCHASED CONTENT
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {purchases.length} items - ${totalSpent} total spent
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["all", "ppv", "custom", "dm", "nft", "ticket"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "outline" : "ghost"}
              size="sm"
              onClick={() => setFilter(f)}
              className="text-xs h-7 whitespace-nowrap"
            >
              {f === "all" ? "All" : f.toUpperCase()}
            </Button>
          ))}
        </div>

        {/* Purchases List */}
        <div className="space-y-3">
          {filteredPurchases.map((item) => (
            <div
              key={item.id}
              className="border p-4 hover:border-foreground transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-muted flex-shrink-0 flex items-center justify-center">
                  {item.contentType === "video" ? (
                    <Play className="h-6 w-6" />
                  ) : item.contentType === "photos" ? (
                    <Image className="h-6 w-6" />
                  ) : item.contentType === "nft" ? (
                    <span className="text-xs">NFT</span>
                  ) : (
                    <FileText className="h-6 w-6" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-1.5 py-0.5 border uppercase tracking-wider">
                      {item.type}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 ${
                      item.status === "unlocked" || item.status === "owned"
                        ? "bg-foreground text-background"
                        : "bg-muted"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                    {item.duration && <span>Duration: {item.duration}</span>}
                    {item.itemCount && <span>{item.itemCount} items</span>}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-2.5 w-2.5" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-2.5 w-2.5" />
                      {item.currency ? `${item.price} ${item.currency}` : `$${item.price}`}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {item.status === "unlocked" && (
                    <>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Download className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Purchase Stats */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xs font-bold mb-4">PURCHASE SUMMARY</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="border p-4">
              <div className="text-2xl font-bold">${totalSpent}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Total Spent
              </div>
            </div>
            <div className="border p-4">
              <div className="text-2xl font-bold">
                {purchases.filter((p) => p.type === "ppv").length}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                PPV Unlocks
              </div>
            </div>
            <div className="border p-4">
              <div className="text-2xl font-bold">
                {purchases.filter((p) => p.type === "custom").length}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Custom Orders
              </div>
            </div>
            <div className="border p-4">
              <div className="text-2xl font-bold">
                {purchases.filter((p) => p.type === "nft").length}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                NFTs Owned
              </div>
            </div>
          </div>
        </div>

        {/* Download All */}
        <div className="mt-6 border border-dashed p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-medium">Bulk Download</h3>
              <p className="text-[10px] text-muted-foreground mt-1">
                Download all your purchased content as a ZIP archive
              </p>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="h-3 w-3 mr-1" />
              Download All
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
