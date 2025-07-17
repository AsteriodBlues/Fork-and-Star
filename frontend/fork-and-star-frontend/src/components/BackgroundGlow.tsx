"use client";

import { motion } from "framer-motion";

export default function BackgroundGlow() {
  return (
    <>
      <motion.div
        className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 opacity-20 blur-3xl"
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 opacity-20 blur-3xl"
        animate={{
          x: [0, -15, 15, 0],
          y: [0, 15, -15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
