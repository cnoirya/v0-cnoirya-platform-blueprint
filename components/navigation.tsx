'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg tracking-tight">
          CNOIRYA
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/content" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Content
          </Link>
          <Link href="/membership" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Membership
          </Link>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-sm">
              Sign In
            </Button>
          </Link>
          <Link href="/subscribe">
            <Button size="sm" className="text-sm">
              Subscribe
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link 
              href="/content" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Content
            </Link>
            <Link 
              href="/membership" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Membership
            </Link>
            <Link 
              href="/about" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 border-t border-border flex flex-col gap-2">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full text-sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/subscribe" onClick={() => setIsOpen(false)}>
                <Button size="sm" className="w-full text-sm">
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
