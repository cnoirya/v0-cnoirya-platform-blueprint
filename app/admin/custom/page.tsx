"use client"

import { useState } from "react"
import { FileText, Clock, Check, X, DollarSign, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type OrderStatus = "pending" | "accepted" | "in_progress" | "delivered" | "rejected"

interface CustomOrder {
  id: string
  user: string
  type: string
  description: string
  budget: number
  status: OrderStatus
  createdAt: string
  proposedPrice?: number
  deliveryDate?: string
}

export default function AdminCustomOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<CustomOrder | null>(null)
  const [proposedPrice, setProposedPrice] = useState("")
  const [deliveryDays, setDeliveryDays] = useState("7")
  const [filter, setFilter] = useState<OrderStatus | "all">("all")

  const orders: CustomOrder[] = [
    {
      id: "ORD-001",
      user: "User_A1B2",
      type: "Custom Photoset",
      description: "Requesting specific theme and styling for exclusive photoset. Looking for outdoor nature theme with specific outfit requests.",
      budget: 150,
      status: "pending",
      createdAt: "Mar 30, 2026"
    },
    {
      id: "ORD-002",
      user: "User_C3D4",
      type: "Custom Video",
      description: "5-minute video with specific scenario and dialogue.",
      budget: 200,
      status: "in_progress",
      createdAt: "Mar 25, 2026",
      proposedPrice: 225,
      deliveryDate: "Apr 5, 2026"
    },
    {
      id: "ORD-003",
      user: "User_E5F6",
      type: "Video Message",
      description: "Birthday greeting for my friend John. Please mention his love of hiking.",
      budget: 50,
      status: "accepted",
      createdAt: "Mar 28, 2026",
      proposedPrice: 50,
      deliveryDate: "Apr 2, 2026"
    },
    {
      id: "ORD-004",
      user: "User_G7H8",
      type: "Custom Video",
      description: "Request for very specific content that goes against guidelines.",
      budget: 500,
      status: "rejected",
      createdAt: "Mar 20, 2026"
    },
    {
      id: "ORD-005",
      user: "User_I9J0",
      type: "Private Session",
      description: "Extended 2-hour private video session with specific requests.",
      budget: 300,
      status: "delivered",
      createdAt: "Mar 15, 2026",
      proposedPrice: 350
    }
  ]

  const filteredOrders = filter === "all" ? orders : orders.filter(o => o.status === filter)

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending": return "border-neutral-300"
      case "accepted": return "border-black"
      case "in_progress": return "bg-black text-white"
      case "delivered": return "bg-neutral-100"
      case "rejected": return "bg-neutral-200 text-neutral-500"
    }
  }

  const handleAccept = () => {
    // Handle order acceptance
    console.log("Accepting order:", selectedOrder?.id, "Price:", proposedPrice, "Days:", deliveryDays)
    setSelectedOrder(null)
    setProposedPrice("")
    setDeliveryDays("7")
  }

  const handleReject = () => {
    // Handle order rejection
    console.log("Rejecting order:", selectedOrder?.id)
    setSelectedOrder(null)
  }

  const stats = {
    pending: orders.filter(o => o.status === "pending").length,
    inProgress: orders.filter(o => o.status === "in_progress").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    totalRevenue: orders.filter(o => o.status === "delivered").reduce((sum, o) => sum + (o.proposedPrice || o.budget), 0)
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-sm font-bold uppercase tracking-widest mb-8">Custom Orders</h1>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Pending</p>
            <p className="text-2xl font-bold font-mono mt-1">{stats.pending}</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">In Progress</p>
            <p className="text-2xl font-bold font-mono mt-1">{stats.inProgress}</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Delivered</p>
            <p className="text-2xl font-bold font-mono mt-1">{stats.delivered}</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Revenue</p>
            <p className="text-2xl font-bold font-mono mt-1">${stats.totalRevenue}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {(["all", "pending", "accepted", "in_progress", "delivered", "rejected"] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 text-xs uppercase tracking-widest ${
                filter === status 
                  ? "bg-black text-white" 
                  : "border border-neutral-300 hover:border-black"
              }`}
            >
              {status.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="border border-black">
          <div className="border-b border-black p-4">
            <h2 className="text-xs font-bold uppercase tracking-widest">Orders ({filteredOrders.length})</h2>
          </div>
          <div className="divide-y divide-neutral-200">
            {filteredOrders.map(order => (
              <div key={order.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-neutral-500">{order.id}</span>
                      <span className={`px-2 py-0.5 text-xs ${getStatusColor(order.status)}`}>
                        {order.status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-xs font-bold">{order.type}</p>
                    <p className="text-xs text-neutral-500">{order.user} • {order.createdAt}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500">Budget</p>
                    <p className="text-sm font-bold font-mono">${order.budget}</p>
                    {order.proposedPrice && order.proposedPrice !== order.budget && (
                      <p className="text-xs text-neutral-500">Final: ${order.proposedPrice}</p>
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-neutral-600 mb-3 line-clamp-2">{order.description}</p>

                {order.deliveryDate && (
                  <p className="text-xs text-neutral-500 mb-3">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Due: {order.deliveryDate}
                  </p>
                )}

                <div className="flex gap-2">
                  {order.status === "pending" && (
                    <>
                      <Button 
                        onClick={() => {
                          setSelectedOrder(order)
                          setProposedPrice(order.budget.toString())
                        }}
                        className="bg-black text-white text-xs uppercase tracking-widest"
                      >
                        Review & Accept
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedOrder(order)}
                        className="border-neutral-300 text-xs uppercase tracking-widest"
                      >
                        Decline
                      </Button>
                    </>
                  )}
                  {order.status === "accepted" && (
                    <Button className="bg-black text-white text-xs uppercase tracking-widest">
                      Start Working
                    </Button>
                  )}
                  {order.status === "in_progress" && (
                    <Button className="bg-black text-white text-xs uppercase tracking-widest">
                      Mark Delivered
                    </Button>
                  )}
                  <Button variant="outline" className="border-neutral-300 text-xs uppercase tracking-widest">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Modal */}
        {selectedOrder && selectedOrder.status === "pending" && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <div 
              className="bg-white max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-black">
                <h2 className="text-sm font-bold uppercase tracking-widest">Review Order</h2>
                <p className="text-xs text-neutral-500 mt-1">{selectedOrder.id}</p>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Type</p>
                  <p className="text-sm font-bold">{selectedOrder.type}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Request</p>
                  <p className="text-xs">{selectedOrder.description}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Their Budget</p>
                  <p className="text-lg font-bold font-mono">${selectedOrder.budget}</p>
                </div>

                <div className="border-t border-neutral-200 pt-4 mt-4">
                  <div className="mb-4">
                    <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                      Your Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                      <Input
                        type="number"
                        value={proposedPrice}
                        onChange={(e) => setProposedPrice(e.target.value)}
                        className="pl-7 border-black"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                      Delivery Time (days)
                    </label>
                    <Input
                      type="number"
                      value={deliveryDays}
                      onChange={(e) => setDeliveryDays(e.target.value)}
                      className="border-black"
                      min="1"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={handleReject}
                    className="flex-1 border-neutral-300 text-xs uppercase tracking-widest"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Decline
                  </Button>
                  <Button 
                    onClick={handleAccept}
                    className="flex-1 bg-black text-white text-xs uppercase tracking-widest"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Accept
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
