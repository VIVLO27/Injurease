import { siteConfig } from "../data/siteConfig";
import { CASES } from "../data/cases";

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0f1f3d] text-gray-300 font-sans border-t border-gray-800">
      {/* Top Footer Callout */}
      <div className="border-b border-gray-800/80 bg-[#162747]/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#c9973a]/20 border border-[#c9973a]/40 flex items-center justify-center text-[#c9973a] shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white text-base font-semibold">Ready to explore your legal options?</h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                Free confidential case evaluations. Speak with an independent attorney at no cost.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 text-xs font-bold text-white hover:bg-white/10 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-[#c9973a]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.47-5.147-3.793-6.617-6.617l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span>Call {siteConfig.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#1a2f55] flex items-center justify-center border border-[#c9973a]/30">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="#c9973a" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Injure<span className="text-[#c9973a]">ase</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
            Injurease is a legal marketing and referral platform. We connect individuals seeking legal options with independent licensed attorneys across the United States.
          </p>

          {/* Security & Compliance Badges in Brand Column */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#e6b865] bg-[#c9973a]/10 border border-[#c9973a]/30 px-3 py-1.5 rounded-lg w-fit">
              <span>🔒</span>
              <span>256-Bit SSL Secured</span>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#e6b865] bg-[#c9973a]/10 border border-[#c9973a]/30 px-3 py-1.5 rounded-lg w-fit">
              <span>🛡️</span>
              <span>TCPA Compliant</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-gray-400 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-[#c9973a]">📍</span>
              <span>{siteConfig.contact.fullAddress}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#c9973a]">📞</span>
              <a href={`tel:${siteConfig.contact.phoneRaw}`} className="hover:text-white transition-colors">
                {siteConfig.contact.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#c9973a]">✉️</span>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#c9973a]">🕒</span>
              <span>{siteConfig.contact.hours}</span>
            </div>
          </div>
        </div>

        {/* Active Lawsuits */}
        <div>
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#c9973a] mb-4">
            Active Cases
          </h4>
          <ul className="space-y-2 text-xs">
            {CASES.map((c) => (
              <li key={c.id}>
                <a
                  href={`/case/${c.slug}`}
                  onClick={(e) => handleLinkClick(`/case/${c.slug}`, e)}
                  className="text-gray-400 hover:text-white transition-colors block truncate"
                >
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#c9973a] mb-4">
            Company
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a href="/" onClick={(e) => handleLinkClick("/", e)} className="text-gray-400 hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/our-cases" onClick={(e) => handleLinkClick("/our-cases", e)} className="text-gray-400 hover:text-white transition-colors">
                Our Cases
              </a>
            </li>
            <li>
              <a href="/how-it-works" onClick={(e) => handleLinkClick("/how-it-works", e)} className="text-gray-400 hover:text-white transition-colors">
                How It Works
              </a>
            </li>
            <li>
              <a href="/about" onClick={(e) => handleLinkClick("/about", e)} className="text-gray-400 hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="/faq" onClick={(e) => handleLinkClick("/faq", e)} className="text-gray-400 hover:text-white transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="/contact" onClick={(e) => handleLinkClick("/contact", e)} className="text-gray-400 hover:text-white transition-colors">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#c9973a] mb-4">
            Legal &amp; Disclosures
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a href="/privacy-policy" onClick={(e) => handleLinkClick("/privacy-policy", e)} className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-and-conditions" onClick={(e) => handleLinkClick("/terms-and-conditions", e)} className="text-gray-400 hover:text-white transition-colors">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <span className="text-gray-500 block text-[11px] leading-relaxed mt-2">
                Attorney Advertising Notice. No legal representation guaranteed until written retainer contract is executed.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Disclaimers & Copyright */}
      <div className="border-t border-gray-800/80 bg-[#091326] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4 text-[11px] text-gray-500 leading-relaxed">
          <p>
            <strong className="text-gray-400">Legal Disclaimer:</strong> {siteConfig.legal.disclaimer}
          </p>
          <p>
            <strong className="text-gray-400">Advertising Notice:</strong> {siteConfig.legal.advertisingNotice}
          </p>

          <div className="pt-4 border-t border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p>© {new Date().getFullYear()} Injurease. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[11px]">
              <a href="/privacy-policy" onClick={(e) => handleLinkClick("/privacy-policy", e)} className="hover:text-gray-300">Privacy Policy</a>
              <span>•</span>
              <a href="/terms-and-conditions" onClick={(e) => handleLinkClick("/terms-and-conditions", e)} className="hover:text-gray-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
