import { useState, useMemo } from "react";
import { CASES, CASE_CATEGORIES } from "../data/cases";

interface OurCasesPageProps {
  onNavigate: (path: string) => void;
  onOpenEvaluation: (caseSlug?: string) => void;
}

export function OurCasesPage({ onNavigate, onOpenEvaluation }: OurCasesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Campaigns");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCases = useMemo(() => {
    return CASES.filter((c) => {
      const matchesCategory =
        selectedCategory === "All Campaigns" || c.category === selectedCategory;
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-0 pb-24">
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden text-white py-20 sm:py-28"
        style={{ background: "linear-gradient(160deg, #060d1a 0%, #0f1f3d 60%, #162440 100%)" }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-navy pointer-events-none" />
        {/* Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-56 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(201,151,58,0.1) 0%, transparent 70%)" }}
        />
        {/* Floating orbs */}
        <div className="absolute top-12 right-24 w-3 h-3 rounded-full bg-[#c9973a]/30 anim-float delay-200 pointer-events-none" />
        <div className="absolute bottom-16 left-32 w-2 h-2 rounded-full bg-[#e6b865]/20 anim-float delay-400 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="section-label justify-center">Legal Campaigns & Lawsuits</div>
          <h1 className="text-5xl sm:text-6xl font-serif text-white">
            Active Case{" "}
            <span className="text-gradient-gold">Evaluations</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Injurease facilitates legal evaluations for active mass torts, prescription drug claims, institutional abuse cases, and personal injury matters across all 50 states.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 pt-6">
            {[
              { val: `${CASES.length}`, lbl: "Active Campaigns" },
              { val: "50", lbl: "States Covered" },
              { val: "Free", lbl: "Evaluations" },
            ].map(({ val, lbl }) => (
              <div key={lbl} className="text-center">
                <div className="text-3xl font-bold font-serif text-gradient-gold">{val}</div>
                <div className="text-xs text-gray-400 mt-1 font-mono uppercase tracking-wider">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                placeholder="Search campaigns (e.g., Roundup, Oxbryta...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-field pl-11 text-sm"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {CASE_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-[#0f1f3d] text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-[#0f1f3d]/8 hover:text-[#0f1f3d]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Case Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <div className="flex items-center justify-between mb-8 text-xs text-gray-500 font-mono">
          <span>
            Showing <strong className="text-[#0f1f3d]">{filteredCases.length}</strong> active campaign{filteredCases.length !== 1 ? "s" : ""}
          </span>
          {(searchQuery || selectedCategory !== "All Campaigns") && (
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All Campaigns"); }}
              className="text-[#c9973a] font-bold hover:underline flex items-center gap-1"
            >
              <span>✕</span>
              <span>Clear filters</span>
            </button>
          )}
        </div>

        {filteredCases.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-16 text-center space-y-4 shadow-xs">
            <div className="text-4xl">🔍</div>
            <p className="text-base font-bold text-[#0f1f3d]">No campaigns found.</p>
            <p className="text-sm text-gray-500">Try a different keyword or select "All Campaigns".</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All Campaigns"); }}
              className="btn-navy px-6 py-3 text-sm rounded-xl inline-flex"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((c, i) => (
              <div
                key={c.id}
                className="card-elevated flex flex-col group anim-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={c.heroImage}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(15,31,61,0.55) 0%, transparent 55%)" }}
                  />
                  <div className="absolute top-3 left-3 bg-[#0f1f3d]/85 backdrop-blur-xs text-white text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {c.category}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 text-[10px] font-mono px-2.5 py-1 rounded-full border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Active
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h2 className="text-base font-bold text-[#0f1f3d] font-sans group-hover:text-[#c9973a] transition-colors leading-snug">
                      {c.title}
                    </h2>
                    <p className="text-xs text-gray-500 leading-relaxed mt-2 line-clamp-3">
                      {c.shortDescription}
                    </p>
                  </div>

                  {/* Eligibility bullets */}
                  <div className="space-y-2 pt-3 border-t border-gray-100">
                    <span className="text-[10px] font-mono uppercase font-bold text-gray-400 block tracking-wider">
                      Key Eligibility Factors:
                    </span>
                    <ul className="text-xs text-gray-600 space-y-1.5">
                      {c.eligibilityFactors.slice(0, 2).map((factor, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-[#c9973a] shrink-0 mt-0.5">✓</span>
                          <span className="line-clamp-1">{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => { onNavigate(`/case/${c.slug}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="text-xs font-semibold text-gray-600 hover:text-[#0f1f3d] transition-colors flex items-center gap-1 group/btn"
                    >
                      <span>Learn More</span>
                      <span className="group-hover/btn:translate-x-0.5 transition-transform inline-block">→</span>
                    </button>

                    <button
                      onClick={() => onOpenEvaluation(c.slug)}
                      className="btn-gold px-4 py-2 text-xs rounded-lg"
                    >
                      Start Evaluation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
