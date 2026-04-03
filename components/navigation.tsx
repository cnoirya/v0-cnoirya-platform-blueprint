'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm tracking-[0.1em] font-light">
          CNOIRYA
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link href="/content" className="text-[11px] tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors">
            Content
          </Link>
          <Link href="/membership" className="text-[11px] tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors">
            Membership
          </Link>
          <Link href="/about" className="text-[11px] tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/login" className="text-[11px] tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors">
            Sign In
          </Link>
          <Link href="/subscribe">
            <Button size="sm" className="text-[10px] tracking-wider uppercase h-8 px-5">
              Subscribe
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" strokeWidth={1} /> : <Menu className="h-5 w-5" strokeWidth={1} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-6 flex flex-col gap-5">
            <Link 
              href="/content" 
              className="text-[11px] tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Content
            </Link>
            <Link 
              href="/membership" 
              className="text-[11px] tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Membership
            </Link>
            <Link 
              href="/about" 
              className="text-[11px] tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <div className="pt-5 border-t border-border flex flex-col gap-3">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" size="sm" className="w-full text-[10px] tracking-wider uppercase h-10">
                  Sign In
                </Button>
              </Link>
              <Link href="/subscribe" onClick={() => setIsOpen(false)}>
                <Button size="sm" className="w-full text-[10px] tracking-wider uppercase h-10">
                  Subscribe
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
