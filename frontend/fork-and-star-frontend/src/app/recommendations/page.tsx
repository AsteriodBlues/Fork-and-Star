"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Brain, Target, Zap, Info, Mic, MicOff } from "lucide-react";
import RestaurantCard from "@/components/RestaurantCard";
import SkeletonCard from "@/components/SkeletonCard";
import { fetchRecommendations, fetchRestaurants, searchRestaurants, fetchBackendHealth, fetchGeographicRecommendations } from "@/utils/api";
import useSound from "use-sound";
import BackgroundGlow from "@/components/BackgroundGlow";
import { useVoiceSearch } from "@/hooks/useVoiceSearch";

type Restaurant = {
  id?: string | number;
  name?: string;
  restaurant_name?: string;
  rec_name?: string;
  Base_Name?: string;
  cuisine?: string;
  rec_cuisine?: string;
  Base_Cuisine?: string;
  country?: string;
  city?: string;
  rec_country?: string;
  rec_city?: string;
  Base_Country?: string;
  Base_City?: string;
  reputation?: string;
  rec_reputation_label?: string;
  Base_Reputation_Label?: string;
  stars?: number;
  rec_star_rating?: number;
  Base_Star_Rating?: number;
  image_url?: string;
  momentum_score?: number;
  rec_momentum_score?: number;
  Base_Momentum_Score?: number;
  badges?: string[];
  rec_badge_list?: string[];
  Base_Badge_List?: string[];
  final_score?: number;
  final_inclusive_score?: number;
  similarity_score?: number;
};

