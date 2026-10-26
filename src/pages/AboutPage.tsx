import { siteConfig } from "../data/siteConfig";

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenEvaluation: (caseSlug?: string) => void;
}

export function AboutPage({ onNavigate, onOpenEvaluation }: AboutPageProps) {
  return (
    <div className="space-y-0 pb-20">
      {/* Hero Banner */}
      <section className="bg-[#0f1f3d] text-white py-16 sm:py-24 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#c9973a]">
            About Injurease.us
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-white">
            Bridging the Gap Between Claimants and Legal Answers
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Injurease.us is a nationwide legal marketing and referral platform dedicated to helping individuals evaluate potential claims and connect with independent, qualified law firms.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Clear Purpose */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-4">
          <h2 className="text-2xl font-serif text-[#0f1f3d]">
            Our Core Purpose &amp; Role
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed font-sans">
            Navigating the legal landscape after suffering an injury, toxic exposure, or prescription drug complication can be intimidating. Most individuals do not know whether they qualify for a lawsuit or where to find an attorney equipped for complex mass tort litigation.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed font-sans">
            Injurease.us was established to streamline this process. We provide free case evaluation technology and match submitted inquiries with participating independent law firms and legal representatives across the country.
          </p>
        </div>

        {/* Clear Disclaimer & Legal Distinction */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-base font-bold text-[#0f1f3d]">
            <span>⚖️</span>
            <span>Important Platform Disclosures</span>
          </div>
          <ul className="space-y-2 text-xs text-gray-700 leading-relaxed list-disc pl-5 font-sans">
            <li>
              <strong className="text-gray-900">Injurease.us is NOT a law firm:</strong> We do not provide legal advice, legal representation, or legal opinions.
            </li>
            <li>
              <strong className="text-gray-900">No Attorney-Client Relationship:</strong> Submitting an evaluation request through Injurease.us does not create an attorney-client relationship.
            </li>
            <li>
              <strong className="text-gray-900">Independent Legal Counsel:</strong> Any attorney-client relationship is formed solely between you and the independent attorney or law firm that formally accepts your case in writing.
            </li>
            <li>
              <strong className="text-gray-900">No Outcome Guarantees:</strong> We do not guarantee settlement amounts, case acceptance, compensation, or legal results.
            </li>
          </ul>
        </div>

        {/* Core Values */}
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              title: "Transparency",
              desc: "We clearly disclose our role as a legal marketing and referral platform so you always know how your information is handled.",
            },
            {
              title: "Accessibility",
              desc: "100% free case evaluations with zero upfront costs or obligations to explore your potential legal options.",
            },
            {
              title: "Confidentiality",
              desc: "Your personal and health information is secured with industry-standard encryption and shared only with relevant independent legal counsel.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-2 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#0f1f3d] text-[#c9973a] font-bold flex items-center justify-center text-xs">
                ✓
              </div>
              <h3 className="text-base font-bold text-[#0f1f3d] font-sans">{item.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact Info Callout */}
        <div className="bg-[#0f1f3d] text-white rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-serif text-white">Have Questions About Injurease.us?</h3>
          <p className="text-xs text-gray-300 max-w-md mx-auto">
            Our team is available to assist with questions about our intake platform and active campaigns.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4 text-xs">
            <button
              onClick={() => onOpenEvaluation()}
              className="px-6 py-3 bg-[#c9973a] text-white font-bold rounded-xl hover:opacity-90"
            >
              Start Free Case Evaluation
            </button>
            <button
              onClick={() => {
                onNavigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-6 py-3 border border-white/30 text-white font-bold rounded-xl hover:bg-white/10"
            >
              Contact Support Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
