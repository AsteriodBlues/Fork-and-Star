"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import MusicPlayer from "@/components/MusicPlayer";
import { Toaster } from "sonner";
import SoundLink from "@/components/SoundLink";
import CustomCursor from "@/components/CustomCursor"; // ✅ Import here

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <CustomCursor /> {/* ✅ Add the custom cursor globally here */}
      {loading && <Loader />}

      <header className="w-full p-6 flex justify-between items-center border-b border-yellow-500">
        <SoundLink href="/" className="text-xl font-bold text-yellow-500 flex items-center gap-2">
          🍽️ Fork & Star
        </SoundLink>
        <nav className="flex gap-6 text-sm font-medium">
          <SoundLink href="/explore" className="hover:text-yellow-500 transition">
            Explore
          </SoundLink>
          <SoundLink href="/favorites" className="hover:text-yellow-500 transition">
            Favorites
          </SoundLink>
        </nav>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className="w-full p-4 text-center text-gray-400 border-t border-yellow-500 bg-black/80">
        🍽️ Fork & Star — Discover star-worthy dining, one fork at a time.
        <br />
        Crafted with ❤️ & ramen noodles late at night.
        <br />
        © {new Date().getFullYear()} Fork & Star. All rights reserved.
      </footer>

      <MusicPlayer />
      <Toaster richColors position="top-center" />
    </>
  );
}