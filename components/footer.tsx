import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-xs font-bold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/content" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Content
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/live" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Live
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-bold mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Subscribe
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/2257" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  18 USC 2257
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  DMCA
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            CNOIRYA. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Restricted access. Verification required.
          </p>
        </div>
      </div>
    </footer>
  )
}
