export const siteConfig = {
  name: "Injurease",
  brandName: "Injurease",
  domain: "injurease.us",
  url: "https://injurease.us",
  tagline: "Legal Marketing & Referral Platform",
  heroSubtitle: "Connecting individuals with independent, qualified attorneys across the United States — at no upfront cost to you.",

  contact: {
    phone: "(800) 515-3814",
    phoneRaw: "18005153814",
    email: "info@injurease.us",
    address: "19900 MacArthur Blvd, Suite 300",
    cityStateZip: "Irvine, CA 92612",
    fullAddress: "19900 MacArthur Blvd, Suite 300, Irvine, CA 92612",
    hours: "Monday – Friday: 8:00 AM – 6:00 PM PST",
  },

  trustBadges: {
    ssl: "256-Bit SSL Encrypted",
    tcpa: "TCPA Compliant",
    free: "100% Free Evaluation",
    confidential: "Strictly Confidential",
  },

  legal: {
    disclaimer:
      "Injurease is a legal marketing and referral platform, not a law firm. We do not provide legal advice or legal representation. Submitting information to Injurease does not establish an attorney-client relationship. Any attorney-client relationship is formed solely between you and the independent licensed attorney or law firm that accepts your case.",
    advertisingNotice:
      "THIS IS AN ATTORNEY ADVERTISEMENT. Prior results do not guarantee a similar outcome. No legal representation is offered or guaranteed until a formal written agreement is signed with an independent attorney.",
    consentText:
      "By submitting this form, I explicitly consent to receive telephone calls, pre-recorded messages, text messages (SMS), and emails from Injurease and its participating network of independent law firms and attorneys regarding my case evaluation request, using automatic dialing equipment or artificial voice, at the phone number and email provided above. I understand that consent is not a condition of purchasing any service and message/data rates may apply. TCPA Compliant & 256-Bit SSL Secured.",
  },

  formEmailRecipient: import.meta.env.VITE_FORM_RECIPIENT_EMAIL || "info@injurease.us",
  web3FormsAccessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "",
};
