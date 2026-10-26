import { useState } from "react";
import { siteConfig } from "../data/siteConfig";
import { submitGeneralContact } from "../services/formSubmission";

interface ContactPageProps {
  onNavigate: (path: string) => void;
  onOpenEvaluation: (caseSlug?: string) => void;
}

export function ContactPage({ onNavigate, onOpenEvaluation }: ContactPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || !consent) {
      setErrorMessage("Please complete all required fields and check the consent box.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const res = await submitGeneralContact({
      name,
      email,
      phone,
      subject: subject || "General Website Contact Inquiry",
      message,
      consent,
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmittedSuccess(true);
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="space-y-0 pb-20">
      {/* Header Banner */}
      <section className="bg-[#0f1f3d] text-white py-16 sm:py-24 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#c9973a]">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-white">
            Contact Injurease.us
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Have questions about our referral platform or active lawsuit campaigns? Send us a message or call our support line.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-5 gap-12">
        {/* Contact Details Column */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-serif text-[#0f1f3d]">Contact Information</h2>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Our support team is available during standard business hours to assist with website inquiries.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#0f1f3d] text-[#c9973a] flex items-center justify-center text-lg shrink-0">
                📞
              </div>
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#c9973a]">Toll-Free Phone</div>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="text-base font-bold text-[#0f1f3d] hover:text-[#c9973a] transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
                <p className="text-[11px] text-gray-500 mt-0.5">Free consultations nationwide</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#0f1f3d] text-[#c9973a] flex items-center justify-center text-lg shrink-0">
                ✉️
              </div>
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#c9973a]">Email Address</div>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm font-bold text-[#0f1f3d] hover:text-[#c9973a] transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
                <p className="text-[11px] text-gray-500 mt-0.5">24-hour typical email response</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#0f1f3d] text-[#c9973a] flex items-center justify-center text-lg shrink-0">
                📍
              </div>
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#c9973a]">Office Address</div>
                <p className="text-xs font-bold text-[#0f1f3d]">{siteConfig.contact.address}</p>
                <p className="text-xs text-gray-600">{siteConfig.contact.cityStateZip}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#0f1f3d] text-[#c9973a] flex items-center justify-center text-lg shrink-0">
                🕒
              </div>
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#c9973a]">Business Hours</div>
                <p className="text-xs font-bold text-[#0f1f3d]">{siteConfig.contact.hours}</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-2">
            <p className="font-bold text-[#0f1f3d]">Looking for a Case Evaluation?</p>
            <p className="text-gray-700 leading-relaxed">
              If you want to submit details for a potential lawsuit, please use our Case Evaluation wizard for faster routing.
            </p>
            <button
              onClick={() => onOpenEvaluation()}
              className="mt-2 w-full py-2.5 bg-[#0f1f3d] text-white font-bold rounded-lg text-xs hover:bg-[#1a2f55]"
            >
              Start Case Evaluation Wizard →
            </button>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h2 className="text-xl font-bold text-[#0f1f3d] mb-1 font-sans">Send Us a Message</h2>
            <p className="text-xs text-gray-500 mb-6">
              Complete the form below for general inquiry or support requests.
            </p>

            {submittedSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-[#0f1f3d] font-serif">Message Sent Successfully</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Thank you, {name}. We have received your inquiry and will respond to {email} as soon as possible.
                </p>
                <button
                  onClick={() => {
                    setSubmittedSuccess(false);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setSubject("");
                    setMessage("");
                    setConsent(false);
                  }}
                  className="px-5 py-2.5 bg-[#0f1f3d] text-white text-xs font-bold rounded-lg"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg font-medium">
                    {errorMessage}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 mb-1">
                      Your Name <span className="text-amber-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-300 bg-gray-50 text-gray-900 outline-none focus:border-[#c9973a]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-800 mb-1">
                      Email Address <span className="text-amber-600">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-300 bg-gray-50 text-gray-900 outline-none focus:border-[#c9973a]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-300 bg-gray-50 text-gray-900 outline-none focus:border-[#c9973a]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-800 mb-1">
                      Subject / Reason
                    </label>
                    <input
                      type="text"
                      placeholder="General Inquiry / Campaign Question"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-300 bg-gray-50 text-gray-900 outline-none focus:border-[#c9973a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">
                    Your Message <span className="text-amber-600">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="How can we help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-300 bg-gray-50 text-gray-900 outline-none focus:border-[#c9973a] resize-none"
                  />
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-0.5 accent-[#c9973a]"
                  />
                  <span className="text-[11px] text-gray-600 leading-relaxed font-sans">
                    I consent to Injurease.us responding to my inquiry via email or telephone. I understand Injurease.us is a referral platform, not a law firm. *
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#0f1f3d] text-white text-xs font-bold rounded-xl hover:bg-[#1a2f55] transition-colors shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? "Sending Message..." : "Submit Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
