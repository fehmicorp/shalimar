
export type BlogBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "quote";
      text: string;
    }
  | {
      type: "list";
      title?: string;
      items: string[];
    };

export interface BlogRecord {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured?: boolean;
  tags: string[];
  coverLabel: string;
  coverStyle: "real-estate" | "lifestyle" | "architecture" | "corporate";
  seoTitle: string;
  seoDescription: string;
  content: BlogBlock[];
  status: "draft" | "published" | "archived";
}

export const blogData: Record<string, BlogRecord> = {
  bp26001: {
    id: "bp26001",
    title: "Beyond Bricks and Walls: The Evolution of Modern Living",
    excerpt:
      "Discover how thoughtful planning, architecture and modern amenities are shaping the future of residential communities.",
    category: "Real Estate",
    author: "Shalimar Corp Editorial Team",
    publishedAt: "2026-01-15",
    readingTime: 5,
    featured: true,
    tags: ["Real Estate", "Modern Living", "Architecture"],
    coverLabel: "The Future of Living",
    coverStyle: "real-estate",
    seoTitle:
      "Beyond Bricks and Walls | Modern Living – Shalimar Corp",
    seoDescription:
      "Explore how modern residential planning, architecture and amenities are transforming the way people live.",
    content: [
      {
        type: "paragraph",
        text:
          "A home is more than a physical structure. It is a place where everyday experiences take shape, families grow and communities develop. As cities evolve, the expectations from residential spaces continue to change.",
      },
      {
        type: "heading",
        text: "The Meaning of Modern Living",
      },
      {
        type: "paragraph",
        text:
          "Modern living brings together thoughtful design, convenient access, functional spaces and facilities that support everyday life. Today's residential developments are increasingly planned around the needs of residents and the wider community.",
      },
      {
        type: "heading",
        text: "Planning Beyond Individual Homes",
      },
      {
        type: "paragraph",
        text:
          "A well-planned residential environment considers more than individual apartments. Circulation, open spaces, shared amenities, safety, accessibility and maintenance all contribute to the experience of living in a community.",
      },
      {
        type: "list",
        title: "Important elements of a residential community",
        items: [
          "Thoughtful layouts and functional spaces",
          "Accessible everyday amenities",
          "Well-planned common areas",
          "Safety and security considerations",
          "Efficient property management",
          "Connectivity to essential services",
        ],
      },
      {
        type: "heading",
        text: "Architecture and Everyday Experience",
      },
      {
        type: "paragraph",
        text:
          "Architecture influences how people interact with their surroundings. Natural light, ventilation, circulation and the relationship between private and shared spaces can all contribute to a more comfortable living environment.",
      },
      {
        type: "quote",
        text:
          "The value of a development is reflected not only in its structures, but also in the experiences it creates for the people who use it.",
      },
      {
        type: "heading",
        text: "Looking Ahead",
      },
      {
        type: "paragraph",
        text:
          "As urban environments continue to grow, residential development has an important role in shaping the character of cities. A long-term approach to planning, quality and management can help create spaces that remain relevant to changing lifestyles.",
      },
    ],
    status: "published",
  },

  bp26002: {
    id: "bp26002",
    title: "Choosing the Right Home: Factors Every Homebuyer Should Consider",
    excerpt:
      "A practical guide to evaluating location, connectivity, construction, documentation and long-term requirements before purchasing a home.",
    category: "Home Buying",
    author: "Shalimar Corp Editorial Team",
    publishedAt: "2026-02-10",
    readingTime: 6,
    tags: ["Home Buying", "Property", "Buyers Guide"],
    coverLabel: "A Homebuyer's Guide",
    coverStyle: "lifestyle",
    seoTitle: "Choosing the Right Home | Shalimar Corp",
    seoDescription:
      "Explore important considerations for homebuyers, from location and connectivity to documentation and long-term ownership.",
    content: [
      {
        type: "paragraph",
        text:
          "Buying a home is an important personal and financial decision. Beyond the appearance of a property, buyers should evaluate how well it meets their present requirements and future plans.",
      },
      {
        type: "heading",
        text: "1. Location and Connectivity",
      },
      {
        type: "paragraph",
        text:
          "Consider the property's access to workplaces, educational institutions, healthcare facilities, public transport, markets and other everyday services. The surrounding neighbourhood is an important part of the overall living experience.",
      },
      {
        type: "heading",
        text: "2. Project Planning and Amenities",
      },
      {
        type: "paragraph",
        text:
          "Understand the project layout, available facilities, common areas, parking arrangements, security provisions and property management approach. Evaluate amenities based on your actual requirements rather than appearance alone.",
      },
      {
        type: "heading",
        text: "3. Construction and Quality",
      },
      {
        type: "paragraph",
        text:
          "Review the construction specifications, materials, finishing standards and available project information. Where possible, visit the project and understand the scope of facilities being offered.",
      },
      {
        type: "heading",
        text: "4. Legal and Project Documentation",
      },
      {
        type: "paragraph",
        text:
          "Buyers should independently review relevant title documents, approvals, registrations, agreements and applicable project disclosures. Seek advice from a qualified legal professional before making a commitment.",
      },
      {
        type: "heading",
        text: "5. Financial Planning",
      },
      {
        type: "paragraph",
        text:
          "Consider the total cost of ownership, including the property price, applicable taxes, registration charges, financing costs, maintenance and other disclosed charges. Plan your purchase according to your financial circumstances.",
      },
      {
        type: "quote",
        text:
          "A considered home purchase begins with understanding the property, the neighbourhood and the commitments involved.",
      },
      {
        type: "heading",
        text: "Make an Informed Decision",
      },
      {
        type: "paragraph",
        text:
          "Take time to compare suitable options, review documentation and ask questions. A well-informed decision can help align your home purchase with your lifestyle and long-term objectives.",
      },
    ],
    status: "published",
  },

  bp26003: {
    id: "bp26003",
    title: "Architecture That Shapes Communities and Cities",
    excerpt:
      "Explore the relationship between architectural design, urban planning and the development of more connected communities.",
    category: "Architecture",
    author: "Shalimar Corp Editorial Team",
    publishedAt: "2026-03-18",
    readingTime: 4,
    tags: ["Architecture", "Urban Development", "Design"],
    coverLabel: "Designing Tomorrow",
    coverStyle: "architecture",
    seoTitle: "Architecture and Urban Communities | Shalimar Corp",
    seoDescription:
      "Understand how architectural design and urban planning contribute to connected and functional communities.",
    content: [
      {
        type: "paragraph",
        text:
          "Architecture is closely connected to the way people experience their surroundings. Buildings, streets, open spaces and shared facilities collectively influence the identity and functionality of an urban environment.",
      },
      {
        type: "heading",
        text: "Design with Purpose",
      },
      {
        type: "paragraph",
        text:
          "Effective architectural planning begins by understanding the purpose of a space and the people who will use it. Functionality, circulation, natural light, ventilation and accessibility are important considerations.",
      },
      {
        type: "heading",
        text: "The Importance of Shared Spaces",
      },
      {
        type: "paragraph",
        text:
          "Shared spaces can encourage interaction and contribute to a sense of community. Their planning and management are important considerations in residential and mixed-use developments.",
      },
      {
        type: "heading",
        text: "Connecting Developments with Their Surroundings",
      },
      {
        type: "paragraph",
        text:
          "A development exists within a wider urban context. Access roads, nearby services, public infrastructure and the surrounding neighbourhood all influence its practical use and relationship with the city.",
      },
      {
        type: "heading",
        text: "A Long-Term Perspective",
      },
      {
        type: "paragraph",
        text:
          "Buildings and communities are used over many years. Design decisions that consider maintenance, adaptability and the changing needs of residents can contribute to a more enduring built environment.",
      },
    ],
    status: "published",
  },

  bp26004: {
    id: "bp26004",
    title: "Building a Diversified Business: The Shalimar Journey",
    excerpt:
      "An overview of Shalimar Corp's journey since 1988 and its presence across real estate, infrastructure and allied business sectors.",
    category: "Company Updates",
    author: "Shalimar Corp Editorial Team",
    publishedAt: "2026-04-05",
    readingTime: 5,
    tags: ["Shalimar Corp", "Company", "Business"],
    coverLabel: "Our Corporate Journey",
    coverStyle: "corporate",
    seoTitle: "The Shalimar Journey | Shalimar Corp",
    seoDescription:
      "Discover the Shalimar Corp journey, its business sectors and its development philosophy since 1988.",
    content: [
      {
        type: "paragraph",
        text:
          "Established in 1988, Shalimar Corp began its journey in Lucknow and has developed into a diversified business house with interests across multiple sectors.",
      },
      {
        type: "heading",
        text: "A Foundation in Real Estate",
      },
      {
        type: "paragraph",
        text:
          "Real estate has been an important part of the Group's journey. Its portfolio includes residential and commercial developments that have contributed to the changing built environment of Lucknow.",
      },
      {
        type: "heading",
        text: "Expanding Business Interests",
      },
      {
        type: "paragraph",
        text:
          "The Group's business interests extend across property management, highway infrastructure, civil construction and glass processing. This diversified portfolio reflects an ongoing approach to business development and growth.",
      },
      {
        type: "heading",
        text: "Knowledge, Management and Transparency",
      },
      {
        type: "paragraph",
        text:
          "The Group identifies knowledge, efficient management and transparency as important foundations of its business philosophy. These principles guide its approach to projects, operations and customer relationships.",
      },
      {
        type: "quote",
        text:
          "Our journey is defined by the ambition to create value, contribute to development and enrich lives.",
      },
      {
        type: "heading",
        text: "Continuing the Journey",
      },
      {
        type: "paragraph",
        text:
          "As the Group continues to explore opportunities across its business sectors, its focus remains on quality, expertise, organizational growth and contributing to the communities in which it operates.",
      },
    ],
    status: "published",
  },
};

export function getBlogById(id: string): BlogRecord | undefined {
  return blogData[id.toLowerCase()];
}

export function getPublishedBlogs(): BlogRecord[] {
  return Object.values(blogData)
    .filter((blog) => blog.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );
}

export function getFeaturedBlogs(): BlogRecord[] {
  return getPublishedBlogs().filter((blog) => blog.featured);
}

export function getBlogCategories(): string[] {
  return [
    ...new Set(getPublishedBlogs().map((blog) => blog.category)),
  ];
}

export function generateBlogId(year = new Date().getFullYear()): string {
  const yearCode = String(year).slice(-2);
  const prefix = `bp${yearCode}`;

  const sequenceNumbers = Object.keys(blogData)
    .filter((id) => new RegExp(`^${prefix}\\d{3}$`, "i").test(id))
    .map((id) => Number(id.slice(-3)));

  const nextSequence = Math.max(0, ...sequenceNumbers) + 1;

  if (nextSequence > 999) {
    throw new Error(`Blog ID limit reached for ${year}`);
  }

  return `${prefix}${String(nextSequence).padStart(3, "0")}`;
}
