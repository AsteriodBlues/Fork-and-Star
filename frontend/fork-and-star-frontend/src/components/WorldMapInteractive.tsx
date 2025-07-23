"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, TrendingUp, Utensils, Star, Globe, ChevronRight } from "lucide-react";
import useSound from "use-sound";
import Link from "next/link";

interface CountryData {
  id: string;
  name: string;
  restaurantCount: number;
  averageStars: number;
  topCuisines: string[];
  momentum: number;
  flag: string;
  coordinates: { x: number; y: number };
}

const worldCountries: CountryData[] = [
  {
    id: "usa",
    name: "United States",
    restaurantCount: 1247,
    averageStars: 2.3,
    topCuisines: ["Contemporary American", "French", "Japanese"],
    momentum: 8.7,
    flag: "🇺🇸",
    coordinates: { x: 25, y: 45 }
  },
  {
    id: "france",
    name: "France", 
    restaurantCount: 892,
    averageStars: 2.8,
    topCuisines: ["French", "Mediterranean", "Modern European"],
    momentum: 7.2,
    flag: "🇫🇷",
    coordinates: { x: 52, y: 38 }
  },
  {
    id: "japan",
    name: "Japan",
    restaurantCount: 734,
    averageStars: 2.9,
    topCuisines: ["Japanese", "Sushi", "Modern Japanese"],
    momentum: 9.1,
    flag: "🇯🇵",
    coordinates: { x: 85, y: 42 }
  },
  {
    id: "italy",
    name: "Italy",
    restaurantCount: 623,
    averageStars: 2.4,
    topCuisines: ["Italian", "Modern Italian", "Regional Italian"],
    momentum: 6.8,
    flag: "🇮🇹",
    coordinates: { x: 54, y: 46 }
  },
  {
    id: "spain",
    name: "Spain",
    restaurantCount: 445,
    averageStars: 2.1,
    topCuisines: ["Spanish", "Basque", "Catalan"],
    momentum: 7.5,
    flag: "🇪🇸",
    coordinates: { x: 48, y: 48 }
  },
  {
    id: "uk",
    name: "United Kingdom",
    restaurantCount: 387,
    averageStars: 2.2,
    topCuisines: ["Modern British", "European", "Contemporary"],
    momentum: 6.4,
    flag: "🇬🇧",
    coordinates: { x: 50, y: 35 }
  },
  {
    id: "germany",
    name: "Germany",
    restaurantCount: 298,
    averageStars: 2.0,
    topCuisines: ["German", "Modern European", "International"],
    momentum: 5.9,
    flag: "🇩🇪",
    coordinates: { x: 55, y: 36 }
  },
  {
    id: "denmark",
    name: "Denmark",
    restaurantCount: 156,
    averageStars: 3.1,
    topCuisines: ["New Nordic", "Danish", "Scandinavian"],
    momentum: 9.3,
    flag: "🇩🇰",
    coordinates: { x: 55, y: 32 }
  },
  {
    id: "australia",
    name: "Australia",
    restaurantCount: 234,
    averageStars: 1.8,
    topCuisines: ["Modern Australian", "Asian Fusion", "Contemporary"],
    momentum: 6.1,
    flag: "🇦🇺",
    coordinates: { x: 82, y: 75 }
  },
  {
    id: "singapore",
    name: "Singapore",
    restaurantCount: 189,
    averageStars: 2.6,
    topCuisines: ["Singaporean", "Chinese", "Southeast Asian"],
    momentum: 8.2,
    flag: "🇸🇬",
    coordinates: { x: 78, y: 62 }
  }
];

