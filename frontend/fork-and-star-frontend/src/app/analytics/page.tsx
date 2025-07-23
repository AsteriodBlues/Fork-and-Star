"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, Globe, Leaf, Award, DollarSign, Map, 
  ChefHat, Sparkles, Target, BarChart3, PieChart,
  Users, Calendar, Zap, Filter, Download, Share2,
  ArrowUp, ArrowDown, Minus, Eye, MapPin, Star, RefreshCw
} from "lucide-react";

// Import your real API functions (add this line)
import { 
  fetchAnalyticsOverview,
  fetchAllAnalyticsData
} from "@/utils/api";

// Mock data generators for demo
const generateCuisineData = () => [
  { name: "New Nordic", count: 45, growth: 15.3, sustainability: 92, avgStars: 2.8, color: "#60a5fa" },
  { name: "Molecular", count: 38, growth: 8.7, sustainability: 71, avgStars: 2.9, color: "#f472b6" },
  { name: "Japanese", count: 127, growth: 12.1, sustainability: 85, avgStars: 2.4, color: "#fbbf24" },
  { name: "French", count: 89, growth: 3.2, sustainability: 68, avgStars: 2.7, color: "#a78bfa" },
  { name: "Mediterranean", count: 76, growth: 18.5, sustainability: 89, avgStars: 2.2, color: "#34d399" },
  { name: "Plant-Based", count: 52, growth: 34.8, sustainability: 96, avgStars: 2.1, color: "#10b981" }
];

const generateMarketGaps = () => [
  { region: "Nordic Fine Dining", opportunity: 94, investment: 2.4, cuisines: ["New Nordic", "Scandinavian"], coords: [25, 75] },
  { region: "Asian Fusion Hub", opportunity: 87, investment: 3.1, cuisines: ["Japanese", "Korean", "Thai"], coords: [75, 25] },
  { region: "Sustainable Coastal", opportunity: 82, investment: 1.8, cuisines: ["Seafood", "Mediterranean"], coords: [15, 45] },
  { region: "Urban Plant-Based", opportunity: 78, investment: 1.2, cuisines: ["Vegan", "Raw"], coords: [65, 65] },
  { region: "Molecular Gastronomy", opportunity: 85, investment: 4.5, cuisines: ["Molecular", "Experimental"], coords: [45, 15] }
];

const generateSustainabilityTrends = () => [
  { country: "Denmark", score: 94, growth: 12.3, restaurants: 23, trend: "up" },
  { country: "Sweden", score: 91, growth: 8.7, restaurants: 18, trend: "up" },
  { country: "Norway", score: 89, growth: 15.2, restaurants: 14, trend: "up" },
  { country: "Netherlands", score: 86, growth: 6.9, restaurants: 31, trend: "up" },
  { country: "Germany", score: 83, growth: 4.1, restaurants: 42, trend: "stable" },
  { country: "France", score: 78, growth: 2.8, restaurants: 67, trend: "down" }
];

const generateAwardsData = () => [
  { award: "Michelin Stars", total: 127, newThisYear: 8, category: "michelin" },
  { award: "World's 50 Best", total: 45, newThisYear: 3, category: "worlds50" },
  { award: "Green Star", total: 32, newThisYear: 12, category: "green" },
  { award: "Bib Gourmand", total: 89, newThisYear: 15, category: "bib" }
];

