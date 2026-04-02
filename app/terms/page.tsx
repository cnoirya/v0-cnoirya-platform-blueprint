import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <Link href="/" className="text-lg tracking-tight">CNOIRYA</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-sm font-bold uppercase tracking-widest mb-8">Terms of Service</h1>
        
        <div className="space-y-8 text-xs leading-relaxed">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">1. Acceptance of Terms</h2>
            <p className="text-neutral-600">
              By accessing or using the CNOIRYA platform, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, you may not access or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">2. Age Verification</h2>
            <p className="text-neutral-600">
              You must be at least 18 years of age (or the age of majority in your jurisdiction) to access this platform. 
              By using our services, you represent and warrant that you meet this age requirement. 
              We reserve the right to request proof of age at any time and to terminate accounts that violate this requirement.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">3. Account Registration</h2>
            <p className="text-neutral-600">
              To access certain features, you must create an account. You are responsible for maintaining the 
              confidentiality of your account credentials and for all activities that occur under your account. 
              You agree to provide accurate and complete information during registration.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">4. Subscription and Payments</h2>
            <p className="text-neutral-600">
              Subscriptions are billed on a recurring basis. You authorize us to charge your payment method 
              for all fees associated with your subscription. Refunds are provided at our sole discretion. 
              You may cancel your subscription at any time, but no refunds will be provided for partial billing periods.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">5. Content Usage</h2>
            <p className="text-neutral-600">
              All content on this platform is protected by copyright and other intellectual property rights. 
              You may not copy, distribute, modify, or create derivative works from any content without explicit permission. 
              Any unauthorized use of content may result in immediate account termination and legal action.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">6. Prohibited Conduct</h2>
            <p className="text-neutral-600 mb-2">You agree not to:</p>
            <ul className="list-disc pl-4 text-neutral-600 space-y-1">
              <li>Share, redistribute, or resell any content from this platform</li>
              <li>Use screen recording, screenshots, or any capture tools on protected content</li>
              <li>Harass, threaten, or abuse other users or creators</li>
              <li>Attempt to circumvent any security measures or DRM protections</li>
              <li>Use the platform for any illegal purposes</li>
              <li>Create multiple accounts to abuse promotional offers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">7. Privacy</h2>
            <p className="text-neutral-600">
              Your use of our services is also governed by our Privacy Policy. 
              By using our platform, you consent to the collection and use of your information as described therein.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">8. Termination</h2>
            <p className="text-neutral-600">
              We reserve the right to terminate or suspend your account at any time, without prior notice, 
              for any reason, including violation of these Terms. Upon termination, your right to use the 
              platform will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">9. Disclaimer</h2>
            <p className="text-neutral-600">
              The platform is provided &quot;as is&quot; without warranties of any kind. We do not guarantee 
              uninterrupted access or that the platform will be error-free.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3">10. Contact</h2>
            <p className="text-neutral-600">
              For questions about these Terms, please contact us at legal@cnoirya.com
            </p>
          </section>

          <p className="text-neutral-400 pt-8">Last updated: April 2026</p>
        </div>
      </main>
    </div>
  )
}
