import { useState } from "react";
import { siteConfig } from "../data/siteConfig";
import { CASES, CASE_CATEGORIES } from "../data/cases";
import { mainFaqs } from "../data/faqs";
import heroImage from "../assets/images/legal_consultation_hero.jpg";
import investigationImage from "../assets/images/case_investigation_visual.jpg";

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenEvaluation: (caseSlug?: string) => void;
}

export function HomePage({ onNavigate, onOpenEvaluation }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Campaigns");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive Practical Screener State
  const [screenerCategory, setScreenerCategory] = useState<string>("Prescription Drugs & Medical Devices");
  const [screenerCaseSlug, setScreenerCaseSlug] = useState<string>("depo-provera");
  const [screenerState, setScreenerState] = useState<string>("California");
  const [screenerSeverity, setScreenerSeverity] = useState<string>("surgery");

  // Evidence Tracker Tab
  const [activeEvidenceTab, setActiveEvidenceTab] = useState<"phases" | "damages" | "alerts">("phases");

  const filteredCases = selectedCategory === "All Campaigns"
    ? CASES
    : CASES.filter((c) => c.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(c.category.toLowerCase()));

  const screenerCases = CASES.filter((c) =>
    c.category.toLowerCase().includes(screenerCategory.toLowerCase()) ||
    screenerCategory.toLowerCase().includes(c.category.toLowerCase())
  );

  const activeScreenerCase = CASES.find((c) => c.slug === screenerCaseSlug) || screenerCases[0] || CASES[0];

  const US_STATES = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
    "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
    "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming"
  ];

  return (
    <div className="space-y-0">
      {/* ============================================================
          HERO SECTION — Dynamic animated hero with generated visual
          ============================================================ */}
      <section className="relative overflow-hidden bg-hero-gradient min-h-[92vh] flex flex-col justify-center">
        {/* Grid overlay */}
        <div className="absolute inset-0 hero-overlay-grid pointer-events-none" />

        {/* Radial glow spots */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,151,58,0.12) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(45,64,112,0.4) 0%, transparent 70%)", filter: "blur(50px)" }}
        />

        {/* Floating decorative orbs */}
        <div className="absolute top-20 right-1/3 w-3 h-3 rounded-full bg-[#c9973a]/40 anim-float delay-200 pointer-events-none" />
        <div className="absolute top-40 right-20 w-2 h-2 rounded-full bg-[#e6b865]/30 anim-float delay-400 pointer-events-none" />
        <div className="absolute bottom-32 left-16 w-4 h-4 rounded-full bg-[#c9973a]/20 anim-float delay-300 pointer-events-none" />

        <div className="relative flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT: copy (7 cols) */}
          <div className="lg:col-span-7 anim-fade-left">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold font-mono uppercase tracking-wider border border-[#c9973a]/30 bg-[#c9973a]/10 text-[#e6b865]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
              Nationwide Legal Referral Network • All 50 States
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-6.5xl leading-[1.12] sm:leading-[1.08] mb-6 text-white font-serif">
              Connecting You to the{" "}
              <em className="not-italic text-gradient-gold block sm:inline-block mt-1 sm:mt-0">Legal Help</em>{" "}
              <span className="text-white">You Deserve</span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed mb-8 text-gray-300 font-sans max-w-xl">
              Injurease connects individuals with independent, qualified law firms investigating active mass torts, pharmaceutical recalls, toxic exposure, and severe personal injury claims — at zero upfront cost.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onOpenEvaluation()}
                className="btn-gold inline-flex items-center justify-center gap-3 text-sm px-8 py-4 rounded-xl font-bold anim-pulse-glow"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <span>Start Free Case Evaluation</span>
              </button>

              <button
                onClick={() => {
                  const screenerEl = document.getElementById("eligibility-screener");
                  if (screenerEl) {
                    screenerEl.scrollIntoView({ behavior: "smooth" });
                  } else {
                    onNavigate("/our-cases");
                  }
                }}
                className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-7 py-4 rounded-xl border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer"
              >
                <span>Check Eligibility Screener</span>
                <span>↓</span>
              </button>
            </div>

            {/* Trust row */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {[
                { icon: "🔒", label: "256-Bit SSL Encrypted" },
                { icon: "🛡️", label: "TCPA Compliant" },
                { icon: "⚖️", label: "No Win No Fee" },
                { icon: "⚡", label: "24/7 Intake" },
              ].map((badge) => (
                <span
                  key={badge.label}
                  className="glass inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-gray-300"
                >
                  <span>{badge.icon}</span>
                  <span>{badge.label}</span>
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
              {[
                { val: "50", lbl: "States Covered" },
                { val: "24hr", lbl: "Avg Response Time" },
                { val: "100%", lbl: "Free Confidential Review" },
              ].map(({ val, lbl }) => (
                <div key={lbl} className="group cursor-default anim-fade-up">
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-gradient-gold group-hover:scale-105 transition-transform inline-block">
                    {val}
                  </div>
                  <div className="text-xs mt-1 text-gray-400 font-sans">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Generated Cinematic Visual (5 cols) */}
          <div className="lg:col-span-5 relative anim-fade-right delay-200">
            {/* Ambient halo glow */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-[#c9973a]/20 via-[#c9973a]/5 to-blue-500/10 blur-xl pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 group aspect-4/3">
              <img
                src={heroImage}
                alt="Law firm confidential consultation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(6,13,26,0.85) 0%, rgba(6,13,26,0.2) 40%, transparent 70%)" }}
              />

              {/* Top floating live badge */}
              <div className="absolute top-4 left-4 glass-gold rounded-xl px-3 py-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono font-bold text-[#f5d070] uppercase tracking-wider">
                  Active Multi-State Review
                </span>
              </div>

              {/* Floating Quote Card */}
              <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-4 border border-white/15 backdrop-blur-md">
                <p className="text-xs sm:text-sm text-white font-medium italic leading-relaxed">
                  "Injurease connected me with an independent attorney within hours. They explained my legal rights without any upfront costs."
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                  <span className="text-xs font-bold text-[#e6b865] font-mono">
                    ✓ Verified Claimant Inquiry
                  </span>
                  <span className="text-[10px] text-gray-300 font-mono">
                    All 50 States
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom disclaimer ribbon */}
        <div className="relative border-t border-white/8 bg-black/40 py-2.5 px-4">
          <div className="max-w-7xl mx-auto flex items-start gap-2.5 text-xs text-gray-400">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#c9973a] shrink-0 mt-0.5">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            <span>
              <strong className="text-gray-300">Legal Notice:</strong> Injurease is a legal marketing and referral platform, not a law firm. Submitting information does not create an attorney-client relationship.
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          INTERACTIVE PRACTICAL TOOL: 60-SECOND ELIGIBILITY SCREENER
          ============================================================ */}
      <section id="eligibility-screener" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-150 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0f1f3d] via-[#16274a] to-[#0f1f3d] text-white px-6 sm:px-10 py-6 border-b border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#c9973a] mb-1">
                <span>⚡</span> Interactive Claim Screener &amp; Estimator
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-white">
                Check If You May Qualify for an Active Lawsuit
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Free Instant Pre-Screen</span>
            </div>
          </div>

          {/* Screener Interactive Form & Live Result */}
          <div className="p-6 sm:p-10 grid lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Category */}
              <div>
                <label className="block text-xs font-bold text-[#0f1f3d] uppercase tracking-wider mb-2 font-mono">
                  1. Select Case Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                  {[
                    "Prescription Drugs & Medical Devices",
                    "Toxic Exposure & Products",
                    "Abuse & Sexual Assault",
                    "Personal Injury & Accidents",
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setScreenerCategory(cat);
                        const match = CASES.find((c) => c.category === cat);
                        if (match) setScreenerCaseSlug(match.slug);
                      }}
                      className={`p-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                        screenerCategory === cat
                          ? "border-[#c9973a] bg-amber-50/70 text-[#0f1f3d] font-bold shadow-xs ring-1 ring-[#c9973a]"
                          : "border-gray-200 bg-gray-50/50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Specific Lawsuit */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0f1f3d] uppercase tracking-wider mb-2 font-mono">
                    2. Specific Lawsuit Campaign
                  </label>
                  <select
                    value={screenerCaseSlug}
                    onChange={(e) => setScreenerCaseSlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 bg-white font-medium text-gray-900 outline-none focus:border-[#c9973a] shadow-xs"
                  >
                    {CASES.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. State */}
                <div>
                  <label className="block text-xs font-bold text-[#0f1f3d] uppercase tracking-wider mb-2 font-mono">
                    3. State Where Incident Occurred
                  </label>
                  <select
                    value={screenerState}
                    onChange={(e) => setScreenerState(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 bg-white font-medium text-gray-900 outline-none focus:border-[#c9973a] shadow-xs"
                  >
                    {US_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4. Severity / Treatment */}
              <div>
                <label className="block text-xs font-bold text-[#0f1f3d] uppercase tracking-wider mb-2 font-mono">
                  4. Medical Treatment or Diagnosis Received
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "surgery", label: "Surgery / Hospital" },
                    { id: "diagnosed", label: "Formal Diagnosis" },
                    { id: "treatment", label: "Ongoing Therapy" },
                    { id: "loss", label: "Fatal / Loss" },
                  ].map((sev) => (
                    <button
                      key={sev.id}
                      type="button"
                      onClick={() => setScreenerSeverity(sev.id)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                        screenerSeverity === sev.id
                          ? "border-[#c9973a] bg-[#0f1f3d] text-white shadow-xs"
                          : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {sev.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Screener Output Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0a1528] to-[#12223f] text-white rounded-2xl p-6 border border-gray-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono uppercase text-[#e6b865] font-bold">
                  Screener Assessment
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active Investigation
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-sans">
                  {activeScreenerCase.title}
                </h3>
                <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                  {activeScreenerCase.shortDescription}
                </p>
              </div>

              {/* Status indicators */}
              <div className="space-y-2 bg-white/5 rounded-xl p-3.5 border border-white/10 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Jurisdiction:</span>
                  <span className="font-semibold text-white">{screenerState} (Covered)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Statute Window:</span>
                  <span className="font-semibold text-amber-300">Open for Intake</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Upfront Attorney Fee:</span>
                  <span className="font-semibold text-emerald-400">$0 (Contingency)</span>
                </div>
              </div>

              {/* Recoverable Damages preview */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-gray-400 block tracking-wider">
                  Potential Claim Categories:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["Past Medical Bills", "Future Healthcare", "Lost Earnings", "Pain & Suffering"].map((dmg) => (
                    <span
                      key={dmg}
                      className="px-2 py-0.5 rounded-md bg-white/10 text-[#f5d070] text-[10px] font-mono"
                    >
                      ✓ {dmg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenEvaluation(activeScreenerCase.slug)}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-[#c9973a] hover:bg-[#e6b865] text-[#0f1f3d] transition-all flex items-center justify-center gap-2 shadow-md active:scale-98 cursor-pointer"
              >
                <span>Evaluate {activeScreenerCase.title}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURED ACTIVE CASES GRID
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="section-label mb-3">Active Campaigns</div>
            <h2 className="text-4xl sm:text-5xl font-serif text-[#0f1f3d]">
              Featured Lawsuit{" "}
              <span className="italic text-[#c9973a]">Evaluations</span>
            </h2>
            <p className="text-sm text-gray-500 mt-3 max-w-lg">
              Explore currently active mass torts, product liability, and personal injury case evaluations across the United States.
            </p>
          </div>
          <button
            onClick={() => { onNavigate("/our-cases"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0f1f3d] hover:text-[#c9973a] transition-colors group whitespace-nowrap cursor-pointer"
          >
            <span>View All {CASES.length} Cases</span>
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CASE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#0f1f3d] text-white shadow-md border border-[#0f1f3d]"
                  : "bg-white text-gray-600 hover:text-[#0f1f3d] hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((c, i) => (
            <div
              key={c.id}
              className="card-elevated flex flex-col group anim-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img
                  src={c.heroImage}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(15,31,61,0.5) 0%, transparent 50%)" }}
                />
                {/* Category badge */}
                <div className="absolute top-3 left-3 bg-[#0f1f3d]/85 backdrop-blur-xs text-white text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {c.category}
                </div>
                {/* Active indicator */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 text-[10px] font-mono px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" style={{ animation: "pulseGlow 2s ease-in-out infinite" }} />
                  Active
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#0f1f3d] font-sans group-hover:text-[#c9973a] transition-colors leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mt-2 line-clamp-3">
                    {c.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => { onNavigate(`/case/${c.slug}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="text-xs font-semibold text-gray-600 hover:text-[#0f1f3d] transition-colors flex items-center gap-1 group/btn cursor-pointer"
                  >
                    <span>Learn More</span>
                    <span className="group-hover/btn:translate-x-0.5 transition-transform inline-block">→</span>
                  </button>

                  <button
                    onClick={() => onOpenEvaluation(c.slug)}
                    className="btn-gold px-4 py-2 text-xs rounded-lg"
                  >
                    Evaluate Case
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => { onNavigate("/our-cases"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="btn-navy inline-flex items-center gap-3 px-8 py-3.5 text-sm rounded-xl cursor-pointer"
          >
            <span>View All {CASES.length} Active Campaigns</span>
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#c9973a]">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </section>

      {/* ============================================================
          IMMERSIVE SCIENTIFIC EVIDENCE & LITIGATION TIMELINE SECTION
          ============================================================ */}
      <section className="relative overflow-hidden py-24 bg-[#0a1528] text-white">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid-navy opacity-60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="section-label mb-3 justify-center">Scientific &amp; Legal Discovery</div>
            <h2 className="text-4xl sm:text-5xl font-serif text-white">
              How Mass Tort Claims Are <span className="text-gradient-gold">Investigated</span>
            </h2>
            <p className="text-sm text-gray-400 mt-4 leading-relaxed font-sans">
              Complex litigation against pharmaceutical manufacturers and corporations requires deep scientific evidence, clinical studies, and multi-district coordination.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Visual Side: Generated Laboratory & Holographic Litigation Visual (6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/15 relative group aspect-4/3">
                <img
                  src={investigationImage}
                  alt="Scientific litigation investigation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(10,21,40,0.85) 0%, transparent 60%)" }}
                />

                <div className="absolute bottom-5 left-5 right-5 glass rounded-xl p-4 border border-white/15">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#f5d070] font-bold">
                    <span>🔬</span> Multidistrict Scientific Discovery
                  </div>
                  <p className="text-xs text-gray-300 mt-1">
                    Independent law firms subpoena internal manufacturer memos, clinical trial data, and adverse event databases.
                  </p>
                </div>
              </div>

              {/* Floating Metric Card */}
              <div className="hidden sm:block absolute -top-5 -left-5 glass-light text-[#0f1f3d] rounded-2xl p-4 shadow-2xl border border-[#c9973a]/30">
                <div className="text-2xl font-bold font-serif text-[#0f1f3d]">12,000+</div>
                <div className="text-[11px] font-mono text-gray-600 font-bold uppercase">Evidence Records Reviewed</div>
              </div>
            </div>

            {/* Interactive Tabbed Content (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Tab Selector */}
              <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
                {[
                  { id: "phases", label: "1. Litigation Stages" },
                  { id: "damages", label: "2. Recoverable Damages" },
                  { id: "alerts", label: "3. Safety Alerts" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveEvidenceTab(tab.id as any)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeEvidenceTab === tab.id
                        ? "bg-[#c9973a] text-[#0f1f3d] shadow-sm"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Phases */}
              {activeEvidenceTab === "phases" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="text-xl font-bold text-white font-sans">
                    The 4 Phases of a Mass Tort Case
                  </h3>
                  <div className="space-y-3">
                    {[
                      { step: "Phase 1: Adverse Event & Intake", desc: "Claimants document medical complications, prescription usage, or toxic exposure history." },
                      { step: "Phase 2: Multidistrict Coordination (MDL)", desc: "Federal courts consolidate thousands of claims before a single judge to streamline discovery." },
                      { step: "Phase 3: Bellwether Trials", desc: "Sample cases go before juries to test liability arguments and establish settlement benchmarks." },
                      { step: "Phase 4: Global Settlement Fund", desc: "Settlement matrices allocate compensation to qualifying claimants based on injury tiers." },
                    ].map((phase, idx) => (
                      <div key={idx} className="p-3.5 bg-white/5 border border-white/10 rounded-xl flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#c9973a] text-[#0f1f3d] flex items-center justify-center text-xs font-bold font-mono shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-white">{phase.step}</h4>
                          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{phase.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Damages */}
              {activeEvidenceTab === "damages" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="text-xl font-bold text-white font-sans">
                    What Compensation Covers
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: "Past & Future Medical Care", desc: "Hospitalizations, corrective surgeries, prescription costs, and ongoing therapy." },
                      { title: "Lost Income & Earning Capacity", desc: "Wages lost due to medical recovery and inability to return to previous occupation." },
                      { title: "Pain & Physical Suffering", desc: "Compensation for enduring chronic pain, disability, or emotional trauma." },
                      { title: "Wrongful Death Damages", desc: "Funeral costs, loss of financial support, and companionship for surviving families." },
                    ].map((dmg, idx) => (
                      <div key={idx} className="p-3.5 bg-white/5 border border-white/10 rounded-xl space-y-1">
                        <span className="text-[#e6b865] text-xs font-bold">✓ {dmg.title}</span>
                        <p className="text-[11px] text-gray-400 leading-snug">{dmg.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Alerts */}
              {activeEvidenceTab === "alerts" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="text-xl font-bold text-white font-sans">
                    Documented Safety Warnings &amp; Recalls
                  </h3>
                  <div className="space-y-3">
                    {[
                      { drug: "Oxbryta (voxelotor)", note: "Voluntarily withdrawn globally after clinical trials showed higher rates of severe vaso-occlusive crises." },
                      { drug: "Depo-Provera (medroxyprogesterone)", note: "BMJ medical study confirmed a 5.6-fold higher risk of intracranial meningioma brain tumors." },
                      { drug: "Roundup (glyphosate)", note: "Classified by WHO's IARC as a probable human carcinogen linked to Non-Hodgkin's Lymphoma." },
                    ].map((item, idx) => (
                      <div key={idx} className="p-3.5 bg-white/5 border border-amber-500/20 rounded-xl">
                        <span className="text-xs font-bold text-[#f5d070]">{item.drug}</span>
                        <p className="text-xs text-gray-400 mt-1">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => onOpenEvaluation()}
                  className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold rounded-xl"
                >
                  <span>Submit My Information for Evaluation</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          HOW IT WORKS — 4 Simple Steps
          ============================================================ */}
      <section className="relative overflow-hidden py-24" style={{ background: "linear-gradient(160deg, #0a1525 0%, #0f1f3d 50%, #091326 100%)" }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="section-label mb-3 justify-center">Transparent Process</div>
            <h2 className="text-4xl sm:text-5xl font-serif text-white">
              How <span className="text-gradient-gold">Injurease</span> Works
            </h2>
            <p className="text-sm text-gray-400 mt-4 leading-relaxed">
              We connect individuals seeking legal answers with qualified independent attorneys in 4 simple steps — completely free and confidential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#c9973a]/30 to-transparent pointer-events-none" />

            {[
              { num: "01", icon: "📋", title: "Share Your Situation", desc: "Complete our secure intake questionnaire describing your injury or circumstances in under 3 minutes." },
              { num: "02", icon: "🔍", title: "Information Review", desc: "Your submitted criteria is evaluated against active campaign parameters and legal requirements." },
              { num: "03", icon: "⚖️", title: "Attorney Connection", desc: "You are matched with an independent participating law firm suited to your specific matter." },
              { num: "04", icon: "💬", title: "Confidential Evaluation", desc: "An attorney contacts you directly for a 100% free consultation to discuss potential legal representation." },
            ].map((step, i) => (
              <div
                key={step.num}
                className="card-dark p-7 relative group text-center anim-fade-up"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="relative w-16 h-16 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-full border border-[#c9973a]/20 group-hover:border-[#c9973a]/50 transition-colors" />
                  <div className="absolute inset-0 rounded-full bg-[#c9973a]/5 group-hover:bg-[#c9973a]/10 transition-colors" />
                  <span className="absolute inset-0 flex items-center justify-center text-2xl">{step.icon}</span>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#0f1f3d] border border-[#c9973a]/40 flex items-center justify-center">
                    <span className="text-[10px] font-mono font-bold text-[#c9973a]">{i + 1}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white font-sans mb-2 group-hover:text-[#e6b865] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => onOpenEvaluation()}
              className="btn-gold inline-flex items-center gap-3 px-10 py-4 text-sm rounded-xl anim-pulse-glow"
            >
              Start Free Evaluation Now
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          MISSION & PLATFORM ROLE
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Image side */}
          <div className="relative anim-fade-right order-last lg:order-first">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-4/3 relative group">
              <img
                src={heroImage}
                alt="Legal consultation and case review"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top right, rgba(15,31,61,0.5) 0%, transparent 60%)" }}
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 glass-light rounded-2xl p-5 shadow-xl border border-[#c9973a]/20">
              <div className="text-2xl font-bold font-serif text-gradient-gold">50</div>
              <div className="text-xs text-gray-600 font-medium mt-0.5">States Covered</div>
              <div className="text-[10px] text-gray-400 mt-1">Nationwide Coverage</div>
            </div>
          </div>

          {/* Text side */}
          <div className="space-y-6 anim-fade-left">
            <div className="section-label">About Platform</div>
            <h2 className="text-4xl sm:text-5xl font-serif text-[#0f1f3d] leading-tight">
              Connecting Claimants with{" "}
              <span className="italic text-[#c9973a]">Independent Law Firms</span>
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Injurease operates as a legal marketing and referral platform. We bridge the gap between people who may have valid legal claims and independent attorneys qualified to handle complex litigation across the United States.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🌍", title: "All 50 States", desc: "Nationwide attorney network" },
                { icon: "⚡", title: "Fast Response", desc: "24-hour average response" },
                { icon: "🔒", title: "SSL Secured", desc: "256-bit encryption" },
                { icon: "💰", title: "No Upfront Cost", desc: "100% free evaluation" },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-4 border border-gray-100 shadow-xs hover:shadow-md hover:border-[#c9973a]/20 transition-all group">
                  <span className="text-xl">{item.icon}</span>
                  <div className="text-sm font-bold text-[#0f1f3d] mt-2 group-hover:text-[#c9973a] transition-colors">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Disclaimer box */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-900 shadow-xs">
              <p className="font-bold text-[#0f1f3d] flex items-center gap-2 mb-2">
                <span>🛡️</span>
                <span>Important Platform Disclosure</span>
              </p>
              <p className="leading-relaxed text-gray-700">
                Injurease is <strong>NOT a law firm</strong> and does <strong>NOT provide legal advice</strong> or legal representation. Submitting information does not guarantee representation or case outcome.
              </p>
            </div>

            <button
              onClick={() => { onNavigate("/about"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="btn-navy inline-flex items-center gap-2 px-7 py-3 text-sm rounded-xl cursor-pointer"
            >
              Read More About Us
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          TRUST INDICATORS BANNER
          ============================================================ */}
      <section className="py-12 border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: "🔒", title: "256-Bit SSL", subtitle: "Bank-grade encryption" },
              { icon: "🛡️", title: "TCPA Compliant", subtitle: "Consent-based contact" },
              { icon: "⚖️", title: "No Win No Fee", subtitle: "Via partner firms" },
              { icon: "🇺🇸", title: "All 50 States", subtitle: "Nationwide network" },
            ].map((item) => (
              <div key={item.title} className="group flex flex-col items-center gap-2 py-2">
                <span className="text-3xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <div className="font-bold text-sm text-[#0f1f3d]">{item.title}</div>
                <div className="text-xs text-gray-500">{item.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ PREVIEW
          ============================================================ */}
      <section className="py-24" style={{ background: "linear-gradient(180deg, #f5f3ee 0%, #fafaf7 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label mb-3 justify-center">Got Questions?</div>
            <h2 className="text-4xl sm:text-5xl font-serif text-white sm:text-[#0f1f3d]">
              Frequently Asked{" "}
              <span className="italic text-[#c9973a]">Questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {mainFaqs.slice(0, 5).map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 group cursor-pointer"
                >
                  <span className="text-sm font-semibold text-[#0f1f3d] group-hover:text-[#c9973a] transition-colors font-sans leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${openFaq === i ? "bg-[#c9973a] text-white rotate-45" : "bg-gray-100 text-gray-500 group-hover:bg-[#c9973a]/10 group-hover:text-[#c9973a]"}`}>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-50 anim-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => { onNavigate("/faq"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="btn-outline-gold inline-flex items-center gap-2 px-7 py-3 text-sm cursor-pointer"
            >
              View Full FAQ Page
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA CALLOUT
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center text-white shadow-2xl" style={{ background: "linear-gradient(135deg, #060d1a 0%, #0f1f3d 50%, #162440 100%)" }}>
          {/* Background elements */}
          <div className="absolute inset-0 bg-grid-navy opacity-100 pointer-events-none" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-40 pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(201,151,58,0.1) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <div className="section-label mb-4 justify-center">Free &amp; Confidential</div>
            <h2 className="text-4xl sm:text-5xl font-serif text-white leading-tight">
              Start Your Free Case{" "}
              <span className="text-gradient-gold">Evaluation</span> Today
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Takes less than 3 minutes. Zero upfront costs, 100% confidential. Explore your rights with independent law firms across the nation.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onOpenEvaluation()}
                className="btn-gold inline-flex items-center justify-center gap-3 px-10 py-4 text-sm rounded-xl anim-pulse-glow cursor-pointer"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <span>Start Free Evaluation Now</span>
              </button>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-semibold rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-[#c9973a]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.47-5.147-3.793-6.617-6.617l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>Call {siteConfig.contact.phone}</span>
              </a>
            </div>
            <p className="text-xs text-gray-500 font-mono pt-2">
              🔒 256-Bit SSL Encrypted &nbsp;•&nbsp; 🛡️ TCPA Compliant &nbsp;•&nbsp; ⚖️ 100% Free
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
