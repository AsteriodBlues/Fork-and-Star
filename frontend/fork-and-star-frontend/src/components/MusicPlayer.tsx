"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={togglePlay}
        className={clsx(
          "rounded-full border border-yellow-500 bg-black/70 backdrop-blur px-6 py-3 flex items-center justify-center transition-all duration-300",
          isPlaying ? "shadow-yellow-500/40 shadow-lg" : ""
        )}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="wave"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="24"
                viewBox="0 0 60 24"
                fill="none"
              >
                <path
                  d="M1 12C6 2 10 22 15 12C20 2 24 22 29 12C34 2 38 22 43 12C48 2 52 22 57 12"
                  stroke="#facc15"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="h-0.5 w-16 bg-yellow-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <audio ref={audioRef} src="/audio/relaxing-piano.mp3" loop />
    </div>
  );
}