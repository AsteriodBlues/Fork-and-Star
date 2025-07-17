"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function RouteTransitionLoader() {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true);

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1200); // Duration of your loader

    return () => clearTimeout(timer);
  }, [pathname]);

  return showLoader ? <Loader /> : null;
}