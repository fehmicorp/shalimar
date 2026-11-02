"use client";

import { useEffect } from "react";
import { captureUTMData } from "@/lib/utm-tracker";

export default function UTMProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    captureUTMData();
  }, []);

  return children;
}