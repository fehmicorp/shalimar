"use client";

import { useHeroStore } from "@/store/hero";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/ui/header";

const HIDE_HEADER_ROUTES: string[] = [
];

const HIDE_HEADER_PREFIXES: string[] = [
  "/certificates/",
  "/reports/",
  "/blog/"
];

// Array of actual RegExp objects
const HIDE_HEADER_REGEX: RegExp[] = [
  /^\/career\/JD[^\/]+\/apply\/?$/
];

export default function HeaderWrapper() {
  const pathname = usePathname();
  const { isDismissed, headerVisible, setHeaderVisible, setIsDismissed, setCanScroll } = useHeroStore();

  useEffect(() => {
    const hidden = sessionStorage.getItem("hero_hidden");
    if (hidden === "true") {
      setIsDismissed(true);
      setCanScroll(true);
      setHeaderVisible(true);
    }
  }, [setIsDismissed, setCanScroll, setHeaderVisible]);

  const isHiddenRoute =
    HIDE_HEADER_ROUTES.includes(pathname) ||
    HIDE_HEADER_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    HIDE_HEADER_REGEX.some((regex) => regex.test(pathname));

  if (isHiddenRoute || (!isDismissed && !headerVisible)) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <Header />
    </motion.div>
  );
}