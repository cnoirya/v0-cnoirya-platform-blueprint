import Link from 'next/link'
import { Button } from '@/components/ui/button'

const tiers = [
  {
    name: 'Devotee',
    price: '$14.99',
    period: '/mo',
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
    period: '/mo',
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
    period: '/mo',
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
    <section className="py-32 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
            Access Tiers
          </p>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
            Choose Your Layer
          </h2>
          <p className="text-xs text-muted-foreground font-light">
            Discreet processing. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {tiers.map((tier) => (
            <div 
              key={tier.name} 
              className={`bg-background p-8 flex flex-col ${tier.popular ? 'ring-1 ring-foreground ring-inset' : ''}`}
            >
              {tier.popular && (
                <p className="text-[10px] tracking-[0.3em] uppercase mb-6">
                  Most Popular
                </p>
              )}
              <h3 className="text-xs tracking-wider uppercase font-medium mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl font-light">{tier.price}</span>
                <span className="text-[10px] tracking-wider uppercase text-muted-foreground">{tier.period}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-8 font-light">
                {tier.description}
              </p>
              
              <ul className="flex-1 space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-xs font-light">
                    <span className="w-1 h-1 bg-foreground rounded-full mt-1.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={`/subscribe?tier=${tier.name.toLowerCase()}`}>
                <Button 
                  variant={tier.popular ? 'default' : 'outline'} 
                  className="w-full text-xs tracking-wider uppercase h-11"
                >
                  Select
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] tracking-wider uppercase text-muted-foreground mt-10">
          Crypto payments via NOWPayments
        </p>
      </div>
    </section>
  )
}
