"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, Star, MapPin, Utensils, Award, Sparkles, RotateCcw } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import { fetchFilterOptions } from "@/utils/api";
import useSound from "use-sound";

interface FilterOptions {
  cuisines: string[];
  countries: string[];
  reputations: string[];
  badges: string[];
  clusters: number[];
}

interface ActiveFilters {
  cuisine: string;
  country: string;
  reputation: string;
  min_stars: number;
  max_stars: number;
  badge: string;
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: ActiveFilters) => void;
  isLoading?: boolean;
}

export default function AdvancedFilters({ onFiltersChange, isLoading = false }: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [playFilter] = useSound("/sounds/click.wav", { volume: 0.3 });
  const [playClear] = useSound("/sounds/ding.wav", { volume: 0.4 });

  const [filters, setFilters] = useState<ActiveFilters>({
    cuisine: "All",
    country: "All", 
    reputation: "All",
    min_stars: 0,
    max_stars: 3,
    badge: "All",
  });

  useEffect(() => {
    fetchFilterOptions()
      .then(setFilterOptions)
      .catch(console.error)
      .finally(() => setLoadingOptions(false));
  }, []);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const updateFilter = (key: keyof ActiveFilters, value: string | number) => {
    playFilter();
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    playClear();
    setFilters({
      cuisine: "All",
      country: "All",
      reputation: "All", 
      min_stars: 0,
      max_stars: 3,
      badge: "All",
    });
  };

  const getActiveFilterCount = () => {
    return Object.entries(filters).filter(([key, value]) => 
      value !== "All" && !(key.includes("stars") && value === (key === "min_stars" ? 0 : 3))
    ).length;
  };

  const activeCount = getActiveFilterCount();

  return (
    <div className="w-full max-w-6xl mb-8">
      {/* Filter Toggle Button */}
      <motion.button
        onClick={() => {
          setIsExpanded(!isExpanded);
          playFilter();
        }}
        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 transition-all group backdrop-blur-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Filter className="w-5 h-5 text-purple-300" />
        </motion.div>
        
        <span className="text-purple-300 font-medium">
          Advanced Filters
        </span>

        {activeCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full"
          >
            {activeCount}
          </motion.div>
        )}

        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </motion.div>
      </motion.button>

      {/* Expanded Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-6 bg-gradient-to-br from-black/40 via-gray-900/40 to-black/40 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
              {loadingOptions ? (
                <div className="flex items-center justify-center py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 rounded-full border-4 border-purple-500/30 border-t-purple-500"
                  />
                  <span className="ml-3 text-gray-400">Loading filter options...</span>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Primary Filters Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                        <Utensils className="w-4 h-4 text-yellow-400" />
                        Cuisine
                      </label>
                      <CustomSelect
                        value={filters.cuisine}
                        onChange={(value) => updateFilter("cuisine", value)}
                        options={["All", ...((filterOptions?.cuisines || []).filter((c, i, arr) => c !== 'All' || arr.indexOf(c) === i))]}
                        placeholder="Select Cuisine"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                        <MapPin className="w-4 h-4 text-green-400" />
                        Country
                      </label>
                      <CustomSelect
                        value={filters.country}
                        onChange={(value) => updateFilter("country", value)}
                        options={["All", ...((filterOptions?.countries || []).filter((c, i, arr) => c !== 'All' || arr.indexOf(c) === i))]}
                        placeholder="Select Country"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                        <Award className="w-4 h-4 text-purple-400" />
                        Reputation
                      </label>
                      <CustomSelect
                        value={filters.reputation}
                        onChange={(value) => updateFilter("reputation", value)}
                        options={["All", ...((filterOptions?.reputations || []).filter((c, i, arr) => c !== 'All' || arr.indexOf(c) === i))]}
                        placeholder="Select Reputation"
                      />
                    </motion.div>
                  </div>

                  {/* Secondary Filters Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Star Rating Range */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-3"
                    >
                      <label className="flex items-center gap-2 text-sm text-gray-300">
                        <Star className="w-4 h-4 text-yellow-400" />
                        Star Rating Range
                      </label>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <label className="text-xs text-gray-400 mb-1 block">Min Stars</label>
                          <input
                            type="range"
                            min="0"
                            max="3"
                            step="1"
                            value={filters.min_stars}
                            onChange={(e) => updateFilter("min_stars", parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                          </div>
                        </div>

                        <span className="text-yellow-400 font-bold">to</span>

                        <div className="flex-1">
                          <label className="text-xs text-gray-400 mb-1 block">Max Stars</label>
                          <input
                            type="range"
                            min="0"
                            max="3"
                            step="1"
                            value={filters.max_stars}
                            onChange={(e) => updateFilter("max_stars", parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-sm">
                        <span className="text-gray-400">Selected:</span>
                        <span className="text-yellow-400 font-bold">
                          {filters.min_stars} - {filters.max_stars} stars
                        </span>
                      </div>
                    </motion.div>

                    {/* Badge Filter */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                        <Sparkles className="w-4 h-4 text-pink-400" />
                        Badge Type
                      </label>
                      <CustomSelect
                        value={filters.badge}
                        onChange={(value) => updateFilter("badge", value)}
                        options={["All", ...((filterOptions?.badges || []).filter((c, i, arr) => c !== 'All' || arr.indexOf(c) === i))]}
                        placeholder="Select Badge"
                      />
                    </motion.div>
                  </div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-between pt-4 border-t border-gray-700"
                  >
                    <div className="text-sm text-gray-400">
                      {activeCount > 0 ? (
                        <span>{activeCount} filter{activeCount !== 1 ? 's' : ''} active</span>
                      ) : (
                        <span>No filters applied</span>
                      )}
                    </div>

                    {activeCount > 0 && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearAllFilters}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition-all"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Clear All
                      </motion.button>
                    )}
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}