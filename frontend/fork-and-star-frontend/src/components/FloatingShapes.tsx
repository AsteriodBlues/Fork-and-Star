"use client";

import { motion } from "framer-motion";

export default function FloatingShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Main big morphing blob */}
      <motion.div
        className="absolute bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-500 opacity-20 blur-3xl mix-blend-screen rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          borderRadius: [
            "42% 58% 30% 70% / 42% 42% 58% 58%",
            "50% 50% 50% 50% / 50% 50% 50% 50%",
            "42% 58% 30% 70% / 42% 42% 58% 58%",
          ],
          rotate: [0, 360],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width: "55vw", height: "55vw", top: "-10%", left: "-15%" }}
      />

      {/* Secondary floating gradient blob */}
      <motion.div
        className="absolute bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 opacity-15 blur-2xl mix-blend-lighten rounded-full"
        animate={{
          scale: [1, 1.4, 1],
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "50% 50% 50% 50% / 50% 50% 50% 50%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
          rotate: [0, -360],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width: "50vw", height: "50vw", bottom: "-20%", right: "-15%" }}
      />

      {/* Smaller accent blob */}
      <motion.div
        className="absolute bg-gradient-to-bl from-purple-500 via-fuchsia-500 to-pink-500 opacity-10 blur-2xl mix-blend-screen rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          borderRadius: [
            "50% 50% 50% 50% / 50% 50% 50% 50%",
            "60% 40% 60% 40% / 40% 60% 40% 60%",
            "50% 50% 50% 50% / 50% 50% 50% 50%",
          ],
          rotate: [0, 180, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width: "30vw", height: "30vw", top: "30%", left: "35%" }}
      />
    </div>
  );
}