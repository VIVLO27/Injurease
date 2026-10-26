import { siteConfig } from "../data/siteConfig";

export function PrivacyPolicyPage() {
  return (
    <div className="space-y-0 pb-20">
      <section className="bg-[#0f1f3d] text-white py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#c9973a]">
            Legal Document
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-gray-400">
            Last Updated: January 2026 • {siteConfig.domain}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6 text-xs text-gray-700 leading-relaxed font-sans">
          <h2 className="text-lg font-bold text-[#0f1f3d]">1. Introduction</h2>
          <p>
            Injurease.us ("Company", "we", "us", or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website {siteConfig.domain} or submit a case evaluation form through our platform.
          </p>

          <h2 className="text-lg font-bold text-[#0f1f3d]">2. Information We Collect</h2>
          <p>We may collect personal information that you voluntarily provide to us when requesting a case evaluation, including:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact Information: First name, last name, email address, telephone number, mailing address, city, state, zip code.</li>
            <li>Case Information: Incident dates, injury details, medical treatment history, and campaign-specific responses.</li>
            <li>Technical Data: IP address, browser type, device information, operating system, referral URL.</li>
          </ul>

          <h2 className="text-lg font-bold text-[#0f1f3d]">3. How We Use Your Information</h2>
          <p>We use collected information primarily to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Evaluate submitted legal criteria against participating campaign parameters.</li>
            <li>Connect and match you with independent participating attorneys, law firms, or legal marketing partners for case evaluations.</li>
            <li>Communicate with you regarding your inquiry via telephone, SMS text message, or email.</li>
            <li>Maintain, optimize, and secure our website infrastructure.</li>
          </ul>

          <h2 className="text-lg font-bold text-[#0f1f3d]">4. Disclosure of Information to Third Parties</h2>
          <p>
            Injurease.us is a legal marketing and referral platform. By submitting your information, you acknowledge and agree that your details will be shared with independent participating law firms, attorneys, or legal referral partners who evaluate potential claims. We do not sell your personal data to unrelated non-legal third parties for consumer marketing.
          </p>

          <h2 className="text-lg font-bold text-[#0f1f3d]">5. Telephone &amp; SMS Communication Consent</h2>
          <p>
            By providing your phone number and checking the consent box, you expressly consent to receive telephone calls, automated messages, pre-recorded audio, and text messages (SMS) from Injurease.us and participating legal representatives regarding your evaluation request. Standard message and data rates may apply. You may opt out at any time by replying "STOP" or notifying us directly.
          </p>

          <h2 className="text-lg font-bold text-[#0f1f3d]">6. Data Security</h2>
          <p>
            We implement industry-standard technical and organizational security measures (including SSL encryption and secure data transport) to protect your personal information against unauthorized access, loss, or alteration.
          </p>

          <h2 className="text-lg font-bold text-[#0f1f3d]">7. Your Privacy Rights</h2>
          <p>
            Depending on your state of residence (including California residents under the CCPA), you may have rights regarding access, correction, or deletion of your personal data. To exercise your rights, please contact us at {siteConfig.contact.email}.
          </p>

          <h2 className="text-lg font-bold text-[#0f1f3d]">8. Contact Us</h2>
          <p>
            For privacy inquiries or data requests, please contact:
            <br />
            <strong>Injurease.us Privacy Team</strong>
            <br />
            Email: {siteConfig.contact.email}
            <br />
            Address: {siteConfig.contact.fullAddress}
            <br />
            Phone: {siteConfig.contact.phone}
          </p>
        </div>
      </section>
    </div>
  );
}
