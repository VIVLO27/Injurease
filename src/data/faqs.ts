export type FAQItem = {
  question: string;
  answer: string;
  category?: string;
};

export const mainFaqs: FAQItem[] = [
  {
    question: "What is Injurease.us?",
    answer:
      "Injurease.us is an independent legal marketing and referral platform designed to help individuals explore potential legal options and get matched with qualified, independent attorneys across the United States.",
    category: "General",
  },
  {
    question: "Is Injurease.us a law firm?",
    answer:
      "No. Injurease.us is NOT a law firm, legal aid organization, or legal representation provider. We do not offer legal advice, legal opinions, or direct representation. Our platform functions solely to connect individuals seeking legal evaluation with independent licensed attorneys and law firms.",
    category: "General",
  },
  {
    question: "How does Injurease.us work?",
    answer:
      "1. You complete our secure online case evaluation form outlining your situation.\n2. Our platform evaluates the submitted criteria and forwards your inquiry to appropriate independent attorneys or law firms in our network.\n3. A representative or attorney will contact you directly for a confidential evaluation of your potential claim — at no cost to you.",
    category: "Process",
  },
  {
    question: "Does submitting information create an attorney-client relationship?",
    answer:
      "No. Submitting an evaluation request or contact form through Injurease.us does not establish an attorney-client relationship between you and Injurease.us, nor with any attorney who receives your inquiry. An attorney-client relationship is established only if and when you execute a written representation agreement directly with an independent attorney.",
    category: "Legal",
  },
  {
    question: "Does submitting a case review guarantee legal representation or compensation?",
    answer:
      "No. Case evaluations are provided for information-gathering purposes. Submitting your details does not guarantee that an attorney will take your case, nor does it guarantee any financial compensation, settlement, or specific legal outcome. Every case is evaluated independently on its legal merits by participating attorneys.",
    category: "Legal",
  },
  {
    question: "Will I have to pay anything for a case evaluation?",
    answer:
      "No. Case evaluations facilitated through Injurease.us are 100% free with zero upfront obligation. Most personal injury and mass tort attorneys operate on a contingency fee basis, meaning attorney fees are only paid if they successfully recover compensation for you.",
    category: "Cost",
  },
  {
    question: "Who may receive my submitted information?",
    answer:
      "Your information is securely encrypted and transmitted only to participating independent attorneys, law firms, or legal marketing partners relevant to your selected case category for evaluation purposes. We do not sell your personal data to unrelated third parties.",
    category: "Privacy",
  },
  {
    question: "How long does it take to get a response after submitting?",
    answer:
      "In most cases, an attorney or qualified legal representative will reach out to you within 24 to 48 hours via phone or email to discuss your submission.",
    category: "Process",
  },
  {
    question: "How can I contact Injurease.us?",
    answer:
      "You can contact our team by calling toll-free at (800) 515-3814, emailing info@injurease.us, or submitting a request on our Contact page.",
    category: "General",
  },
];
