
import {
  Building2,
  Layers3,
  Compass,
  Target,
  Award,
} from "lucide-react";

export const aboutData = {
  hero: {
    eyebrow: "The Shalimar Legacy",
    title: "Discover Beyond",
    highlight: "Bricks and Walls",
    description:
      "More than building spaces, we create environments that enrich lives, shape communities and contribute to the future of urban India.",
    buttonText: "Explore Our Projects",
    buttonLink: "/projects",
    established: "ESTABLISHED 1988",
    year: "1988",
    tagline: "A Legacy of Excellence",
  },

  introduction: {
    eyebrow: "Who We Are",
    title: "A Legacy of",
    highlight: "Building Excellence",
    paragraphs: [
      "Established in 1988, Shalimar Corp, popularly known as a premium home builder, is a diversified business house headquartered in Lucknow, Uttar Pradesh, India.",
      "From its beginnings in real estate, the Group has expanded its presence across property management, highway infrastructure, civil construction and glass processing. An evolving business portfolio continues to establish Shalimar as a growing business conglomerate.",
      "Built on the cornerstones of knowledge, efficient management and transparency, Shalimar is committed to contributing to the growth and development of the sectors in which it operates. Its vision extends beyond constructing buildings to enriching lives and raising the standard of living of society at large.",
    ],
  },

  highlights: [
    {
      value: "1988",
      label: "Year Established",
      description: "A legacy built on experience and trust",
    },
    {
      value: "6M+",
      label: "Sq. Ft. Developed",
      description: "Residential and commercial developments",
    },
    {
      value: "15M+",
      label: "Sq. Ft. Planned",
      description: "Upcoming development vision",
    },
    {
      value: "1500+",
      label: "Team Members",
      description: "People powering our progress",
    },
  ],

  businessPortfolio: {
    eyebrow: "Our Business Portfolio",
    title: "Diversified Expertise.",
    highlight: "One Growing Vision.",
    description:
      "Our business interests span multiple sectors, creating opportunities for sustainable growth, innovation and development.",

    sectors: [
      {
        icon: Building2,
        title: "Real Estate",
        description:
          "Residential and commercial developments designed to enrich lifestyles and transform urban environments.",
      },
      {
        icon: Layers3,
        title: "Property Management",
        description:
          "Professional property management focused on maintaining quality, value and customer experience.",
      },
      {
        icon: Compass,
        title: "Highway Infrastructure",
        description:
          "Contributing to infrastructure development through highway-related projects and opportunities.",
      },
      {
        icon: Award,
        title: "Civil Construction",
        description:
          "Building infrastructure and spaces with a focus on quality, efficient management and expertise.",
      },
      {
        icon: Building2,
        title: "Glass Processing",
        description:
          "Expanding our business portfolio into specialized glass processing operations.",
      },
    ],
  },

  vision: {
    eyebrow: "Our Vision",
    title: "Shaping Tomorrow,",
    highlight: "Enriching Lives",
    paragraphs: [
      "Shalimar Corp is synonymous with luxury property development in Lucknow. As a diversified business conglomerate based in the capital of Uttar Pradesh, the Group has contributed to transforming unorganized and unstructured landscapes into organized developments with modern amenities, facilities and infrastructure.",
      "With land parcels acquired within Lucknow and Prayagraj, and planned acquisitions in Kanpur and Varanasi, Shalimar Corp continues to pursue new opportunities for growth and development.",
      "Our vision is to set new benchmarks in real estate development, create extraordinary living experiences and shape the future of urban landscapes across Uttar Pradesh and beyond.",
    ],
  },

  mission: {
    eyebrow: "Our Mission",
    title: "Creating Spaces.",
    highlight: "Enhancing Life.",
    statement:
      "Delivering world-class projects with balanced organizational growth.",
    statementLabel: "The Shalimar Mission",
    paragraphs: [
      "Shalimar Corp entered the real estate sector in 1988 from Lucknow, initially known as SAS Group. Since then, it has grown through a commitment to quality standards, thoughtfully developed homes and innovation in design and technology.",
      "Our developments have contributed to the changing skyline of Lucknow, bringing together architecture, refined facilities and contemporary lifestyles. The Group has also extended its presence beyond Lucknow into Delhi and Haryana.",
      "Our mission is not only to build quality homes and offices but also to provide refined facilities, enhance the quality of life and contribute positively to the surrounding environment.",
      "We remain committed to innovation, professionalism, and social and moral responsibility, delivering enduring value through expertise, quality and customer satisfaction.",
    ],
  },

  people: {
    value: "1500+",
    label: "Dedicated Personnel",
    title: "Our People. Our Strength.",
    description:
      "At Shalimar Corp, our people are our partners in success. With a strong and dedicated team of over 1,500 personnel, we believe that our collective knowledge, expertise and commitment drive every achievement. Their dedication has helped us build a growing base of satisfied customers, whose trust remains invaluable to us.",
  },

  journey: {
    eyebrow: "Our Journey",
    title: "Beyond Buildings.",
    highlight: "Building a Legacy.",
    description:
      "Since 1988, Shalimar has developed residential apartments, residential enclaves, modern offices, showrooms, software facilities and multi-storey complexes. Through the Shalimar name, the Group continues its journey of contributing to the built environment and creating spaces for generations to come.",
    actions: [
      {
        label: "Discover Our Projects",
        href: "/projects",
        variant: "primary",
      },
      {
        label: "Connect With Us",
        href: "/contact",
        variant: "secondary",
      },
    ],
  },

  footer: {
    location: "Headquartered in Lucknow, Uttar Pradesh, India",
    brand: "Shalimar Corp Limited",
    tagline: "Since 1988",
  },
} as const;
