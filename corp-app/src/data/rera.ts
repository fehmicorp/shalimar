
export type RERALink = {
  label: string;
  url: string;
};

export interface RERAProject {
  id: string;
  name: string;
  promoterRegistrationNo: string;
  reraRegistrationNo: string;
  reraLink: RERALink | null;
  status: "published" | "draft";
}

export interface RERAPromoter {
  id: string;
  company: string;
  cin: string;
  reraRegistrationNo: string;
  reraLink: RERALink | null;
  status: "published" | "draft";
}

const UPRERA_BASE_URL = "https://www.up-rera.in";

const createProjectLink = (
  registrationNo: string
): RERALink => ({
  label: "UPRERA",
  url: `${UPRERA_BASE_URL}/`,
});

const createPromoterLink = (
  registrationNo: string
): RERALink => ({
  label: "UPRERA",
  url: `${UPRERA_BASE_URL}/`,
});

// --------------------------------------------------
// RERA REGISTERED PROJECTS
// --------------------------------------------------

export const reraProjects: RERAProject[] = [
  {
    id: "belvedere-court-3",
    name: "Belvedere Court 3",
    promoterRegistrationNo: "UPRERAPRM10813",
    reraRegistrationNo: "UPRERAPRJ260653",
    reraLink: createProjectLink("UPRERAPRJ260653"),
    status: "published",
  },
  {
    id: "aster",
    name: "Aster",
    promoterRegistrationNo: "UPRERAPRM10366",
    reraRegistrationNo: "UPRERAPRJ947671",
    reraLink: createProjectLink("UPRERAPRJ947671"),
    status: "published",
  },
  {
    id: "gallant-klm",
    name: "Gallant - KLM",
    promoterRegistrationNo: "UPRERAPRM4092",
    reraRegistrationNo: "UPRERAPRJ3168",
    reraLink: createProjectLink("UPRERAPRJ3168"),
    status: "published",
  },
  {
    id: "vista",
    name: "Vista",
    promoterRegistrationNo: "UPRERAPRM10813",
    reraRegistrationNo: "UPRERAPRJ4833",
    reraLink: createProjectLink("UPRERAPRJ4833"),
    status: "published",
  },
  {
    id: "belvedere-court-phase-1",
    name: "Belvedere Court Phase 1",
    promoterRegistrationNo: "UPRERAPRM10813",
    reraRegistrationNo: "UPRERAPRJ12850",
    reraLink: createProjectLink("UPRERAPRJ12850"),
    status: "published",
  },
  {
    id: "belvedere-court-phase-2",
    name: "Belvedere Court Phase 2",
    promoterRegistrationNo: "UPRERAPRM10813",
    reraRegistrationNo: "UPRERAPRJ17338",
    reraLink: createProjectLink("UPRERAPRJ17338"),
    status: "published",
  },
  {
    id: "mannat",
    name: "Mannat",
    promoterRegistrationNo: "UPRERAPRM4092",
    reraRegistrationNo: "UPRERAPRJ8345",
    reraLink: createProjectLink("UPRERAPRJ8345"),
    status: "published",
  },
  {
    id: "garden-bay-villas-plots",
    name: "Garden Bay - Villas, Plots",
    promoterRegistrationNo: "UPRERAPRM10366",
    reraRegistrationNo: "UPRERAPRJ9256",
    reraLink: createProjectLink("UPRERAPRJ9256"),
    status: "published",
  },
  {
    id: "garden-bay-group-housing",
    name: "Garden Bay - Group Housing",
    promoterRegistrationNo: "UPRERAPRM10366",
    reraRegistrationNo: "UPRERAPRJ9203",
    reraLink: createProjectLink("UPRERAPRJ9203"),
    status: "published",
  },
  {
    id: "paradise",
    name: "Paradise",
    promoterRegistrationNo: "UPRERAPRM4092",
    reraRegistrationNo: "UPRERAPRJ9777",
    reraLink: createProjectLink("UPRERAPRJ9777"),
    status: "published",
  },
  {
    id: "ashiana-manzil",
    name: "Ashiana / Manzil",
    promoterRegistrationNo: "UPRERAPRM10813",
    reraRegistrationNo: "UPRERAPRJ8321",
    reraLink: createProjectLink("UPRERAPRJ8321"),
    status: "published",
  },
  {
    id: "krrish-shalimar-projects",
    name: "Krrish Shalimar Projects Private Limited",
    promoterRegistrationNo: "N.A",
    reraRegistrationNo: "216 of 2017 dated 18.09.2017",
    reraLink: null,
    status: "published",
  },
  {
    id: "mannat-extension",
    name: "Mannat Extension",
    promoterRegistrationNo: "UPRERAPRM4092",
    reraRegistrationNo: "UPRERAPRJ243983",
    reraLink: createProjectLink("UPRERAPRJ243983"),
    status: "published",
  },
  {
    id: "valencia-county",
    name: "Valencia county",
    promoterRegistrationNo: "UPRERAPRM10813",
    reraRegistrationNo: "UPRERAPRJ612919",
    reraLink: createProjectLink("UPRERAPRJ612919"),
    status: "published",
  },
  {
    id: "iris",
    name: "Iris",
    promoterRegistrationNo: "UPRERAPRM10366",
    reraRegistrationNo: "UPRERAPRJ337213",
    reraLink: createProjectLink("UPRERAPRJ337213"),
    status: "published",
  },
  {
    id: "armaan-muskan",
    name: "Armaan Muskan",
    promoterRegistrationNo: "UPRERAPRM10366",
    reraRegistrationNo: "UPRERAPRJ717215",
    reraLink: createProjectLink("UPRERAPRJ717215"),
    status: "published",
  },
  {
    id: "tamanna-arzoo",
    name: "Tamanna Arzoo",
    promoterRegistrationNo: "UPRERAPRM10813",
    reraRegistrationNo: "UPRERAPRJ922369",
    reraLink: createProjectLink("UPRERAPRJ922369"),
    status: "published",
  },
  {
    id: "valencia-towers",
    name: "Valencia Towers",
    promoterRegistrationNo: "UPRERAPRM10813",
    reraRegistrationNo: "UPRERAPRJ496663",
    reraLink: createProjectLink("UPRERAPRJ496663"),
    status: "published",
  },
  {
    id: "marbella",
    name: "Marbella",
    promoterRegistrationNo: "UPRERAPRM10813",
    reraRegistrationNo: "UPRERAPRJ460592/05/2024",
    reraLink: createProjectLink("UPRERAPRJ460592/05/2024"),
    status: "published",
  },
  {
    id: "pinnacle",
    name: "Pinnacle",
    promoterRegistrationNo: "UPRERAPRM10813",
    reraRegistrationNo: "UPRERAPRJ705722/01/2024",
    reraLink: createProjectLink("UPRERAPRJ705722/01/2024"),
    status: "published",
  },
  {
    id: "valencia-county-east",
    name: "Valencia County East",
    promoterRegistrationNo: "UPRERAPRM10813",
    reraRegistrationNo: "UPRERAPRJ707640",
    reraLink: createProjectLink("UPRERAPRJ707640"),
    status: "published",
  },
  {
    id: "whispering-woods",
    name: "Whispering Woods",
    promoterRegistrationNo: "UPRERAPRM10813",
    reraRegistrationNo: "UPRERAPRJ380751",
    reraLink: createProjectLink("UPRERAPRJ380751"),
    status: "published",
  },
  {
    id: "belvedere-suits",
    name: "Belvedere Suits",
    promoterRegistrationNo: "UPRERAPRM10813",
    reraRegistrationNo: "UPRERAPRJ263280",
    reraLink: createProjectLink("UPRERAPRJ263280"),
    status: "published",
  },
  {
    id: "belvedere-court",
    name: "Belvedere Court",
    promoterRegistrationNo: "UPRERAPRM10813",
    reraRegistrationNo: "UPRERAPRJ12850",
    reraLink: createProjectLink("UPRERAPRJ12850"),
    status: "published",
  },
  {
    id: "sky-garden",
    name: "Sky Garden",
    promoterRegistrationNo: "UPRERAPRM219077",
    reraRegistrationNo: "UPRERAPRJ160941",
    reraLink: createProjectLink("UPRERAPRJ160941"),
    status: "published",
  },
  {
    id: "gallant-west",
    name: "Gallant West",
    promoterRegistrationNo: "N.A",
    reraRegistrationNo: "UPRERAPRJ569037",
    reraLink: createProjectLink("UPRERAPRJ569037"),
    status: "published",
  },
  {
    id: "ibiza-town",
    name: "Ibiza Town",
    promoterRegistrationNo: "N.A",
    reraRegistrationNo: "216 of 2017 dated 18.09.2017",
    reraLink: null,
    status: "published",
  },
  {
    id: "garden-bay-crown",
    name: "Garden Bay Crown",
    promoterRegistrationNo: "UPRERAPRM10366",
    reraRegistrationNo: "UPRERAPRJ557069",
    reraLink: createProjectLink("UPRERAPRJ557069"),
    status: "published",
  },
];

