import { siteConfig } from "./site";

export const FooterData = [
  { "group":"about", "title":"About Us", "type":"heading" },
  { "group":"about", "title":"Who We Are?", "type":"link", "href":"/about-us" },
  { "group":"about", "title":"Contact us", "type":"link", "href":"/contact" },
  { "group":"about", "title":"Blog", "type":"link", "href":"/blog" },
  { "group":"about", "title":"RERA Projects", "type":"link", "href":"/rera/projects" },
  { "group":"about", "title":"RERA Promoters", "type":"link", "href":"/rera/promoters" },
  { "group":"about", "title":"Other Verticals", "type":"link", "href":"/other-verticals" },

  { "group":"projects", "title":"Projects", "type":"heading" },
  { "group":"projects", "title":"Ongoing Residential", "type":"link", "href":"/projects?status=ongoing&type=residential" },
  { "group":"projects", "title":"Ongoing Commercial", "type":"link", "href":"/projects?status=ongoing&type=commercial" },
  { "group":"projects", "title":"Township", "type":"link", "href":"/projects?type=township" },
  { "group":"projects", "title":"Recently Completed", "type":"link", "href":"/projects?status=completed" },
  { "group":"projects", "title":"Government", "type":"link", "href":"/projects?type=government" },

  { "group":"category", "title":"Category", "type":"heading" },
  { "group":"category", "title":"2 BHK Flats", "type":"link", "href":"/projects?category=2-bhk" },
  { "group":"category", "title":"3 BHK Flats", "type":"link", "href":"/projects?category=3-bhk" },
  { "group":"category", "title":"4 BHK Flats", "type":"link", "href":"/projects?category=4-bhk" },
  { "group":"category", "title":"Penthouses", "type":"link", "href":"/projects?category=penthouse" },
  { "group":"category", "title":"Villa", "type":"link", "href":"/projects?category=villa" },
  { "group":"category", "title":"Duplex House", "type":"link", "href":"/projects?category=duplex-house" },
  { "group":"category", "title":"Property", "type":"link", "href":"/projects?category=property" },

  { "group":"qclink", "title":"Quick Links", "type":"heading" },
  { "group":"qclink", "title":"Careers", "type":"link", "href":"/career" },
  { "group":"qclink", "title":"NRI FAQ", "type":"link", "href":"/faq/nri" },
  { "group":"qclink", "title":"Home Loans", "type":"link", "href":"/faq/home-loans" },
  { "group":"qclink", "title":"Buyers Guide", "type":"link", "href":"/faq/buyers-guide" },

  { "group":"report", "title":"Reports", "type":"heading" },
  { "group":"report", "title":"MGT-7-SCL-24-25", "type":"link", "href":"/reports/rp001" },
  { "group":"report", "title":"SCL_CSR Report_2017-18", "type":"link", "href":"/reports/rp002" },
  { "group":"report", "title":"SCL_CSR Report_2018-19", "type":"link", "href":"/reports/rp003" },
  { "group":"report", "title":"SCL_CSR Report_2019-20", "type":"link", "href":"/reports/rp004" },
  { "group":"report", "title":"SCL_CSR Report_2020-21", "type":"link", "href":"/reports/rp005" },
  { "group":"report", "title":"SCL_CSR Report_2021-22", "type":"link", "href":"/reports/rp006" },
  { "group":"report", "title":"SCL_CSR Report_2022-23", "type":"link", "href":"/reports/rp007" },
  { "group":"report", "title":"SCL_CSR Report_2023-24", "type":"link", "href":"/reports/rp008" },

  { "group":"cert", "title":"Certificates", "type":"heading" },
  { "group":"cert", "title":"Great Place to Work", "type":"link", "href":"/certificates/cert-gptw" },

  { "group":"policy", "title":"Policy", "type":"heading" },
  { "group":"policy", "title":"CSR Policy", "type":"link", "href":"/policy/csr" },
  { "group":"policy", "title":"NRC Policy", "type":"link", "href":"/policy/nrc" },
  { "group":"policy", "title":"Vigil Mechanism", "type":"link", "href":"/policy/vigil-mechanism" },
  { "group":"policy", "title":"Terms & Conditions", "type":"link", "href":"/terms" },
  { "group":"policy", "title":"Privacy Policy", "type":"link", "href":"/policy/privacy" },

  { "group":"social", "title":"Social", "type":"heading" },
  { "group":"social", "title":"Instagram", "type":"link", "newtab": true, "href": siteConfig.links.instagram },
  { "group":"social", "title":"Facebook", "type":"link", "newtab": true, "href": siteConfig.links.facebook },
  { "group":"social", "title":"X", "type":"link", "newtab": true, "href": siteConfig.links.twitter },
  { "group":"social", "title":"Youtube", "type":"link", "newtab": true, "href": siteConfig.links.youtube },
  { "group":"social", "title":"LinkedIn", "type":"link", "newtab": true, "href": siteConfig.links.linkedin },
]

export interface FooterItem {
  group: string;
  title: string;
  type: "heading" | "link";
  newtab?: boolean;
  href?: string;
}