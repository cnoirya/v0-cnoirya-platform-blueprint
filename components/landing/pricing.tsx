import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const tiers = [
  {
    name: 'Standard',
    price: '$14.99',
    period: '/month',
    description: 'Essential access to exclusive content',
    features: [
      'Full photo gallery access',
      'Weekly video releases',
      'Community access',
      'Monthly live stream'
    ],
    popular: false
  },
  {
    name: 'Premium',
    price: '$29.99',
    period: '/month',
    description: 'Enhanced access with direct connection',
    features: [
      'Everything in Standard',
      'Direct messaging',
      'Early content access',
      'Weekly live streams',
      'Exclusive PPV discounts'
    ],
    popular: true
  },
  {
    name: 'VIP',
    price: '$99.99',
    period: '/month',
    description: 'Ultimate access and priority treatment',
    features: [
      'Everything in Premium',
      'Custom content requests',
      'Private video calls',
      'Exclusive merchandise',
      'NFT drops access',
      'Priority support'
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
            MEMBERSHIP TIERS
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Choose Your Access Level
          </h2>
          <p className="text-sm text-muted-foreground">
            All plans include discreet billing and cancel anytime.
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
          Crypto payments accepted via NowPayments. Fiat via CCBill.
        </p>
      </div>
    </section>
  )
}
