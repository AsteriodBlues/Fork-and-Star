"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Brain, Sparkles, TrendingUp } from "lucide-react";
import { fetchRestaurantExplanation } from "@/utils/api";
import useSound from "use-sound";

interface ExplainabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
  restaurantData: {
    name: string;
    cuisine: string;
    country: string;
    momentum_score?: number;
    reputation?: string;
  };
}

export default function ExplainabilityModal({
  isOpen,
  onClose,
  restaurantName,
  restaurantData,
}: ExplainabilityModalProps) {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [playClose] = useSound("/sounds/click.wav", { volume: 0.3 });

  useEffect(() => {
    if (isOpen && restaurantName) {
      setLoading(true);
      fetchRestaurantExplanation(restaurantName)
        .then((data) => {
          setExplanation(data.explanation || "No explanation available for this restaurant.");
        })
        .catch(() => {
          setExplanation("Unable to load explanation at this time.");
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, restaurantName]);

  const handleClose = () => {
    playClose();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-black via-gray-900 to-black shadow-2xl">
              {/* Floating Background Elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-r from-yellow-400/10 to-pink-500/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 transition-all z-10 backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="relative p-6 pb-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <div className="p-2 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                    AI Analysis
                  </h2>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                >
                  <h3 className="text-xl font-bold text-white mb-1">
                    {restaurantData.name}
                  </h3>
                  <p className="text-gray-300">
                    {restaurantData.cuisine} • {restaurantData.country}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    {restaurantData.momentum_score && (
                      <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                        <TrendingUp className="w-4 h-4" />
                        {restaurantData.momentum_score.toFixed(1)} momentum
                      </div>
                    )}
                    {restaurantData.reputation && (
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                        {restaurantData.reputation}
                      </span>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative p-6 pt-2 max-h-96 overflow-y-auto">
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 rounded-full border-4 border-yellow-500/30 border-t-yellow-500 mb-4"
                    />
                    <p className="text-gray-400 text-center">
                      Analyzing restaurant data...
                      <br />
                      <span className="text-sm">Using advanced AI algorithms</span>
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {/* AI Explanation Quote */}
                    <div className="relative mb-6">
                      <div className="absolute -left-2 -top-2 text-4xl text-yellow-500/50 font-serif">
                        "
                      </div>
                      <div className="absolute -right-2 -bottom-2 text-4xl text-yellow-500/50 font-serif rotate-180">
                        "
                      </div>
                      
                      <div className="bg-gradient-to-r from-yellow-500/10 via-transparent to-pink-500/10 rounded-2xl p-6 border border-yellow-500/20">
                        <p className="text-gray-200 leading-relaxed text-lg italic font-light">
                          {explanation}
                        </p>
                      </div>
                    </div>

                    {/* Attribution */}
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center justify-between pt-4 border-t border-gray-700"
                    >
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Brain className="w-4 h-4" />
                        <span>Fork & Star AI Engine</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Powered by machine learning
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>

              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-500/20 via-pink-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}