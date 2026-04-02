import { Lock, MessageCircle, Video, Crown, Gift, Zap } from 'lucide-react'

const features = [
  {
    icon: Video,
    title: 'Exclusive Content',
    description: 'HD photos and videos updated weekly. DRM protected.'
  },
  {
    icon: MessageCircle,
    title: 'Direct Messages',
    description: 'Private conversations and personalized content requests.'
  },
  {
    icon: Crown,
    title: 'VIP Access',
    description: 'Early access to new content and exclusive drops.'
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Discreet billing. Your privacy is protected.'
  },
  {
    icon: Zap,
    title: 'Live Sessions',
    description: 'Interactive live streams with real-time engagement.'
  },
  {
    icon: Gift,
    title: 'Custom Orders',
    description: 'Request personalized content made just for you.'
  }
]

export function Features() {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4">
            WHAT YOU GET
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Membership Benefits
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
