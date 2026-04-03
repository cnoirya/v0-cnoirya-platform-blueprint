import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-8">
          Exclusive Membership
        </p>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[-0.02em] mb-8">
          CNOIRYA
        </h1>
        
        <div className="w-16 h-px bg-foreground/20 mx-auto mb-8" />
        
        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mb-12 leading-relaxed font-light">
          A sovereign archetype. Dark feminine empire. 
          Enter the inner world.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/subscribe">
            <Button size="lg" className="text-xs tracking-wider uppercase min-w-[200px] h-12">
              Subscribe
            </Button>
          </Link>
          <Link href="/preview">
            <Button variant="outline" size="lg" className="text-xs tracking-wider uppercase min-w-[200px] h-12">
              Preview
            </Button>
          </Link>
        </div>

        <p className="mt-16 text-[10px] tracking-wider uppercase text-muted-foreground">
          Restricted access
        </p>
      </div>
    </section>
  )
}
