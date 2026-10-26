import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CaseEvaluationModal } from "./components/CaseEvaluationModal";

import { HomePage } from "./pages/HomePage";
import { OurCasesPage } from "./pages/OurCasesPage";
import { CaseDetailPage } from "./pages/CaseDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { FaqPage } from "./pages/FaqPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsPage } from "./pages/TermsPage";

import { CASES } from "./data/cases";
import { siteConfig } from "./data/siteConfig";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || "/");
  const [evalModalOpen, setEvalModalOpen] = useState(false);
  const [evalModalCaseSlug, setEvalModalCaseSlug] = useState<string | undefined>(undefined);

  // Synchronize path changes with browser history & window location
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, "", path);
  };

  const handleOpenEvaluation = (caseSlug?: string) => {
    setEvalModalCaseSlug(caseSlug);
    setEvalModalOpen(true);
  };

  // SEO & Document Title updates based on route
  useEffect(() => {
    let title = `${siteConfig.name} — Free Case Evaluation & Legal Referral Network`;
    let desc = siteConfig.heroSubtitle;

    if (currentPath === "/our-cases") {
      title = `Active Lawsuits & Cases — ${siteConfig.name}`;
      desc = "Explore active lawsuit evaluations including Mass Torts, Oxbryta, Depo-Provera, NEC, Roundup, and Personal Injury.";
    } else if (currentPath.startsWith("/case/")) {
      const slug = currentPath.replace("/case/", "");
      const matchedCase = CASES.find((c) => c.slug === slug);
      if (matchedCase) {
        title = `${matchedCase.title} — Free Case Evaluation | ${siteConfig.name}`;
        desc = matchedCase.shortDescription;
      }
    } else if (currentPath === "/about") {
      title = `About Us — ${siteConfig.name}`;
      desc = "Learn about Injurease.us, our nationwide legal referral platform, and our commitment to transparent legal connections.";
    } else if (currentPath === "/how-it-works") {
      title = `How It Works — ${siteConfig.name}`;
      desc = "Understand our 4-step free legal case evaluation process.";
    } else if (currentPath === "/faq") {
      title = `Frequently Asked Questions — ${siteConfig.name}`;
      desc = "Find answers regarding law firm status, legal evaluation process, and privacy safeguards.";
    } else if (currentPath === "/contact") {
      title = `Contact Us — ${siteConfig.name}`;
      desc = "Get in touch with the Injurease.us support team.";
    } else if (currentPath === "/privacy-policy") {
      title = `Privacy Policy — ${siteConfig.name}`;
    } else if (currentPath === "/terms-and-conditions") {
      title = `Terms & Conditions — ${siteConfig.name}`;
    }

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", desc);
  }, [currentPath]);

  // Render main content area based on route
  const renderCurrentPage = () => {
    if (currentPath === "/") {
      return (
        <HomePage
          onNavigate={navigateTo}
          onOpenEvaluation={handleOpenEvaluation}
        />
      );
    }

    if (currentPath === "/our-cases") {
      return (
        <OurCasesPage
          onNavigate={navigateTo}
          onOpenEvaluation={handleOpenEvaluation}
        />
      );
    }

    if (currentPath.startsWith("/case/")) {
      const slug = currentPath.replace("/case/", "");
      return (
        <CaseDetailPage
          slug={slug}
          onNavigate={navigateTo}
          onOpenEvaluation={handleOpenEvaluation}
        />
      );
    }

    if (currentPath === "/about") {
      return (
        <AboutPage
          onNavigate={navigateTo}
          onOpenEvaluation={handleOpenEvaluation}
        />
      );
    }

    if (currentPath === "/how-it-works") {
      return (
        <HowItWorksPage
          onNavigate={navigateTo}
          onOpenEvaluation={handleOpenEvaluation}
        />
      );
    }

    if (currentPath === "/faq") {
      return (
        <FaqPage
          onNavigate={navigateTo}
          onOpenEvaluation={handleOpenEvaluation}
        />
      );
    }

    if (currentPath === "/contact") {
      return (
        <ContactPage
          onNavigate={navigateTo}
          onOpenEvaluation={handleOpenEvaluation}
        />
      );
    }

    if (currentPath === "/privacy-policy") {
      return <PrivacyPolicyPage />;
    }

    if (currentPath === "/terms-and-conditions") {
      return <TermsPage />;
    }

    // Default Fallback to Homepage
    return (
      <HomePage
        onNavigate={navigateTo}
        onOpenEvaluation={handleOpenEvaluation}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf7] font-sans antialiased text-[#0f1f3d]">
      {/* Top Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenEvaluation={handleOpenEvaluation}
      />

      {/* Main Page Body */}
      <main className="flex-1">{renderCurrentPage()}</main>

      {/* Reusable Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Mobile Sticky Floating Bar (< 640px) */}
      {!evalModalOpen && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-2xl z-40 flex items-center gap-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button
            onClick={() => handleOpenEvaluation()}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#0f1f3d] flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
          >
            <span>Start Free Evaluation</span>
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#c9973a]">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </button>
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="py-3 px-3 rounded-xl border border-gray-300 text-[#0f1f3d] bg-gray-50 flex items-center justify-center shrink-0 active:scale-95 transition-all"
            aria-label="Call Injurease"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-[#c9973a]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.47-5.147-3.793-6.617-6.617l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </a>
        </div>
      )}

      {/* Global Interactive Case Evaluation Wizard Modal */}
      <CaseEvaluationModal
        isOpen={evalModalOpen}
        initialCaseSlug={evalModalCaseSlug}
        onClose={() => setEvalModalOpen(false)}
      />
    </div>
  );
}
