import emailjs from "@emailjs/browser";
import { siteConfig } from "../data/siteConfig";

// ─── EmailJS Config (set in .env) ────────────────────────────────────────────
// VITE_EMAILJS_SERVICE_ID       → EmailJS Service ID (e.g. service_xxxxxxx)
// VITE_EMAILJS_PUBLIC_KEY       → EmailJS Public Key (Account > API Keys)
// VITE_EMAILJS_CASE_TEMPLATE_ID → Template ID for case evaluation emails
// VITE_EMAILJS_CONTACT_TEMPLATE_ID → Template ID for contact form emails
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
const EMAILJS_CASE_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CASE_TEMPLATE_ID || "";
const EMAILJS_CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || "";
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

export type EvaluationFormData = {
  caseId: string;
  caseTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state: string;
  zipCode?: string;
  country?: string;
  attorneyWillingness: string;
  incidentDate?: string;
  description?: string;
  caseAnswers: Record<string, string>;
  consent: boolean;
  sourceUrl?: string;
};

export type SubmissionResult = {
  success: boolean;
  message: string;
  referenceId?: string;
};

export async function submitCaseEvaluation(
  data: EvaluationFormData
): Promise<SubmissionResult> {
  const referenceId = "INJ-" + Math.floor(100000 + Math.random() * 900000);
  const now = new Date().toLocaleString("en-US", { timeZoneName: "short" });
  const formattedAnswers = Object.entries(data.caseAnswers)
    .map(([key, val]) => `• ${key}: ${val}`)
    .join("\n");

  // ── 1. Try EmailJS (Primary) ───────────────────────────────────────────────
  if (EMAILJS_SERVICE_ID && EMAILJS_PUBLIC_KEY && EMAILJS_CASE_TEMPLATE_ID) {
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CASE_TEMPLATE_ID,
        {
          to_email: siteConfig.formEmailRecipient,
          subject: `New Case Evaluation — ${data.caseTitle} — ${data.firstName} ${data.lastName}`,
          reference_id: referenceId,
          submission_date: now,
          campaign: data.caseTitle,
          case_id: data.caseId,
          first_name: data.firstName,
          last_name: data.lastName,
          full_name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          address: data.address || "N/A",
          city: data.city || "N/A",
          state: data.state,
          zip_code: data.zipCode || "N/A",
          country: data.country || "United States",
          incident_date: data.incidentDate || "N/A",
          description: data.description || "N/A",
          case_answers: formattedAnswers || "None provided",
          attorney_willingness: data.attorneyWillingness || "Yes",
          consent: data.consent ? "YES — Confirmed" : "NO",
          consent_timestamp: new Date().toISOString(),
          website: siteConfig.domain,
          source_url: data.sourceUrl || window.location.href,
          reply_to: data.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      return {
        success: true,
        message: "Your case evaluation was successfully submitted. We will contact you shortly.",
        referenceId,
      };
    } catch (err) {
      console.error("EmailJS failed, trying Web3Forms fallback:", err);
    }
  }

  // ── 2. Fallback: Web3Forms ────────────────────────────────────────────────
  if (WEB3FORMS_KEY && WEB3FORMS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY") {
    try {
      const emailBody = buildCaseEmailBody(data, referenceId, now, formattedAnswers);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Case Evaluation — ${data.caseTitle} — ${data.firstName} ${data.lastName}`,
          from_name: `${siteConfig.brandName} Website`,
          replyto: data.email,
          to: siteConfig.formEmailRecipient,
          message: emailBody,
          campaign: data.caseTitle,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          state: data.state,
          reference_id: referenceId,
        }),
      });
      const json = await response.json();
      if (response.ok && json.success) {
        return {
          success: true,
          message: "Your case evaluation was successfully submitted and delivered.",
          referenceId,
        };
      } else {
        throw new Error(json.message || "Web3Forms delivery failed.");
      }
    } catch (err: any) {
      console.error("Web3Forms fallback failed:", err);
    }
  }

  // ── 3. Dev mode: console log ──────────────────────────────────────────────
  const emailBody = buildCaseEmailBody(data, referenceId, now, formattedAnswers);
  console.log("──── [DEV] CASE EVALUATION — Configure VITE_EMAILJS_* in .env ────");
  console.log(`Recipient: ${siteConfig.formEmailRecipient}`);
  console.log(emailBody);
  console.log("──────────────────────────────────────────────────────────────────");
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    message: "[DEV] Form logged to console. Add VITE_EMAILJS_* keys to .env to send real emails.",
    referenceId,
  };
}

export type GeneralContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
};

export async function submitGeneralContact(
  data: GeneralContactFormData
): Promise<SubmissionResult> {
  const referenceId = "CNT-" + Math.floor(100000 + Math.random() * 900000);
  const now = new Date().toLocaleString("en-US", { timeZoneName: "short" });

  // ── 1. Try EmailJS (Primary) ───────────────────────────────────────────────
  if (EMAILJS_SERVICE_ID && EMAILJS_PUBLIC_KEY && EMAILJS_CONTACT_TEMPLATE_ID) {
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CONTACT_TEMPLATE_ID,
        {
          to_email: siteConfig.formEmailRecipient,
          subject: `Contact Inquiry — ${data.subject} — ${data.name}`,
          reference_id: referenceId,
          submission_date: now,
          full_name: data.name,
          email: data.email,
          phone: data.phone,
          subject_line: data.subject,
          message: data.message,
          consent: data.consent ? "YES" : "NO",
          website: siteConfig.domain,
          reply_to: data.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      return {
        success: true,
        message: "Your message was sent successfully. We'll be in touch soon.",
        referenceId,
      };
    } catch (err) {
      console.error("EmailJS contact failed, trying Web3Forms:", err);
    }
  }

  // ── 2. Fallback: Web3Forms ────────────────────────────────────────────────
  if (WEB3FORMS_KEY && WEB3FORMS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY") {
    try {
      const emailBody = `
==================================================
NEW GENERAL INQUIRY
==================================================
Reference ID: ${referenceId}
Date: ${now}
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject}
Message:
${data.message}
Consent: ${data.consent ? "YES" : "NO"}
Website: ${siteConfig.domain}
==================================================`;
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Contact Inquiry — ${data.subject} — ${data.name}`,
          from_name: `${siteConfig.brandName} Contact Form`,
          replyto: data.email,
          to: siteConfig.formEmailRecipient,
          message: emailBody,
        }),
      });
      const json = await response.json();
      if (response.ok && json.success) {
        return { success: true, message: "Message sent successfully.", referenceId };
      } else {
        throw new Error(json.message || "Web3Forms delivery failed.");
      }
    } catch (err: any) {
      console.error("Web3Forms contact fallback failed:", err);
    }
  }

  // ── 3. Dev mode ───────────────────────────────────────────────────────────
  console.log("──── [DEV] CONTACT FORM — Configure VITE_EMAILJS_* in .env ────");
  console.log(`Name: ${data.name} | Email: ${data.email} | Subject: ${data.subject}`);
  console.log(data.message);
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    message: "[DEV] Contact form logged. Add VITE_EMAILJS_* keys to .env to send real emails.",
    referenceId,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildCaseEmailBody(
  data: EvaluationFormData,
  referenceId: string,
  now: string,
  formattedAnswers: string
): string {
  return `
==================================================
NEW CASE EVALUATION SUBMISSION
==================================================
Reference ID: ${referenceId}
Campaign: ${data.caseTitle} (${data.caseId})
Submission Date: ${now}

CONTACT INFORMATION
First Name: ${data.firstName}
Last Name: ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address || "N/A"}
City: ${data.city || "N/A"}
State: ${data.state}
Zip: ${data.zipCode || "N/A"}
Country: ${data.country || "United States"}

CASE DETAILS
Incident Date: ${data.incidentDate || "N/A"}
Summary: ${data.description || "N/A"}
Answers:
${formattedAnswers || "None provided"}

CONSENT
Attorney Contact: ${data.attorneyWillingness || "Yes"}
Consent: ${data.consent ? "YES" : "NO"}
Timestamp: ${new Date().toISOString()}

META
Website: ${siteConfig.domain}
Source: ${data.sourceUrl || window.location.href}
==================================================`;
}
