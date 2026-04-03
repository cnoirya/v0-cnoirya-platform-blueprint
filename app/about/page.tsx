import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <Link href="/" className="text-lg tracking-tight">CNOIRYA</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-sm font-bold uppercase tracking-widest mb-8">About</h1>
        
        <div className="space-y-8 text-xs leading-relaxed">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Platform Vision</h2>
            <p className="text-neutral-600 mb-4">
              CNOIRYA represents a sovereign, independently operated membership platform designed for 
              creators who demand absolute control over their content, revenue, and intellectual property. 
              This is a direct alternative to traditional multi-creator platforms, consolidating advanced 
              features from reference implementations into a single, unified system optimized for maximum 
              creator autonomy and revenue generation.
            </p>
            <p className="text-neutral-600">
              Built on principles of minimal design, editorial clarity, and operational security, the platform 
              prioritizes creator dignity, subscriber exclusivity, and seamless monetization across diverse 
              content types and transaction models.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Creator Autonomy</h2>
            <p className="text-neutral-600 mb-2">
              CNOIRYA is a sole-creator platform. There is one creative vision, one revenue stream, one decision-maker.
            </p>
            <ul className="list-disc pl-4 text-neutral-600 space-y-1">
              <li>100% ownership and control by the creator</li>
              <li>Sole discretion over all content, pricing, and member access policies</li>
              <li>Direct retention of 80% of gross revenue</li>
              <li>No multi-creator routing or collaboration model</li>
              <li>Flexible content classification (standard and explicit, governed by creator discretion and applicable law)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Content Protection & Security</h2>
            <p className="text-neutral-600 mb-2">
              Advanced anti-piracy and content protection infrastructure:
            </p>
            <ul className="list-disc pl-4 text-neutral-600 space-y-1">
              <li>Video DRM (VdoCipher with Widevine + FairPlay)</li>
              <li>Dynamic per-user watermarking on all video content</li>
              <li>Invisible steganographic fingerprinting (Imatag) for evidence collection</li>
              <li>Per-file, per-user, and per-session cryptographic tracking</li>
              <li>OS-level screen capture blocking for image content</li>
              <li>Automated image watermarking on all media ingest</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Monetization Models</h2>
            <p className="text-neutral-600 mb-2">
              Multiple flexible revenue streams, all processed directly in cryptocurrency:
            </p>
            <ul className="list-disc pl-4 text-neutral-600 space-y-1">
              <li>Tiered recurring subscriptions with unlimited tier definitions</li>
              <li>Per-content pay-per-view (PPV) unlocks</li>
              <li>Multi-month prepaid bundles with discounting</li>
              <li>Custom content order deposits with milestone-based payment staging</li>
              <li>One-time monetary transfers (tips) with leaderboard tracking</li>
              <li>Private audio/video session bookings (calendar-based)</li>
              <li>Live broadcast monetization with real-time unlock offers</li>
              <li>Limited-release inventory-gated content</li>
              <li>Contribution campaigns with cumulative progress tracking</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Payments & Settlement</h2>
            <p className="text-neutral-600 mb-2">
              Cryptocurrency-only processing with no transaction ceilings or conversion friction:
            </p>
            <ul className="list-disc pl-4 text-neutral-600 space-y-1">
              <li>Primary processor: NowPayments (350+ supported cryptocurrencies)</li>
              <li>Secondary processor: Paxum (fiat settlement and outbound transfers)</li>
              <li>Enterprise support: BitPay integration for large-scale processing</li>
              <li>Real-time exchange rates at checkout with volatility disclosure</li>
              <li>No imposed ceiling on transaction amounts</li>
              <li>Automated recurring billing, dunning management, and settlement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Age Verification & Compliance</h2>
            <p className="text-neutral-600 mb-2">
              Enterprise-grade identity verification infrastructure:
            </p>
            <ul className="list-disc pl-4 text-neutral-600 space-y-1">
              <li>Age verification via Veriff or Sumsub</li>
              <li>Compliant with UK Online Safety Act, EU DSA, and applicable U.S. statutes</li>
              <li>Geographic enforcement and restriction options</li>
              <li>High-value user KYC via Amazon Rekognition</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Infrastructure</h2>
            <p className="text-neutral-600 mb-2">
              Optimized for reliability, security, and uncompromising performance:
            </p>
            <ul className="list-disc pl-4 text-neutral-600 space-y-1">
              <li>Dedicated 10Gbps uplink with NVMe storage</li>
              <li>Cloudflare Pro WAF with advanced DDoS mitigation</li>
              <li>AES-256 encrypted offsite backups with daily automation</li>
              <li>CrowdStrike Falcon endpoint detection and response</li>
              <li>ELK-stack audit logging for all administrative and user actions</li>
              <li>Elasticsearch for internal search and content discovery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Refund & Dispute Policy</h2>
            <p className="text-neutral-600">
              All transactions are final upon payment confirmation. No refunds or returns are issued on any 
              transaction category, including subscriptions, access unlocks, monetary transfers, session bookings, 
              custom orders, product purchases, limited releases, or contribution campaigns. Discretionary exceptions 
              may be considered by the creator in cases of verified technical failure or confirmed fraud. Disputed 
              charges or chargebacks may result in immediate account termination, permanent suspension, and legal referral.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Design Philosophy</h2>
            <p className="text-neutral-600">
              Minimal. Clean. Editorial. Full white background, black Helvetica Neue font. 
              Maximum clarity with zero decorative excess. Every interface element serves a purpose. 
              Every interaction is intentional.
            </p>
          </section>

          <p className="text-neutral-400 pt-8">Last updated: April 2026</p>
        </div>
      </main>
    </div>
  )
}
