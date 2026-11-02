
import type { Metadata } from "next";
import OtherBusinessInterests from "@/components/pages/other-business-interests";

export const metadata: Metadata = {
  title: "Business Interests",
  description:
    "Explore Shalimar Corp's other business interests, including international import and export, flat glass processing and allied works.",
};

export default function OtherBusinessInterestsPage() {
  return <OtherBusinessInterests />;
}
