import { useState } from "react";
import { CASES, CaseDetail } from "../data/cases";
import { siteConfig } from "../data/siteConfig";

interface CaseDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenEvaluation: (caseSlug?: string) => void;
}

export function CaseDetailPage({ slug, onNavigate, onOpenEvaluation }: CaseDetailPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activeCase: CaseDetail | undefined = CASES.find((c) => c.slug === slug);

  if (!activeCase) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-serif text-[#0f1f3d]">Case Campaign Not Found</h1>
        <p className="text-sm text-gray-600">The lawsuit evaluation campaign you requested does not exist or has been updated.</p>
        <button
          onClick={() => {
            onNavigate("/our-cases");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="px-6 py-2.5 bg-[#0f1f3d] text-white text-xs font-bold rounded-lg"
        >
          View All Active Cases
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-0 pb-20">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-br from-[#0f1f3d] via-[#1a2f55] to-[#2d4070] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#c9973a]">
              <span>Active Campaign</span>
              <span>•</span>
              <span>{activeCase.category}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
              {activeCase.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans">
              {activeCase.shortDescription}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onOpenEvaluation(activeCase.slug)}
                className="px-7 py-3.5 bg-[#c9973a] text-white text-xs font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <span>Start Free Case Evaluation</span>
                <span>→</span>
              </button>
              <button
                onClick={() => {
                  onNavigate("/our-cases");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-6 py-3.5 border border-white/30 text-white text-xs font-bold rounded-xl hover:bg-white/10 transition-colors text-center"
              >
                View Other Campaigns
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 aspect-4/3">
            <img
              src={activeCase.heroImage}
              alt={activeCase.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CASE OVERVIEW & WHO THIS APPLIES TO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-[#0f1f3d] border-b border-gray-200 pb-3">
              Case Overview &amp; Litigation Context
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed font-sans">
              {activeCase.overview}
            </p>
          </div>

          {/* Who This May Apply To */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-[#0f1f3d] border-b border-gray-200 pb-3">
              Who This May Apply To
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {activeCase.whoThisAppliesTo.map((item, i) => (
                <div key={i} className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl flex items-start gap-3">
                  <span className="text-[#c9973a] text-base font-bold">✓</span>
                  <span className="text-xs text-gray-800 leading-relaxed font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Information */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-[#0f1f3d] border-b border-gray-200 pb-3">
              Important Information
            </h2>
            <ul className="space-y-3">
              {activeCase.importantInfo.map((info, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-gray-700 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-[#c9973a] shrink-0 mt-1.5" />
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Potential Eligibility Factors */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-[#0f1f3d] border-b border-gray-200 pb-3">
              Potential Eligibility Factors
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-2">
              {activeCase.eligibilityFactors.map((factor, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-gray-800 font-semibold">
                  <span className="text-[#c9973a]">▸</span>
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Relevant Circumstances */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-[#0f1f3d] border-b border-gray-200 pb-3">
              Relevant Circumstances
            </h2>
            <div className="flex flex-wrap gap-2">
              {activeCase.relevantCircumstances.map((circ, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-lg text-xs font-medium border border-gray-200"
                >
                  {circ}
                </span>
              ))}
            </div>
          </div>

          {/* What To Do Next */}
          <div className="space-y-4 bg-[#0f1f3d] text-white p-6 sm:p-8 rounded-2xl">
            <h2 className="text-xl font-serif text-white">
              What To Do Next
            </h2>
            <ol className="space-y-3">
              {activeCase.whatToDoNext.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-gray-200 leading-relaxed font-sans">
                  <span className="w-6 h-6 rounded-full bg-[#c9973a] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <div className="pt-2">
              <button
                onClick={() => onOpenEvaluation(activeCase.slug)}
                className="w-full sm:w-auto px-6 py-3 bg-[#c9973a] text-white text-xs font-bold rounded-xl shadow-md hover:opacity-90 transition-opacity"
              >
                Start Free Evaluation For {activeCase.title}
              </button>
            </div>
          </div>

          {/* Campaign FAQs */}
          {activeCase.faqs.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif text-[#0f1f3d] border-b border-gray-200 pb-3">
                Campaign Questions &amp; Answers
              </h2>
              <div className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden bg-white">
                {activeCase.faqs.map((faq, i) => (
                  <div key={i} className="p-4">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                      className="w-full flex items-center justify-between text-left gap-4 font-bold text-xs text-[#0f1f3d]"
                    >
                      <span>{faq.q}</span>
                      <span className="text-[#c9973a] font-bold">{openFaqIndex === i ? "−" : "+"}</span>
                    </button>
                    {openFaqIndex === i && (
                      <p className="mt-2.5 text-xs text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR INTAKE CTA CARD */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xl sticky top-24 space-y-5">
            <div className="border-b border-gray-100 pb-3">
              <span className="text-[10px] font-mono uppercase font-bold text-[#c9973a]">
                Free Confidential Review
              </span>
              <h3 className="text-lg font-bold text-[#0f1f3d] font-sans">
                Evaluate Your {activeCase.title} Claim
              </h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Complete the secure intake form to speak with an independent attorney specializing in {activeCase.title}.
            </p>

            <div className="space-y-2.5 text-xs text-gray-700 bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80">
              <div className="flex items-center gap-2 font-semibold text-[#0f1f3d]">
                <span>🔒</span> <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-[#0f1f3d]">
                <span>💵</span> <span>Zero Upfront Costs</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-[#0f1f3d]">
                <span>⏱️</span> <span>Fast 24-Hour Review</span>
              </div>
            </div>

            <button
              onClick={() => onOpenEvaluation(activeCase.slug)}
              className="w-full py-3.5 bg-[#0f1f3d] text-white text-xs font-bold rounded-xl hover:bg-[#1a2f55] transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>Start Free Evaluation</span>
              <span>→</span>
            </button>

            <div className="text-[11px] text-gray-400 text-center">
              Questions? Call <a href={`tel:${siteConfig.contact.phoneRaw}`} className="underline font-bold text-gray-700">{siteConfig.contact.phone}</a>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM DISCLAIMER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 text-[11px] text-gray-500 leading-relaxed">
          <strong className="text-gray-700">Legal Disclaimer for {activeCase.title}:</strong> Injurease.us is a legal marketing and referral platform, not a law firm. Submitting information does not guarantee legal representation, compensation, or specific outcome. Any attorney-client relationship is established solely through a written contract executed directly with an independent attorney.
        </div>
      </section>
    </div>
  );
}
