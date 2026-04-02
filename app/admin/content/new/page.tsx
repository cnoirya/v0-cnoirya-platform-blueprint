"use client"

import { useState } from "react"
import { Upload, Image as ImageIcon, Video, FileText, Lock, Eye, DollarSign, Users, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

type ContentType = "photo" | "video" | "gallery" | "text"
type AccessType = "free" | "subscribers" | "tier" | "ppv"

interface AccessRule {
  type: "tier" | "ppv" | "nft" | "custom"
  value: string
}

export default function NewContentPage() {
  const [contentType, setContentType] = useState<ContentType>("photo")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [accessType, setAccessType] = useState<AccessType>("subscribers")
  const [ppvPrice, setPpvPrice] = useState("")
  const [selectedTiers, setSelectedTiers] = useState<string[]>(["premium", "vip"])
  const [scheduleDate, setScheduleDate] = useState("")
  const [enableWatermark, setEnableWatermark] = useState(true)
  const [enableDRM, setEnableDRM] = useState(true)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const tiers = [
    { id: "free", name: "Free Followers", price: 0 },
    { id: "basic", name: "Basic", price: 9.99 },
    { id: "premium", name: "Premium", price: 19.99 },
    { id: "vip", name: "VIP", price: 49.99 },
  ]

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handlePublish = () => {
    console.log("Publishing:", { contentType, title, description, accessType, ppvPrice, selectedTiers, scheduleDate })
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-sm font-bold uppercase tracking-widest">Upload Content</h1>
          <Link href="/admin/content" className="text-xs text-neutral-500 hover:text-black">
            Cancel
          </Link>
        </div>

        {/* Content Type */}
        <div className="mb-6">
          <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-3">
            Content Type
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: "photo", icon: ImageIcon, label: "Photo" },
              { id: "video", icon: Video, label: "Video" },
              { id: "gallery", icon: ImageIcon, label: "Gallery" },
              { id: "text", icon: FileText, label: "Text Post" },
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setContentType(type.id as ContentType)}
                className={`p-4 border flex flex-col items-center gap-2 ${
                  contentType === type.id 
                    ? "bg-black text-white border-black" 
                    : "border-neutral-300 hover:border-black"
                }`}
              >
                <type.icon className="w-5 h-5" />
                <span className="text-xs">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Upload Area */}
        {contentType !== "text" && (
          <div className="mb-6">
            <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-3">
              Upload {contentType === "gallery" ? "Files" : "File"}
            </label>
            <div className="border-2 border-dashed border-neutral-300 p-8 text-center hover:border-black cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-3 text-neutral-400" />
              <p className="text-xs mb-1">Drag and drop or click to upload</p>
              <p className="text-xs text-neutral-500">
                {contentType === "photo" && "JPG, PNG, WEBP up to 50MB"}
                {contentType === "video" && "MP4, MOV up to 5GB"}
                {contentType === "gallery" && "Multiple images up to 50MB each"}
              </p>
            </div>
          </div>
        )}

        {/* Title & Description */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
              Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your content a title..."
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
              placeholder="Add a caption or description..."
              className="w-full p-3 border border-black text-sm min-h-[100px] resize-none focus:outline-none"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              placeholder="Add a tag..."
              className="border-black"
            />
            <Button onClick={addTag} variant="outline" className="border-black">
              Add
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-neutral-100 text-xs flex items-center gap-1">
                  #{tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Access Control */}
        <div className="border border-black p-6 mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Access Control
          </h2>

          <div className="space-y-3 mb-4">
            {[
              { id: "free", icon: Eye, label: "Free for Everyone", description: "Visible to all visitors" },
              { id: "subscribers", icon: Users, label: "All Subscribers", description: "Any paid subscription tier" },
              { id: "tier", icon: Users, label: "Specific Tiers", description: "Select which tiers can access" },
              { id: "ppv", icon: DollarSign, label: "Pay-Per-View", description: "One-time purchase to unlock" },
            ].map(option => (
              <label
                key={option.id}
                className={`flex items-center gap-3 p-3 border cursor-pointer ${
                  accessType === option.id 
                    ? "border-black bg-neutral-50" 
                    : "border-neutral-200 hover:border-neutral-400"
                }`}
              >
                <input
                  type="radio"
                  name="access"
                  checked={accessType === option.id}
                  onChange={() => setAccessType(option.id as AccessType)}
                  className="sr-only"
                />
                <option.icon className="w-4 h-4 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-bold">{option.label}</p>
                  <p className="text-xs text-neutral-500">{option.description}</p>
                </div>
                <div className={`w-4 h-4 border-2 rounded-full ${
                  accessType === option.id ? "border-black bg-black" : "border-neutral-300"
                }`} />
              </label>
            ))}
          </div>

          {/* Tier Selection */}
          {accessType === "tier" && (
            <div className="mb-4 p-4 bg-neutral-50 border border-neutral-200">
              <p className="text-xs text-neutral-500 uppercase tracking-widest mb-3">Select Tiers</p>
              <div className="space-y-2">
                {tiers.filter(t => t.id !== "free").map(tier => (
                  <label key={tier.id} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedTiers.includes(tier.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTiers([...selectedTiers, tier.id])
                          } else {
                            setSelectedTiers(selectedTiers.filter(t => t !== tier.id))
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-xs">{tier.name}</span>
                    </div>
                    <span className="text-xs text-neutral-500">${tier.price}/mo</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* PPV Price */}
          {accessType === "ppv" && (
            <div className="mb-4 p-4 bg-neutral-50 border border-neutral-200">
              <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                PPV Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                <Input
                  type="number"
                  value={ppvPrice}
                  onChange={(e) => setPpvPrice(e.target.value)}
                  placeholder="9.99"
                  className="pl-7 border-black"
                  step="0.01"
                />
              </div>
            </div>
          )}
        </div>

        {/* Content Protection */}
        <div className="border border-black p-6 mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4">Content Protection</h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-xs font-bold">Watermark</p>
                <p className="text-xs text-neutral-500">Add visible watermark to content</p>
              </div>
              <input
                type="checkbox"
                checked={enableWatermark}
                onChange={(e) => setEnableWatermark(e.target.checked)}
                className="w-4 h-4"
              />
            </label>
            {contentType === "video" && (
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-xs font-bold">DRM Protection</p>
                  <p className="text-xs text-neutral-500">Enable multi-DRM video protection</p>
                </div>
                <input
                  type="checkbox"
                  checked={enableDRM}
                  onChange={(e) => setEnableDRM(e.target.checked)}
                  className="w-4 h-4"
                />
              </label>
            )}
          </div>
        </div>

        {/* Schedule */}
        <div className="border border-black p-6 mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule
          </h2>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="schedule"
                checked={!scheduleDate}
                onChange={() => setScheduleDate("")}
                className="w-4 h-4"
              />
              <span className="text-xs">Publish Now</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="schedule"
                checked={!!scheduleDate}
                onChange={() => setScheduleDate(new Date().toISOString().slice(0, 16))}
                className="w-4 h-4"
              />
              <span className="text-xs">Schedule</span>
            </label>
          </div>
          {scheduleDate && (
            <Input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="mt-3 border-black"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 border-black text-xs uppercase tracking-widest">
            Save Draft
          </Button>
          <Button 
            onClick={handlePublish}
            className="flex-1 bg-black text-white text-xs uppercase tracking-widest"
          >
            {scheduleDate ? "Schedule" : "Publish"}
          </Button>
        </div>
      </div>
    </div>
  )
}
