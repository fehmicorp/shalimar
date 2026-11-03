export const siteConfig = {
  shortname: "Shalimar",
  name: "Shalimar Corp",
  description: "Shalimar Corp is one of the top best property builders in Lucknow. Shalimar Corp Limited is a diversified Business House headquartered in Lucknow, India. Visit our website and know more about us.",
  url: process.env.SITE_URL || "https://www.shalimarcorp.com",
  ogImage: "https://www.shalimarcorp.com/og-image.jpg",
  
  analytics: {
    gtmId: process.env.GTM_ID || "GTM-NWF8KCG",
    gaId: process.env.GA_ID || "G-XXXXXXX",
  },

  keywords: [
    "Shalimar Corp",
    "Shalimar Corp Limited",
    "property builders in Lucknow",
    "real estate Lucknow",
    "luxury apartments Lucknow",
    "commercial spaces Lucknow",
    "residential projects Lucknow",
    "Shalimar Titanium",
    "builders in Gomti Nagar Lucknow",
    "top real estate developers in Uttar Pradesh"
  ],

  company: {
    legalName: "Shalimar Corp Limited",
    phone: "+91-522-4030444",
    phone2: "+91-522-4030413",
    email: "info@shalimar.org",
    address: {
      street: "11th Floor, Shalimar Titanium, Vibhuti Khand, Gomti Nagar",
      city: "Lucknow",
      state: "Uttar Pradesh",
      postalCode: "226010",
      country: "India",
    },
    cin: "U70100DL1988PLC390006"
  },
  links: {
    facebook: "https://facebook.com/shalimarcorpltd",
    instagram: "https://instagram.com/shalimarcorpltd",
    linkedin: "https://linkedin.com/company/shalimarcorpltd",
    twitter: "https://twitter.com/shalimarcorpltd",
    youtube: "https://youtube.com/@ShalimarCorpLimited",
  },
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Projects", href: "/projects" },
    { title: "Residential", href: "/projects?type=residential" },
    { title: "Commercial", href: "/projects?type=commercial" },
    { title: "About Us", href: "/about-us" },
    { title: "Contact", href: "/contact" },
  ],

  other: {
    "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION || "8XaLaVojmEDyNS22m_6sUBOKXsbmnxlYl_onXs_pA_M",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}) {
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: [...siteConfig.keywords],
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    metadataBase: new URL(siteConfig.url),
    other: {
      ...siteConfig.other,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

const s3Address = process.env.S3_ADDRESS || "http://localhost:9098/";
const bucketName = process.env.APP_BUCKET_TAG || "assets";
const accessToken = process.env.S3_SECRET_ACCESS_TOKEN || "";
const accessTokenHeader = process.env.S3_SECRET_ACCESS_TOKEN_HEADER || "X-SecretAccessToken";

export const assetsConfig = {
  s3Address,
  BucketName: bucketName,
  asset: `${s3Address}${bucketName}/`,
  accessToken: accessToken,
  accessTokenHeader: accessTokenHeader,
} as const;

export type AssetsConfig = typeof assetsConfig;
