
export interface PolicyCompany {
  name: string;
  cin: string;
  registeredAddress: string;
  corporateAddress: string;
  email: string;
  website: string;
  telephone: string;
}

export interface PolicyParagraph {
  text: string;
  emphasis?: string[];
}

export type PolicyBlock =
  | {
      type: "paragraph";
      content: PolicyParagraph[];
    }
  | {
      type: "list";
      style: "bullet" | "number";
      items: string[];
    }
  | {
      type: "callout";
      variant?: "light" | "dark";
      title?: string;
      paragraphs: PolicyParagraph[];
      items?: string[];
      note?: string;
    }
  | {
      type: "cards";
      columns?: 1 | 2 | 3;
      items: {
        title: string;
        paragraphs: PolicyParagraph[];
      }[];
    }
  | {
      type: "definitions";
      items: {
        term: string;
        description: string;
      }[];
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    }
  | {
      type: "annexure";
      label?: string;
      title: string;
      paragraphs: PolicyParagraph[];
    };

export interface PolicySection {
  id: string;
  title: string;
  blocks: PolicyBlock[];
}

export interface PolicyRecord {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  company: PolicyCompany;
  publishedAt: string | null;
  updatedAt: string | null;
  version: string;
  reference: string;
  department: string;
  status: "draft" | "published" | "archived";
  sections: PolicySection[];
}

export const policyCompany: PolicyCompany = {
  name: "Shalimar Corp Limited",
  cin: "U70100DL1988PLC390006",
  registeredAddress:
    "A2/3, F.F., Safdarjung Enclave, South Delhi, Delhi - 110029",
  corporateAddress:
    "11th Floor, Shalimar Titanium, Vibhuti Khand, Gomti Nagar, Lucknow - 226010",
  email: "shalimar@shalimar.org",
  website: "https://www.shalimarcorp.com",
  telephone: "+91-011-40545075",
};

