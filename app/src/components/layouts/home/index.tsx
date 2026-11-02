import { BlogDataList } from "@/store/blog";
import BannerSection from "./banner";
import BlogSection from "./blog";
import BrandingSection from "./braning";
import CounterSection from "./counter";
import ProjectsSection from "./projects";

export default function HomeSection() {
  return (
    <div className="relative z-20 bg-white w-full scroll-y-auto">
      <BannerSection />
      <CounterSection />
      <ProjectsSection />
      <BrandingSection />
      <BlogSection blogs={BlogDataList} />
    </div>
  );
}