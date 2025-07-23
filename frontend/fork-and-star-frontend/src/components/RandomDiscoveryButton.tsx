"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dice6, Sparkles, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import useSound from "use-sound";

interface RandomDiscoveryButtonProps {
  onDiscover: () => void;
  isLoading?: boolean;
}

export default function RandomDiscoveryButton({ onDiscover, isLoading = false }: RandomDiscoveryButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [playMagic] = useSound("/sounds/ding.wav", { volume: 0.6 });
  const [playClick] = useSound("/sounds/click.wav", { volume: 0.4 });

  const handleClick = () => {
    if (isLoading) return;
    
    setIsAnimating(true);
    playClick();
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8, x: 0.9 }
    });
    
    // Play magic sound after short delay
    setTimeout(() => {
      playMagic();
      onDiscover();
    }, 300);
    
    // Reset animation
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <motion.div
      className="fixed bottom-24 right-8 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        delay: 0.5 
      }}
    >
      {/* Pulse Ring Effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Button */}
      <motion.button
        onClick={handleClick}
        disabled={isLoading}
        className="relative w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 shadow-2xl border-2 border-white/20 backdrop-blur-sm overflow-hidden group disabled:opacity-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isAnimating ? { 
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1]
        } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1,
          }}
        />

        {/* Button Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <RefreshCw className="w-6 h-6 text-white animate-spin" />
              </motion.div>
            ) : (
              <motion.div
                key="dice"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center"
              >
                <motion.div
                  animate={isAnimating ? { 
                    rotate: [0, 360, 720],
                    scale: [1, 0.8, 1.2, 1]
                  } : {
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={isAnimating ? {
                    duration: 0.8,
                    ease: "easeInOut"
                  } : {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Dice6 className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Sparkles */}
        <motion.div
          className="absolute -top-1 -right-1"
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.5,
          }}
        >
          <Sparkles className="w-3 h-3 text-yellow-300" />
        </motion.div>

        <motion.div
          className="absolute -bottom-1 -left-1"
          animate={{
            scale: [0, 1, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.3,
          }}
        >
          <Sparkles className="w-2 h-2 text-pink-300" />
        </motion.div>
      </motion.button>

      {/* Tooltip */}
      <motion.div
        className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm"
        initial={{ y: 10, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
      >
        Surprise me!
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
      </motion.div>
    </motion.div>
  );
}