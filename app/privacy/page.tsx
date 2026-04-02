import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <Link href="/" className="text-lg tracking-tight">CNOIRYA</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-sm font-bold uppercase tracking-widest mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-xs leading-relaxed">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">1. Information We Collect</h2>
            <p className="text-neutral-600 mb-2">We collect information you provide directly, including:</p>
            <ul className="list-disc pl-4 text-neutral-600 space-y-1">
              <li>Account information (email, username, password)</li>
              <li>Payment information (processed securely via third-party processors)</li>
              <li>Age verification data</li>
              <li>Communications and messages within the platform</li>
              <li>Content preferences and viewing history</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">2. Automatic Data Collection</h2>
            <p className="text-neutral-600 mb-2">We automatically collect certain information when you use our platform:</p>
            <ul className="list-disc pl-4 text-neutral-600 space-y-1">
              <li>Device information (browser type, operating system)</li>
              <li>IP address and approximate location</li>
              <li>Usage data and interaction patterns</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">3. How We Use Your Information</h2>
            <p className="text-neutral-600 mb-2">We use collected information to:</p>
            <ul className="list-disc pl-4 text-neutral-600 space-y-1">
              <li>Provide and improve our services</li>
              <li>Process payments and subscriptions</li>
              <li>Verify age and identity</li>
              <li>Prevent fraud and unauthorized access</li>
              <li>Send service-related communications</li>
              <li>Personalize your experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">4. Information Sharing</h2>
            <p className="text-neutral-600 mb-2">We may share your information with:</p>
            <ul className="list-disc pl-4 text-neutral-600 space-y-1">
              <li>Payment processors (CCBill, NowPayments) for transaction processing</li>
              <li>Age verification services (Veriff, Sumsub) for compliance</li>
              <li>Content delivery networks for secure content delivery</li>
              <li>Law enforcement when required by law</li>
            </ul>
            <p className="text-neutral-600 mt-2">
              We never sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">5. Data Security</h2>
            <p className="text-neutral-600">
              We implement industry-standard security measures including AES-256 encryption, 
              secure HTTPS connections, and regular security audits. Payment information is 
              processed through PCI-compliant payment processors and is never stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">6. Data Retention</h2>
            <p className="text-neutral-600">
              We retain your information for as long as your account is active or as needed to provide services. 
              You may request deletion of your account and associated data at any time. Some information may be 
              retained to comply with legal obligations or resolve disputes.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">7. Your Rights</h2>
            <p className="text-neutral-600 mb-2">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-4 text-neutral-600 space-y-1">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">8. Cookies</h2>
            <p className="text-neutral-600">
              We use cookies and similar technologies to maintain your session, remember preferences, 
              and analyze platform usage. You can control cookie settings through your browser, 
              though some features may not function properly if cookies are disabled.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">9. International Transfers</h2>
            <p className="text-neutral-600">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place for such transfers in compliance with 
              applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">10. Children&apos;s Privacy</h2>
            <p className="text-neutral-600">
              Our platform is strictly for adults 18 years and older. We do not knowingly collect 
              information from anyone under 18. If we discover we have collected information from 
              a minor, we will delete it immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">11. Changes to This Policy</h2>
            <p className="text-neutral-600">
              We may update this Privacy Policy from time to time. We will notify you of material 
              changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">12. Contact Us</h2>
            <p className="text-neutral-600">
              For privacy-related inquiries, please contact us at privacy@cnoirya.com
            </p>
          </section>

          <p className="text-neutral-400 pt-8">Last updated: April 2026</p>
        </div>
      </main>
    </div>
  )
}
