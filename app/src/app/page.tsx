
import HeroSection from "@/components/layouts/hero";
import HomeSection from "@/components/layouts/home";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Introducing Shalimar - Building Dreams, Creating Legacies",
  description:
    "Discover Shalimar, a leading property builder in Lucknow. Explore our diverse projects, from residential to commercial spaces, and learn about our commitment to quality and innovation.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main id="main-content" className="relative min-h-screen w-full bg-amber-950">
      <HeroSection />
      <HomeSection />
    </main>
  );
}