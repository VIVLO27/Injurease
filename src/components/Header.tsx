import { useState, useEffect, useRef } from "react";
import { siteConfig } from "../data/siteConfig";
import { CASES, CaseDetail } from "../data/cases";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenEvaluation: (caseSlug?: string) => void;
}

export function Header({ currentPath, onNavigate, onOpenEvaluation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [casesDropdownOpen, setCasesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("All");
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Spotlight case for the mega menu (e.g. Oxbryta or Depo-Provera)
  const spotlightCase: CaseDetail = CASES.find((c) => c.slug === "depo-provera") || CASES[0];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (path: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
    setCasesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setCasesDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setCasesDropdownOpen(false);
    }, 180);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Our Cases", path: "/our-cases", isDropdown: true },
    { label: "How It Works", path: "/how-it-works" },
    { label: "About Us", path: "/about" },
    { label: "FAQ", path: "/faq" },
    { label: "Contact", path: "/contact" },
  ];

  const categories = [
    "All",
    "Prescription Drugs",
    "Toxic Exposure",
    "Abuse & Sexual Assault",
    "Personal Injury",
  ];

  const filteredDropdownCases = activeCategoryFilter === "All"
    ? CASES.slice(0, 6)
    : CASES.filter((c) => c.category.toLowerCase().includes(activeCategoryFilter.toLowerCase())).slice(0, 6);

  return (
    <>
      {/* ============================================================
          TOP ANNOUNCEMENT & TRUST TICKER
          ============================================================ */}
      <div className="bg-[#070e1b] text-white text-[11px] font-sans border-b border-white/5 py-1.5 px-4 hidden sm:block relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: 24/7 Intake Status */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>24/7 Free Legal Intake Active</span>
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-300 font-mono">
              Confidential Nationwide Evaluation
            </span>
          </div>

          {/* Right: Direct Hotline & Trust Seals */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 text-gray-400">
              <span className="flex items-center gap-1">
                <span>🔒</span> 256-Bit SSL
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span>⚖️</span> No Win No Fee Basis
              </span>
            </div>

            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="inline-flex items-center gap-1.5 font-bold text-[#e6b865] hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.47-5.147-3.793-6.617-6.617l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span>{siteConfig.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================
          MAIN MODERN NAVBAR
          ============================================================ */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/80 py-2.5"
            : "bg-white/95 backdrop-blur-md border-b border-gray-200/60 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* BRAND LOGO */}
          <a
            href="/"
            onClick={(e) => handleLinkClick("/", e)}
            className="flex items-center gap-3 group focus:outline-hidden"
          >
            {/* Logo Emblem */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#0f1f3d] via-[#16274a] to-[#0a1528] p-0.5 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full rounded-[10px] bg-[#0f1f3d] flex items-center justify-center border border-[#c9973a]/30">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#c9973a] group-hover:rotate-12 transition-transform duration-300" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                </svg>
              </div>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#c9973a]/0 via-[#c9973a]/30 to-[#c9973a]/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xs -z-10" />
            </div>

            {/* Brand Text */}
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f1f3d] font-sans leading-none">
                Injure<span className="text-[#c9973a] font-extrabold">ase</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mt-0.5 font-semibold">
                Legal Referral
              </span>
            </div>
          </a>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-gray-100/60 p-1.5 rounded-2xl border border-gray-200/50 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive =
                link.path === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(link.path);

              if (link.isDropdown) {
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      onClick={() => setCasesDropdownOpen(!casesDropdownOpen)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                        isActive || casesDropdownOpen
                          ? "bg-white text-[#0f1f3d] shadow-xs font-bold"
                          : "text-gray-600 hover:text-[#0f1f3d] hover:bg-white/60"
                      }`}
                    >
                      <span>Our Cases</span>
                      <span className="px-1.5 py-0.2 bg-[#c9973a]/15 text-[#c9973a] text-[10px] font-mono font-bold rounded-full">
                        {CASES.length}
                      </span>
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          casesDropdownOpen ? "rotate-180 text-[#c9973a]" : "text-gray-400"
                        }`}
                      >
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {/* ============================================================
                        ADVANCED MEGA MENU DROPDOWN
                        ============================================================ */}
                    {casesDropdownOpen && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 w-[760px] mt-2 bg-white rounded-2xl shadow-2xl border border-gray-150 p-6 z-50 animate-in fade-in slide-in-from-top-3 duration-200"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                      >
                        {/* Mega Menu Header */}
                        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-gray-100">
                          <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#c9973a]">
                              Active Litigation Directory
                            </span>
                            <p className="text-xs text-gray-500 font-sans mt-0.5">
                              Independent attorneys evaluating claims across all 50 states
                            </p>
                          </div>
                          <a
                            href="/our-cases"
                            onClick={(e) => handleLinkClick("/our-cases", e)}
                            className="text-xs font-bold text-[#0f1f3d] hover:text-[#c9973a] transition-colors flex items-center gap-1 group"
                          >
                            <span>Browse All {CASES.length} Cases</span>
                            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                          </a>
                        </div>

                        {/* Mega Menu Body: 2 Columns */}
                        <div className="grid grid-cols-12 gap-6">
                          {/* Left Column: Filterable Cases List (8 Cols) */}
                          <div className="col-span-8 space-y-3">
                            {/* Filter Chips */}
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                              {categories.map((cat) => (
                                <button
                                  key={cat}
                                  onClick={() => setActiveCategoryFilter(cat)}
                                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                                    activeCategoryFilter === cat
                                      ? "bg-[#0f1f3d] text-white shadow-xs"
                                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                  }`}
                                >
                                  {cat}
                                </button>
                              ))}
                            </div>

                            {/* Case Grid Items */}
                            <div className="grid grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                              {filteredDropdownCases.map((c) => (
                                <a
                                  key={c.id}
                                  href={`/case/${c.slug}`}
                                  onClick={(e) => handleLinkClick(`/case/${c.slug}`, e)}
                                  className="p-3 rounded-xl border border-gray-150 hover:border-[#c9973a]/40 hover:bg-amber-50/40 transition-all duration-150 group flex flex-col justify-between"
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-1 mb-1">
                                      <span className="text-[10px] font-mono text-[#c9973a] font-bold uppercase truncate">
                                        {c.category.split("&")[0].trim()}
                                      </span>
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                    </div>
                                    <h4 className="text-xs font-bold text-[#0f1f3d] group-hover:text-[#c9973a] transition-colors line-clamp-1">
                                      {c.title}
                                    </h4>
                                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-snug">
                                      {c.shortDescription}
                                    </p>
                                  </div>
                                  <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 group-hover:text-[#0f1f3d] font-semibold">
                                    <span>Learn more</span>
                                    <span>→</span>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>

                          {/* Right Column: Spotlight Feature Card (4 Cols) */}
                          <div className="col-span-4 bg-gradient-to-br from-[#0f1f3d] to-[#16274a] text-white rounded-2xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9973a]/15 rounded-full blur-2xl pointer-events-none" />

                            <div className="relative z-10 space-y-2.5">
                              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#c9973a]/20 border border-[#c9973a]/40 text-[#f5d070] text-[10px] font-mono font-bold uppercase">
                                <span>⚡</span> High Priority Claim
                              </div>

                              <div className="rounded-xl overflow-hidden aspect-16/10 border border-white/10 mt-1">
                                <img
                                  src={spotlightCase.heroImage}
                                  alt={spotlightCase.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div>
                                <h5 className="text-xs font-bold text-white font-sans line-clamp-1">
                                  {spotlightCase.title}
                                </h5>
                                <p className="text-[11px] text-gray-300 line-clamp-2 mt-0.5">
                                  {spotlightCase.shortDescription}
                                </p>
                              </div>
                            </div>

                            <div className="pt-3 relative z-10 space-y-1.5">
                              <button
                                onClick={() => {
                                  setCasesDropdownOpen(false);
                                  onOpenEvaluation(spotlightCase.slug);
                                }}
                                className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-[#c9973a] hover:bg-[#e6b865] text-[#0f1f3d] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                              >
                                <span>Evaluate Claim</span>
                                <span>→</span>
                              </button>
                              <p className="text-[9px] text-center text-gray-400 font-mono">
                                100% Free • No Obligation
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Mega Menu Footer Banner */}
                        <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-sans">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>All cases reviewed independently by licensed attorneys.</span>
                          </div>
                          <a
                            href="/our-cases"
                            onClick={(e) => handleLinkClick("/our-cases", e)}
                            className="font-bold text-[#0f1f3d] hover:text-[#c9973a] transition-colors"
                          >
                            Explore All Lawsuit Criteria →
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(link.path, e)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-white text-[#0f1f3d] shadow-xs font-bold"
                      : "text-gray-600 hover:text-[#0f1f3d] hover:bg-white/60"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-3">
            {/* Quick Call Pill (Tablet & Desktop) */}
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-gray-100/80 hover:bg-gray-200/80 transition-colors border border-gray-200/60"
              title="Call Injurease 24/7"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-gray-800 font-bold">{siteConfig.contact.phone}</span>
            </a>

            {/* Glowing CTA Button */}
            <button
              onClick={() => onOpenEvaluation()}
              className="btn-gold inline-flex items-center gap-2 text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-97"
            >
              <span>Free Evaluation</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-gray-200 text-[#0f1f3d] bg-gray-50 hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ============================================================
            MOBILE SLIDE-DOWN DRAWER
            ============================================================ */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-5 py-5 flex flex-col gap-4 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            {/* Quick Call Box in Mobile Menu */}
            <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200/80 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-[#c9973a] font-bold uppercase tracking-wider">
                  24/7 Toll-Free Hotline
                </div>
                <div className="text-sm font-bold text-[#0f1f3d] font-mono">
                  {siteConfig.contact.phone}
                </div>
              </div>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="px-3.5 py-2 rounded-xl bg-[#0f1f3d] text-white text-xs font-bold shadow-xs active:scale-95 transition-transform flex items-center gap-1.5"
              >
                <span>Call Now</span>
              </a>
            </div>

            {/* Nav Links */}
            <div className="space-y-1">
              <a
                href="/"
                onClick={(e) => handleLinkClick("/", e)}
                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-semibold ${
                  currentPath === "/" ? "bg-[#0f1f3d] text-white" : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                <span>Home</span>
                <span>→</span>
              </a>

              {/* Mobile Accordion for Cases */}
              <div className="rounded-xl border border-gray-150 overflow-hidden my-2">
                <div className="bg-gray-50 px-3.5 py-2.5 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0f1f3d] font-sans">
                    Active Lawsuits ({CASES.length})
                  </span>
                  <a
                    href="/our-cases"
                    onClick={(e) => handleLinkClick("/our-cases", e)}
                    className="text-xs text-[#c9973a] font-bold"
                  >
                    View All →
                  </a>
                </div>
                <div className="p-2 space-y-1 bg-white max-h-48 overflow-y-auto">
                  {CASES.map((c) => (
                    <a
                      key={c.id}
                      href={`/case/${c.slug}`}
                      onClick={(e) => handleLinkClick(`/case/${c.slug}`, e)}
                      className="block px-3 py-2 rounded-lg text-xs text-gray-700 hover:bg-amber-50 hover:text-[#0f1f3d] transition-colors"
                    >
                      <div className="font-semibold">{c.title}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{c.category}</div>
                    </a>
                  ))}
                </div>
              </div>

              <a
                href="/how-it-works"
                onClick={(e) => handleLinkClick("/how-it-works", e)}
                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-semibold ${
                  currentPath === "/how-it-works" ? "bg-[#0f1f3d] text-white" : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                <span>How It Works</span>
                <span>→</span>
              </a>

              <a
                href="/about"
                onClick={(e) => handleLinkClick("/about", e)}
                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-semibold ${
                  currentPath === "/about" ? "bg-[#0f1f3d] text-white" : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                <span>About Us</span>
                <span>→</span>
              </a>

              <a
                href="/faq"
                onClick={(e) => handleLinkClick("/faq", e)}
                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-semibold ${
                  currentPath === "/faq" ? "bg-[#0f1f3d] text-white" : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                <span>FAQ</span>
                <span>→</span>
              </a>

              <a
                href="/contact"
                onClick={(e) => handleLinkClick("/contact", e)}
                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-semibold ${
                  currentPath === "/contact" ? "bg-[#0f1f3d] text-white" : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                <span>Contact Us</span>
                <span>→</span>
              </a>
            </div>

            {/* Mobile Bottom CTA */}
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEvaluation();
                }}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-[#0f1f3d] hover:bg-[#1a2f55] flex items-center justify-center gap-2 shadow-md"
              >
                <span>Start Free Case Evaluation</span>
                <span className="text-[#c9973a]">→</span>
              </button>
              <div className="flex items-center justify-center gap-3 text-[11px] text-gray-400 font-mono pt-1">
                <span>🔒 256-Bit SSL</span>
                <span>•</span>
                <span>🛡️ TCPA Compliant</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
