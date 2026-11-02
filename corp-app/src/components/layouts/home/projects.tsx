"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useProjectsStore } from "@/store/projects"
import ProjectBookshelf from "./projects/bookshelf"
import CenteredLogoDivider from "./projects/divider"
import ProjectHeaderInsight from "./projects/header"
import Image from "next/image"
import { ProjectItems } from "@/store/projectslist"

export default function ProjectsSection() {
  const { currentIndex } = useProjectsStore();
  const activeProject = ProjectItems[currentIndex] || ProjectItems[0];
  return (
    <section id="projects" className="pt-12 relative min-h-screen w-full text-stone-900 flex flex-col justify-top overflow-hidden select-none">
      <div className="absolute right-0 top-0 z-0 w-full h-full backdrop-blur-[2px] bg-white/20">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0 w-full h-full"
          >
            <Image
              src={activeProject.image}
              alt={activeProject.title}
              fill
              loading="eager"
              priority
              sizes="100vw"
              className="object-cover opacity-20 filter blur-[2px]"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <ProjectHeaderInsight />
      <ProjectBookshelf />
    </section>
  )
}