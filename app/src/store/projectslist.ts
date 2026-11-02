export interface ProjectsData {
    id: number;
    title: string;
    category: string;
    type: string;
    city: string;
    location: string;
    image: string;
    images: string[];
    description: string;
    tag: string[];
}

export const ProjectItems: ProjectsData[] = [
  {
    id: 1,
    title: "Shalimar Gallant",
    category: "Luxury Residences",
    type: "Residential",
    city: "Lucknow",
    location: "Vibhuti Khand, Gomti Nagar",
    image: "/img1.png",
    images: ["/img1.png", "/img1-2.png", "/img1-3.png"],
    description: "Exquisite high-rise living offering panoramic city views, elite clubhouses, and uncompromising privacy.",
    tag: ["recent", "featured", "new launces"],
  },
  {
    id: 2,
    title: "Shalimar One World",
    category: "Masterplanned Township",
    type: "Township & Villas",
    city: "Lucknow",
    location: "Faizabad Road, Lucknow",
    image: "/img2.png",
    images: ["/img2.png", "/img2-2.png", "/img2-3.png"],
    description: "A sprawling self-sustaining ecosystem integrating pristine green landscapes, golf-centric living, and modern opulence.",
    tag: ["recent"],
  },
  {
    id: 3,
    title: "Shalimar Corp Gateway",
    category: "Commercial Landmark",
    type: "Commercial",
    city: "Lucknow",
    location: "Hazratganj, Lucknow",
    image: "/img3.png",
    images: ["/img3.png", "/img3-2.png", "/img3-3.png"],
    description: "State-of-the-art corporate architecture engineered for elite enterprises, retail prestige, and high-yield commerce.",
    tag: ["recent"],
  },
  {
    id: 4,
    title: "Shalimar Mannat",
    category: "Affordable Luxury",
    type: "Residential Apartments",
    city: "Lucknow",
    location: "Faizabad Road, Lucknow",
    image: "/img4.png",
    images: ["/img4.png", "/img4-2.png", "/img4-3.png"],
    description: "Thoughtfully crafted gated community apartments designed for harmonious family living and modern conveniences.",
    tag: ["recent"],
  },
  {
    id: 5,
    title: "Shalimar Gallant",
    category: "Luxury Residences",
    type: "Residential",
    city: "Lucknow",
    location: "Vibhuti Khand, Gomti Nagar",
    image: "/img1.png",
    images: ["/img1.png", "/img1-2.png", "/img1-3.png"],
    description: "Exquisite high-rise living offering panoramic city views, elite clubhouses, and uncompromising privacy.",
    tag: ["recent"],
  },
  {
    id: 6,
    title: "Shalimar One World",
    category: "Masterplanned Township",
    type: "Township & Villas",
    city: "Lucknow",
    location: "Faizabad Road, Lucknow",
    image: "/img2.png",
    images: ["/img2.png", "/img2-2.png", "/img2-3.png"],
    description: "A sprawli/ng self-sustaining ecosystem integrating pristine green landscapes, golf-centric living, and modern opulence.",
    tag: ["recent"],
  },
  {
    id: 7,
    title: "Shalimar Corp Gateway",
    category: "Commercial Landmark",
    type: "Commercial",
    city: "Lucknow",
    location: "Hazratganj, Lucknow",
    image: "/img3.png",
    images: ["/img3.png", "/img3-2.png", "/img3-3.png"],
    description: "State-of-the-art corporate architecture engineered for elite enterprises, retail prestige, and high-yield commerce.",
    tag: ["recent"],
  },
  {
    id: 8,
    title: "Shalimar Mannat",
    category: "Affordable Luxury",
    type: "Residential Apartments",
    city: "Lucknow",
    location: "Faizabad Road, Lucknow",
    image: "/img4.png",
    images: ["/img4.png", "/img4-2.png", "/img4-3.png"],
    description: "Thoughtfully crafted gated community apartments designed for harmonious family living and modern conveniences.",
    tag: ["recent"],
  },
];