const MetricCard = ({
  icon: Icon,
  title,
  value,
  change,
  subtitle,
  color = "blue",
  large = false
}: {
  icon: React.ComponentType<{ className?: string }>,
  title: string,
  value: React.ReactNode,
  change?: number,
  subtitle?: string,
  color?: string,
  large?: boolean
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Define color schemes for each type
  const colorSchemes = {
    blue: {
      gradient: "from-blue-500 to-cyan-400",
      bgGradient: "from-blue-500/20 via-cyan-500/10 to-blue-500/20",
      iconBg: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
      glowColor: "shadow-blue-500/50",
      particles: "bg-blue-400"
    },
    purple: {
      gradient: "from-purple-500 to-pink-400",
      bgGradient: "from-purple-500/20 via-pink-500/10 to-purple-500/20",
      iconBg: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400",
      glowColor: "shadow-purple-500/50",
      particles: "bg-purple-400"
    },
    yellow: {
      gradient: "from-yellow-500 to-orange-400",
      bgGradient: "from-yellow-500/20 via-orange-500/10 to-yellow-500/20",
      iconBg: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-400",
      glowColor: "shadow-yellow-500/50",
      particles: "bg-yellow-400"
    },
    green: {
      gradient: "from-green-500 to-emerald-400",
      bgGradient: "from-green-500/20 via-emerald-500/10 to-green-500/20",
      iconBg: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400",
      glowColor: "shadow-green-500/50",
      particles: "bg-green-400"
    }
  };
  
  const scheme = colorSchemes[color as keyof typeof colorSchemes] || colorSchemes.blue;
  
  return (
    <motion.div
      className={`${large ? 'col-span-2' : ''} relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl cursor-pointer group`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${scheme.bgGradient} opacity-0 group-hover:opacity-100`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Floating particles */}
      <AnimatePresence>
        {isHovered && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 ${scheme.particles} rounded-full opacity-70`}
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: 0,
                  y: 0
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, Math.random() * 40 - 20],
                  y: [0, Math.random() * 40 - 20],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
      
      {/* Glowing border effect */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${scheme.gradient} opacity-0 blur-sm`}
        animate={{ 
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.01 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main content container */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          {/* Icon with enhanced animations */}
          <motion.div 
            className={`p-3 rounded-xl bg-gradient-to-r ${scheme.iconBg} relative overflow-hidden`}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {/* Icon glow effect */}
            <motion.div
              className={`absolute inset-0 rounded-xl bg-gradient-to-r ${scheme.gradient} opacity-0`}
              animate={{ opacity: isHovered ? 0.3 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                rotateY: isHovered ? 180 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <Icon className={`w-6 h-6 ${scheme.iconColor} relative z-10`} />
            </motion.div>
            
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              initial={{ x: '-100%' }}
              animate={{ x: isHovered ? '100%' : '-100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
          
          {/* Change indicator with enhanced styling */}
          {change && (
            <motion.div 
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                change > 0 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                change < 0 ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              }`}
              whileHover={{ scale: 1.05 }}
              animate={{ 
                y: isHovered ? -2 : 0,
                boxShadow: isHovered ? "0 8px 25px rgba(0,0,0,0.3)" : "0 0px 0px rgba(0,0,0,0)"
              }}
            >
              <motion.div
                animate={{ 
                  y: change > 0 ? [0, -2, 0] : change < 0 ? [0, 2, 0] : 0
                }}
                transition={{ 
                  duration: 1,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                {change > 0 ? <ArrowUp className="w-3 h-3" /> :
                 change < 0 ? <ArrowDown className="w-3 h-3" /> :
                 <Minus className="w-3 h-3" />}
              </motion.div>
              <motion.span
                animate={{ 
                  scale: isHovered ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 0.5 }}
              >
                {Math.abs(change)}%
              </motion.span>
            </motion.div>
          )}
        </div>
        
        {/* Text content with enhanced animations */}
        <motion.div className="space-y-1">
          <motion.p 
            className="text-gray-400 text-sm font-medium"
            animate={{ 
              color: isHovered ? "#e5e7eb" : "#9ca3af"
            }}
          >
            {title}
          </motion.p>
          
          <motion.p 
            className={`${large ? 'text-3xl' : 'text-2xl'} font-bold text-white`}
            animate={{ 
              scale: isHovered ? 1.05 : 1,
              textShadow: isHovered ? "0 0 20px rgba(255,255,255,0.5)" : "0 0 0px rgba(255,255,255,0)"
            }}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.p>
          
          {subtitle && (
            <motion.p 
              className="text-gray-500 text-xs"
              animate={{ 
                opacity: isHovered ? 1 : 0.7,
                y: isHovered ? 0 : 2
              }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
      
      {/* Ripple effect on click */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${scheme.gradient}`}
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 0, opacity: 0 }}
        whileTap={{ 
          scale: 1.5, 
          opacity: [0.5, 0],
          transition: { duration: 0.4 }
        }}
      />
      
      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${isHovered ? 'rgba(255,255,255,0.1)' : 'transparent'}, transparent)`,
          filter: 'blur(1px)'
        }}
        animate={{
          x: isHovered ? ['-100%', '100%'] : '-100%'
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

type CuisineData = {
  name: string;
  count: number;
  growth: number;
  sustainability: number;
  avgStars: number;
  color: string;
};

const CuisineAnalytics = ({ data }: { data: CuisineData[] }) => {
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Cuisine Intelligence</h3>
          <p className="text-gray-400 text-sm">Authentic vs fusion categorization</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            <Filter className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            <Download className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((cuisine, index) => (
          <motion.div
            key={cuisine.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedCuisine(selectedCuisine === cuisine.name ? null : cuisine.name)}
            className={`relative overflow-hidden rounded-xl p-4 cursor-pointer transition-all duration-300 ${
              selectedCuisine === cuisine.name 
                ? 'bg-white/20 scale-105 shadow-2xl' 
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-20" style={{
              background: `linear-gradient(135deg, ${cuisine.color}40, transparent)`
            }} />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white text-sm">{cuisine.name}</h4>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cuisine.color }} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Restaurants</span>
                  <span className="text-white font-medium">{cuisine.count}</span>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Growth</span>
                  <span className={`font-medium ${cuisine.growth > 10 ? 'text-green-400' : 'text-yellow-400'}`}>
                    +{cuisine.growth}%
                  </span>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Sustainability</span>
                  <span className="text-white font-medium">{cuisine.sustainability}%</span>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Avg Stars</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">{cuisine.avgStars}</span>
                  </div>
                </div>
              </div>

              {/* Sustainability bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cuisine.sustainability}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    className="h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

type MarketGap = {
  region: string;
  opportunity: number;
  investment: number;
  cuisines: string[];
  coords: number[];
};

const MarketGapHeatmap = ({ gaps }: { gaps: MarketGap[] }) => {
  const [selectedGap, setSelectedGap] = useState<number | null>(null);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Market Gap Analysis</h3>
          <p className="text-gray-400 text-sm">Investment opportunity heatmap</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            High Opportunity
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            Medium
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Emerging
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Heatmap Grid */}
        <div className="relative w-full h-80 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
          
          {gaps.map((gap, index) => {
            const [x, y] = gap.coords;
            const size = Math.max(20, gap.investment * 8);
            const opacity = gap.opportunity / 100;
            
            return (
              <motion.div
                key={gap.region}
                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                animate={{ 
                    scale: 1, 
                    opacity: opacity,
                    rotate: 0
                }}
                whileHover={{ 
                    scale: 1.2,
                    rotate: 10,
                    transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                    delay: index * 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                }}
                className="absolute cursor-pointer"
                style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)'
                }}
                onClick={() => setSelectedGap(selectedGap === index ? null : index)}
                >
                <motion.div
                    className={`rounded-full transition-all duration-500 shadow-lg ${
                    selectedGap === index ? 'ring-4 ring-white/50 shadow-2xl' : ''
                    }`}
                    style={{
                    width: size,
                    height: size,
                    background: gap.opportunity > 85 ? 
                        'linear-gradient(135deg, #ef4444, #dc2626)' :
                        gap.opportunity > 75 ?
                        'linear-gradient(135deg, #f59e0b, #d97706)' :
                        'linear-gradient(135deg, #10b981, #059669)'
                    }}
                    animate={{
                    boxShadow: [
                        "0 0 0px rgba(255,255,255,0.3)",
                        "0 0 20px rgba(255,255,255,0.6)",
                        "0 0 0px rgba(255,255,255,0.3)"
                    ]
                    }}
                    transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                    }}
                />
                
                {/* Pulse effect */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                    background: gap.opportunity > 85 ? 
                        'rgba(239, 68, 68, 0.4)' :
                        gap.opportunity > 75 ?
                        'rgba(245, 158, 11, 0.4)' :
                        'rgba(16, 185, 129, 0.4)'
                    }}
                    animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0, 0.8]
                    }}
                    transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.4
                    }}
                />
                
                <AnimatePresence>
                  {selectedGap === index && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/90 border border-white/20 rounded-lg p-3 min-w-48 z-20 shadow-2xl"
                        style={{
                            // Smart positioning: show above if near bottom, below if near top
                            top: y > 70 ? 'auto' : '100%',
                            bottom: y > 70 ? '100%' : 'auto',
                            marginTop: y > 70 ? 0 : '8px',
                            marginBottom: y > 70 ? '8px' : 0
                            
                    }}
                >
                      <h4 className="font-semibold text-white text-sm mb-1">{gap.region}</h4>
                      <div className="space-y-1 text-xs text-gray-300">
                        <div className="flex justify-between">
                          <span>Opportunity:</span>
                          <span className="text-white font-medium">{gap.opportunity}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Investment:</span>
                          <span className="text-white font-medium">${gap.investment}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cuisines:</span>
                          <span className="text-white font-medium">{gap.cuisines.length}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {gap.cuisines.map((cuisine: string, i: number) => (
                          <span key={i} className="px-1.5 py-0.5 bg-white/20 rounded text-xs text-white">
                            {cuisine}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Grid lines for reference */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gap Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {gaps.slice(0, 3).map((gap, index) => (
          <motion.div
            key={gap.region}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="bg-white/5 rounded-lg p-3"
          >
            <h4 className="font-medium text-white text-sm mb-1">{gap.region}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Target className="w-3 h-3" />
              {gap.opportunity}% opportunity
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

type SustainabilityTrend = {
  country: string;
  score: number;
  growth: number;
  restaurants: number;
  trend: string;
};

const SustainabilityDashboard = ({ trends }: { trends: SustainabilityTrend[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Sustainability Rankings</h3>
          <p className="text-gray-400 text-sm">Country sustainability scores & trends</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
          <Leaf className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm font-medium">Green Focus</span>
        </div>
      </div>

      <div className="space-y-3">
        {trends.map((country: { country: string; score: number; growth: number; restaurants: number; trend: string }, index: number) => (
          <motion.div
            key={country.country}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center text-white text-sm font-bold">
              {index + 1}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white">{country.country}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-lg">{country.score}</span>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    country.trend === 'up' ? 'bg-green-500/20 text-green-400' :
                    country.trend === 'down' ? 'bg-red-500/20 text-red-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {country.trend === 'up' ? <ArrowUp className="w-3 h-3" /> :
                     country.trend === 'down' ? <ArrowDown className="w-3 h-3" /> :
                     <Minus className="w-3 h-3" />}
                    {country.growth}%
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>{country.restaurants} restaurants</span>
                <div className="flex-1 bg-gray-700 rounded-full h-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${country.score}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    className="h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

type AwardData = {
  award: string;
  total: number;
  newThisYear: number;
  category: string;
};

const AwardsShowcase = ({ awards }: { awards: AwardData[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Awards & Recognition</h3>
          <p className="text-gray-400 text-sm">Michelin stars & prestigious awards tracking</p>
        </div>
        <Award className="w-6 h-6 text-yellow-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {awards.map((award, index) => (
          <motion.div
            key={award.award}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 border border-white/10"
          >
            <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-xl ${
              award.category === 'michelin' ? 'bg-red-500/30' :
              award.category === 'worlds50' ? 'bg-purple-500/30' :
              award.category === 'green' ? 'bg-green-500/30' :
              'bg-yellow-500/30'
            }`} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${
                  award.category === 'michelin' ? 'bg-red-500' :
                  award.category === 'worlds50' ? 'bg-purple-500' :
                  award.category === 'green' ? 'bg-green-500' :
                  'bg-yellow-500'
                }`} />
                <h4 className="font-semibold text-white text-sm">{award.award}</h4>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">{award.total}</div>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-gray-400">New this year:</span>
                  <span className="text-green-400 font-medium">+{award.newThisYear}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default function AnalyticsDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [timeRange, setTimeRange] = useState("12m");
  
  // Real API Data States
  type AnalyticsOverview = {
    totalRestaurants: number;
    totalCuisines: number;
    totalCountries: number;
    avgStarRating: number;
    totalClusters: number;
  };

  type AnalyticsData = {
    overview: AnalyticsOverview;
    cuisineData: CuisineData[];
    marketGaps: MarketGap[];
    sustainabilityTrends: SustainabilityTrend[];
    awardsData: AwardData[];
  };

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch real data from API
  const fetchRealData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔄 Fetching real analytics data...");
      
      const data = await fetchAllAnalyticsData();
      setAnalyticsData(data);
      setLastUpdated(new Date());
      
      console.log("✅ Real analytics data loaded:", data);
    } catch (err) {
      console.error("❌ Failed to fetch analytics:", err);
      setError(typeof err === "object" && err !== null && "message" in err ? (err as { message: string }).message : String(err));
      
      // Use fallback mock data if API fails
      setAnalyticsData({
        overview: { totalRestaurants: 2847, totalCuisines: 156, totalCountries: 67, avgStarRating: 2.3, totalClusters: 8 },
        cuisineData: generateCuisineData(),
        marketGaps: generateMarketGaps(),
        sustainabilityTrends: generateSustainabilityTrends(),
        awardsData: generateAwardsData()
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Manual refresh function
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchRealData();
    setRefreshing(false);
  }, [fetchRealData]);

  // Load data on component mount
  useEffect(() => {
    fetchRealData();
  }, [fetchRealData]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchRealData, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, [fetchRealData]);

  // Extract data with fallbacks
  const overview: AnalyticsOverview = analyticsData?.overview || {
    totalRestaurants: 0,
    totalCuisines: 0,
    totalCountries: 0,
    avgStarRating: 0,
    totalClusters: 0
  };
  const cuisineData = analyticsData?.cuisineData || [];
  const marketGaps = analyticsData?.marketGaps || [];
  const sustainabilityTrends = analyticsData?.sustainabilityTrends || [];
  const awardsData = analyticsData?.awardsData || [];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  // Show loading state
  // Replace your loading screen with this Awwwards-level loader

// Helper component for typewriter effect
const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentText];
      
      if (!isDeleting) {
        setDisplayText(current.substring(0, displayText.length + 1));
        
        if (displayText === current) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(current.substring(0, displayText.length - 1));
        
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentText((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentText, texts]);

  return (
    <span className="inline-block min-h-[1.5rem]">
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-6 bg-purple-400 ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
};

// Helper component for loading percentage
const LoadingPercentage = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        const increment = Math.random() * 15 + 5;
        const newValue = Math.min(prev + increment, 100);
        
        if (newValue === 100) {
          clearInterval(interval);
        }
        
        return newValue;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3">
      <motion.div
        className="text-4xl font-bold text-white"
        animate={{ 
          textShadow: [
            "0 0 10px rgba(147,51,234,0.5)",
            "0 0 20px rgba(147,51,234,0.8)",
            "0 0 10px rgba(147,51,234,0.5)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {Math.floor(percentage)}%
      </motion.div>
      
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full"
          style={{ width: `${percentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// Show loading state
if (loading && !analyticsData) {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Dynamic background grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-pink-900/20" />
        
        {/* Animated grid */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating data particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Advanced loading spinner */}
        <div className="relative mb-8">
          {/* Outer rotating ring */}
          <motion.div
            className="w-32 h-32 border-2 border-transparent rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #7c3aed, #ec4899, #06b6d4, #7c3aed)',
              padding: '2px'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full bg-black rounded-full" />
          </motion.div>
          
          {/* Inner pulsing core */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Orbiting dots */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white rounded-full shadow-lg"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
              }}
              animate={{
                rotate: [0, 360],
                x: [40, 40],
                y: [0, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "linear"
              }}
            />
          ))}
          
          {/* Data visualization rings */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-purple-500/20 rounded-full"
              style={{
                width: 40 + i * 20,
                height: 40 + i * 20,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Loading text with typewriter effect */}
        <motion.div className="text-center space-y-4">
          <motion.h2
            className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Analytics Intelligence
          </motion.h2>
          
          <motion.div
            className="text-lg text-gray-300 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <TypewriterText 
              texts={[
                "Loading Real Analytics...",
                "Processing Restaurant Data...",
                "Analyzing Cuisine Trends...",
                "Computing Market Insights...",
                "Generating Intelligence..."
              ]}
            />
          </motion.div>
          
          {/* Progress indicators */}
          <motion.div
            className="flex gap-2 justify-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {['Restaurants', 'Cuisines', 'Markets', 'Insights'].map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10"
                animate={{ 
                  backgroundColor: ['rgba(255,255,255,0.05)', 'rgba(147,51,234,0.2)', 'rgba(255,255,255,0.05)']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-purple-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
                <span className="text-xs text-gray-400">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Loading percentage */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <LoadingPercentage />
        </motion.div>
      </div>

      {/* Scanning line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"
        style={{ width: '2px' }}
        animate={{
          x: [-10, window.innerWidth + 10],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

  return (
    <div className="relative z-10 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2">
            Analytics Intelligence
          </h1>
          <div className="flex items-center gap-4 text-gray-400">
            <span>Data-driven insights and business intelligence for culinary excellence</span>
            {lastUpdated && (
              <div className="flex items-center gap-2 text-sm">
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : 'bg-green-500'}`} />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>

          <div className="flex items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm backdrop-blur-sm"
            >
              <option value="1m" className="bg-gray-900">1 Month</option>
              <option value="3m" className="bg-gray-900">3 Months</option>
              <option value="6m" className="bg-gray-900">6 Months</option>
              <option value="12m" className="bg-gray-900">12 Months</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all">
              <Share2 className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 text-red-300">
              <span className="text-sm">⚠️ API Error: {error} (Using fallback data)</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-xs bg-red-500/20 px-2 py-1 rounded hover:bg-red-500/30 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 overflow-x-auto pb-4 mt-8 px-1">
  {[
    { id: "overview", label: "Overview", icon: BarChart3, gradient: "from-blue-500 to-cyan-400" },
    { id: "cuisine", label: "Cuisine Intelligence", icon: ChefHat, gradient: "from-purple-500 to-pink-400" },
    { id: "market", label: "Market Gaps", icon: Target, gradient: "from-orange-500 to-red-400" },
    { id: "sustainability", label: "Sustainability", icon: Leaf, gradient: "from-green-500 to-emerald-400" },
    { id: "awards", label: "Awards", icon: Award, gradient: "from-yellow-500 to-orange-400" },
    { id: "value", label: "Value Analysis", icon: DollarSign, gradient: "from-indigo-500 to-purple-400" }
  ].map((section, index) => (
    <motion.button
      key={section.id}
      onClick={() => setActiveSection(section.id)}
      className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 whitespace-nowrap overflow-hidden ${
        activeSection === section.id
          ? 'bg-white/15 text-white shadow-2xl scale-105'
          : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white hover:scale-102'
      }`}
      whileHover={{ 
        scale: activeSection === section.id ? 1.05 : 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
        activeSection === section.id ? 'opacity-20' : ''
      }`} />
      
      {/* Glowing border effect */}
      {activeSection === section.id && (
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${section.gradient} opacity-30 blur-sm`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Icon with gradient */}
      <div className={`relative z-10 p-2 rounded-xl transition-all duration-300 ${
        activeSection === section.id 
          ? `bg-gradient-to-r ${section.gradient} shadow-lg` 
          : 'bg-white/10 group-hover:bg-white/20'
      }`}>
        <section.icon className={`w-4 h-4 transition-colors duration-300 ${
          activeSection === section.id ? 'text-white' : 'text-gray-300 group-hover:text-white'
        }`} />
      </div>
      
      {/* Label with enhanced typography */}
      <span className="relative z-10 font-medium tracking-wide">
        {section.label}
      </span>
      
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      
      {/* Active indicator dot */}
      {activeSection === section.id && (
        <motion.div
          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r ${section.gradient} shadow-lg`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  ))}
</div>
      </motion.div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="space-y-6"
        >
          {/* Overview Metrics */}
          {activeSection === "overview" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  icon={Globe}
                  title="Total Restaurants"
                  value={overview.totalRestaurants?.toLocaleString() || "Loading..."}
                  change={12.3}
                  subtitle={`Across ${overview.totalCountries || "..."} countries`}
                  color="blue"
                />
                <MetricCard
                  icon={ChefHat}
                  title="Cuisines Tracked"
                  value={overview.totalCuisines?.toString() || "Loading..."}
                  change={8.7}
                  subtitle="Including fusion styles"
                  color="purple"
                />
                <MetricCard
                  icon={Star}
                  title="Avg Star Rating"
                  value={overview.avgStarRating?.toString() || "Loading..."}
                  change={5.2}
                  subtitle="Global average"
                  color="yellow"
                />
                <MetricCard
                  icon={Target}
                  title="Quality Clusters"
                  value={overview.totalClusters?.toString() || "Loading..."}
                  change={3.8}
                  subtitle="ML-powered groupings"
                  color="green"
                />
                <MetricCard
                  icon={Leaf}
                  title="Sustainability Score"
                  value="84.2%"
                  change={15.6}
                  subtitle="Global average"
                  color="green"
                />
                <MetricCard
                  icon={Award}
                  title="Michelin Stars"
                  value="1,247"
                  change={3.8}
                  subtitle="Active recognitions"
                  color="yellow"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CuisineAnalytics data={cuisineData} />
                <MarketGapHeatmap gaps={marketGaps} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SustainabilityDashboard trends={sustainabilityTrends} />
                <AwardsShowcase awards={awardsData} />
              </div>
            </>
          )}

          {/* Cuisine Intelligence */}
          {activeSection === "cuisine" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                  icon={Globe}
                  title="Global Cuisines"
                  value="156"
                  change={8.7}
                  subtitle="Active cuisine types"
                  color="blue"
                />
                <MetricCard
                  icon={Sparkles}
                  title="Fusion Restaurants"
                  value="23%"
                  change={18.3}
                  subtitle="Of total establishments"
                  color="purple"
                />
                <MetricCard
                  icon={TrendingUp}
                  title="Fastest Growing"
                  value="Plant-Based"
                  change={34.8}
                  subtitle="YoY growth rate"
                  color="green"
                />
              </div>

              <CuisineAnalytics data={cuisineData} />

              {/* Regional Variations */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
              >
                <h3 className="text-xl font-bold text-white mb-4">Regional Cuisine Variations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { region: "Nordic Europe", signature: "New Nordic", variations: 12, trend: 15.3 },
                    { region: "East Asia", signature: "Japanese", variations: 18, trend: 12.1 },
                    { region: "Mediterranean", signature: "Italian", variations: 24, trend: 6.8 },
                    { region: "North America", signature: "Contemporary American", variations: 16, trend: 9.2 },
                    { region: "South America", signature: "Peruvian", variations: 8, trend: 22.5 },
                    { region: "Middle East", signature: "Levantine", variations: 10, trend: 18.7 }
                  ].map((region, index) => (
                    <motion.div
                      key={region.region}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
                    >
                      <h4 className="font-semibold text-white mb-2">{region.region}</h4>
                      <p className="text-sm text-gray-400 mb-3">Signature: {region.signature}</p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">{region.variations} variations</span>
                        <span className="text-green-400 font-medium">+{region.trend}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Chef Spotlights */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
              >
                <h3 className="text-xl font-bold text-white mb-4">Chef Spotlight & Stories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "René Redzepi",
                      restaurant: "Noma",
                      cuisine: "New Nordic",
                      innovation: "Foraging & Fermentation",
                      impact: 94,
                      story: "Revolutionized Nordic cuisine with local foraging and innovative fermentation techniques."
                    },
                    {
                      name: "Grant Achatz",
                      restaurant: "Alinea",
                      cuisine: "Molecular Gastronomy",
                      innovation: "Sensory Dining",
                      impact: 91,
                      story: "Pioneered multi-sensory dining experiences that challenge traditional food presentation."
                    },
                    {
                      name: "Virgilio Martínez",
                      restaurant: "Central",
                      cuisine: "Peruvian",
                      innovation: "Altitude Cuisine",
                      impact: 89,
                      story: "Maps Peru's biodiversity through altitude-based tasting menus showcasing endemic ingredients."
                    },
                    {
                      name: "Ana Roš",
                      restaurant: "Hiša Franko",
                      cuisine: "Slovenian",
                      innovation: "Alpine Terroir",
                      impact: 86,
                      story: "Self-taught chef transforming Slovenian cuisine with innovative Alpine ingredient combinations."
                    }
                  ].map((chef, index) => (
                    <motion.div
                      key={chef.name}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{chef.name}</h4>
                          <p className="text-sm text-gray-400">{chef.restaurant}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-white">{chef.impact}%</div>
                          <div className="text-xs text-gray-400">Impact Score</div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Cuisine:</span>
                          <span className="text-white">{chef.cuisine}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Innovation:</span>
                          <span className="text-white">{chef.innovation}</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed">{chef.story}</p>

                      <div className="mt-3 w-full bg-gray-700 rounded-full h-1">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${chef.impact}%` }}
                          transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                          className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}

          {/* Market Analysis Section */}
          {activeSection === "market" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard
                  icon={Target}
                  title="High Opportunity Zones"
                  value="12"
                  change={25.0}
                  subtitle="Investment ready"
                  color="blue"
                />
                <MetricCard
                  icon={DollarSign}
                  title="Total Investment Potential"
                  value="$47.2M"
                  change={18.5}
                  subtitle="Identified opportunities"
                  color="green"
                />
                <MetricCard
                  icon={MapPin}
                  title="Underserved Markets"
                  value="8"
                  change={33.3}
                  subtitle="Geographic gaps"
                  color="purple"
                />
                <MetricCard
                  icon={TrendingUp}
                  title="ROI Projection"
                  value="156%"
                  change={12.8}
                  subtitle="3-year average"
                  color="yellow"
                />
              </div>

              <MarketGapHeatmap gaps={marketGaps} />
            </>
          )}

          {/* Sustainability Section */}
          {activeSection === "sustainability" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                  icon={Leaf}
                  title="Global Green Score"
                  value="84.2%"
                  change={15.6}
                  subtitle="Average sustainability"
                  color="green"
                />
                <MetricCard
                  icon={TrendingUp}
                  title="Green Growth Rate"
                  value="28.5%"
                  change={22.1}
                  subtitle="YoY improvement"
                  color="green"
                />
                <MetricCard
                  icon={Award}
                  title="Green Star Awards"
                  value="127"
                  change={35.8}
                  subtitle="Michelin Green Stars"
                  color="green"
                />
              </div>

              <SustainabilityDashboard trends={sustainabilityTrends} />
            </>
          )}

          {/* Awards Section */}
          {activeSection === "awards" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard
                  icon={Award}
                  title="Total Awards"
                  value="1,247"
                  change={8.3}
                  subtitle="Active recognitions"
                  color="yellow"
                />
                <MetricCard
                  icon={Star}
                  title="Michelin Stars"
                  value="567"
                  change={12.1}
                  subtitle="1★ 2★ 3★ combined"
                  color="yellow"
                />
                <MetricCard
                  icon={Globe}
                  title="World's 50 Best"
                  value="50"
                  change={6.0}
                  subtitle="Current ranking"
                  color="purple"
                />
                <MetricCard
                  icon={Leaf}
                  title="Green Stars"
                  value="127"
                  change={35.8}
                  subtitle="Sustainability awards"
                  color="green"
                />
              </div>

              <AwardsShowcase awards={awardsData} />
            </>
          )}

          {/* Value Analysis Section */}
          {activeSection === "value" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard
                  icon={DollarSign}
                  title="Best Value Score"
                  value="92.5%"
                  change={7.8}
                  subtitle="Quality/price ratio"
                  color="green"
                />
                <MetricCard
                  icon={Target}
                  title="Sweet Spot Range"
                  value="$85-150"
                  change={12.3}
                  subtitle="Optimal price point"
                  color="blue"
                />
                <MetricCard
                  icon={Sparkles}
                  title="Luxury Tier"
                  value="$350+"
                  change={5.2}
                  subtitle="Premium experiences"
                  color="purple"
                />
                <MetricCard
                  icon={Users}
                  title="Accessibility Score"
                  value="76.8%"
                  change={15.6}
                  subtitle="Inclusive dining"
                  color="yellow"
                />
              </div>

              {/* Value Analysis Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
              >
                <h3 className="text-xl font-bold text-white mb-4">Price-Quality Optimization Matrix</h3>
                <div className="relative w-full h-96 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl overflow-hidden">
                  {/* Matrix content placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📊</div>
                      <h4 className="text-xl font-bold text-white mb-2">Value Analysis Matrix</h4>
                      <p className="text-gray-400">Price vs Quality scatter plot visualization</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}