export const PolicyData: Record<string, PolicyRecord> = {
  csr: {
    id: "csr",
    title: "Corporate Social Responsibility Policy",
    shortTitle: "CSR Policy",
    category: "Statutory Compliance & Governance",
    description:
      "Guiding principles, operational frameworks, and community development commitments under Section 135 of the Companies Act, 2013.",
    metaTitle: "CSR Policy",
    metaDescription:
      "Corporate Social Responsibility Policy of Shalimar Corp Limited.",
    company: policyCompany,
    publishedAt: "2025-08-30",
    updatedAt: "2025-08-30",
    version: "2025",
    reference: "SCL-CSR-POL-2025",
    department: "Governance Division",
    status: "published",
    sections: [
      {
        id: "csr-philosophy",
        title: "1. CSR Philosophy",
        blocks: [
          {
            type: "paragraph",
            content: [
              {
                text:
                  "Shalimar Corp Limited (“SCL” or “the Company”) firmly believes in adopting the highest standards of organizational behavior and corporate values in order to consistently contribute to the Social, Economic and Environmental Development of the community in which it operates and creation of value for the nation.",
              },
              {
                text:
                  "SCL recognizes the community in which it operates as not just a stakeholder but the very purpose of its existence. SCL constantly endeavors to undertake business in a socially, ethically and environmentally responsible manner.",
              },
            ],
          },
        ],
      },
      {
        id: "csr-vision",
        title: "2. CSR Vision",
        blocks: [
          {
            type: "paragraph",
            content: [
              {
                text:
                  "SCL through its CSR initiatives will strive to enhance value creation in the society and the community in which it operates so as to promote its integrated and sustainable development.",
              },
            ],
          },
        ],
      },
      {
        id: "csr-scope",
        title: "3 & 4. Scope and Objective of CSR Policy",
        blocks: [
          {
            type: "paragraph",
            content: [
              {
                text:
                  "The Corporate Social Responsibility Policy (“CSR Policy”) adopted by the Company spells out its philosophy towards its social responsibilities; ongoing commitment to contribute to the economic and social development of the society and lays down the guidelines, framework and mechanism relating to the implementation, monitoring, reporting, disclosure, evaluation and assessment of projects, programmes and activities forming part of Company’s CSR.",
              },
              {
                text:
                  "SCL’s CSR Policy is framed to comply with the provisions of Section 135 of the Companies Act, 2013 (“the Act”) and the Rules and shall apply to all CSR projects or programs undertaken by the Company in India, in relation to one or more activities outlined in Schedule VII of the Act.",
              },
            ],
          },
          {
            type: "list",
            style: "bullet",
            items: [
              "Establishment of framework for compliance with regulations to dedicate a percentage of Company’s profits for CSR.",
              "Implementation of procedures for carrying out CSR initiatives and statutory reporting.",
              "Creation of opportunities for active participation in social and environmental activities.",
            ],
          },
        ],
      },
      {
        id: "csr-definitions",
        title: "5. Definitions",
        blocks: [
          {
            type: "definitions",
            items: [
              {
                term: "Act",
                description: "Companies Act, 2013 (18 of 2013).",
              },
              {
                term: "Board",
                description: "Board of Directors of Shalimar Corp Limited.",
              },
              {
                term: "CSR Committee",
                description:
                  "Committee constituted pursuant to Section 135(1) of the Act.",
              },
              {
                term: "CSR Co-ordinator",
                description:
                  "Senior executive nominated by Chairperson as Secretary to CSR Committee.",
              },
            ],
          },
        ],
      },
      {
        id: "csr-committee",
        title: "6 & 7. CSR Committee Composition & Functions",
        blocks: [
          {
            type: "paragraph",
            content: [
              {
                text:
                  "The CSR Committee consists of 3 directors (including at least 1 independent director) and meets at least twice per financial year with a quorum of 2 members. The Board of Directors reconstituted the CSR Committee on 30th August, 2025 as follows:",
              },
            ],
          },
          {
            type: "table",
            headers: [
              "Sl. No.",
              "Name of Member",
              "Designation in Committee",
            ],
            rows: [
              ["01", "Mr. Kunal Seth", "Chairman"],
              ["02", "Mr. Brajesh Narain Seth", "Member"],
              ["03", "Mr. Rajendra Prasad Sharma", "Member"],
            ],
          },
        ],
      },
      {
        id: "csr-funding",
        title: "8 & 9. Funding & Budget Allocation",
        blocks: [
          {
            type: "paragraph",
            content: [
              {
                text:
                  "The Company allocates annual CSR corpus calculated in accordance with Section 198 of the Act:",
              },
            ],
          },
          {
            type: "callout",
            variant: "light",
            title: "Statutory Allocation Formula",
            paragraphs: [
              {
                text:
                  "CSR allocation is calculated in accordance with the applicable statutory provisions.",
              },
            ],
            items: [
              "2% of average net profits made during the three immediately preceding financial years.",
              "Any income or surplus generated from ongoing CSR activities.",
            ],
            note:
              "CSR funds are dedicated exclusively to initiatives within India and are not utilized for normal commercial operations or employee-exclusive benefits.",
          },
        ],
      },
      {
        id: "csr-implementation",
        title: "11. Mode of Implementation",
        blocks: [
          {
            type: "paragraph",
            content: [
              {
                text:
                  "CSR projects under this policy are executed directly by SCL or through Section 8 companies, registered trusts, or societies with a minimum established track record of 3 years. Programs give preference to local areas surrounding SCL corporate and operational facilities across Lucknow and North India.",
              },
            ],
          },
        ],
      },
      {
        id: "csr-monitoring",
        title: "12 & 13. Governance & Monitoring",
        blocks: [
          {
            type: "paragraph",
            content: [
              {
                text:
                  "The CSR Co-ordinator submits quarterly progress reports to the Chairperson and obtains direct feedback from beneficiaries. Annual statutory reporting is integrated into the Board’s Report pursuant to Section 134(3)(o) of the Act.",
              },
            ],
          },
        ],
      },
    ],
  },
  privacy: {
    id: "privacy",
    title: "Privacy Policy",
    shortTitle: "Privacy Policy",
    category: "Statutory Compliance & Privacy",
    description:
      "How Shalimar Corp Limited collects, uses, protects, and handles your personal data across our digital platforms.",

    metaTitle: "Privacy Policy",
    metaDescription:
      "Understand how Shalimar Corp Limited collects, uses, protects and handles personal information.",

    company: policyCompany,
    publishedAt: null,
    updatedAt: "2026-01-01",
    version: "2026",
    reference: "SCL-PRIV-POL-2026",
    department: "Legal & Privacy Division",
    status: "published",
    sections: [
      {
        id: "privacy-commitment",
        title: "1. Commitment to Privacy",
        blocks: [
          {
            type: "paragraph",
            content: [
              {
                text:
                  "Shalimar Corp Limited (“SCL”, “We”, “Us”, or “Our”) is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines our data processing practices, the types of information collected when you interact with our web applications or request project disclosures, and your rights regarding such information.",
              },
            ],
          },
        ],
      },
      {
        id: "privacy-information",
        title: "2. Information We Collect",
        blocks: [
          {
            type: "paragraph",
            content: [
              {
                text:
                  "We collect personal information directly provided by you through form submissions, digital inquiries, sales portal registrations, and direct communications:",
              },
            ],
          },
          {
            type: "cards",
            columns: 2,
            items: [
              {
                title: "Personal Identifiers",
                paragraphs: [
                  {
                    text:
                      "Full name, contact phone numbers, valid email addresses, residential address, and preferred unit configurations or project interests.",
                  },
                ],
              },
              {
                title: "Technical Data",
                paragraphs: [
                  {
                    text:
                      "IP address, browser type, device identifiers, site usage analytics, and interaction timestamps collected automatically to enhance user experience.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "privacy-purpose",
        title: "3. Purpose & Processing",
        blocks: [
          {
            type: "paragraph",
            content: [
              {
                text:
                  "Your personal information is utilized strictly for legitimate operational and business communications, including:",
              },
            ],
          },
          {
            type: "list",
            style: "bullet",
            items: [
              "Processing inquiry forms and scheduling site visits to our residential and commercial developments.",
              "Sending architectural brochures, price sheets, and RERA-compliant project updates.",
              "Communicating transaction updates, appointment confirmations, and service notifications via email, SMS, or voice calls.",
              "Internal statistical reporting, system infrastructure enhancement, and security audits.",
            ],
          },
        ],
      },
      {
        id: "privacy-protection",
        title: "4. Data Protection & Sharing",
        blocks: [
          {
            type: "callout",
            variant: "light",
            title: "Security Standards & Zero-Sale Policy",
            paragraphs: [
              {
                text:
                  "We employ strict technical, administrative, and physical security measures to safeguard your personal data against unauthorized access, loss, or misuse.",
                emphasis: [
                  "Shalimar Corp Limited does not sell, rent, or trade your personal data to third-party commercial brokers.",
                ],
              },
              {
                text:
                  "Information is shared only with authorized service partners or statutory bodies when required by law or necessary to complete requested transactions.",
              },
            ],
          },
        ],
      },
      {
        id: "privacy-rights",
        title: "5. Access & Opt-Out Rights",
        blocks: [
          {
            type: "paragraph",
            content: [
              {
                text:
                  "You reserve the right to access, update, or request the deletion of your personal contact records stored within our databases. To opt out of promotional newsletters or update your communication preferences, please reach out directly to our compliance desk at shalimar@shalimar.org.",
                emphasis: ["shalimar@shalimar.org"],
              },
            ],
          },
        ],
      },
    ],
  },
  nrc: {
    id: "nrc",
    title: "Nomination and Remuneration Policy",
    shortTitle: "NRC Policy",
    category: "Statutory Governance",
    description:
      "Policy relating to the remuneration, qualifications, positive attributes, and appointment of Directors, Key Managerial Personnel, and Senior Management.",
    metaTitle: "Nomination and Remuneration Policy | Shalimar Corp",
    metaDescription:
      "Read the Nomination and Remuneration Policy of Shalimar Corp Limited.",
    company: policyCompany,
    publishedAt: null,
    updatedAt: "2026-01-01",
    version: "2026",
    reference: "SCL-NRC-POL-2026",
    department: "Governance & NRC Division",
    status: "published",
    sections: [
      {
        id: "nrc-composition",
        title: "Nomination & Remuneration Committee Composition",
        blocks: [
          {
            type: "paragraph",
            content: [
              {
                text:
                  "The Company has formed the Nomination and Remuneration Committee (“NRC”) comprising independent and executive directors to formulate guidelines and evaluate board composition:",
              },
            ],
          },
          {
            type: "table",
            headers: [
              "Sl. No.",
              "Name of Member",
              "Directorship Designation",
              "Committee Role",
            ],
            rows: [
              [
                "01",
                "Mr. Rajendra Prasad Sharma",
                "Independent Director",
                "Chairman",
              ],
              [
                "02",
                "Mr. Brajesh Narain Seth",
                "Independent Director",
                "Member",
              ],
              [
                "03",
                "Mr. Kunal Seth",
                "Director",
                "Member",
              ],
            ],
          },
        ],
      },
      {
        id: "nrc-introduction",
        title: "1. Introduction",
        blocks: [
          {
            type: "paragraph",
            content: [
              {
                text:
                  "The Committee has formulated the policy on appointment and removal of Directors. The Policy has been adopted by the Nomination and Remuneration Committee (“NRC”) and approved by the Board of Directors. This policy acts as a guideline for determining qualifications, positive attributes, independence of a Director, and matters relating to the appointment and removal of Directors.",
              },
            ],
          },
        ],
      },
      {
        id: "nrc-objective",
        title: "2. Objective of the Policy",
        blocks: [
          {
            type: "paragraph",
            content: [
              {
                text:
                  "To lay down criteria and terms and conditions with regard to the identification of persons who are qualified to become Directors (executive, non-executive, and independent), including their qualifications, positive attributes, and independence, and who may be appointed to the Senior Management of the Company.",
              },
            ],
          },
        ],
      },
      {
        id: "nrc-appointment",
        title: "3. Appointment of Directors & Selection Guidelines",
        blocks: [
          {
            type: "paragraph",
            content: [
              {
                text:
                  "This Policy enumerates guidelines used by the NRC in selecting, appointing, re-appointing, and removing Directors:",
              },
            ],
          },
          {
            type: "list",
            style: "bullet",
            items: [
              "Assess the specific skill-sets the Board requires given the corporate strategy and challenges faced by the Company.",
              "In corporate selection or re-appointment, refer to Board Membership Criteria (Schedule A).",
              "Appointment of Independent Directors is conducted per terms specified in their Letter of Appointment, subject to the Companies Act, 2013 read with Schedule IV.",
              "Refer to available databases/sources for selecting candidate profiles for Independent Directorships.",
              "NRC members (jointly or individually) meet potential candidates to evaluate capabilities.",
              "NRC recommends shortlisted candidates to the Board of Directors for final consideration.",
              "Emergency Succession: If a Director position suddenly becomes vacant due to death or unanticipated occurrences, the NRC convenes a special meeting at the earliest opportunity to fill the vacancy.",
            ],
          },
        ],
      },
      {
        id: "nrc-implementation",
        title: "4 & 5. Policy Implementation & Periodic Review",
        blocks: [
          {
            type: "cards",
            columns: 2,
            items: [
              {
                title: "Implementation",
                paragraphs: [
                  {
                    text:
                      "The Committee is responsible for recommending this Policy to the Board. The Board is responsible for approving and overseeing implementation with support from the Committee.",
                  },
                ],
              },
              {
                title: "Review & Amendments",
                paragraphs: [
                  {
                    text:
                      "This Policy is reviewed and reassessed by the Committee as required. The Board updates the Policy based on statutory or regulatory amendments under the Companies Act, 2013.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "nrc-schedule-a",
        title: "Schedule A: Board Membership Criteria",
        blocks: [
          {
            type: "annexure",
            label: "Annexure I",
            title: "Board Membership Criteria",
            paragraphs: [
              {
                text:
                  "The NRC works with the Board to determine appropriate characteristics, skills, and experience for the Board as a whole and its individual members, with the objective of maintaining a Board with diverse backgrounds in business, governance, education, and public service.",
              },
              {
                text:
                  "Core Characteristics: Independence, integrity, high personal and professional ethics, sound business judgment, ability to participate constructively in deliberations, and willingness to exercise authority in a collective manner.",
                emphasis: ["Core Characteristics:"],
              },
              {
                text:
                  "Evaluation Factors: General understanding of marketing, finance, operations management, public policy, legal governance, and real estate development dynamics; understanding of the Company's strategic objectives; familiarity with external operating environments; educational background; and geographic, gender, age, and ethnic diversity.",
                emphasis: ["Evaluation Factors:"],
              },
              {
                text:
                  "Re-election & Performance: In recommending a Director for re-election, the Committee considers past attendance, active meeting contributions, and results of Board self-evaluations. Board members are expected to rigorously prepare for and participate in all Board and committee meetings without conflicting commitments.",
                emphasis: ["Re-election & Performance:"],
              },
            ],
          },
        ],
      },
    ],
  },
  "vigil-mechanism": {
    id: "vigil-mechanism",
    title: "Vigil Mechanism Policy",
    shortTitle: "Vigil Mechanism",
    category: "Statutory Compliance & Governance",
    description:
      "Whistleblower framework and safeguard procedures established under the provisions of the Companies Act, 2013.",

    metaTitle: "Vigil Mechanism Policy",
    metaDescription:
      "Read the Vigil Mechanism Policy and whistleblower safeguards of Shalimar Corp Limited.",

    company: policyCompany,

    publishedAt: null,
    updatedAt: "2026-01-01",
    version: "2026",
    reference: "SCL-VIG-POL-2026",
    department: "Audit Committee & Governance",
    status: "published",

    sections: [
      {
        id: "vigil-establishment",
        title: "Statutory Establishment",
        blocks: [
          {
            type: "paragraph",
            content: [
              {
                text:
                  "Shalimar Corp Limited has established a formal Vigil Mechanism in full compliance with the provisions of the Companies Act, 2013 and applicable corporate governance frameworks. This policy enables employees and directors to report genuine concerns or grievances regarding unethical behavior, actual or suspected fraud, or violation of the Company's code of conduct.",
              },
            ],
          },
        ],
      },
      {
        id: "vigil-responsibility",
        title: "Responsibility & Oversight",
        blocks: [
          {
            type: "callout",
            variant: "light",
            title: "Role of the Audit Committee",
            paragraphs: [
              {
                text:
                  "The Company's Audit Committee oversees the operational functioning of the Vigil Mechanism. In the event that any member of the Audit Committee has a conflict of interest in a specific reported case, they must recuse themselves immediately, and the remaining unbiased members of the Committee will deal with the matter on hand.",
                emphasis: ["Audit Committee"],
              },
            ],
          },
        ],
      },
      {
        id: "vigil-workflow",
        title: "Operational Workflow & Safeguards",
        blocks: [
          {
            type: "cards",
            columns: 2,
            items: [
              {
                title: "Victimization Safeguards",
                paragraphs: [
                  {
                    text:
                      "The Vigil Mechanism provides adequate and strict safeguards against victimization of Employees and Directors who avail of the mechanism in good faith.",
                  },
                ],
              },
              {
                title: "Direct Access Escalation",
                paragraphs: [
                  {
                    text:
                      "In exceptional or critical cases, the Vigil Mechanism provides for direct access to the Chairperson of the Audit Committee.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "vigil-misuse",
        title: "Prevention of Misuse",
        blocks: [
          {
            type: "callout",
            variant: "dark",
            title: "Notice Regarding Frivolous Complaints",
            paragraphs: [
              {
                text:
                  "In case of repeated frivolous, malafide, or vexatious complaints filed by a Director or an Employee, the Audit Committee holds full authority to take suitable disciplinary action against the concerned individual, including formal reprimands or penalties as deemed fit.",
              },
            ],
          },
        ],
      },
    ],
  },
};

export function getPolicyById(id: string): PolicyRecord | undefined {
  return PolicyData[id];
}