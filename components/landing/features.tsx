import { Lock, MessageCircle, Video, Crown, Gift, Zap } from 'lucide-react'

const features = [
  {
    icon: Video,
    title: 'The Vault',
    description: 'Artistic visual archives. Protected and encrypted.'
  },
  {
    icon: MessageCircle,
    title: 'Inner Circle',
    description: 'Direct access. Private conversations. Personalized connection.'
  },
  {
    icon: Crown,
    title: 'Sovereign Access',
    description: 'Priority entry to new releases and limited drops.'
  },
  {
    icon: Lock,
    title: 'Zero Trace',
    description: 'Discreet processing. Your identity protected.'
  },
  {
    icon: Zap,
    title: 'Live Transmissions',
    description: 'Real-time presence. Interactive sessions.'
  },
  {
    icon: Gift,
    title: 'Commissioned Works',
    description: 'Request bespoke artistic creations.'
  }
]

export function Features() {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4">
            THE INNER WORLD
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Patron Privileges
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 border border-border hover:border-foreground/20 transition-colors">
              <feature.icon className="h-5 w-5 mb-4" strokeWidth={1.5} />
              <h3 className="text-sm font-bold mb-2">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
