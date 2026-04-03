import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div>
            <h4 className="text-[10px] tracking-wider uppercase text-muted-foreground mb-5">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/content" className="text-xs text-foreground/70 hover:text-foreground transition-colors">
                  Content
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-xs text-foreground/70 hover:text-foreground transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/live" className="text-xs text-foreground/70 hover:text-foreground transition-colors">
                  Live
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] tracking-wider uppercase text-muted-foreground mb-5">Account</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/login" className="text-xs text-foreground/70 hover:text-foreground transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="text-xs text-foreground/70 hover:text-foreground transition-colors">
                  Subscribe
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-xs text-foreground/70 hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] tracking-wider uppercase text-muted-foreground mb-5">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-xs text-foreground/70 hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-xs text-foreground/70 hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-xs text-foreground/70 hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] tracking-wider uppercase text-muted-foreground mb-5">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-xs text-foreground/70 hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs text-foreground/70 hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-xs text-foreground/70 hover:text-foreground transition-colors">
                  DMCA
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-wider uppercase text-muted-foreground">
            CNOIRYA
          </p>
          <p className="text-[10px] tracking-wider uppercase text-muted-foreground">
            Restricted access
          </p>
        </div>
      </div>
    </footer>
  )
}
