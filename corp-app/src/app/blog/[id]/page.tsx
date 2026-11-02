import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogDetail from "@/components/pages/blog-details";
import {
  getBlogById,
  getPublishedBlogs,
} from "@/data/blogs";

export const instant = false;

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return getPublishedBlogs().map((blog) => ({
    id: blog.id,
  }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { id } = await params;
  const blog = getBlogById(id);

  if (!blog || blog.status !== "published") {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.excerpt,
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.excerpt,
      type: "article",
      publishedTime: new Date(
        `${blog.publishedAt}T00:00:00`
      ).toISOString(),
      authors: [blog.author],
      tags: blog.tags,
      url: `/blog/${blog.id}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: BlogPageProps) {
  const { id } = await params;

  const blog = getBlogById(id);

  if (!blog || blog.status !== "published") {
    notFound();
  }

  const relatedBlogs = getPublishedBlogs()
    .filter((item) => item.id !== blog.id)
    .sort((a, b) => {
      const aMatch = a.category === blog.category ? 1 : 0;
      const bMatch = b.category === blog.category ? 1 : 0;

      return bMatch - aMatch;
    })
    .slice(0, 3);

  return (
    <BlogDetail
      blog={blog}
      relatedBlogs={relatedBlogs}
    />
  );
}