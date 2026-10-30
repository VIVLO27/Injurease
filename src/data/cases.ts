export type FormFieldOption = {
  label: string;
  value: string;
};

export type CaseFormField = {
  id: string;
  label: string;
  type: "text" | "select" | "radio" | "checkbox_group" | "textarea" | "date";
  placeholder?: string;
  required: boolean;
  options?: FormFieldOption[];
  helpText?: string;
};

export type CaseDetail = {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  heroImage: string;
  overview: string;
  whoThisAppliesTo: string[];
  importantInfo: string[];
  eligibilityFactors: string[];
  relevantCircumstances: string[];
  whatToDoNext: string[];
  faqs: { q: string; a: string }[];
  formFields: CaseFormField[];
  disclaimer?: string;
  status: "active" | "updating";
  published: boolean;
};

export const CASE_CATEGORIES = [
  "All Campaigns",
  "Abuse & Sexual Assault",
  "Prescription Drugs & Medical Devices",
  "Toxic Exposure & Products",
  "Personal Injury & Accidents",
] as const;

export const CASES: CaseDetail[] = [
  {
    id: "illinois-abuse",
    slug: "illinois-abuse",
    title: "Illinois Abuse Cases",
    category: "Abuse & Sexual Assault",
    shortDescription:
      "Evaluations for individuals who suffered sexual abuse, assault, or exploitation within Illinois schools, religious institutions, foster care, or youth organizations.",
    heroImage:
      "https://picsum.photos/seed/illinois-abuse/1000/600",
    overview:
      "Under updated state legislation in Illinois, survivors of childhood sexual abuse and institutional misconduct have extended opportunities to pursue legal accountability. Independent law firms are evaluating claims involving schools, churches, youth organizations, state institutions, and authority figures across Illinois.",
    whoThisAppliesTo: [
      "Survivors who experienced sexual abuse or misconduct in Illinois",
      "Individuals abused as minors or vulnerable adults by authority figures",
      "Victims of abuse in public or private schools, religious organizations, or foster care",
      "Families or guardians representing survivors unable to file on their own",
    ],
    importantInfo: [
      "Illinois law reform expanded the timeframe for survivors to bring legal claims regardless of when the abuse occurred.",
      "Claims focus on institutional negligence, failure to protect minors, and intentional concealment of reported abuse.",
      "All evaluations are kept strictly confidential and handled with care.",
    ],
    eligibilityFactors: [
      "Abuse occurred within the State of Illinois",
      "Incident involved an institution, school, church, youth program, foster care, or figure of authority",
      "Willingness to discuss details confidentially with an independent legal representative",
    ],
    relevantCircumstances: [
      "Molestation, fondling, or unwanted sexual contact",
      "Rape or sexual assault by staff, clergy, teachers, or supervisors",
      "Grooming, coercion, or abuse of power by trusted figures",
      "Forced exposure to sexual material or pornography",
    ],
    whatToDoNext: [
      "Submit your information securely using the case evaluation form below.",
      "An independent attorney or legal advocate will review your details confidentially.",
      "If eligible, the law firm will contact you to explain potential legal options.",
    ],
    faqs: [
      {
        q: "What if the abuse happened many years ago?",
        a: "Illinois has enacted significant statutory reform that eliminated or extended statutes of limitations for many childhood abuse claims. You may still be eligible to take action even if decades have passed.",
      },
      {
        q: "Will my name or story be made public?",
        a: "No. Your submission to Injurease is confidential. Independent law firms handle sensitive claims with strict confidentiality protocols.",
      },
    ],
    formFields: [
      {
        id: "victimRole",
        label: "Are you the victim or filing on behalf of a victim?",
        type: "select",
        required: true,
        options: [
          { label: "I am the survivor / victim", value: "victim" },
          { label: "Parent / Guardian of victim", value: "parent" },
          { label: "Family member of deceased victim", value: "family_deceased" },
          { label: "Legal representative", value: "representative" },
        ],
      },
      {
        id: "ageAtTime",
        label: "Victim's age at the time of abuse",
        type: "select",
        required: true,
        options: [
          { label: "Under 12 years old", value: "under_12" },
          { label: "12 to 17 years old (Minor)", value: "12_17" },
          { label: "18 or older", value: "18_plus" },
          { label: "Prefer to discuss confidentially", value: "confidential" },
        ],
      },
      {
        id: "abuseType",
        label: "What type of abuse or misconduct occurred?",
        type: "select",
        required: true,
        options: [
          { label: "Molestation or Fondling", value: "molestation" },
          { label: "Rape or Sexual Assault", value: "rape_assault" },
          { label: "Grooming or coercive sexual acts by authority", value: "grooming" },
          { label: "Exposure to pornography or forced viewing", value: "pornography" },
          { label: "Other sexual misconduct", value: "other" },
        ],
      },
      {
        id: "institutionType",
        label: "Where or by whom did the incident occur?",
        type: "select",
        required: true,
        options: [
          { label: "Church or Religious Institution", value: "church" },
          { label: "Public or Private School", value: "school" },
          { label: "Youth Group / Camp / Sports Club", value: "youth_group" },
          { label: "Foster Care or State Facility", value: "foster_care" },
          { label: "Other Institution / Individual", value: "other_institution" },
        ],
      },
      {
        id: "attorneyWillingness",
        label: "Are you willing to speak with an independent attorney?",
        type: "radio",
        required: true,
        options: [
          { label: "Yes, I want a free confidential attorney evaluation", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
    status: "active",
    published: true,
  },
  {
    id: "lds-abuse",
    slug: "lds-abuse",
    title: "Mormon Church / LDS Abuse Cases",
    category: "Abuse & Sexual Assault",
    shortDescription:
      "Confidential evaluations for survivors of sexual abuse involving leaders, bishops, scoutmasters, or representatives of the Church of Jesus Christ of Latter-day Saints.",
    heroImage:
      "https://picsum.photos/seed/lds-abuse/1000/600",
    overview:
      "Independent legal claims are being evaluated nationwide regarding allegations of sexual abuse, grooming, and improper reporting within the Church of Jesus Christ of Latter-day Saints (LDS/Mormon Church). Legal investigations focus on institutional accountability and whether church leadership failed to protect youth or report abuse to law enforcement.",
    whoThisAppliesTo: [
      "Individuals who suffered sexual abuse by an LDS bishop, youth leader, scoutmaster, or church authority figure",
      "Survivors who experienced abuse during church activities, interviews, scouting, or youth trips",
      "Parents filing on behalf of minor children harmed in church programs",
    ],
    importantInfo: [
      "Attorneys evaluate claims in all 50 states where statutory deadlines allow.",
      "Submissions are strictly confidential and treated with absolute care and respect.",
      "Claims examine institutional failure to report abuse or protect vulnerable members.",
    ],
    eligibilityFactors: [
      "Abuse involved an LDS church leader, bishop, teacher, scoutmaster, or official representative",
      "Incident occurred during childhood or while under ecclesiastical authority",
      "Willingness to review details confidentially with an independent attorney",
    ],
    relevantCircumstances: [
      "Abuse during worthiness interviews or isolated meetings",
      "Misconduct during Boy Scouts of America / LDS troop activities",
      "Failure of church leaders to report disclosed abuse to civil law enforcement",
    ],
    whatToDoNext: [
      "Fill out the secure confidential evaluation form below.",
      "An independent attorney specializing in institutional abuse will review your submission.",
      "Receive a free consultation discussing your legal rights and options.",
    ],
    faqs: [
      {
        q: "Does filing an evaluation require public disclosure?",
        a: "No. Case evaluations are completely private. Independent law firms protect your identity to the fullest extent permitted by law.",
      },
      {
        q: "What if the abuser is no longer alive or active in the church?",
        a: "Legal claims often focus on the institutional entity and leadership's oversight, not solely the individual perpetrator.",
      },
    ],
    formFields: [
      {
        id: "victimRole",
        label: "Are you filing for yourself or someone else?",
        type: "select",
        required: true,
        options: [
          { label: "Filing for myself (Survivor)", value: "myself" },
          { label: "Parent or Guardian of minor", value: "parent" },
          { label: "Surviving family member", value: "family" },
        ],
      },
      {
        id: "leaderRole",
        label: "What position was held by the individual involved?",
        type: "select",
        required: true,
        options: [
          { label: "Bishop or Branch President", value: "bishop" },
          { label: "Youth Leader or Scoutmaster", value: "scoutmaster" },
          { label: "Seminary Teacher or Missionary", value: "missionary" },
          { label: "High Council or Stake Presidency Member", value: "stake_leader" },
          { label: "Other Church Authority / Volunteer", value: "other_authority" },
        ],
      },
      {
        id: "incidentState",
        label: "State where the incident occurred",
        type: "text",
        placeholder: "e.g., Utah, Idaho, Arizona...",
        required: true,
      },
      {
        id: "reportedToLeadership",
        label: "Was the matter reported to LDS leadership or authorities at the time?",
        type: "select",
        required: true,
        options: [
          { label: "Reported to LDS Bishop / Stake President", value: "reported_church" },
          { label: "Reported to Police / Law Enforcement", value: "reported_police" },
          { label: "Not reported at the time", value: "not_reported" },
          { label: "Uncertain / Multiple reports", value: "uncertain" },
        ],
      },
      {
        id: "attorneyWillingness",
        label: "Are you willing to speak directly with an independent attorney?",
        type: "radio",
        required: true,
        options: [
          { label: "Yes, I want a free confidential case evaluation", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
    status: "active",
    published: true,
  },
  {
    id: "oxbryta",
    slug: "oxbryta",
    title: "Oxbryta Sickle Cell Medication Cases",
    category: "Prescription Drugs & Medical Devices",
    shortDescription:
      "Evaluations for patients prescribed Oxbryta (voxelotor) who suffered severe Vaso-Occlusive Crises (VOC), stroke, organ damage, or fatal complications.",
    heroImage:
      "https://picsum.photos/seed/oxbryta/1000/600",
    overview:
      "Oxbryta (voxelotor), manufactured by Pfizer / Global Blood Therapeutics, was approved for sickle cell disease. Following regulatory withdrawals and safety alerts regarding an increased risk of severe Vaso-Occlusive Crises (VOC) and fatal events in clinical trials, independent law firms are evaluating product liability claims.",
    whoThisAppliesTo: [
      "Patients diagnosed with sickle cell disease who were prescribed Oxbryta (voxelotor)",
      "Individuals who suffered severe Vaso-Occlusive Crises (VOC), stroke, or organ failure while on Oxbryta",
      "Families of patients who passed away while taking Oxbryta",
    ],
    importantInfo: [
      "Pfizer voluntarily recalled and discontinued Oxbryta globally following clinical trial data showing excess deaths and severe pain crises.",
      "Legal evaluations focus on whether drug makers adequately warned doctors and patients about these risks.",
    ],
    eligibilityFactors: [
      "Prescribed and taken Oxbryta (voxelotor)",
      "Experienced severe pain crises (VOC), stroke, liver/kidney damage, or death while taking the drug",
      "Documented prescription history and medical care",
    ],
    relevantCircumstances: [
      "Increased frequency or severity of Vaso-Occlusive Crises (VOC)",
      "Ischemic or hemorrhagic stroke",
      "Acute chest syndrome or organ failure",
      "Hospitalization or emergency medical intervention",
    ],
    whatToDoNext: [
      "Fill out the Oxbryta case evaluation form below.",
      "Gather medical records showing Oxbryta prescription and treatment dates.",
      "Consult with an independent drug injury attorney at no cost.",
    ],
    faqs: [
      {
        q: "Why was Oxbryta withdrawn from the market?",
        a: "Pfizer initiated a voluntary market withdrawal after data indicated an imbalance in vaso-occlusive crises and fatal occurrences among patients receiving Oxbryta compared to placebo.",
      },
      {
        q: "What does a free case evaluation involve?",
        a: "An independent attorney will review your prescription records and medical outcomes to determine if you meet criteria for a legal claim.",
      },
    ],
    formFields: [
      {
        id: "usageStatus",
        label: "Did you or a loved one take Oxbryta (voxelotor)?",
        type: "select",
        required: true,
        options: [
          { label: "Yes — I was prescribed Oxbryta", value: "patient" },
          { label: "Yes — Filing for a living family member", value: "family" },
          { label: "Yes — Filing for a deceased loved one", value: "deceased" },
        ],
      },
      {
        id: "complications",
        label: "What complications occurred while taking Oxbryta?",
        type: "select",
        required: true,
        options: [
          { label: "Severe Vaso-Occlusive Crisis (VOC) / Severe Pain Crisis", value: "voc" },
          { label: "Stroke or Transient Ischemic Attack (TIA)", value: "stroke" },
          { label: "Liver or Kidney Damage", value: "organ_damage" },
          { label: "Hospitalization or ICU admission", value: "hospitalization" },
          { label: "Wrongful Death of patient", value: "death" },
          { label: "Other severe medical complication", value: "other" },
        ],
      },
      {
        id: "prescribedYear",
        label: "Approximate dates of Oxbryta prescription",
        type: "text",
        placeholder: "e.g., 2021 - 2024",
        required: true,
      },
      {
        id: "attorneyWillingness",
        label: "Are you willing to speak directly with an attorney?",
        type: "radio",
        required: true,
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
    status: "active",
    published: true,
  },
  {
    id: "depo-provera",
    slug: "depo-provera",
    title: "Depo-Provera Brain & Spinal Tumor Cases",
    category: "Prescription Drugs & Medical Devices",
    shortDescription:
      "Legal evaluation for women who received Depo-Provera birth control injections and were diagnosed with intracranial meningioma (brain or spinal tumor).",
    heroImage:
      "https://picsum.photos/seed/depo-provera/1000/600",
    overview:
      "Recent medical studies, including research published in the British Medical Journal (BMJ), indicate that long-term use of medroxyprogesterone acetate (Depo-Provera birth control shot) is linked to a significantly elevated risk of developing meningiomas — tumors of the brain or spinal cord membranes.",
    whoThisAppliesTo: [
      "Women who received Depo-Provera or Depo-SubQ Provera 104 injections for 1 year or longer",
      "Individuals diagnosed with a brain or spinal meningioma following Depo-Provera use",
      "Patients who required surgery, radiation, or ongoing monitoring for intracranial tumors",
    ],
    importantInfo: [
      "Studies indicate a 5.6-fold increased risk of developing intracranial meningioma with prolonged use.",
      "Legal claims assert manufacturers failed to warn patients and physicians of brain tumor risks.",
    ],
    eligibilityFactors: [
      "Received Depo-Provera injections (at least 2 injections or 1+ year duration)",
      "Diagnosed with a meningioma (brain or spinal cord tumor)",
      "Diagnosis occurred after or during Depo-Provera use",
    ],
    relevantCircumstances: [
      "Brain surgery / Craniotomy to resect tumor",
      "Radiation therapy or Gamma Knife treatment",
      "Vision loss, severe headaches, seizures, or neurological deficits caused by tumor",
    ],
    whatToDoNext: [
      "Submit your details using our confidential Depo-Provera evaluation form.",
      "Obtain medical records confirming Depo-Provera prescription history and MRI/CT tumor diagnosis.",
      "Connect with an independent legal team for a free review.",
    ],
    faqs: [
      {
        q: "What is a meningioma?",
        a: "A meningioma is a tumor that forms on the membranes (meninges) covering the brain and spinal cord. While often non-cancerous, these tumors can cause severe neurological damage and require risky surgery.",
      },
      {
        q: "How long must I have taken Depo-Provera to qualify?",
        a: "Attorneys are evaluating claims for women who received multiple injections over 1 or more years. Details are reviewed individually.",
      },
    ],
    formFields: [
      {
        id: "usedDepo",
        label: "Did you receive Depo-Provera birth control injections?",
        type: "select",
        required: true,
        options: [
          { label: "Yes — Used for 1 to 3 years", value: "1_3_years" },
          { label: "Yes — Used for 3 to 5 years", value: "3_5_years" },
          { label: "Yes — Used for over 5 years", value: "5_plus_years" },
          { label: "Yes — Received 2+ injections", value: "multiple_injections" },
        ],
      },
      {
        id: "tumorDiagnosis",
        label: "Have you been diagnosed with a brain or spinal tumor (Meningioma)?",
        type: "select",
        required: true,
        options: [
          { label: "Yes — Brain Meningioma", value: "brain_meningioma" },
          { label: "Yes — Spinal Meningioma", value: "spinal_meningioma" },
          { label: "Under medical evaluation / Suspected tumor", value: "evaluating" },
          { label: "No tumor diagnosis", value: "none" },
        ],
      },
      {
        id: "diagnosisYear",
        label: "Year of tumor diagnosis",
        type: "text",
        placeholder: "e.g., 2022",
        required: true,
      },
      {
        id: "hadSurgery",
        label: "Did you undergo surgery or radiation treatment for the tumor?",
        type: "select",
        required: true,
        options: [
          { label: "Yes — Brain surgery / Resection", value: "surgery" },
          { label: "Yes — Radiation therapy / Gamma Knife", value: "radiation" },
          { label: "Scheduled for surgery / treatment", value: "scheduled" },
          { label: "Monitoring / Non-surgical management", value: "monitoring" },
        ],
      },
      {
        id: "attorneyWillingness",
        label: "Are you willing to speak directly with an attorney?",
        type: "radio",
        required: true,
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
    status: "active",
    published: true,
  },
  {
    id: "nec",
    slug: "nec",
    title: "Necrotizing Enterocolitis (NEC) Cases",
    category: "Prescription Drugs & Medical Devices",
    shortDescription:
      "Evaluations for parents of premature infants who were fed cow's milk-based formula (Enfamil or Similac) in the NICU and developed Necrotizing Enterocolitis (NEC).",
    heroImage:
      "https://picsum.photos/seed/nec-infant/1000/600",
    overview:
      "Necrotizing Enterocolitis (NEC) is a severe intestinal disease primarily affecting premature infants. Scientific evidence demonstrates that feeding premature babies cow's milk-based infant formula (such as certain Enfamil and Similac products) significantly increases NEC risk compared to human milk diets. Independent law firms are filing claims against formula manufacturers for failing to warn hospitals and parents.",
    whoThisAppliesTo: [
      "Parents of premature infants (born before 37 weeks, especially under 32 weeks)",
      "Infants fed cow's milk-based formula or fortifiers (Enfamil or Similac) in the hospital/NICU",
      "Infants who developed Necrotizing Enterocolitis (NEC) resulting in emergency surgery, long-term complications, or death",
    ],
    importantInfo: [
      "Studies indicate premature infants fed cow's milk formula are significantly more likely to develop NEC.",
      "Litigation alleges manufacturers failed to disclose known risks to medical providers and parents.",
    ],
    eligibilityFactors: [
      "Premature birth (typically prior to 37 weeks gestational age)",
      "Given Enfamil, Similac, or cow's milk fortifiers in the NICU or nursery",
      "Medical diagnosis of Necrotizing Enterocolitis (NEC)",
    ],
    relevantCircumstances: [
      "Bowel perforation or intestinal necrosis",
      "Emergency surgery (laparotomy, ostomy, bowel resection)",
      "Short bowel syndrome or long-term digestive disability",
      "Infant fatality in the NICU due to NEC",
    ],
    whatToDoNext: [
      "Complete the confidential NEC case evaluation form below.",
      "Gather NICU medical records identifying infant formula brands fed.",
      "Speak with an independent attorney specializing in baby formula litigation.",
    ],
    faqs: [
      {
        q: "Which infant formula brands are involved?",
        a: "Claims primarily involve cow's milk-based formulas and fortifiers produced by Mead Johnson (Enfamil) and Abbott Laboratories (Similac).",
      },
      {
        q: "Are these claims against doctors or hospitals?",
        a: "Product liability claims target formula manufacturers for failing to adequately warn about known NEC risks associated with cow's milk products in premature infants.",
      },
    ],
    formFields: [
      {
        id: "gestationalAge",
        label: "Was the infant born prematurely (before 37 weeks)?",
        type: "select",
        required: true,
        options: [
          { label: "Yes — Born before 32 weeks (Very premature)", value: "under_32" },
          { label: "Yes — Born between 32 and 37 weeks", value: "32_37" },
          { label: "No — Full term (37+ weeks)", value: "full_term" },
        ],
      },
      {
        id: "formulaBrand",
        label: "Was the infant fed cow's milk formula in the NICU?",
        type: "select",
        required: true,
        options: [
          { label: "Enfamil (Mead Johnson)", value: "enfamil" },
          { label: "Similac (Abbott Laboratories)", value: "similac" },
          { label: "Both Enfamil & Similac", value: "both" },
          { label: "Other cow's milk formula / Fortifier", value: "other" },
          { label: "Unsure of exact formula brand", value: "unsure" },
        ],
      },
      {
        id: "necDiagnosed",
        label: "Was the baby diagnosed with Necrotizing Enterocolitis (NEC)?",
        type: "select",
        required: true,
        options: [
          { label: "Yes — Confirmed NEC diagnosis", value: "confirmed" },
          { label: "Yes — Required emergency bowel surgery", value: "surgery" },
          { label: "Tragic loss of infant due to NEC", value: "death" },
          { label: "Under evaluation / Suspected NEC", value: "suspected" },
        ],
      },
      {
        id: "hospitalState",
        label: "State where the infant was born / hospitalized",
        type: "text",
        placeholder: "e.g., California, Texas, Illinois...",
        required: true,
      },
      {
        id: "attorneyWillingness",
        label: "Are you willing to speak directly with an attorney?",
        type: "radio",
        required: true,
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
    status: "active",
    published: true,
  },
  {
    id: "roundup",
    slug: "roundup",
    title: "Roundup Weedkiller Lawsuits",
    category: "Toxic Exposure & Products",
    shortDescription:
      "Evaluating legal claims for landscapers, groundskeepers, farmers, and homeowners exposed to Roundup weed killer who developed Non-Hodgkin's Lymphoma.",
    heroImage:
      "https://picsum.photos/seed/roundup/1000/600",
    overview:
      "Glyphosate, the active ingredient in Roundup weed killer, has been classified by the World Health Organization's International Agency for Research on Cancer (IARC) as a probable human carcinogen. Independent law firms continue to represent individuals diagnosed with Non-Hodgkin's Lymphoma (NHL) following routine or occupational exposure to Roundup.",
    whoThisAppliesTo: [
      "Commercial landscapers, groundskeepers, agricultural workers, and farmers",
      "Residential property owners who regularly applied Roundup to lawns or gardens",
      "Individuals diagnosed with Non-Hodgkin's Lymphoma (NHL), Multiple Myeloma, or CLL",
    ],
    importantInfo: [
      "Juries have awarded significant verdicts establishing Monsanto/Bayer failed to warn about Roundup cancer risks.",
      "Claims depend on demonstrating substantial exposure history and medical diagnosis.",
    ],
    eligibilityFactors: [
      "Regular exposure to Roundup (glyphosate) over a period of time",
      "Medical diagnosis of Non-Hodgkin's Lymphoma or related blood cancer",
      "Exposure occurred prior to diagnosis",
    ],
    relevantCircumstances: [
      "Non-Hodgkin's Lymphoma (NHL)",
      "Chronic Lymphocytic Leukemia (CLL)",
      "Multiple Myeloma or Mantle Cell Lymphoma",
      "Occupational spraying without protective equipment",
    ],
    whatToDoNext: [
      "Submit your Roundup exposure details through our evaluation form.",
      "Gather work history, purchase receipts, or records showing Roundup use.",
      "Speak with an independent toxic exposure attorney for a free evaluation.",
    ],
    faqs: [
      {
        q: "Can residential users file Roundup claims?",
        a: "Yes. Both commercial applicators (landscapers, farmers) and residential homeowners with consistent usage history may qualify.",
      },
      {
        q: "What cancers are linked to Roundup?",
        a: "The primary cancer linked to Roundup is Non-Hodgkin's Lymphoma (NHL), including subtypes such as Diffuse Large B-Cell Lymphoma, CLL, and Multiple Myeloma.",
      },
    ],
    formFields: [
      {
        id: "exposureType",
        label: "What was the nature of your exposure to Roundup?",
        type: "select",
        required: true,
        options: [
          { label: "Commercial / Professional (Landscaper, Farmer, Groundskeeper)", value: "commercial" },
          { label: "Residential / Home Lawn & Garden", value: "residential" },
          { label: "Both Occupational & Residential", value: "both" },
        ],
      },
      {
        id: "exposureDuration",
        label: "How long were you exposed to Roundup?",
        type: "select",
        required: true,
        options: [
          { label: "1 to 5 years", value: "1_5_years" },
          { label: "5 to 10 years", value: "5_10_years" },
          { label: "Over 10 years", value: "over_10_years" },
        ],
      },
      {
        id: "diagnosis",
        label: "Have you been diagnosed with Non-Hodgkin's Lymphoma or blood cancer?",
        type: "select",
        required: true,
        options: [
          { label: "Non-Hodgkin's Lymphoma (NHL)", value: "nhl" },
          { label: "Chronic Lymphocytic Leukemia (CLL)", value: "cll" },
          { label: "Multiple Myeloma", value: "multiple_myeloma" },
          { label: "Mantle Cell Lymphoma", value: "mantle_cell" },
          { label: "Other blood cancer", value: "other_cancer" },
        ],
      },
      {
        id: "diagnosisYear",
        label: "Year of cancer diagnosis",
        type: "text",
        placeholder: "e.g., 2020",
        required: true,
      },
      {
        id: "attorneyWillingness",
        label: "Are you willing to speak directly with an attorney?",
        type: "radio",
        required: true,
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
    status: "active",
    published: true,
  },
  {
    id: "paraquat",
    slug: "paraquat",
    title: "Paraquat Herbicide Cases",
    category: "Toxic Exposure & Products",
    shortDescription:
      "Legal evaluation for licensed applicators, farm workers, and rural residents exposed to Paraquat weed killer who developed Parkinson's Disease.",
    heroImage:
      "https://picsum.photos/seed/paraquat/1000/600",
    overview:
      "Paraquat dichloride is a highly toxic agricultural herbicide widely used in commercial farming. Extensive scientific studies demonstrate a clear correlation between Paraquat exposure and the development of Parkinson's Disease. Independent law firms are seeking compensation for agricultural workers and applicators who developed neurological disorders after handling Paraquat.",
    whoThisAppliesTo: [
      "Licensed commercial chemical applicators and sprayers",
      "Farm workers, tractor drivers, crop dusters, and agricultural laborers",
      "Individuals diagnosed with Parkinson's Disease or movement disorders following Paraquat exposure",
    ],
    importantInfo: [
      "Paraquat is banned in over 30 countries due to extreme toxicity.",
      "Litigation alleges manufacturers knew about neurological risks for decades but failed to warn workers.",
    ],
    eligibilityFactors: [
      "Occupational or environmental exposure to Paraquat herbicide",
      "Diagnosis of Parkinson's Disease or secondary Parkinsonism",
      "Exposure occurred prior to onset of symptoms",
    ],
    relevantCircumstances: [
      "Commercial spraying on corn, soybean, cotton, or orchard crops",
      "Mixing, loading, or cleaning Paraquat tanks and equipment",
      "Drift exposure while living or working adjacent to sprayed fields",
    ],
    whatToDoNext: [
      "Complete the confidential Paraquat evaluation form below.",
      "Gather employment records, applicator licenses, or farm records.",
      "Connect with an independent legal representative for a free claim review.",
    ],
    faqs: [
      {
        q: "Who was most commonly exposed to Paraquat?",
        a: "Certified chemical applicators, farm hands, tank mixers, crop dusters, and individuals who lived near sprayed commercial farmland.",
      },
      {
        q: "What symptoms are associated with Paraquat litigation?",
        a: "Claims center on neurological damage leading to a formal medical diagnosis of Parkinson's Disease.",
      },
    ],
    formFields: [
      {
        id: "exposureRole",
        label: "How were you exposed to Paraquat?",
        type: "select",
        required: true,
        options: [
          { label: "Licensed Chemical Applicator", value: "licensed_applicator" },
          { label: "Farm Worker / Agricultural Laborer", value: "farm_worker" },
          { label: "Mixer / Loader / Equipment Maintenance", value: "mixer_loader" },
          { label: "Lived adjacent to sprayed commercial fields", value: "rural_resident" },
        ],
      },
      {
        id: "exposureDates",
        label: "Approximate years of Paraquat exposure",
        type: "text",
        placeholder: "e.g., 1995 - 2018",
        required: true,
      },
      {
        id: "parkinsonsDiagnosed",
        label: "Have you been diagnosed with Parkinson's Disease?",
        type: "select",
        required: true,
        options: [
          { label: "Yes — Confirmed Parkinson's Disease diagnosis", value: "confirmed" },
          { label: "Yes — Movement disorder / Secondary Parkinsonism", value: "parkinsonism" },
          { label: "Under medical evaluation", value: "evaluating" },
        ],
      },
      {
        id: "diagnosisYear",
        label: "Year of Parkinson's diagnosis",
        type: "text",
        placeholder: "e.g., 2021",
        required: true,
      },
      {
        id: "attorneyWillingness",
        label: "Are you willing to speak directly with an attorney?",
        type: "radio",
        required: true,
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
    status: "active",
    published: true,
  },
  {
    id: "motor-vehicle-accident",
    slug: "motor-vehicle-accident",
    title: "Motor Vehicle Accident Cases",
    category: "Personal Injury & Accidents",
    shortDescription:
      "Free case evaluation for individuals injured in motor vehicle collisions, commercial truck crashes, or motorcycle accidents caused by negligent drivers.",
    heroImage:
      "https://picsum.photos/seed/motor-vehicle/1000/600",
    overview:
      "Motor vehicle collisions cause millions of serious injuries every year. If you or a family member suffered physical injuries, medical bills, or lost income due to a negligent driver, independent personal injury attorneys can help evaluate your claim and seek maximum financial recovery.",
    whoThisAppliesTo: [
      "Drivers or passengers injured in car, truck, or SUV collisions",
      "Pedestrians or bicyclists struck by motor vehicles",
      "Families seeking wrongful death claims following fatal traffic collisions",
    ],
    importantInfo: [
      "Statutes of limitations strictly limit the time you have to file a personal injury claim after a crash.",
      "Free consultations ensure you understand insurance coverage options before signing settlements.",
    ],
    eligibilityFactors: [
      "Collision occurred within the applicable state statute of limitations",
      "Physical injury sustained requiring medical attention",
      "Collision was caused wholly or partially by another party's negligence",
    ],
    relevantCircumstances: [
      "Distracted or drunk driving collisions",
      "Commercial semi-truck / 18-wheeler accidents",
      "Rear-end, broadside (T-bone), or head-on crashes",
      "Severe spinal, head, fracture, or soft-tissue injuries",
    ],
    whatToDoNext: [
      "Submit crash details using our quick evaluation form below.",
      "Keep copies of police accident reports, medical bills, and insurance letters.",
      "Speak with a qualified car accident lawyer at zero upfront cost.",
    ],
    faqs: [
      {
        q: "What if the insurance company already offered a settlement?",
        a: "Insurance companies often offer early low settlements before full medical costs are known. An attorney can evaluate whether the offer adequately covers your long-term needs.",
      },
      {
        q: "Do I pay anything if we don't win?",
        a: "No. Personal injury attorneys handle cases on contingency — if there is no recovery, you owe no attorney fees.",
      },
    ],
    formFields: [
      {
        id: "roleInAccident",
        label: "What was your role in the accident?",
        type: "select",
        required: true,
        options: [
          { label: "Driver of vehicle", value: "driver" },
          { label: "Passenger in vehicle", value: "passenger" },
          { label: "Pedestrian / Bicyclist", value: "pedestrian" },
          { label: "Motorcyclist", value: "motorcycle" },
        ],
      },
      {
        id: "accidentDate",
        label: "Date of accident",
        type: "date",
        required: true,
      },
      {
        id: "policeReport",
        label: "Was a police report filed?",
        type: "select",
        required: true,
        options: [
          { label: "Yes — Police report filed", value: "yes" },
          { label: "No — No police report", value: "no" },
          { label: "Uncertain", value: "uncertain" },
        ],
      },
      {
        id: "injuries",
        label: "Injuries sustained",
        type: "select",
        required: true,
        options: [
          { label: "Severe (Fractures, Surgery, Spinal, TBI)", value: "severe" },
          { label: "Moderate (Whiplash, Concave, ER Visit)", value: "moderate" },
          { label: "Ongoing Therapy / Specialist care", value: "ongoing" },
          { label: "Fatal accident (Wrongful Death claim)", value: "fatal" },
        ],
      },
      {
        id: "attorneyWillingness",
        label: "Are you willing to speak directly with an attorney?",
        type: "radio",
        required: true,
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
    status: "active",
    published: true,
  },
  {
    id: "rideshare-accident",
    slug: "rideshare-accident",
    title: "Rideshare Accident Cases (Uber & Lyft)",
    category: "Personal Injury & Accidents",
    shortDescription:
      "Specialized legal evaluations for passengers, third-party drivers, or pedestrians injured in crashes involving Uber or Lyft vehicles.",
    heroImage:
      "https://picsum.photos/seed/rideshare/1000/600",
    overview:
      "Collisions involving Uber, Lyft, or commercial rideshare drivers involve complex multi-tiered insurance policies. Whether you were riding as a passenger or hit by an on-duty rideshare driver, independent attorneys can help navigate claims across corporate rideshare insurance policies.",
    whoThisAppliesTo: [
      "Passengers inside an Uber or Lyft at the time of a collision",
      "Drivers or occupants of other vehicles struck by a rideshare driver",
      "Pedestrians or cyclists injured by rideshare vehicles",
    ],
    importantInfo: [
      "Rideshare companies maintain $1,000,000 liability insurance coverage when drivers are active on the app.",
      "Determining driver app status (active vs. offline) is crucial to unlocking full insurance coverage.",
    ],
    eligibilityFactors: [
      "Accident involved an active Uber, Lyft, or commercial rideshare vehicle",
      "Injuries sustained requiring medical care",
      "Collision occurred within statutory timeframes",
    ],
    relevantCircumstances: [
      "Injured passenger in rideshare vehicle",
      "Hit by Uber/Lyft driver while they were picking up or carrying a passenger",
      "Uninsured or underinsured motorist claims involving rideshare",
    ],
    whatToDoNext: [
      "Fill out the rideshare accident evaluation form below.",
      "Save trip receipts, app ride logs, and police report numbers.",
      "Connect with an attorney experienced in rideshare insurance litigation.",
    ],
    faqs: [
      {
        q: "As an Uber or Lyft passenger, who pays for my medical bills?",
        a: "Rideshare companies carry up to $1 Million in liability and uninsured motorist coverage for passengers injured during an active trip.",
      },
      {
        q: "What if the rideshare driver was off-duty?",
        a: "If the driver was off the app, their personal auto insurance applies. An attorney can determine policy limits.",
      },
    ],
    formFields: [
      {
        id: "rideshareRole",
        label: "What was your situation during the collision?",
        type: "select",
        required: true,
        options: [
          { label: "Uber / Lyft Passenger during a trip", value: "passenger" },
          { label: "Driver or occupant of another car hit by rideshare", value: "other_driver" },
          { label: "Rideshare Driver (on-duty) hit by another motorist", value: "rideshare_driver" },
          { label: "Pedestrian or bicyclist struck by rideshare vehicle", value: "pedestrian" },
        ],
      },
      {
        id: "rideshareService",
        label: "Which rideshare service was involved?",
        type: "select",
        required: true,
        options: [
          { label: "Uber", value: "uber" },
          { label: "Lyft", value: "lyft" },
          { label: "Both / Other rideshare company", value: "other" },
          { label: "Unsure of exact company", value: "unsure" },
        ],
      },
      {
        id: "accidentDate",
        label: "Date of collision",
        type: "date",
        required: true,
      },
      {
        id: "insuranceClaim",
        label: "Has an insurance claim been opened?",
        type: "select",
        required: true,
        options: [
          { label: "Yes — Claim opened with Uber/Lyft insurance", value: "yes_rideshare" },
          { label: "Yes — Claim opened with personal auto insurance", value: "yes_personal" },
          { label: "No claim opened yet", value: "no" },
        ],
      },
      {
        id: "attorneyWillingness",
        label: "Are you willing to speak directly with an attorney?",
        type: "radio",
        required: true,
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
    status: "active",
    published: true,
  },
];
