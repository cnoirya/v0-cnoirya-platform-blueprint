"use client"

import { useState } from "react"
import { Package, Plus, Edit, Trash2, Eye, EyeOff, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  inStock: boolean
  limited: boolean
  sold: number
  revenue: number
}

interface Order {
  id: string
  product: string
  customer: string
  date: string
  status: "pending" | "shipped" | "delivered"
  amount: number
}

export default function AdminShopPage() {
  const [showNewProduct, setShowNewProduct] = useState(false)
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("photos")
  const [limited, setLimited] = useState(false)

  const products: Product[] = [
    { id: "1", name: "Signed Polaroid", description: "Hand-signed exclusive polaroid", price: 25, category: "photos", inStock: true, limited: true, sold: 89, revenue: 2225 },
    { id: "2", name: "Exclusive Poster", description: "Limited edition 18x24 poster", price: 35, category: "prints", inStock: true, limited: false, sold: 45, revenue: 1575 },
    { id: "3", name: "Digital Bundle", description: "50+ exclusive photos in HD", price: 50, category: "digital", inStock: true, limited: false, sold: 234, revenue: 11700 },
    { id: "4", name: "Custom Video USB", description: "Personalized video content", price: 100, category: "custom", inStock: true, limited: true, sold: 12, revenue: 1200 },
    { id: "5", name: "Calendar 2026", description: "12-month wall calendar", price: 30, category: "prints", inStock: false, limited: false, sold: 150, revenue: 4500 },
    { id: "6", name: "Mystery Box", description: "Surprise collection", price: 75, category: "special", inStock: true, limited: true, sold: 28, revenue: 2100 },
  ]

  const orders: Order[] = [
    { id: "ORD-501", product: "Signed Polaroid", customer: "User_A1B2", date: "Mar 30, 2026", status: "pending", amount: 25 },
    { id: "ORD-502", product: "Mystery Box", customer: "User_C3D4", date: "Mar 29, 2026", status: "shipped", amount: 75 },
    { id: "ORD-503", product: "Digital Bundle", customer: "User_E5F6", date: "Mar 28, 2026", status: "delivered", amount: 50 },
    { id: "ORD-504", product: "Exclusive Poster", customer: "User_G7H8", date: "Mar 27, 2026", status: "delivered", amount: 35 },
  ]

  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0)
  const totalSold = products.reduce((sum, p) => sum + p.sold, 0)

  const categories = [
    { id: "photos", name: "Photos" },
    { id: "prints", name: "Prints" },
    { id: "digital", name: "Digital" },
    { id: "custom", name: "Custom" },
    { id: "special", name: "Special" }
  ]

  const handleCreateProduct = () => {
    console.log("Creating product:", { name, description, price, category, limited })
    setShowNewProduct(false)
    setName("")
    setDescription("")
    setPrice("")
    setCategory("photos")
    setLimited(false)
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-sm font-bold uppercase tracking-widest">Shop Management</h1>
          <Button 
            onClick={() => setShowNewProduct(true)}
            className="bg-black text-white text-xs uppercase tracking-widest"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Total Revenue</p>
            <p className="text-2xl font-bold font-mono mt-1">${totalRevenue.toLocaleString()}</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Items Sold</p>
            <p className="text-2xl font-bold font-mono mt-1">{totalSold}</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Products</p>
            <p className="text-2xl font-bold font-mono mt-1">{products.length}</p>
          </div>
          <div className="border border-black p-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Pending Orders</p>
            <p className="text-2xl font-bold font-mono mt-1">{orders.filter(o => o.status === "pending").length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-neutral-200">
          <button
            onClick={() => setActiveTab("products")}
            className={`pb-3 text-xs uppercase tracking-widest ${
              activeTab === "products" 
                ? "border-b-2 border-black font-bold" 
                : "text-neutral-500"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 text-xs uppercase tracking-widest ${
              activeTab === "orders" 
                ? "border-b-2 border-black font-bold" 
                : "text-neutral-500"
            }`}
          >
            Orders
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="border border-black">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-black">
                  <tr>
                    <th className="text-left text-xs font-bold uppercase tracking-widest p-4">Product</th>
                    <th className="text-left text-xs font-bold uppercase tracking-widest p-4">Price</th>
                    <th className="text-left text-xs font-bold uppercase tracking-widest p-4">Sold</th>
                    <th className="text-left text-xs font-bold uppercase tracking-widest p-4">Revenue</th>
                    <th className="text-left text-xs font-bold uppercase tracking-widest p-4">Status</th>
                    <th className="text-right text-xs font-bold uppercase tracking-widest p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {products.map(product => (
                    <tr key={product.id}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center">
                            <Package className="w-4 h-4 text-neutral-400" />
                          </div>
                          <div>
                            <p className="text-xs font-bold">{product.name}</p>
                            <p className="text-xs text-neutral-500 capitalize">{product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-xs font-mono">${product.price}</td>
                      <td className="p-4 text-xs font-mono">{product.sold}</td>
                      <td className="p-4 text-xs font-mono">${product.revenue.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 text-xs ${
                          product.inStock 
                            ? "bg-black text-white" 
                            : "bg-neutral-200 text-neutral-500"
                        }`}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                        {product.limited && (
                          <span className="ml-1 px-2 py-0.5 border border-black text-xs">Limited</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="w-8 h-8 border border-neutral-300 flex items-center justify-center hover:border-black">
                            <Edit className="w-3 h-3" />
                          </button>
                          <button className="w-8 h-8 border border-neutral-300 flex items-center justify-center hover:border-black">
                            {product.inStock ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="border border-black">
            <div className="divide-y divide-neutral-200">
              {orders.map(order => (
                <div key={order.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center">
                      <Package className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">{order.product}</p>
                      <p className="text-xs text-neutral-500">{order.id} • {order.customer} • {order.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono">${order.amount}</span>
                    <span className={`px-2 py-0.5 text-xs ${
                      order.status === "delivered" 
                        ? "bg-neutral-100" 
                        : order.status === "shipped"
                          ? "bg-black text-white"
                          : "border border-black"
                    }`}>
                      {order.status}
                    </span>
                    {order.status === "pending" && (
                      <Button className="bg-black text-white text-xs uppercase tracking-widest">
                        <Truck className="w-3 h-3 mr-1" />
                        Ship
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Product Modal */}
        {showNewProduct && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewProduct(false)}
          >
            <div 
              className="bg-white max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-black">
                <h2 className="text-sm font-bold uppercase tracking-widest">Add Product</h2>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                      Product Name
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Signed Polaroid"
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
                      placeholder="Product description..."
                      className="w-full p-3 border border-black text-sm min-h-[80px] resize-none focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                        Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                        <Input
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="0.00"
                          className="pl-7 border-black"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-black text-sm focus:outline-none bg-white"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={limited}
                      onChange={(e) => setLimited(e.target.checked)}
                      className="w-4 h-4 border border-black"
                    />
                    <span className="text-xs">Limited Edition</span>
                  </label>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setShowNewProduct(false)}
                    className="flex-1 border-black text-xs uppercase tracking-widest"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateProduct}
                    disabled={!name || !price}
                    className="flex-1 bg-black text-white text-xs uppercase tracking-widest"
                  >
                    Add Product
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
