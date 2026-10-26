import { siteConfig } from "../data/siteConfig";

interface HowItWorksPageProps {
  onNavigate: (path: string) => void;
  onOpenEvaluation: (caseSlug?: string) => void;
}

export function HowItWorksPage({ onNavigate, onOpenEvaluation }: HowItWorksPageProps) {
  return (
    <div className="space-y-0 pb-20">
      {/* Hero Banner */}
      <section className="bg-[#0f1f3d] text-white py-16 sm:py-24 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#c9973a]">
            Process Overview
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-white">
            How Injurease.us Works
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans">
            A simple, transparent 4-step referral evaluation process designed to help you explore potential legal representation.
          </p>
        </div>
      </section>

      {/* Steps Detail */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="space-y-8">
          {[
            {
              step: "Step 1",
              title: "Submit Your Situation Online",
              desc: "Select your relevant lawsuit campaign and answer simple intake questions regarding your injury, medical treatments, or exposure dates. The questionnaire takes under 3 minutes to complete.",
              details: [
                "100% confidential submission",
                "No upfront payment or credit card required",
                "Mobile-friendly intake form",
              ],
            },
            {
              step: "Step 2",
              title: "Criteria Matching & Evaluation",
              desc: "Our automated intake platform reviews your answers against criteria established by participating law firms handling mass torts and personal injury litigation.",
              details: [
                "Filters criteria by state jurisdiction & dates",
                "Confirms campaign eligibility parameters",
                "Ensures inquiry reaches specialized legal counsel",
              ],
            },
            {
              step: "Step 3",
              title: "Attorney Referral & Contact",
              desc: "Your inquiry is routed to an independent licensed law firm or attorney. A representative will contact you via phone or email to discuss your situation in detail.",
              details: [
                "Direct contact within 24 to 48 business hours",
                "Free, zero-obligation legal consultation",
                "All communications handled confidentially",
              ],
            },
            {
              step: "Step 4",
              title: "Decide Your Next Steps",
              desc: "The attorney independently evaluates whether to accept your case and explains potential legal options. You remain in complete control of whether to enter a formal representation agreement.",
              details: [
                "Most personal injury cases operate on contingency",
                "You pay zero legal fees unless financial recovery is made",
                "Full autonomy over legal decisions",
              ],
            },
          ].map((item, index) => (
            <div
              key={item.step}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0f1f3d] text-[#c9973a] font-mono font-bold text-lg flex items-center justify-center shrink-0 border border-[#c9973a]/30">
                0{index + 1}
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#c9973a] uppercase">
                    {item.step}
                  </span>
                  <h2 className="text-xl font-bold text-[#0f1f3d] font-sans">
                    {item.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                  {item.desc}
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  {item.details.map((d, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-md text-[11px] font-medium"
                    >
                      ✓ {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Banner */}
        <div className="bg-[#0f1f3d] text-white rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-serif text-white">Ready to Start Your Evaluation?</h3>
          <p className="text-xs text-gray-300 max-w-md mx-auto">
            Select an active campaign and submit your information in 3 simple steps.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenEvaluation()}
              className="px-8 py-3.5 bg-[#c9973a] text-white font-bold text-xs rounded-xl hover:opacity-90 transition-opacity"
            >
              Start Free Case Evaluation Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
