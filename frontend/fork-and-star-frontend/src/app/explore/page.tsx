"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import RestaurantCard from "@/components/RestaurantCard";
import SkeletonCard from "@/components/SkeletonCard";
import TrendingCarousel from "@/components/TrendingCarousel";
import RandomDiscoveryButton from "@/components/RandomDiscoveryButton";
import AdvancedFilters from "@/components/AdvancedFilters";
import WorldMapInteractive from "@/components/WorldMapInteractive";
import BackendStatusChecker from "@/components/BackendStatusChecker";
import { fetchRestaurants, fetchFilteredRestaurants } from "@/utils/api";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundGlow from "@/components/BackgroundGlow";
import WorldGlobe from "@/components/WorldGlobe";

interface Restaurant {
  id?: any;
  name?: string;
  city?: string;
  country?: string;
  cuisine?: string;
  stars?: number;
  image_url?: string;
  awards?: any;
  source_lists?: any;
  momentum_score?: number;
  reputation?: string;
  badges?: string;
  final_score?: number;
}

interface FilterResults {
  restaurants: Restaurant[];
  total_results: number;
  page: number;
  limit: number;
  message?: string;
}

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function useParallax(offset = 50) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const translateY = Math.min(offset, Math.max(-offset, rect.top / 10));
        ref.current.style.transform = `translateY(${translateY}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);
  return ref;
}

export default function ExplorePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [discoveryLoading, setDiscoveryLoading] = useState(false);
  const [filterResults, setFilterResults] = useState<FilterResults | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedCity, setSelectedCity] = useState("All");
  const [currentFilters, setCurrentFilters] = useState<any>({});
  const [filterError, setFilterError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');

  // Debounce filter changes to prevent too many API calls
  const debouncedFilters = useDebounce(currentFilters, 500);

  // Ref for cancel controller to abort ongoing requests
  const abortControllerRef = useRef<AbortController | null>(null);

  // Smart city mapping function
  const mapGlobeCityToData = useCallback((globeCity: string): string[] => {
    // Map globe cities to actual cities/countries in your data
    const cityMapping: { [key: string]: string[] } = {
      "San Francisco": ["San Francisco", "Yountville", "Healdsburg", "Napa"],
      "New York": ["New York", "Brooklyn", "Manhattan"],
      "Tokyo": ["Tokyo"],
      "Paris": ["Paris", "Menton"],
      "Chicago": ["Chicago"],
      "London": ["London", "Bray"],
      "Copenhagen": ["Copenhagen"],
      "Barcelona": ["Barcelona"],
      "Rome": ["Rome", "Roma", "Modena"], // Added multiple variations
      "Los Angeles": ["Los Angeles", "Beverly Hills", "West Hollywood"]
    };

    return cityMapping[globeCity] || [globeCity];
  }, []);

  // Enhanced filtering logic
  const displayRestaurants = useMemo(() => {
    if (isFiltering) {
      return filterResults?.restaurants || [];
    }
    
    if (selectedCity === "All") {
      return restaurants;
    }
    
    // Use smart city mapping for globe selection
    const mappedCities = mapGlobeCityToData(selectedCity);
    const filtered = restaurants.filter(r => {
      // Check city matches
      const cityMatch = mappedCities.some(city => 
        r.city?.toLowerCase().includes(city.toLowerCase())
      );
      
      // Check country matches (fallback)
      const countryMatch = mappedCities.some(city => 
        r.country?.toLowerCase().includes(city.toLowerCase())
      );
      
      // For cities like "Rome", also check if country is "Italy"
      let regionMatch = false;
      if (selectedCity === "Rome" && r.country?.toLowerCase().includes("italy")) {
        regionMatch = true;
      }
      if (selectedCity === "Paris" && r.country?.toLowerCase().includes("france")) {
        regionMatch = true;
      }
      if (selectedCity === "Tokyo" && r.country?.toLowerCase().includes("japan")) {
        regionMatch = true;
      }
      if (selectedCity === "London" && r.country?.toLowerCase().includes("kingdom")) {
        regionMatch = true;
      }
      if (selectedCity === "Barcelona" && r.country?.toLowerCase().includes("spain")) {
        regionMatch = true;
      }
      
      return cityMatch || countryMatch || regionMatch;
    });
    
    console.log(`🔍 Filtering for "${selectedCity}":`, {
      mappedCities,
      totalRestaurants: restaurants.length,
      filteredCount: filtered.length,
      sampleMatches: filtered.slice(0, 3).map(r => ({ name: r.name, city: r.city, country: r.country }))
    });
    
    return filtered;
  }, [isFiltering, filterResults?.restaurants, restaurants, selectedCity, mapGlobeCityToData]);

  // Debug logging for restaurant data
  useEffect(() => {
    if (restaurants.length > 0) {
      const uniqueCities = [...new Set(restaurants.map(r => r.city).filter(Boolean))].sort();
      const uniqueCountries = [...new Set(restaurants.map(r => r.country).filter(Boolean))].sort();
      
      console.log("🏙️ Available cities:", uniqueCities);
      console.log("🌍 Available countries:", uniqueCountries);
      console.log("🎯 Currently selected:", selectedCity);
      console.log("📊 Display restaurants count:", displayRestaurants.length);
      
      // Sample data structure
      if (restaurants.length > 0) {
        console.log("📋 Sample restaurant data:", {
          name: restaurants[0].name,
          city: restaurants[0].city,
          country: restaurants[0].country,
          cuisine: restaurants[0].cuisine
        });
      }
    }
  }, [restaurants, selectedCity, displayRestaurants.length]);

  // Load initial restaurants
  useEffect(() => {
    fetchRestaurants()
      .then((data) => {
        console.log("🍽️ Fetched restaurants:", data?.length);
        setRestaurants(data);
        setLoading(false);
        setBackendStatus('connected');
      })
      .catch((error) => {
        console.error("Failed to load restaurants", error);
        setLoading(false);
        if (error.message.includes('connect') || error.message.includes('timeout')) {
          setBackendStatus('disconnected');
        } else {
          setBackendStatus('connected'); // API is working but returned an error
        }
      });
  }, []);

  // Optimized filter API call function
  const executeFilters = useCallback(async (filters: any, signal: AbortSignal) => {
    try {
      const apiFilters = {
        cuisine: filters.cuisine !== "All" ? filters.cuisine : undefined,
        country: filters.country !== "All" ? filters.country : undefined,
        reputation: filters.reputation !== "All" ? filters.reputation : undefined,
        min_stars: filters.min_stars !== 0 ? filters.min_stars : undefined,
        max_stars: filters.max_stars !== 3 ? filters.max_stars : undefined,
        badge: filters.badge !== "All" ? filters.badge : undefined,
        limit: 20,
      };

      const results = await fetchFilteredRestaurants(apiFilters);
      
      if (signal.aborted) return;
      
      setFilterResults(results);
      setFilterError(null);
    } catch (error: any) {
      if (signal.aborted) return;
      
      console.error("Filter error:", error);
      setFilterError("Failed to load filtered results. Please try again.");
      setFilterResults({
        restaurants: [],
        total_results: 0,
        page: 1,
        limit: 20,
        message: "Error loading filtered results"
      });
    }
  }, []);

  // Handle debounced filter changes
  useEffect(() => {
    const hasActiveFilters = Object.entries(debouncedFilters).some(([key, value]) => {
      if (key.includes("stars")) {
        return key === "min_stars" ? value !== 0 : value !== 3;
      }
      return value !== "All" && value !== "";
    });

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (!hasActiveFilters) {
      setIsFiltering(false);
      setFilterResults(null);
      setFiltersLoading(false);
      setFilterError(null);
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setFiltersLoading(true);
    setIsFiltering(true);
    setFilterError(null);

    executeFilters(debouncedFilters, controller.signal)
      .finally(() => {
        if (!controller.signal.aborted) {
          setFiltersLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [debouncedFilters, executeFilters]);

  const handleFiltersChange = useCallback((filters: any) => {
    setCurrentFilters(filters);
  }, []);

  const handleRandomDiscovery = async () => {
    setDiscoveryLoading(true);
    try {
      const newRestaurants = await fetchRestaurants();
      setRestaurants(newRestaurants);
      setIsFiltering(false);
      setFilterResults(null);
      setCurrentFilters({});
      setSelectedCity("All");
      setFilterError(null);
    } catch (error) {
      console.error("Discovery failed:", error);
    } finally {
      setDiscoveryLoading(false);
    }
  };

  // Enhanced city selection handler
  const handleCitySelect = useCallback((city: string) => {
    console.log("🌍 Globe city selected:", city);
    setSelectedCity(city);
    
    // Reset filters when selecting city
    setIsFiltering(false);
    setFilterResults(null);
    setCurrentFilters({});
    setFilterError(null);
  }, []);

  const isDisplayLoading = loading || filtersLoading;
  const parallaxRef = useParallax(30);
  const isTyping = JSON.stringify(currentFilters) !== JSON.stringify(debouncedFilters);

  return (
    <div className="relative min-h-screen bg-black">
      <div className="fixed inset-0 z-0">
        <BackgroundGlow />
      </div>

      <div className="relative z-10 p-4 flex flex-col items-center overflow-x-hidden">
        
        <motion.h1
          ref={parallaxRef}
          className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-8 text-center relative z-20"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          🍽️ Explore Restaurants
        </motion.h1>

        {/* Backend Status Indicator */}
        {backendStatus === 'disconnected' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 max-w-2xl mx-auto"
          >
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 text-yellow-300">
                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-sm">
                  Backend disconnected - showing cached data. Some features may be limited.
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Trending Carousel */}
        <div className="w-full max-w-7xl mb-8 relative z-20">
          <TrendingCarousel />
        </div>

        {/* Interactive World Map Section */}
        <div className="w-full max-w-7xl mb-12 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <WorldMapInteractive />
          </motion.div>
        </div>

        {/* 3D World Globe Section */}
        <div className="w-full max-w-6xl mb-8 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-4"
          >
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              🌍 3D Globe View
            </h2>
            <p className="text-gray-400 text-center text-sm">
              Interactive 3D globe - click on cities to filter restaurants
            </p>
          </motion.div>
          
          <div className="relative">
            <WorldGlobe onSelectCountry={(countryId) => setSelectedCity(countryId)} />
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="w-full max-w-6xl mb-8 relative z-30">
          <AdvancedFilters 
            onFiltersChange={handleFiltersChange}
            isLoading={filtersLoading}
          />
        </div>

        {/* Results Summary */}
        <div className="w-full max-w-6xl mb-6 text-center relative z-20">
          {isFiltering && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-yellow-500/10 border border-purple-500/20 rounded-xl p-4 backdrop-blur-sm"
            >
              <div className="text-gray-300">
                {isTyping ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-yellow-500/30 border-t-yellow-500 animate-spin" />
                    <span>Updating filters...</span>
                  </div>
                ) : filtersLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 rounded-full border-2 border-purple-500/30 border-t-purple-500"
                    />
                    <span>Filtering restaurants...</span>
                  </div>
                ) : filterError ? (
                  <div className="text-red-400">
                    {filterError}
                  </div>
                ) : filterResults ? (
                  <div>
                    <span className="text-yellow-400 font-bold">
                      {filterResults.total_results} restaurants
                    </span>{" "}
                    found matching your filters
                    {filterResults.message && (
                      <div className="text-sm text-gray-400 mt-1">
                        {filterResults.message}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </motion.div>
          )}
          
          {!isFiltering && (
            <div className="text-gray-400">
              Showing <span className="text-yellow-400 font-bold">{displayRestaurants.length}</span> restaurants
              {selectedCity !== "All" && (
                <span> in <span className="text-green-400">{selectedCity}</span></span>
              )}
            </div>
          )}
        </div>

        {/* Restaurant Grid */}
        <div className="w-full max-w-7xl relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            <AnimatePresence mode="wait">
              {isDisplayLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={`skeleton-${i}`} />
                ))
              ) : displayRestaurants.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                  className="col-span-full text-center py-12"
                >
                  <div className="bg-gradient-to-br from-gray-900/40 via-black/40 to-gray-900/40 rounded-2xl border border-gray-700/50 p-8 backdrop-blur-sm">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-gray-300 mb-2">
                      No restaurants found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {isFiltering 
                        ? "Try adjusting your filters or clearing them to see more results"
                        : selectedCity !== "All"
                        ? `No restaurants found in ${selectedCity}. This might be because:`
                        : "Try changing the city selection or discover new restaurants"
                      }
                    </p>
                    {selectedCity !== "All" && (
                      <div className="text-sm text-gray-600 mb-4">
                        • The city name doesn't match exactly<br/>
                        • Restaurants might be listed under a different city<br/>
                        • Try clicking "All" to see all restaurants
                      </div>
                    )}
                    <button
                      onClick={() => setSelectedCity("All")}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 transition-all"
                    >
                      Show All Restaurants
                    </button>
                  </div>
                </motion.div>
              ) : (
                displayRestaurants.map((restaurant, index) => (
                  <motion.div
                    key={`${restaurant.id || index}-${restaurant.name || index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ 
                      duration: 0.4,
                      ease: "easeOut",
                      delay: Math.min(index * 0.02, 0.2)
                    }}
                    layout
                  >
                    <RestaurantCard
                      id={restaurant.id?.toString() || `restaurant-${index}`}
                      name={restaurant.name || "Unknown Restaurant"}
                      city={restaurant.city || restaurant.country || "Unknown Location"}
                      country={restaurant.country}
                      cuisine={restaurant.cuisine || "Unknown Cuisine"}
                      imageUrl={restaurant.image_url || `https://picsum.photos/400/300?sig=${restaurant.id || index}`}
                      stars={restaurant.stars}
                      momentum_score={restaurant.momentum_score}
                      reputation={restaurant.reputation}
                      badges={restaurant.badges}
                      final_score={restaurant.final_score}
                    />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Load More Button */}
        {isFiltering && filterResults && filterResults.restaurants.length > 0 && (
          <motion.div
            className="mt-8 relative z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 transition-all backdrop-blur-sm">
              Load More Results
            </button>
          </motion.div>
        )}

        <div className="h-24" />
      </div>

      {/* Random Discovery Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <RandomDiscoveryButton 
          onDiscover={handleRandomDiscovery}
          isLoading={discoveryLoading}
        />
      </div>

      {/* Backend Status Checker - Temporary Debug Component */}
      <BackendStatusChecker />
    </div>
  );
}