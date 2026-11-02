import type { Metadata } from "next";

import BlogDashboard from "@/components/pages/blog-dashboard";
import { getPublishedBlogs } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Stories & Insights",
  description:
    "Explore the latest articles, insights and perspectives from Shalimar Corp on real estate, architecture, modern living and company developments.",
};

export default function BlogPage() {
  const blogs = getPublishedBlogs();

  return <BlogDashboard blogs={blogs} />;
}