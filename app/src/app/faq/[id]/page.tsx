import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FAQPage from "@/components/pages/faq";
import { faqData, getFAQById } from "@/data/faqs";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const instant = false;

export function generateStaticParams() {
  return Object.values(faqData)
    .filter((faq) => faq.status === "published")
    .map((faq) => ({ id: faq.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const faq = getFAQById(id);

  if (!faq || faq.status !== "published") {
    return {
      title: "FAQ Not Found |",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: faq.metaTitle,
    description: faq.metaDescription,
    alternates: {
      canonical: `/faq/${faq.id}`,
    },
    openGraph: {
      title: faq.metaTitle,
      description: faq.metaDescription,
      type: "website",
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const faq = getFAQById(id);

  if (!faq || faq.status !== "published") {
    notFound();
  }

  return <FAQPage faq={faq} />;
}