export default function WorldMapInteractive() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  
  const [playHover] = useSound("/sounds/click.wav", { volume: 0.2 });
  const [playSelect] = useSound("/sounds/ding.wav", { volume: 0.4 });

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCountryHover = (country: CountryData) => {
    setHoveredCountry(country);
    playHover();
  };

  const handleCountrySelect = (country: CountryData) => {
    setSelectedCountry(country);
    playSelect();
  };

  const getMomentumColor = (momentum: number) => {
    if (momentum >= 9) return "from-red-400 to-red-600";
    if (momentum >= 7) return "from-orange-400 to-orange-600";
    if (momentum >= 5) return "from-yellow-400 to-yellow-600";
    return "from-green-400 to-green-600";
  };

  const getCountrySize = (restaurantCount: number) => {
    if (restaurantCount >= 1000) return "w-6 h-6";
    if (restaurantCount >= 500) return "w-5 h-5";
    if (restaurantCount >= 200) return "w-4 h-4";
    return "w-3 h-3";
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
            className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
          >
            <Globe className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Global Restaurant Map
          </h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore culinary excellence across the globe. Click on any country to dive deep into their restaurant scene.
        </p>
      </motion.div>

      {/* World Map Container */}
      <div className="relative">
        <motion.div
          ref={mapRef}
          className="relative w-full h-96 bg-gradient-to-br from-gray-900/50 via-black/50 to-gray-900/50 rounded-3xl border border-blue-500/30 overflow-hidden backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* World Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
          
          {/* Animated Grid Lines */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px"
            }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Country Markers */}
          {worldCountries.map((country, index) => (
            <motion.div
              key={country.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${country.coordinates.x}%`,
                top: `${country.coordinates.y}%`
              }}
              initial={{ 
                scale: 0, 
                opacity: 0,
                rotate: -180
              }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotate: 0
              }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              onMouseEnter={() => handleCountryHover(country)}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountrySelect(country)}
              whileHover={{ scale: 1.2, zIndex: 50 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Pulsing Ring */}
              <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${getMomentumColor(country.momentum)}`}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
                style={{
                  width: "32px",
                  height: "32px",
                  marginLeft: "-16px",
                  marginTop: "-16px"
                }}
              />

              {/* Country Marker */}
              <motion.div
                className={`relative ${getCountrySize(country.restaurantCount)} rounded-full bg-gradient-to-r ${getMomentumColor(country.momentum)} flex items-center justify-center shadow-lg border-2 border-white/20 backdrop-blur-sm`}
                animate={isAnimating ? {
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360]
                } : {}}
                transition={{ delay: index * 0.1, duration: 1 }}
              >
                <span className="text-white text-xs font-bold">
                  {country.flag}
                </span>
              </motion.div>

              {/* Hover Tooltip */}
              <AnimatePresence>
                {hoveredCountry?.id === country.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/90 text-white p-3 rounded-lg backdrop-blur-sm border border-white/20 min-w-48 z-50"
                  >
                    <div className="text-sm font-bold text-center mb-1">
                      {country.name}
                    </div>
                    <div className="text-xs text-gray-300 space-y-1">
                      <div className="flex justify-between">
                        <span>Restaurants:</span>
                        <span className="text-yellow-400">{country.restaurantCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Stars:</span>
                        <span className="text-yellow-400">{country.averageStars}⭐</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Momentum:</span>
                        <span className="text-red-400">{country.momentum}/10</span>
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Floating Stats */}
          <motion.div
            className="absolute top-6 left-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-black/70 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-white text-sm space-y-1">
                <div className="font-bold text-yellow-400">Global Stats</div>
                <div>🏆 {worldCountries.reduce((acc, c) => acc + c.restaurantCount, 0)} Restaurants</div>
                <div>⭐ {(worldCountries.reduce((acc, c) => acc + c.averageStars, 0) / worldCountries.length).toFixed(1)} Avg Stars</div>
                <div>🔥 {worldCountries.length} Countries</div>
              </div>
            </div>
          </motion.div>

          {/* Legend */}
          <motion.div
            className="absolute bottom-6 right-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="bg-black/70 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-white text-xs space-y-2">
                <div className="font-bold text-blue-400 mb-2">Momentum Scale</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600"></div>
                  <span>9-10 (Explosive)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-600"></div>
                  <span>7-8 (High)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                  <span>5-6 (Medium)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                  <span>0-4 (Steady)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Country Selection Panel */}
        <AnimatePresence>
          {selectedCountry && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mt-8 bg-gradient-to-br from-gray-900/80 via-black/80 to-gray-900/80 rounded-2xl border border-purple-500/30 p-6 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{selectedCountry.flag}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {selectedCountry.name}
                    </h3>
                    <p className="text-gray-400">
                      Culinary destination with {selectedCountry.restaurantCount} restaurants
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-black/40 rounded-xl p-4 border border-yellow-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Utensils className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300 text-sm">Restaurants</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {selectedCountry.restaurantCount.toLocaleString()}
                  </div>
                </div>

                <div className="bg-black/40 rounded-xl p-4 border border-yellow-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300 text-sm">Average Stars</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {selectedCountry.averageStars}⭐
                  </div>
                </div>

                <div className="bg-black/40 rounded-xl p-4 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-red-400" />
                    <span className="text-gray-300 text-sm">Momentum</span>
                  </div>
                  <div className="text-2xl font-bold text-red-400">
                    {selectedCountry.momentum}/10
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Popular Cuisines
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCountry.topCuisines.map((cuisine, index) => (
                    <span
                      key={cuisine}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={`/explore/country/${selectedCountry.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all group"
              >
                <span>Explore {selectedCountry.name}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}