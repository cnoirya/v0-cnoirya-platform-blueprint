'use client'

import Link from "next/link"

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-black">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <Link href="/" className="text-lg tracking-tight">CNOIRYA</Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-3xl w-full text-center">
          <div className="mb-12">
            <p className="text-8xl font-bold tracking-tighter mb-4">500</p>
            <h1 className="text-sm font-bold uppercase tracking-widest mb-4">Server Error</h1>
            <p className="text-xs text-neutral-600 mb-8">
              Something went wrong on our end. Please try again in a few moments, or contact support if the problem persists.
            </p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => window.location.reload()}
              className="inline-block px-6 py-2 border border-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Refresh Page
            </button>
          </div>

          <div className="mt-12 pt-12 border-t border-black">
            <div className="grid grid-cols-3 gap-4 text-xs">
              <Link href="/" className="text-neutral-600 hover:text-black transition-colors">Home</Link>
              <a href="mailto:support@cnoirya.com" className="text-neutral-600 hover:text-black transition-colors">Support</a>
              <Link href="/privacy" className="text-neutral-600 hover:text-black transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
