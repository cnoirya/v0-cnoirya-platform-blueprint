"use client"

import { useState } from "react"
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type OrderStatus = "pending" | "accepted" | "in_progress" | "delivered" | "rejected"

interface CustomOrder {
  id: string
  title: string
  description: string
  price: number
  deposit: number
  status: OrderStatus
  createdAt: string
  deliveryDate?: string
}

export default function CustomOrdersPage() {
  const [showNewOrder, setShowNewOrder] = useState(false)
  const [orderType, setOrderType] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")

  const orders: CustomOrder[] = [
    {
      id: "ORD-001",
      title: "Custom Photoset",
      description: "Requested specific theme and styling for exclusive photoset",
      price: 150,
      deposit: 75,
      status: "in_progress",
      createdAt: "Mar 25, 2026",
      deliveryDate: "Apr 5, 2026"
    },
    {
      id: "ORD-002",
      title: "Personalized Video Message",
      description: "Birthday greeting video with custom message",
      price: 50,
      deposit: 25,
      status: "delivered",
      createdAt: "Mar 15, 2026"
    },
    {
      id: "ORD-003",
      title: "Custom Video Content",
      description: "5-minute custom video with specific requests",
      price: 200,
      deposit: 100,
      status: "pending",
      createdAt: "Mar 28, 2026"
    }
  ]

  const orderTypes = [
    { id: "photo", name: "Custom Photoset", basePrice: 100, description: "Personalized photo collection" },
    { id: "video", name: "Custom Video", basePrice: 150, description: "Made-to-order video content" },
    { id: "message", name: "Video Message", basePrice: 50, description: "Personal greeting or message" },
    { id: "worn", name: "Worn Item", basePrice: 75, description: "Exclusive merchandise" },
    { id: "call", name: "Private Session", basePrice: 200, description: "Extended private time" },
  ]

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />
      case "accepted": return <CheckCircle className="w-4 h-4" />
      case "in_progress": return <AlertCircle className="w-4 h-4" />
      case "delivered": return <CheckCircle className="w-4 h-4" />
      case "rejected": return <XCircle className="w-4 h-4" />
    }
  }

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case "pending": return "Awaiting Review"
      case "accepted": return "Accepted"
      case "in_progress": return "In Progress"
      case "delivered": return "Delivered"
      case "rejected": return "Declined"
    }
  }

  const handleSubmitOrder = () => {
    // Handle order submission
    setShowNewOrder(false)
    setOrderType("")
    setDescription("")
    setBudget("")
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-sm font-bold uppercase tracking-widest">Custom Orders</h1>
          <Button 
            onClick={() => setShowNewOrder(true)}
            className="bg-black text-white text-xs uppercase tracking-widest"
          >
            New Request
          </Button>
        </div>

        {/* New Order Form */}
        {showNewOrder && (
          <div className="border border-black p-6 mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-6">Create Custom Request</h2>

            {/* Order Type Selection */}
            <div className="mb-6">
              <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-3">
                What would you like?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {orderTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setOrderType(type.id)}
                    className={`p-4 border text-left ${
                      orderType === type.id 
                        ? "bg-black text-white border-black" 
                        : "border-neutral-300 hover:border-black"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold">{type.name}</p>
                        <p className="text-xs opacity-70">{type.description}</p>
                      </div>
                      <p className="text-xs font-mono">from ${type.basePrice}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                Describe Your Request
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Be specific about what you'd like..."
                className="w-full p-3 border border-black text-sm min-h-[120px] resize-none focus:outline-none"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Include any specific details, preferences, or requirements
              </p>
            </div>

            {/* Reference Upload */}
            <div className="mb-6">
              <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                Reference Images (Optional)
              </label>
              <div className="border border-dashed border-neutral-300 p-6 text-center hover:border-black cursor-pointer">
                <Upload className="w-6 h-6 mx-auto mb-2 text-neutral-400" />
                <p className="text-xs text-neutral-500">Click to upload or drag and drop</p>
              </div>
            </div>

            {/* Budget */}
            <div className="mb-6">
              <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                Your Budget
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                <Input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="0.00"
                  className="pl-7 border-black"
                />
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                50% deposit required upon acceptance
              </p>
            </div>

            {/* Terms */}
            <div className="mb-6 p-4 bg-neutral-50 border border-neutral-200">
              <p className="text-xs text-neutral-600">
                By submitting a custom request, you agree that:
              </p>
              <ul className="text-xs text-neutral-600 mt-2 space-y-1">
                <li>- 50% deposit is non-refundable once work begins</li>
                <li>- Delivery times vary based on request complexity</li>
                <li>- All content is for personal use only</li>
                <li>- Requests may be declined at creator&apos;s discretion</li>
              </ul>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowNewOrder(false)}
                className="flex-1 border-black text-xs uppercase tracking-widest"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitOrder}
                disabled={!orderType || !description || !budget}
                className="flex-1 bg-black text-white text-xs uppercase tracking-widest"
              >
                Submit Request
              </Button>
            </div>
          </div>
        )}

        {/* Orders List */}
        <div className="border border-black">
          <div className="border-b border-black p-4">
            <h2 className="text-xs font-bold uppercase tracking-widest">Your Orders</h2>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-8 h-8 mx-auto mb-4 text-neutral-300" />
              <p className="text-xs text-neutral-500">No custom orders yet</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-200">
              {orders.map(order => (
                <div key={order.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-bold">{order.title}</p>
                      <p className="text-xs text-neutral-500">{order.id} • {order.createdAt}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 text-xs ${
                      order.status === "delivered" ? "bg-black text-white" :
                      order.status === "rejected" ? "bg-neutral-200" :
                      "border border-black"
                    }`}>
                      {getStatusIcon(order.status)}
                      <span>{getStatusText(order.status)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 mb-3">{order.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex gap-4">
                      <span>Total: <strong className="font-mono">${order.price}</strong></span>
                      <span>Deposit: <strong className="font-mono">${order.deposit}</strong></span>
                    </div>
                    {order.deliveryDate && (
                      <span className="text-neutral-500">Est. {order.deliveryDate}</span>
                    )}
                  </div>
                  {order.status === "delivered" && (
                    <Button 
                      variant="outline" 
                      className="mt-3 border-black text-xs uppercase tracking-widest w-full"
                    >
                      View Content
                    </Button>
                  )}
                  {order.status === "pending" && (
                    <Button 
                      variant="outline" 
                      className="mt-3 border-neutral-300 text-neutral-500 text-xs uppercase tracking-widest w-full"
                    >
                      Cancel Request
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
