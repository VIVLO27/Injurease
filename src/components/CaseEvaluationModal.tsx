import { useState, useEffect } from "react";
import { CASES, CaseDetail } from "../data/cases";
import { siteConfig } from "../data/siteConfig";
import { submitCaseEvaluation, EvaluationFormData } from "../services/formSubmission";

interface CaseEvaluationModalProps {
  isOpen: boolean;
  initialCaseSlug?: string;
  onClose: () => void;
}

export function CaseEvaluationModal({
  isOpen,
  initialCaseSlug,
  onClose,
}: CaseEvaluationModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCaseSlug, setSelectedCaseSlug] = useState<string>(
    initialCaseSlug || CASES[0].slug
  );

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("United States");

  const [incidentDate, setIncidentDate] = useState("");
  const [description, setDescription] = useState("");
  const [attorneyWillingness, setAttorneyWillingness] = useState("yes");

  // Dynamic Case Specific Answers
  const [caseAnswers, setCaseAnswers] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);

  // UX & Async States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    if (initialCaseSlug) {
      setSelectedCaseSlug(initialCaseSlug);
    }
  }, [initialCaseSlug]);

  const activeCase: CaseDetail =
    CASES.find((c) => c.slug === selectedCaseSlug) || CASES[0];

  if (!isOpen) return null;

  const handleCaseSelect = (slug: string) => {
    setSelectedCaseSlug(slug);
    setCaseAnswers({});
    setErrors({});
  };

  const handleAnswerChange = (fieldId: string, val: string) => {
    setCaseAnswers((prev) => ({
      ...prev,
      [fieldId]: val,
    }));
    if (errors[fieldId]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!selectedCaseSlug) newErrors.case = "Please select a campaign.";
    }

    if (step === 2) {
      activeCase.formFields.forEach((field) => {
        if (field.required && !caseAnswers[field.id]) {
          newErrors[field.id] = `Please select or answer: "${field.label}"`;
        }
      });
    }

    if (step === 3) {
      if (!state) newErrors.state = "Please provide state where incident occurred.";
      if (!description || description.trim().length < 10) {
        newErrors.description = "Please enter at least a short 10-character description of your situation.";
      }
    }

    if (step === 4) {
      if (!firstName.trim()) newErrors.firstName = "First name is required.";
      if (!lastName.trim()) newErrors.lastName = "Last name is required.";
      if (!email.trim() || !email.includes("@"))
        newErrors.email = "Valid email address is required.";
      if (!phone.trim() || phone.replace(/\D/g, "").length < 10)
        newErrors.phone = "Valid 10-digit phone number is required.";
      if (!state.trim()) newErrors.state = "State is required.";
    }

    if (step === 5) {
      if (!consent) newErrors.consent = "You must accept the terms & consent to submit your request.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const payload: EvaluationFormData = {
      caseId: activeCase.id,
      caseTitle: activeCase.title,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      country,
      attorneyWillingness,
      incidentDate,
      description,
      caseAnswers,
      consent,
      sourceUrl: window.location.href,
    };

    const res = await submitCaseEvaluation(payload);
    setIsSubmitting(false);

    if (res.success) {
      setSubmissionSuccess(true);
      setReferenceId(res.referenceId || "INJ-OK");
    } else {
      setSubmissionError(res.message);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setCity("");
    setState("");
    setZipCode("");
    setIncidentDate("");
    setDescription("");
    setCaseAnswers({});
    setConsent(false);
    setErrors({});
    setSubmissionSuccess(false);
    setSubmissionError(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]">
        {/* Header Bar with Security Badges */}
        <div className="bg-[#0f1f3d] text-white px-6 py-4 flex items-center justify-between border-b border-gray-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1a2f55] border border-[#c9973a]/40 flex items-center justify-center text-[#c9973a]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white font-sans">
                  Injurease Case Evaluation
                </h2>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/40">
                  🔒 256-Bit SSL
                </span>
                <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 hidden sm:inline-block">
                  🛡️ TCPA Compliant
                </span>
              </div>
              <p className="text-xs text-gray-300 font-mono">
                {activeCase.title} • Confidential Submission
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close evaluation modal"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Step Bar */}
        {!submissionSuccess && (
          <div className="bg-amber-50/60 border-b border-amber-100 px-6 py-3 shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono font-bold uppercase text-[#0f1f3d]">
                Step {currentStep} of 5: {
                  ["Select Campaign", "Case Questionnaire", "Incident Details", "Contact Information", "Review & Consent"][currentStep - 1]
                }
              </span>
              <span className="text-xs font-mono font-bold text-[#c9973a]">
                {Math.round((currentStep / 5) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#c9973a] h-full transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* SUCCESS STATE */}
          {submissionSuccess ? (
            <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 border border-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 font-mono text-xs font-bold rounded-full">
                  Reference Code: {referenceId}
                </span>
                <h3 className="text-2xl font-bold text-[#0f1f3d] font-serif">
                  Case Evaluation Submitted
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Thank you, <strong className="text-gray-900">{firstName}</strong>. Your evaluation request for{" "}
                  <strong className="text-[#0f1f3d]">{activeCase.title}</strong> has been transmitted securely via 256-Bit SSL to our legal intake team.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-600 max-w-md mx-auto text-left space-y-2 font-sans">
                <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                  <span className="text-[#c9973a]">✓</span> Next Steps:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Our intake team reviews your responses against eligibility guidelines.</li>
                  <li>An independent participating attorney will contact you at <strong className="text-gray-900">{phone}</strong> or <strong className="text-gray-900">{email}</strong>.</li>
                  <li>TCPA Compliant communication • Free with zero obligation.</li>
                </ul>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#0f1f3d] text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Done &amp; Close Window
                </button>
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-6 py-2.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Submit Another Evaluation
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submissionError && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-900 text-sm">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-rose-600 shrink-0">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                    <span>Submission Issue</span>
                  </div>
                  <p>{submissionError}</p>
                  <p>
                    Call us directly at{" "}
                    <a href={`tel:${siteConfig.contact.phoneRaw}`} className="underline font-bold">
                      {siteConfig.contact.phone}
                    </a>.
                  </p>
                </div>
              )}

              {/* STEP 1 */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div>
                    <h3 className="text-lg font-bold text-[#0f1f3d] font-sans">
                      Select Lawsuit Campaign
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Choose the specific case category for your evaluation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                    {CASES.map((c) => {
                      const isSelected = selectedCaseSlug === c.slug;
                      return (
                        <div
                          key={c.id}
                          onClick={() => handleCaseSelect(c.slug)}
                          className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                            isSelected
                              ? "border-[#c9973a] bg-amber-50/70 shadow-xs"
                              : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-[#0f1f3d] font-sans">
                              {c.title}
                            </span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-[#c9973a] text-white flex items-center justify-center text-xs font-bold shrink-0">
                                ✓
                              </span>
                            )}
                          </div>
                          <span className="inline-block px-1.5 py-0.5 mt-1 text-[10px] font-mono font-semibold bg-gray-100 text-gray-700 rounded">
                            {c.category}
                          </span>
                          <p className="text-[11px] text-gray-500 line-clamp-2 mt-1.5">
                            {c.shortDescription}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-[11px] font-mono uppercase font-bold text-[#c9973a]">
                      {activeCase.category}
                    </span>
                    <h3 className="text-lg font-bold text-[#0f1f3d] font-sans">
                      {activeCase.title} Questionnaire
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {activeCase.formFields.map((field) => (
                      <div key={field.id} className="space-y-1.5">
                        <label className="block text-xs font-semibold text-gray-800">
                          {field.label} {field.required && <span className="text-amber-600">*</span>}
                        </label>

                        {field.type === "select" && (
                          <select
                            value={caseAnswers[field.id] || ""}
                            onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                            className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-300 bg-gray-50/50 text-gray-900 outline-none focus:border-[#c9973a]"
                          >
                            <option value="">Select option...</option>
                            {field.options?.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {field.type === "radio" && (
                          <div className="space-y-2">
                            {field.options?.map((opt) => (
                              <label
                                key={opt.value}
                                className={`flex items-center gap-3 p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                                  caseAnswers[field.id] === opt.value
                                    ? "border-[#c9973a] bg-amber-50/60 font-semibold text-[#0f1f3d]"
                                    : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={field.id}
                                  value={opt.value}
                                  checked={caseAnswers[field.id] === opt.value}
                                  onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                                  className="accent-[#c9973a]"
                                />
                                <span>{opt.label}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {field.type === "text" && (
                          <input
                            type="text"
                            placeholder={field.placeholder || ""}
                            value={caseAnswers[field.id] || ""}
                            onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                            className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-300 bg-gray-50/50 text-gray-900 outline-none focus:border-[#c9973a]"
                          />
                        )}

                        {field.type === "date" && (
                          <input
                            type="date"
                            value={caseAnswers[field.id] || ""}
                            onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                            className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-300 bg-gray-50/50 text-gray-900 outline-none focus:border-[#c9973a]"
                          />
                        )}

                        {errors[field.id] && (
                          <p className="text-[11px] text-rose-600 font-medium">
                            {errors[field.id]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div>
                    <h3 className="text-lg font-bold text-[#0f1f3d] font-sans">
                      Incident Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-800 mb-1">
                        State Where Incident Occurred <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., California, Illinois, Texas..."
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-300 bg-gray-50/50 text-gray-900 outline-none focus:border-[#c9973a]"
                      />
                      {errors.state && <p className="text-[11px] text-rose-600 mt-1">{errors.state}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-800 mb-1">
                        Approximate Date or Timeframe
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 2021 - 2023"
                        value={incidentDate}
                        onChange={(e) => setIncidentDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-300 bg-gray-50/50 text-gray-900 outline-none focus:border-[#c9973a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-800 mb-1">
                      Brief Description of Your Situation <span className="text-amber-600">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please summarize what happened, medical treatments received, or injuries sustained..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-300 bg-gray-50/50 text-gray-900 outline-none focus:border-[#c9973a] resize-none"
                    />
                    {errors.description && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.description}</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div>
                    <h3 className="text-lg font-bold text-[#0f1f3d] font-sans">
                      Contact Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-800 mb-1">
                        First Name <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Jane"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-300 bg-gray-50/50 text-gray-900 outline-none focus:border-[#c9973a]"
                      />
                      {errors.firstName && <p className="text-[11px] text-rose-600 mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-800 mb-1">
                        Last Name <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-300 bg-gray-50/50 text-gray-900 outline-none focus:border-[#c9973a]"
                      />
                      {errors.lastName && <p className="text-[11px] text-rose-600 mt-1">{errors.lastName}</p>}
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
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-300 bg-gray-50/50 text-gray-900 outline-none focus:border-[#c9973a]"
                      />
                      {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-800 mb-1">
                        Phone Number <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-300 bg-gray-50/50 text-gray-900 outline-none focus:border-[#c9973a]"
                      />
                      {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-800 mb-1">
                        Street Address (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="123 Main St, Apt 4B"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-300 bg-gray-50/50 text-gray-900 outline-none focus:border-[#c9973a]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5 */}
              {currentStep === 5 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h3 className="text-lg font-bold text-[#0f1f3d] font-sans">
                      Review &amp; Submit Request
                    </h3>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs space-y-2">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="font-bold text-[#0f1f3d]">Selected Case:</span>
                      <span className="font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        {activeCase.title}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Contact:</span>{" "}
                      <span>{firstName} {lastName} ({email} • {phone})</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Location:</span>{" "}
                      <span>{state}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-800">
                      Willing to speak directly with an independent attorney? <span className="text-amber-600">*</span>
                    </label>
                    <div className="flex gap-4 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-800">
                        <input
                          type="radio"
                          name="attorneyWillingness"
                          value="yes"
                          checked={attorneyWillingness === "yes"}
                          onChange={(e) => setAttorneyWillingness(e.target.value)}
                          className="accent-[#c9973a]"
                        />
                        <span>Yes, connect me with an attorney</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-800">
                        <input
                          type="radio"
                          name="attorneyWillingness"
                          value="no"
                          checked={attorneyWillingness === "no"}
                          onChange={(e) => setAttorneyWillingness(e.target.value)}
                          className="accent-[#c9973a]"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-start gap-3 p-3.5 bg-amber-50/50 border border-amber-200 rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-[#c9973a] shrink-0"
                      />
                      <span className="text-[11px] text-gray-700 leading-relaxed font-sans">
                        {siteConfig.legal.consentText}
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="text-[11px] text-rose-600 font-semibold px-1">{errors.consent}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">🔒 256-Bit SSL Encrypted</span>
                      <span>•</span>
                      <span className="text-amber-700 font-bold">🛡️ TCPA Compliant</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation Footer */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-3 shrink-0">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={isSubmitting}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 bg-[#0f1f3d] text-white text-xs font-bold rounded-lg hover:bg-[#1a2f55] transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Continue to Step {currentStep + 1}</span>
                    <span>→</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-3 bg-[#c9973a] text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Submitting Evaluation...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Case Evaluation</span>
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
