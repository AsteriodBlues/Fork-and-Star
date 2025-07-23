"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp, Flame, Info } from "lucide-react";
import { fetchTrendingRestaurants } from "@/utils/api";
import ExplainabilityModal from "@/components/ExplainabilityModal";
import useSound from "use-sound";

interface TrendingRestaurant {
  id: number;
  name: string;
  cuisine: string;
  country: string;
  stars?: number;
  momentum_score?: number;
  badges?: string;
  reputation?: string;
}

interface TrendingData {
  message: string;
  restaurants: TrendingRestaurant[];
}

export default function TrendingCarousel() {
  const [trendingData, setTrendingData] = useState<TrendingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [playSwipe] = useSound("/sounds/click.wav", { volume: 0.3 });
  const [playInfo] = useSound("/sounds/ding.wav", { volume: 0.4 });
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    fetchTrendingRestaurants(8)
      .then(setTrendingData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!trendingData?.restaurants.length) return;
    
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex(prev => 
        prev >= trendingData.restaurants.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [trendingData]);

  const handleExplain = () => {
    playInfo();
    setShowExplanation(true);
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
  };

  const handleNext = () => {
    if (!trendingData?.restaurants.length) return;
    playSwipe();
    setCurrentIndex(prev => 
      prev >= trendingData.restaurants.length - 1 ? 0 : prev + 1
    );
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
  };

  const handlePrev = () => {
    if (!trendingData?.restaurants.length) return;
    playSwipe();
    setCurrentIndex(prev => 
      prev <= 0 ? trendingData.restaurants.length - 1 : prev - 1
    );
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  };

  if (loading) {
    return (
      <div className="w-full h-96 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 animate-pulse" />
          <div className="h-8 w-48 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse" />
        </div>
        <div className="relative h-80 bg-black/20 rounded-3xl border border-yellow-500/20 animate-pulse" />
      </div>
    );
  }

  if (!trendingData?.restaurants.length) {
    return null;
  }

  const currentRestaurant = trendingData.restaurants[currentIndex];

  return (
    <div className="w-full max-w-7xl mb-12">
      {/* Header */}
      <motion.div 
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="p-2 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flame className="w-6 h-6 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
            Trending Now
          </h2>
        </div>
        <motion.p 
          className="text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {trendingData.message}
        </motion.p>
      </motion.div>

      {/* Main Carousel */}
      <div className="relative h-96 overflow-hidden rounded-3xl border border-yellow-500/30 shadow-2xl">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        {/* Floating Background Elements */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-r from-yellow-400/20 to-pink-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 flex items-center justify-between p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Restaurant Info */}
            <div className="flex-1 z-10">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-medium">
                    #{currentIndex + 1} Trending
                  </span>
                  {currentRestaurant.momentum_score && (
                    <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-medium">
                      {currentRestaurant.momentum_score.toFixed(1)} momentum
                    </span>
                  )}
                </div>
                
                <h3 className="text-4xl font-bold text-white mb-2">
                  {currentRestaurant.name}
                </h3>
                
                <p className="text-xl text-gray-300 mb-1">
                  {currentRestaurant.cuisine} • {currentRestaurant.country}
                </p>
                
                {currentRestaurant.reputation && (
                  <p className="text-yellow-400 text-sm font-medium">
                    {currentRestaurant.reputation}
                  </p>
                )}
              </motion.div>

              {/* Badges */}
              {currentRestaurant.badges && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {currentRestaurant.badges.split(',').map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30"
                    >
                      {badge.trim()}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Stars */}
              {currentRestaurant.stars && currentRestaurant.stars > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="flex items-center gap-1 mb-6"
                >
                  {Array.from({ length: currentRestaurant.stars }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="text-yellow-400 text-2xl"
                    >
                      ⭐
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* AI Explanation Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={handleExplain}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 rounded-full hover:from-purple-500/30 hover:to-pink-500/30 transition-all group"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="group-hover:animate-pulse"
                >
                  <Info className="w-4 h-4" />
                </motion.div>
                <span className="text-sm font-medium">Why is this trending?</span>
              </motion.button>
            </div>

            {/* Visual Element */}
            <motion.div
              className="w-80 h-64 relative"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-red-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="absolute inset-4 border-2 border-dashed border-yellow-400/30 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="text-6xl mb-4"
                    >
                      🍽️
                    </motion.div>
                    <p className="text-white/60 text-sm">
                      Restaurant #{currentRestaurant.id}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <button
          onClick={handlePrev}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 transition-all z-20 backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 transition-all z-20 backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {trendingData.restaurants.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                playSwipe();
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* AI Explainability Modal */}
      <ExplainabilityModal
        isOpen={showExplanation}
        onClose={() => setShowExplanation(false)}
        restaurantName={currentRestaurant.name}
        restaurantData={{
          name: currentRestaurant.name,
          cuisine: currentRestaurant.cuisine,
          country: currentRestaurant.country,
          momentum_score: currentRestaurant.momentum_score,
          reputation: currentRestaurant.reputation,
        }}
      />
    </div>
  );
}