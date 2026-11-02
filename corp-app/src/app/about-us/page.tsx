
import type { Metadata } from "next";
import AboutUsPage from "@/components/pages/about-us";

export const metadata: Metadata = {
  title: "Our Story | Shalimar Corp Limited",
  description:
    "Discover Shalimar Corp's journey since 1988, our business portfolio, vision, mission and commitment to building better lifestyles.",
};

export default function AboutPage() {
  return <AboutUsPage />;
}
