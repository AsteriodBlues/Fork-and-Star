"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="relative mb-6"
      >
        <div className="text-5xl md:text-6xl animate-pulse bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          🍽️✨
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-gray-300 text-sm tracking-wide"
      >
        Discover star-worthy dining, one fork at a time...
      </motion.p>

      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "80%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="h-1 mt-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-full shadow-lg"
      />
    </motion.div>
  );
}