export const reraPromoters: RERAPromoter[] = [
  {
    id: "shalimar-corp-limited",
    company: "Shalimar Corp Limited",
    cin: "U05001MH1988PLC195637",
    reraRegistrationNo: "UPRERAPRM4092",
    reraLink: createPromoterLink("UPRERAPRM10813"),
    status: "published",
  },
  {
    id: "shalimar-ksmb-projects",
    company: "Shalimar KSMB Projects",
    cin: "NA",
    reraRegistrationNo: "UPRERAPRM10366",
    reraLink: createPromoterLink("UPRERAPRM10366"),
    status: "published",
  },
  {
    id: "ans-developers",
    company: "ANS Developers Pvt. Ltd.",
    cin: "U70109MH2006PTC237856",
    reraRegistrationNo: "UPRERAPRM10813",
    reraLink: createPromoterLink("UPRERAPRM10813"),
    status: "published",
  },
];

export const getPublishedProjects = () =>
  reraProjects.filter((project) => project.status === "published");

export const getPublishedPromoters = () =>
  reraPromoters.filter((promoter) => promoter.status === "published");

export const getProjectById = (id: string) =>
  reraProjects.find((project) => project.id === id);

export const getPromoterById = (id: string) =>
  reraPromoters.find((promoter) => promoter.id === id);
