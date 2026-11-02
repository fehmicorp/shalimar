import type { Metadata } from "next";
import CareerDashboard from "@/components/career/career-dashboard";

export const metadata: Metadata = {
  title: "Build Your Career with Shalimar",
  description:
    "Explore career opportunities at Shalimar Corp. Discover open positions and take the next step in your professional journey.",
  alternates: {
    canonical: "/career",
  },
};

export default function CareerPage() {
  return <CareerDashboard />;
}