export interface FAQItem {
  question: string;
  answer?: string[];
  points?: string[];
}

export interface FAQSection {
  id: string;
  title: string;
  description?: string;
  content?: string[];
  items?: FAQItem[];
  points?: string[];
}

export interface FAQRecord {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  intro?: string[];
  sections: FAQSection[];
  disclaimer?: string;
  status: "draft" | "published";
}

export const faqData: Record<string, FAQRecord> = {
  "buyers-guide": {
    id: "buyers-guide",
    title: "Buyer's Guide",
    shortTitle: "Buyer's Guide",
    description:
      "Important factors to consider when selecting and purchasing your ideal home.",
    metaTitle: "Home Buyer's Guide",
    metaDescription:
      "Explore important considerations when buying a home, from location and accessibility to affordability, property title and maintenance.",
    intro: [
      "Buying a home is an important decision. Before selecting your ideal home, consider the following factors to make an informed choice.",
    ],
    sections: [
      {
        id: "location",
        title: "Location of the Project",
        description:
          "Evaluate the location and its proximity to essential civic and recreational amenities.",
        points: [
          "Educational institutions",
          "Parks and recreational spaces",
          "Police stations",
          "Temples",
          "Community halls",
          "Hospitals",
          "Main roads",
          "Bus stops and railway lines",
          "Transportation services",
        ],
      },
      {
        id: "key-considerations",
        title: "Important Factors to Consider",
        points: [
          "Place of employment",
          "Market area",
          "Education",
          "Public transport facilities",
          "Developer",
          "Accessibility to water and electricity",
          "Hospital / Medical services",
          "Monthly society maintenance",
          "Safety and security",
          "Chain of title",
          "Affordability",
          "Water leakages",
          "Maintenance of the flat",
          "Neighbours",
          "Transfer charges",
        ],
      },
      {
        id: "property-types",
        title: "Property Types",
        points: [
          "Self Constructed Property (SCP)",
          "Under-construction property at an initial stage",
        ],
      },
    ],
    disclaimer:
      "The information provided herein is just for reference purpose collected from various sources. Shalimar Developers shall not be responsible for any changes in policies.",
    status: "published",
  },

  "nri": {
    id: "nri",
    title: "NRI Frequently Asked Questions",
    shortTitle: "NRI FAQ",
    description:
      "Information for Non-Resident Indians considering property ownership and home financing.",
    metaTitle: "NRI FAQ",
    metaDescription:
      "Find information about home loans, stamp duty, property registration and tax benefits for NRI property buyers.",
    intro: [
      "Explore the following frequently asked questions relating to property financing, stamp duty, registration and tax benefits.",
    ],
    sections: [
      {
        id: "loans",
        title: "Loans",
        items: [
          {
            question: "Can I get my house financed?",
          },
          {
            question: "How much loan can I avail?",
          },
          {
            question: "What is the term of the loan that bank offers?",
          },
          {
            question: "What are the basic documents required for home loans?",
          },
          {
            question: "What is the procedure for disbursement?",
          },
          {
            question: "What is TDS on property?",
          },
        ],
      },
      {
        id: "stamp-duty-registration",
        title: "Stamp Duty & Registration",
        items: [
          {
            question: "What is stamp duty and how is it calculated?",
            answer: [
              "Transactions concluded by way of documentation or instruments levy stamp duty, which is a kind of tax.",
              "The Bombay Stamp Act (1958) sealed the tax. Stamp duty rates have been revised with effect from April 2012. For residential as well as commercial units, the stamp duty payable is applicable on the market value of such unit or the consideration paid under the agreement, whichever is higher.",
              "On the basis of the stamp duty ready reckoner issued by the government every year on January 1st, the market value of the unit is determined.",
            ],
          },
          {
            question: "What is the procedure for registration?",
          },
        ],
      },
      {
        id: "tax-benefits",
        title: "Tax Benefits",
        items: [
          {
            question: "Will I get tax benefits on loans?",
            answer: [
              "Yes, most leading banks and financial institutions for availing home loans approve all Shalimar Projects.",
            ],
          },
          {
            question: "Do I get deduction on interest payment?",
          },
          {
            question: "Do I get deduction on principal?",
          },
        ],
      },
    ],
    status: "published",
  },

  "home-loans": {
    id: "home-loans",
    title: "Home Loans",
    shortTitle: "Home Loans",
    description:
      "Understand home loan financing, loan-to-value, interest rates, EMI and repayment before buying a home.",
    metaTitle: "Home Loan Guide",
    metaDescription:
      "Read about home loan financing, loan amounts, interest rates, EMI payments and repayment tenure when purchasing a property.",
    intro: [
      "While the borrower has to provide some amount from personal resources, a bank usually lends between 75–80% of the agreement value.",
      "Some banks are willing to include the stamp duty and registration charges within the purview of the loan, although the RBI stipulates a ceiling of 75%, which technically makes the loaned amount 80% of the agreement value.",
      "Depending on how the economy is faring and how much liquidity exists in the market, the lending rate attached to the home loan also changes from time to time.",
    ],
    sections: [
      {
        id: "interest-rates",
        title: "Interest Rates",
        content: [
          "The bank has the right to unfix and raise the fixed interest rate in the event of unforeseen events or changes in money market conditions.",
        ],
      },
      {
        id: "emi-repayment",
        title: "EMI & Loan Repayment",
        content: [
          "For any loan, rate of interest and principal are two basic components involved while calculating EMI payment.",
          "A major part of the amount goes in paying up the interest in the first few years of your loan repayment tenure. After you have paid much of the interest, the trend reverses after a few years and the principal repayment increases.",
          "Banks have to increase tenure up to a certain point, as today home loan interest rates are high everywhere. The EMI you pay fails to cover the loan amount if the interest rate continues to go up.",
        ],
      },
      {
        id: "important-facts",
        title: "Important Home Loan Facts",
        content: [
          "These are some important home loan facts which you should be aware of before buying a home.",
        ],
      },
    ],
    status: "published",
  },
};

export function getFAQById(id: string): FAQRecord | undefined {
  return faqData[id];
}

export function getPublishedFAQs(): FAQRecord[] {
  return Object.values(faqData).filter(
    (faq) => faq.status === "published"
  );
}