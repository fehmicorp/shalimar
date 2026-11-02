export interface BlogData {
  id: number;
  slug: string;
  title: string;
  category: string;
  type: string;
  description: string;
  content: string;
  images: string[];
  tag: string[];
  social: SocialLink[];
  author: string;
  status: BlogStatus;
  featured: boolean;
  readTime: number;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
export type BlogStatus = "draft" | "published" | "archived";
export interface SocialLink {
  platform: string;
  url: string;
}

export const BlogDataList: BlogData[] = [
  {
    id: 1,
    slug: "the-art-of-luxury-living-in-lucknow",
    title: "The Art of Luxury Living in Lucknow",
    category: "Lifestyle",
    type: "Editorial",

    description:
      "Discover how thoughtful architecture, elegant interiors and carefully planned communities are shaping the future of luxury living in Lucknow.",

    content:
      "Luxury living is more than a beautiful residence. It is a combination of architecture, thoughtful planning, comfort and lifestyle. Explore the elements that define a premium residential experience.",

    images: [
      "/blogs/luxury-living-1.jpg",
      "/blogs/luxury-living-2.jpg",
    ],

    tag: ["Luxury Living", "Architecture", "Lifestyle", "Lucknow"],

    social: [
      {
        platform: "facebook",
        url: "https://www.facebook.com/",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/",
      },
    ],

    author: "Shalimar Editorial Team",
    status: "published",
    featured: true,
    readTime: 5,

    metaTitle: "The Art of Luxury Living in Lucknow | Shalimar",
    metaDescription:
      "Explore the architecture, lifestyle and design elements defining luxury living in Lucknow.",

    publishedAt: "2026-10-15T10:00:00.000Z",
    createdAt: "2026-10-10T10:00:00.000Z",
    updatedAt: "2026-10-15T10:00:00.000Z",
  },
  {
    id: 2,
    slug: "modern-architecture-and-urban-development",
    title: "Modern Architecture & Urban Development",
    category: "Architecture",
    type: "Insights",

    description:
      "Explore the relationship between modern architectural design, sustainable planning and the evolution of urban communities.",

    content:
      "Modern architecture increasingly focuses on the relationship between people, buildings and the surrounding environment. Discover the principles behind thoughtful urban development.",

    images: [
      "/blogs/architecture-1.jpg",
      "/blogs/architecture-2.jpg",
    ],

    tag: ["Architecture", "Urban Planning", "Design"],

    social: [
      {
        platform: "facebook",
        url: "https://www.facebook.com/",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/",
      },
    ],

    author: "Shalimar Editorial Team",
    status: "published",
    featured: false,
    readTime: 4,

    metaTitle: "Modern Architecture & Urban Development | Shalimar",
    metaDescription:
      "Read about modern architecture and sustainable urban development.",

    publishedAt: "2026-10-12T10:00:00.000Z",
    createdAt: "2026-10-10T10:00:00.000Z",
    updatedAt: "2026-10-12T10:00:00.000Z",
  },
  {
    id: 3,
    slug: "choosing-the-right-residential-property",
    title: "Choosing the Right Residential Property",
    category: "Real Estate",
    type: "Guide",

    description:
      "A practical look at the important factors to consider when selecting a residential property for your future.",

    content:
      "Selecting a residential property involves evaluating location, connectivity, planning, amenities and long-term requirements. This guide explores the key considerations.",

    images: [
      "/blogs/residential-property-1.jpg",
    ],

    tag: ["Real Estate", "Home Buying", "Property Guide"],

    social: [
      {
        platform: "facebook",
        url: "https://www.facebook.com/",
      },
    ],

    author: "Shalimar Editorial Team",
    status: "published",
    featured: false,
    readTime: 6,

    metaTitle: "Choosing the Right Residential Property | Shalimar",
    metaDescription:
      "Important considerations when choosing a residential property.",

    publishedAt: "2026-10-08T10:00:00.000Z",
    createdAt: "2026-10-05T10:00:00.000Z",
    updatedAt: "2026-10-08T10:00:00.000Z",
  },
];