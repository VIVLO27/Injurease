import { useState } from "react";
import { mainFaqs } from "../data/faqs";
import { siteConfig } from "../data/siteConfig";

interface FaqPageProps {
  onNavigate: (path: string) => void;
  onOpenEvaluation: (caseSlug?: string) => void;
}

export function FaqPage({ onNavigate, onOpenEvaluation }: FaqPageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "General", "Process", "Legal", "Cost", "Privacy"];

  const filteredFaqs =
    selectedCategory === "All"
      ? mainFaqs
      : mainFaqs.filter((f) => f.category === selectedCategory);

  return (
    <div className="space-y-0 pb-20">
      {/* Header Banner */}
      <section className="bg-[#0f1f3d] text-white py-16 sm:py-24 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#c9973a]">
            Help &amp; Information Center
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Find answers to common questions regarding Injurease.us, our legal referral process, privacy standards, and case evaluation procedures.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#0f1f3d] text-white shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat} Questions
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl bg-white shadow-xs overflow-hidden">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="p-5 sm:p-6 transition-colors hover:bg-amber-50/20">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left gap-4 font-sans"
                >
                  <div className="space-y-1">
                    {faq.category && (
                      <span className="text-[10px] font-mono uppercase font-bold text-[#c9973a] block">
                        {faq.category}
                      </span>
                    )}
                    <h2 className="text-base font-bold text-[#0f1f3d]">
                      {faq.question}
                    </h2>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-[#0f1f3d] flex items-center justify-center font-bold text-base shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-4 pt-3 border-t border-gray-100 text-xs sm:text-sm text-gray-700 leading-relaxed font-sans whitespace-pre-line animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Banner */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center space-y-3">
          <h3 className="text-lg font-bold text-[#0f1f3d]">Still Have Questions?</h3>
          <p className="text-xs text-gray-600">
            Reach out to our team directly or start a free evaluation to speak with an independent legal representative.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onOpenEvaluation()}
              className="px-5 py-2.5 bg-[#0f1f3d] text-white text-xs font-bold rounded-lg hover:bg-[#1a2f55]"
            >
              Start Free Evaluation
            </button>
            <button
              onClick={() => {
                onNavigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-5 py-2.5 border border-gray-300 text-gray-800 text-xs font-bold rounded-lg hover:bg-gray-100"
            >
              Contact Us Page
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
