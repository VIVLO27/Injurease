import { siteConfig } from "../data/siteConfig";

export function TermsPage() {
  return (
    <div className="space-y-0 pb-20">
      <section className="bg-[#0f1f3d] text-white py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#c9973a]">
            Legal Document
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-white">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-gray-400">
            Last Updated: January 2026 • {siteConfig.domain}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6 text-xs text-gray-700 leading-relaxed font-sans">
          <h2 className="text-lg font-bold text-[#0f1f3d]">1. Acceptance of Terms</h2>
          <p>
            By accessing or using {siteConfig.domain} (the "Website"), you agree to be bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, you must not use our website or services.
          </p>

          <h2 className="text-lg font-bold text-[#0f1f3d]">2. Platform Identity &amp; Disclaimer</h2>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
            <p className="font-bold text-[#0f1f3d]">IMPORTANT NOTICE:</p>
            <p className="text-gray-800">
              Injurease.us is a legal marketing and referral platform, NOT a law firm. We do not provide legal advice, legal opinions, or direct legal representation. Submitting information to Injurease.us does NOT create an attorney-client relationship. An attorney-client relationship is established solely if you execute a formal written agreement directly with an independent attorney or law firm.
            </p>
          </div>

          <h2 className="text-lg font-bold text-[#0f1f3d]">3. Attorney Advertising Notice</h2>
          <p>
            This website constitutes attorney advertising. Prior results do not guarantee a similar outcome in future legal matters. No representation is made that the quality of legal services to be performed is greater than the quality of legal services performed by other lawyers.
          </p>

          <h2 className="text-lg font-bold text-[#0f1f3d]">4. No Guarantees of Outcome or Compensation</h2>
          <p>
            Injurease.us makes no representations, promises, or guarantees regarding case acceptance, eligibility, compensation amounts, settlements, or outcome of any legal evaluation. Case evaluations are performed independently by third-party participating law firms.
          </p>

          <h2 className="text-lg font-bold text-[#0f1f3d]">5. User Obligations &amp; Information Accuracy</h2>
          <p>
            You agree that all information you submit through our intake forms is accurate, truthful, and submitted solely on your own behalf or on behalf of an individual for whom you possess legal authorization to represent.
          </p>

          <h2 className="text-lg font-bold text-[#0f1f3d]">6. Intellectual Property</h2>
          <p>
            All content, trademarks, logos, design elements, graphics, and text on {siteConfig.domain} are the intellectual property of Injurease.us or its licensors and are protected under applicable copyright and trademark laws.
          </p>

          <h2 className="text-lg font-bold text-[#0f1f3d]">7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, Injurease.us and its affiliates, officers, employees, and agents shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the website or referral platform.
          </p>

          <h2 className="text-lg font-bold text-[#0f1f3d]">8. Contact Information</h2>
          <p>
            If you have questions regarding these Terms &amp; Conditions, please contact us at:
            <br />
            Email: {siteConfig.contact.email}
            <br />
            Phone: {siteConfig.contact.phone}
            <br />
            Address: {siteConfig.contact.fullAddress}
          </p>
        </div>
      </section>
    </div>
  );
}