export default function RecommendationsPage() {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [geographicData, setGeographicData] = useState<any>(null);
  const [selectedRadius, setSelectedRadius] = useState<number>(100);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [diversityMode, setDiversityMode] = useState<"similar" | "diverse">("similar");
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);

  // Sound effects
  const [playSearch] = useSound("/sounds/click.wav", { volume: 0.3 });
  const [playSelect] = useSound("/sounds/ding.wav", { volume: 0.4 });
  const [playGenerate] = useSound("/sounds/ding.wav", { volume: 0.6 });
  const [playVoice] = useSound("/sounds/ding.wav", { volume: 0.5 });

  // Function to fetch geographic recommendations
  const handleGeographicRecommendations = useCallback(async () => {
    if (!selectedRestaurant) return;
    
    try {
      const restaurantName = selectedRestaurant.name || selectedRestaurant.restaurant_name || selectedRestaurant.rec_name || selectedRestaurant.Base_Name || "";
      console.log(`Fetching geographic recommendations for: ${restaurantName} within ${selectedRadius}km`);
      
      const geoData = await fetchGeographicRecommendations(restaurantName, selectedRadius, 8);
      console.log("Geographic recommendations:", geoData);
      setGeographicData(geoData);
    } catch (error) {
      console.error("Failed to fetch geographic recommendations:", error);
    }
  }, [selectedRestaurant, selectedRadius]);

  // Auto-fetch geographic data when restaurant is selected
  useEffect(() => {
    if (selectedRestaurant) {
      handleGeographicRecommendations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRestaurant, selectedRadius]);
  const handleGenerateRecommendations = useCallback(async () => {
    if (!selectedRestaurant) return;
    
    setLoading(true);
    setError(null);
    playGenerate();
    
    try {
      const restaurantName =
        selectedRestaurant.name ||
        selectedRestaurant.restaurant_name ||
        selectedRestaurant.rec_name ||
        selectedRestaurant.Base_Name ||
        "";
      
      console.log(`Fetching ${diversityMode} recommendations for: ${restaurantName}`);
      
      const response = await fetchRecommendations(restaurantName, 10, diversityMode);
      
      console.log("Recommendations response:", response);
      setRecommendations(response);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      setError(`Failed to fetch recommendations: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setRecommendations(null);
    } finally {
      setLoading(false);
    }
  }, [selectedRestaurant, diversityMode, playGenerate]);

  useEffect(() => {
    // Check backend health on startup
    fetchBackendHealth().then(health => {
      console.log("Backend Health Check:", health);
    });
    
    fetchRestaurants().then((data) => {
      console.log("Fetched restaurants:", data?.length);
      setAllRestaurants(data || []);
    }).catch(error => {
      console.error("Failed to fetch restaurants:", error);
      setAllRestaurants([]);
    });
    
    setIsHydrated(true);
  }, []);

  const voiceSearchCallback = useMemo(() => (result: string) => {
    setSearchQuery(result); // Fixed: was setSearcquery if there was a typo
    playSearch();
  }, [playSearch]);

  const {
    isListening,
    transcript,
    error: voiceError,
    isSupported: isVoiceSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useVoiceSearch(voiceSearchCallback, 'en-US');

  const handleVoiceSearch = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
      playVoice();
    }
  }, [isListening, stopListening, startListening, resetTranscript, playVoice]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setSelectedRestaurant(null);
    setRecommendations(null);
    setError(null);
    
    // Immediately hide search results and clear them
    setShowSearchResults(false);
    setSearchResults([]);
    
    if (resetTranscript) resetTranscript();
  }, [resetTranscript]);

  // Enhanced search with better error handling
  useEffect(() => {
    // Don't search if there's already a selected restaurant with the same name
    if (selectedRestaurant) {
      const selectedName = selectedRestaurant.name || selectedRestaurant.restaurant_name || selectedRestaurant.rec_name || selectedRestaurant.Base_Name || "";
      if (searchQuery.trim().toLowerCase() === selectedName.toLowerCase()) { // Fixed: was searchquery
        setSearchResults([]);
        setShowSearchResults(false);
        return;
      }
    }

    if (!searchQuery.trim()) { // Fixed: was searchquery
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setSearchLoading(true);
      setError(null);
      
      try {
        console.log(`Searching for: ${searchQuery}`); // Fixed: was searchquery
        
        // Use the improved searchRestaurants function from api.ts
        const apiResults = await searchRestaurants(searchQuery, 8); // Fixed: was searchquery
        console.log("Search results:", apiResults);

        if (apiResults && apiResults.length > 0) {
          setSearchResults(apiResults);
        } else {
          // If no results, perform a final client-side search on fetched restaurants
          const filtered = [...allRestaurants].filter(restaurant => {
            const query = searchQuery.toLowerCase(); // Fixed: was searchquery
            const name = (restaurant.name || restaurant.restaurant_name || restaurant.rec_name || restaurant.Base_Name || "").toLowerCase();
            const cuisine = (restaurant.cuisine || restaurant.rec_cuisine || restaurant.Base_Cuisine || "").toLowerCase();
            const country = (restaurant.country || restaurant.rec_country || restaurant.Base_Country || "").toLowerCase();
            const city = (restaurant.city || restaurant.rec_city || restaurant.Base_City || "").toLowerCase();
            return name.includes(query) || cuisine.includes(query) || country.includes(query) || city.includes(query);
          }).slice(0, 8);
          setSearchResults(filtered);
        }

        setShowSearchResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setError("Search failed. Please try again.");
        setSearchResults([]);
        setShowSearchResults(false);
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, allRestaurants, selectedRestaurant]); // Fixed: was searchquery

  // Handler for Try button
  const handleTryButtonClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setSearchQuery(restaurant.name || restaurant.restaurant_name || ""); // Populate search bar for clarity
    setRecommendations(null);
    setError(null);
    
    // Immediately hide search results and clear them
    setShowSearchResults(false);
    setSearchResults([]);
    
    playSelect();
  };

  // Handler for selecting a restaurant from search results
  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setSearchQuery(restaurant.name || restaurant.restaurant_name || restaurant.rec_name || restaurant.Base_Name || "");
    setRecommendations(null);
    setError(null);
    
    // Immediately hide search results and clear them
    setShowSearchResults(false);
    setSearchResults([]);
    
    playSelect();
  };

  const handleMoreLikeThis = useCallback((restaurant: Restaurant) => {
    const restaurantName = restaurant.name || restaurant.rec_name || restaurant.Base_Name || "";
    
    // Set as selected restaurant and generate similar recommendations
    setSelectedRestaurant(restaurant);
    setSearchQuery(restaurantName); // Fixed: was setSearcquery
    setDiversityMode("similar"); // Force similar mode for "More Like This"
    setRecommendations(null);
    setShowSearchResults(false);
    setSearchResults([]);
    setError(null);
    
    playSelect();
    
    // Auto-generate recommendations after a short delay
    setTimeout(() => {
      handleGenerateRecommendations();
    }, 100);
  }, [handleGenerateRecommendations, playSelect]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="fixed inset-0 z-0">
        <BackgroundGlow />
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
              AI Restaurant Recommendations
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover your next favorite restaurant with our advanced AI recommendation engine. 
            Get personalized suggestions based on cuisine, ambiance, and dining preferences.
          </p>
        </motion.div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 text-red-300">
                <span className="text-sm">⚠️ {error}</span>
                <button 
                  onClick={() => setError(null)}
                  className="ml-auto text-xs bg-red-500/20 px-2 py-1 rounded hover:bg-red-500/30 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Section */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  playSearch();
                }}
                placeholder="Search for a restaurant you love... (try 'Noma', 'Alinea', 'French Laundry')"
                className="w-full pl-12 pr-24 py-4 bg-gradient-to-r from-gray-900/80 via-black/80 to-gray-900/80 border border-purple-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm text-lg"
              />
              
              {isVoiceSupported && (
                <button
                  onClick={handleVoiceSearch}
                  disabled={!isVoiceSupported}
                  title={isListening ? "Stop listening" : "Start voice search"}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5 text-green-400" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>
              )}

              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Voice Search Status */}
            <AnimatePresence>
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 p-3 bg-green-500/10 border border-green-500/30 rounded-xl backdrop-blur-sm z-30"
                >
                  <div className="flex items-center gap-3 text-green-300">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-green-400 rounded-full"
                    />
                    <span className="text-sm font-medium">
                      Listening... Say "Noma" or any restaurant name
                    </span>
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="ml-auto"
                    >
                      🎤
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Voice Error Display */}
            <AnimatePresence>
              {voiceError && !isListening && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm z-30"
                >
                  <div className="flex items-center gap-2 text-red-300">
                    <span className="text-sm">
                      {voiceError}
                    </span>
                    <button 
                      onClick={handleVoiceSearch}
                      className="ml-auto text-xs bg-red-500/20 px-2 py-1 rounded hover:bg-red-500/30 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Browser Support Message */}
            {!isVoiceSupported && isHydrated && (
              <div className="absolute top-full left-0 right-0 mt-2 p-2 text-center">
                <span className="text-xs text-gray-500">
                  Voice search not supported in this browser
                </span>
              </div>
            )}

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showSearchResults && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-black/90 border border-purple-500/30 rounded-xl backdrop-blur-sm overflow-hidden z-20"
                >
                  {searchLoading ? (
                    <div className="p-4 text-center text-gray-400">
                      <div className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-2" />
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div>
                      <div className="max-h-80 overflow-y-auto">
                        {searchResults.map((restaurant, index) => {
                          const restaurantName = 
                            restaurant.restaurant_name ||
                            restaurant.name ||
                            restaurant.rec_name || 
                            restaurant.Base_Name ||
                            `Restaurant ${index + 1}`;
                            
                          const restaurantCuisine = 
                            restaurant.cuisine || 
                            restaurant.rec_cuisine || 
                            restaurant.Base_Cuisine ||
                            "Unknown Cuisine";
                            
                          const restaurantLocation = 
                            `${restaurant.city || restaurant.rec_city || restaurant.Base_City || ""}, ${restaurant.country || restaurant.rec_country || restaurant.Base_Country || ""}`.replace(/^, |^ |,$| $/, "") || "Unknown Location";
                            
                          const restaurantReputation = 
                            restaurant.rec_reputation_label ||
                            restaurant.reputation || 
                            restaurant.Base_Reputation_Label;
                          
                          return (
                            <motion.button
                              key={restaurant.id || `search-${index}`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => handleRestaurantSelect(restaurant)}
                              className="w-full p-4 text-left hover:bg-purple-500/10 transition-colors border-b border-gray-800/50 last:border-b-0"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-white truncate">
                                    {restaurantName}
                                  </div>
                                  <div className="text-sm text-gray-400 truncate">
                                    {restaurantCuisine} • {restaurantLocation}
                                  </div>
                                  {restaurantReputation && (
                                    <div className="mt-1">
                                      <span className="inline-block px-2 py-0.5 bg-yellow-500/20 text-yellow-300 text-xs rounded">
                                        {restaurantReputation}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-400">
                      No restaurants found matching "{searchQuery}"
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Selected Restaurant & Controls */}
        {selectedRestaurant && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-yellow-500/10 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {selectedRestaurant.name || selectedRestaurant.restaurant_name || selectedRestaurant.Base_Name || "Selected Restaurant"}
                    </h3>
                    <p className="text-gray-300">
                      {selectedRestaurant.cuisine || selectedRestaurant.Base_Cuisine || "N/A Cuisine"} • {selectedRestaurant.city || selectedRestaurant.country || selectedRestaurant.Base_City || selectedRestaurant.Base_Country || "N/A Location"}
                    </p>
                    {(selectedRestaurant.reputation || selectedRestaurant.Base_Reputation_Label) && (
                      <span className="inline-block mt-1 px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">
                        {selectedRestaurant.reputation || selectedRestaurant.Base_Reputation_Label}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 p-1 bg-black/50 rounded-lg">
                    <button
                      onClick={() => setDiversityMode("similar")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        diversityMode === "similar"
                          ? "bg-purple-500 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      Similar
                    </button>
                    <button
                      onClick={() => setDiversityMode("diverse")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        diversityMode === "diverse"
                          ? "bg-pink-500 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      Diverse
                    </button>
                  </div>

                  <motion.button
                    onClick={handleGenerateRecommendations}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Get Recommendations
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recommendations Results */}
        {loading && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={`skeleton-${i}`} />
            ))}
           </div>
        )}
        
        <AnimatePresence>
        {recommendations && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                AI-Powered Recommendations
              </h2>
              <p className="text-gray-400">
                Found {recommendations.total_recommendations || recommendations.recommendations?.length || 0} restaurants {diversityMode === "similar" ? "similar to" : "that are a diverse alternative to"} {selectedRestaurant?.name || selectedRestaurant?.restaurant_name || selectedRestaurant?.Base_Name}
              </p>
              
              {recommendations.algorithm_explanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 max-w-2xl mx-auto p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 font-medium">AI Explanation</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {recommendations.algorithm_explanation}
                  </p>
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {recommendations.recommendations?.map((restaurant: Restaurant, index: number) => {
                const restaurantName = restaurant.name || restaurant.rec_name || restaurant.Base_Name || "Unknown Restaurant";
                const restaurantId = restaurant.id?.toString() || `rec-${index}`;
                
                return (
                <motion.div
                    key={`${restaurantId}-${restaurantName}-${diversityMode}-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                    }}
                    className="relative group"
                    style={{ padding: '12px 12px 0 12px' }} // Add padding to prevent cutoff
                >
                    <div className="relative">
                    <RestaurantCard
                        id={restaurantId}
                        name={restaurantName}
                        city={restaurant.city || restaurant.rec_city || restaurant.Base_City || "Unknown City"}
                        country={restaurant.country || restaurant.rec_country || restaurant.Base_Country || "Unknown Country"}
                        cuisine={restaurant.cuisine || restaurant.rec_cuisine || restaurant.Base_Cuisine || "Unknown Cuisine"}
                        imageUrl={restaurant.image_url || `https://picsum.photos/400/300?sig=${encodeURIComponent(restaurantName)}`}
                        stars={restaurant.stars || restaurant.rec_star_rating || restaurant.Base_Star_Rating || 0}
                        michelinStars={restaurant.stars || restaurant.rec_star_rating || restaurant.Base_Star_Rating || 0}
                        momentum_score={restaurant.momentum_score || restaurant.rec_momentum_score || restaurant.Base_Momentum_Score}
                        reputation={restaurant.reputation || restaurant.rec_reputation_label || restaurant.Base_Reputation_Label}
                        badges={
                        (restaurant.badges && Array.isArray(restaurant.badges) ? restaurant.badges.join(", ") : restaurant.badges) ||
                        (restaurant.rec_badge_list && Array.isArray(restaurant.rec_badge_list) ? restaurant.rec_badge_list.join(", ") : restaurant.rec_badge_list) ||
                        (restaurant.Base_Badge_List && Array.isArray(restaurant.Base_Badge_List) ? restaurant.Base_Badge_List.join(", ") : restaurant.Base_Badge_List) ||
                        ""
                        }
                        final_score={restaurant.final_score || restaurant.final_inclusive_score}
                        greenStar={false} // Placeholder
                        eater38={false} // Placeholder
                        nytTop100={false} // Placeholder
                    />
                    
                    {/* More Like This Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      onClick={() => handleMoreLikeThis(restaurant)}
                      className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 backdrop-blur-sm z-10"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      🔍 More Like This
                    </motion.button>
                    
                    {/* Similarity Score Badge */}
                    {restaurant.similarity_score && (
                        <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg z-10 border-2 border-white"
                        style={{ 
                          transform: 'translate(0, 0)',
                          zIndex: 20 
                        }}
                        >
                        {Math.round(restaurant.similarity_score * 100)}%
                        </motion.div>
                    )}
                    </div>
                </motion.div>
              )})}
            </div>

            {/* Interactive Similarity Matrix */}
            {recommendations.recommendations && recommendations.recommendations.length > 3 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-12 max-w-4xl mx-auto"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Restaurant Similarity Matrix</h3>
                  <p className="text-gray-400 text-sm">Discover relationships between recommended restaurants</p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Similarity Network Visualization */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-purple-300">Cuisine Connections</h4>
                      {recommendations.recommendations?.slice(0, 5).map((restaurant: Restaurant, index: number) => {
                        const similarCount = Math.floor(Math.random() * 3) + 1;
                        const connectionStrength = restaurant.similarity_score || (0.7 + Math.random() * 0.25);
                        
                        return (
                          <motion.div
                            key={`matrix-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 + index * 0.1 }}
                            className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors cursor-pointer"
                            onClick={() => handleMoreLikeThis(restaurant)}
                          >
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500" style={{
                              opacity: connectionStrength
                            }}></div>
                            <div className="flex-1">
                              <div className="font-medium text-white text-sm truncate">
                                {restaurant.name || restaurant.rec_name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {similarCount} similar connections • {Math.round(connectionStrength * 100)}% match
                              </div>
                            </div>
                            <div className="text-xs text-purple-300">
                              {restaurant.cuisine || restaurant.rec_cuisine}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Geographic Clusters */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-pink-300">Geographic Clusters</h4>
                      {recommendations.recommendations?.slice(0, 5).reduce((acc: any[], restaurant: Restaurant) => {
                        const country = restaurant.country || restaurant.rec_country || "Unknown";
                        const existing = acc.find(item => item.country === country);
                        if (existing) {
                          existing.count += 1;
                          existing.restaurants.push(restaurant);
                        } else {
                          acc.push({
                            country,
                            count: 1,
                            restaurants: [restaurant]
                          });
                        }
                        return acc;
                      }, []).map((cluster: any, index: number) => (
                        <motion.div
                          key={`cluster-${index}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + index * 0.1 }}
                          className="p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 flex items-center justify-center text-white text-xs font-bold">
                              {cluster.count}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-white text-sm">
                                {cluster.country}
                              </div>
                              <div className="text-xs text-gray-400">
                                {cluster.restaurants.map((r: Restaurant) => r.name || r.rec_name).join(", ").slice(0, 40)}...
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Geographic Recommendations */}
            {geographicData && geographicData.restaurants && geographicData.restaurants.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-12 max-w-6xl mx-auto"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">🗺️ Geographic Discovery</h3>
                  <p className="text-gray-400 text-sm">Restaurants near {selectedRestaurant?.name} within {selectedRadius}km radius</p>
                </div>

                {/* Radius Selection */}
                <div className="flex justify-center mb-6">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-900/50 to-black/50 border border-purple-500/20 rounded-xl backdrop-blur-sm">
                    <span className="text-gray-300 text-sm font-medium">Search Radius:</span>
                    {[50, 100, 200, 500].map((radius) => (
                      <button
                        key={radius}
                        onClick={() => setSelectedRadius(radius)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedRadius === radius
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : "bg-black/30 text-gray-400 hover:text-white hover:bg-black/50"
                        }`}
                      >
                        {radius}km
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* UMAP Coordinate Visualization */}
                    <div>
                      <h4 className="text-lg font-semibold text-purple-300 mb-4">Restaurant Proximity Map</h4>
                      <div className="relative bg-black/50 rounded-xl p-4 h-64 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="grid grid-cols-3 gap-4 w-full h-full">
                            {geographicData.restaurants.slice(0, 9).map((restaurant: any, index: number) => {
                              const similarity = restaurant.similarity_score || (0.6 + Math.random() * 0.3);
                              const size = 8 + similarity * 12;
                              
                              return (
                                <motion.div
                                  key={`geo-${index}`}
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: similarity }}
                                  transition={{ delay: 1.2 + index * 0.1 }}
                                  className="flex items-center justify-center"
                                  style={{
                                    transform: `translate(${(Math.random() - 0.5) * 30}px, ${(Math.random() - 0.5) * 30}px)`
                                  }}
                                >
                                  <div
                                    className="rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-110 transition-transform"
                                    style={{ width: size, height: size }}
                                    title={`${restaurant.name} (${Math.round(similarity * 100)}% similar)`}
                                  >
                                    {restaurant.name?.charAt(0) || 'R'}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Center point (selected restaurant) */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.1 }}
                            className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-lg"
                            title={selectedRestaurant?.name}
                          >
                            ⭐
                          </motion.div>
                        </div>

                        {/* Radius circles */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          {[1, 2, 3].map((ring) => (
                            <div
                              key={ring}
                              className="absolute rounded-full border border-purple-500/20"
                              style={{
                                width: ring * 60,
                                height: ring * 60,
                                top: -(ring * 30),
                                left: -(ring * 30)
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Geographic Restaurant List */}
                    <div>
                      <h4 className="text-lg font-semibold text-pink-300 mb-4">Nearby Discoveries</h4>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {geographicData.restaurants.map((restaurant: any, index: number) => {
                          const distance = Math.floor(Math.random() * selectedRadius) + 1;
                          const similarity = restaurant.similarity_score || (0.6 + Math.random() * 0.3);
                          
                          return (
                            <motion.div
                              key={`geo-list-${index}`}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.3 + index * 0.1 }}
                              className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors cursor-pointer group"
                              onClick={() => {
                                const mockRestaurant: Restaurant = {
                                  id: `geo-${index}`,
                                  name: restaurant.name,
                                  cuisine: restaurant.cuisine || "International",
                                  country: restaurant.country || "Unknown",
                                  city: restaurant.city || "Unknown",
                                  stars: restaurant.stars || 0,
                                  similarity_score: similarity
                                };
                                handleMoreLikeThis(mockRestaurant);
                              }}
                            >
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                                  {restaurant.name?.charAt(0) || 'R'}
                                </div>
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-white text-sm truncate group-hover:text-purple-300 transition-colors">
                                  {restaurant.name}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {distance}km away • {restaurant.cuisine || 'International'} • {Math.round(similarity * 100)}% similar
                                </div>
                              </div>
                              
                              <div className="flex-shrink-0">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                                  {Math.round(similarity * 100)}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
        </AnimatePresence>

        {/* Empty State */}
        {!selectedRestaurant && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-8xl mb-6"
            >
              🤖
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-300 mb-4">
              Ready to discover amazing restaurants?
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Search for a restaurant you love, and our AI will find similar gems or exciting alternatives based on your preference.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                { name: "Noma", cuisine: "New Nordic", country: "Denmark", city: "Copenhagen", stars: 2, reputation: "World's Best Restaurant" },
                { name: "Alinea", cuisine: "Molecular Gastronomy", country: "USA", city: "Chicago", stars: 3, reputation: "Michelin 3-Star" },
                { name: "The French Laundry", cuisine: "Contemporary French", country: "USA", city: "Yountville", stars: 3, reputation: "Michelin 3-Star" },
                { name: "Osteria Francescana", cuisine: "Italian", country: "Italy", city: "Modena", stars: 3, reputation: "World's Best Restaurant" }
              ].map((restaurant) => (
                <motion.button
                  key={restaurant.name}
                  onClick={() => handleTryButtonClick(restaurant)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 rounded-full hover:from-purple-500/30 hover:to-pink-500/30 transition-all text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try "{restaurant.name}"
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}