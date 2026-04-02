import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] text-muted-foreground mb-6">
          EXCLUSIVE MEMBERSHIP
        </p>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
          CNOIRYA
        </h1>
        
        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
          Premium adult content. Exclusive access. Direct connection. 
          Join the inner circle.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/subscribe">
            <Button size="lg" className="text-sm min-w-[180px]">
              Subscribe Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/preview">
            <Button variant="outline" size="lg" className="text-sm min-w-[180px]">
              Preview Content
            </Button>
          </Link>
        </div>

        <p className="mt-12 text-xs text-muted-foreground">
          18+ Only. Age verification required.
        </p>
      </div>
    </section>
  )
}
