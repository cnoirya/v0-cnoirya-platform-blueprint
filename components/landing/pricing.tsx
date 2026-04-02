import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const tiers = [
  {
    name: 'Devotee',
    price: '$14.99',
    period: ' USDT/mo',
    description: 'Entry to the sovereign world',
    features: [
      'Full visual archive access',
      'Weekly releases',
      'Community channels',
      'Monthly live transmission'
    ],
    popular: false
  },
  {
    name: 'Chosen',
    price: '$29.99',
    period: ' USDT/mo',
    description: 'Deeper access. Direct connection.',
    features: [
      'Everything in Devotee',
      'Private messaging',
      'Priority access',
      'Weekly transmissions',
      'Patron-only pricing'
    ],
    popular: true
  },
  {
    name: 'Inner Circle',
    price: '$99.99',
    period: ' USDT/mo',
    description: 'The innermost layer. Full sovereignty.',
    features: [
      'Everything in Chosen',
      'Commissioned works',
      'Private sessions',
      'Limited edition drops',
      'NFT access',
      'Priority response'
    ],
    popular: false
  }
]

export function Pricing() {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4">
            ACCESS TIERS
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Choose Your Layer
          </h2>
          <p className="text-sm text-muted-foreground">
            Discreet processing. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div 
              key={tier.name} 
              className={`p-6 border ${tier.popular ? 'border-foreground' : 'border-border'} flex flex-col`}
            >
              {tier.popular && (
                <p className="text-xs tracking-[0.2em] text-foreground mb-4">
                  MOST POPULAR
                </p>
              )}
              <h3 className="text-sm font-bold mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-xs text-muted-foreground">{tier.period}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                {tier.description}
              </p>
              
              <ul className="flex-1 space-y-3 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs">
                    <Check className="h-3 w-3 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={`/subscribe?tier=${tier.name.toLowerCase()}`}>
                <Button 
                  variant={tier.popular ? 'default' : 'outline'} 
                  className="w-full text-sm"
                >
                  Select {tier.name}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          USDT payments via NOWPayments. Secure and private.
        </p>
      </div>
    </section>
  )
}
