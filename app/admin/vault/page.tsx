'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, File, Trash2, Download, Eye, Lock } from 'lucide-react'

export default function AdminVaultPage() {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'photoset-001.zip',
      type: 'archive',
      size: '245 MB',
      uploadedDate: 'Mar 28, 2026',
      views: 1247,
      accessLevel: 'vip',
      tags: ['exclusive', 'archive'],
      watermarked: true
    },
    {
      id: 2,
      name: 'video-transmission-042.mp4',
      type: 'video',
      size: '1.2 GB',
      uploadedDate: 'Mar 25, 2026',
      views: 3421,
      accessLevel: 'standard',
      tags: ['video', 'transmission'],
      watermarked: true
    },
    {
      id: 3,
      name: 'audio-message-bundle.zip',
      type: 'archive',
      size: '180 MB',
      uploadedDate: 'Mar 20, 2026',
      views: 876,
      accessLevel: 'standard',
      tags: ['audio', 'personal'],
      watermarked: false
    }
  ])

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFiles = files.filter(file => {
    if (filter !== 'all' && file.accessLevel !== filter) return false
    if (searchTerm && !file.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  return (
    <div className="p-6 pb-24 lg:pb-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-sm font-bold mb-2">Vault</h1>
        <p className="text-[10px] text-muted-foreground mb-6">
          Unlimited private content storage with forensic watermarking and access control
        </p>

        {/* Upload section */}
        <div className="border-2 border-dashed border-border p-8 mb-8 flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors">
          <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
          <p className="text-xs font-bold mb-1">Drag and drop files or click to browse</p>
          <p className="text-[10px] text-muted-foreground">Supports: JPG, PNG, MP4, MP3, ZIP</p>
        </div>

        {/* Vault stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-border p-4">
            <p className="text-[10px] text-muted-foreground mb-1">Total Files</p>
            <p className="text-2xl font-bold">{files.length}</p>
          </div>
          <div className="border border-border p-4">
            <p className="text-[10px] text-muted-foreground mb-1">Total Views</p>
            <p className="text-2xl font-bold">{files.reduce((sum, f) => sum + f.views, 0).toLocaleString()}</p>
          </div>
          <div className="border border-border p-4">
            <p className="text-[10px] text-muted-foreground mb-1">Total Size</p>
            <p className="text-2xl font-bold">2.6 GB</p>
          </div>
          <div className="border border-border p-4">
            <p className="text-[10px] text-muted-foreground mb-1">Storage Used</p>
            <p className="text-2xl font-bold">2.6 GB</p>
          </div>
        </div>

        {/* Controls */}
        <div className="border border-border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-xs mb-2">Search files</label>
              <Input
                placeholder="Search by filename or tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-xs"
              />
            </div>
            <div>
              <label className="block text-xs mb-2">Filter by access level</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-xs border border-border bg-transparent px-3 py-2"
              >
                <option value="all">All Files</option>
                <option value="standard">Standard</option>
                <option value="vip">VIP Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* File list */}
        <div className="border border-border overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-secondary text-xs font-bold border-b border-border">
            <div className="col-span-3">Filename</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-1">Size</div>
            <div className="col-span-1">Views</div>
            <div className="col-span-2">Access Level</div>
            <div className="col-span-3">Actions</div>
          </div>

          <div className="divide-y divide-border">
            {filteredFiles.map((file) => (
              <div key={file.id} className="p-4 hover:bg-secondary/30 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs font-bold">{file.name}</p>
                        <p className="text-[10px] text-muted-foreground">{file.uploadedDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <span className="text-xs uppercase tracking-tight">{file.type}</span>
                  </div>

                  <div className="md:col-span-1">
                    <span className="text-xs text-muted-foreground">{file.size}</span>
                  </div>

                  <div className="md:col-span-1">
                    <span className="text-xs font-bold">{file.views}</span>
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2">
                      {file.watermarked && (
                        <Lock className="h-3 w-3 text-muted-foreground" title="Watermarked" />
                      )}
                      <span className="text-xs uppercase tracking-tight">{file.accessLevel}</span>
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors" title="Download">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {file.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-1 bg-secondary text-muted-foreground rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredFiles.length === 0 && (
          <div className="border border-border p-12 text-center">
            <p className="text-xs text-muted-foreground">No files found. Upload your first vault item to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
