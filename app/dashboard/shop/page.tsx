"use client"

import { useState } from "react"
import { ShoppingBag, Package, Truck, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  inStock: boolean
  limited?: boolean
  image: string
}

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<Product[]>([])
  const [showCheckout, setShowCheckout] = useState(false)

  const products: Product[] = [
    {
      id: "1",
      name: "Signed Polaroid",
      description: "Hand-signed exclusive polaroid photograph",
      price: 25,
      category: "photos",
      inStock: true,
      limited: true,
      image: "/product-1.jpg"
    },
    {
      id: "2",
      name: "Exclusive Poster",
      description: "Limited edition 18x24 poster print",
      price: 35,
      category: "prints",
      inStock: true,
      image: "/product-2.jpg"
    },
    {
      id: "3",
      name: "Digital Bundle",
      description: "50+ exclusive photos in high resolution",
      price: 50,
      category: "digital",
      inStock: true,
      image: "/product-3.jpg"
    },
    {
      id: "4",
      name: "Custom Video USB",
      description: "Personalized video content on encrypted USB",
      price: 100,
      category: "custom",
      inStock: true,
      limited: true,
      image: "/product-4.jpg"
    },
    {
      id: "5",
      name: "Calendar 2026",
      description: "Exclusive 12-month wall calendar",
      price: 30,
      category: "prints",
      inStock: false,
      image: "/product-5.jpg"
    },
    {
      id: "6",
      name: "Mystery Box",
      description: "Surprise collection of exclusive items",
      price: 75,
      category: "special",
      inStock: true,
      limited: true,
      image: "/product-6.jpg"
    }
  ]

  const categories = [
    { id: "all", name: "All" },
    { id: "photos", name: "Photos" },
    { id: "prints", name: "Prints" },
    { id: "digital", name: "Digital" },
    { id: "custom", name: "Custom" },
    { id: "special", name: "Special" }
  ]

  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory)

  const addToCart = (product: Product) => {
    setCart([...cart, product])
    setSelectedProduct(null)
  }

  const removeFromCart = (productId: string) => {
    const index = cart.findIndex(p => p.id === productId)
    if (index > -1) {
      const newCart = [...cart]
      newCart.splice(index, 1)
      setCart(newCart)
    }
  }

  const cartTotal = cart.reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-sm font-bold uppercase tracking-widest">Shop</h1>
          <button 
            onClick={() => setShowCheckout(true)}
            className="relative p-2 border border-black"
          >
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-xs flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap ${
                activeCategory === cat.id 
                  ? "bg-black text-white" 
                  : "border border-neutral-300 hover:border-black"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className={`border cursor-pointer ${
                product.inStock ? "border-black hover:bg-neutral-50" : "border-neutral-200 opacity-50"
              }`}
              onClick={() => product.inStock && setSelectedProduct(product)}
            >
              <div className="aspect-square bg-neutral-100 flex items-center justify-center relative">
                <Package className="w-12 h-12 text-neutral-300" />
                {product.limited && (
                  <span className="absolute top-2 left-2 px-2 py-1 bg-black text-white text-xs">
                    Limited
                  </span>
                )}
                {!product.inStock && (
                  <span className="absolute inset-0 bg-white/80 flex items-center justify-center text-xs uppercase tracking-widest">
                    Sold Out
                  </span>
                )}
              </div>
              <div className="p-3 border-t border-inherit">
                <p className="text-xs font-bold truncate">{product.name}</p>
                <p className="text-xs text-neutral-500">${product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <div 
              className="bg-white max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-neutral-100 flex items-center justify-center relative">
                <Package className="w-16 h-16 text-neutral-300" />
                {selectedProduct.limited && (
                  <span className="absolute top-4 left-4 px-2 py-1 bg-black text-white text-xs">
                    Limited Edition
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-bold">{selectedProduct.name}</p>
                    <p className="text-xs text-neutral-500 capitalize">{selectedProduct.category}</p>
                  </div>
                  <p className="text-lg font-bold font-mono">${selectedProduct.price}</p>
                </div>
                
                <p className="text-xs text-neutral-600 mb-6">{selectedProduct.description}</p>

                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
                  <Truck className="w-4 h-4" />
                  <span>Ships within 3-5 business days</span>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedProduct(null)}
                    className="flex-1 border-black text-xs uppercase tracking-widest"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => addToCart(selectedProduct)}
                    className="flex-1 bg-black text-white text-xs uppercase tracking-widest"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCheckout(false)}
          >
            <div 
              className="bg-white max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-black">
                <h2 className="text-sm font-bold uppercase tracking-widest">Your Cart</h2>
              </div>

              {cart.length === 0 ? (
                <div className="p-12 text-center">
                  <ShoppingBag className="w-8 h-8 mx-auto mb-4 text-neutral-300" />
                  <p className="text-xs text-neutral-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-neutral-200">
                    {cart.map((item, i) => (
                      <div key={`${item.id}-${i}`} className="p-4 flex items-center gap-4">
                        <div className="w-16 h-16 bg-neutral-100 flex items-center justify-center shrink-0">
                          <Package className="w-6 h-6 text-neutral-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate">{item.name}</p>
                          <p className="text-xs text-neutral-500">${item.price}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-neutral-500 hover:text-black"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 border-t border-black">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase tracking-widest">Total</span>
                      <span className="text-lg font-bold font-mono">${cartTotal}</span>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                          Email
                        </label>
                        <Input placeholder="your@email.com" className="border-black" />
                      </div>
                      <div>
                        <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                          Shipping Address
                        </label>
                        <textarea
                          placeholder="Full address..."
                          className="w-full p-3 border border-black text-sm min-h-[80px] resize-none focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => setShowCheckout(false)}
                        className="flex-1 border-black text-xs uppercase tracking-widest"
                      >
                        Continue Shopping
                      </Button>
                      <Button 
                        className="flex-1 bg-black text-white text-xs uppercase tracking-widest"
                      >
                        Checkout
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
