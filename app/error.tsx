'use client'

import Link from "next/link"

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm tracking-[0.1em] font-light">CNOIRYA</Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-3xl w-full text-center">
          <div className="mb-12">
            <p className="text-7xl font-light tracking-tighter mb-6">500</p>
            <h1 className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Server Error</h1>
            <p className="text-xs text-muted-foreground font-light leading-relaxed max-w-sm mx-auto">
              Something went wrong. Please try again in a few moments.
            </p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => reset()}
              className="inline-block px-8 py-3 border border-foreground text-[10px] tracking-wider uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              Try Again
            </button>
          </div>

          <div className="mt-16 pt-10 border-t border-border">
            <div className="flex items-center justify-center gap-8 text-[10px] tracking-wider uppercase">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
