"use client";

import { useState, useEffect, useRef } from "react";
import RestaurantCard from "@/components/RestaurantCard";
import SkeletonCard from "@/components/SkeletonCard";
import { fetchRestaurants } from "@/utils/api";
import { AnimatePresence, motion } from "framer-motion";
import CustomSelect from "@/components/CustomSelect";
import BackgroundGlow from "@/components/BackgroundGlow";
import WorldGlobe from "@/components/WorldGlobe";

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
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  useEffect(() => {
    fetchRestaurants()
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load restaurants", error);
        setLoading(false);
      });
  }, []);

  const cities = Array.from(new Set(restaurants.map((r) => r.city).filter((x) => x && x !== "All"))).sort();
  const cuisines = Array.from(new Set(restaurants.map((r) => r.cuisine).filter((x) => x && x !== "All"))).sort();

  const filteredRestaurants = restaurants.filter((r) => {
    return (
      (selectedCity === "All" || r.city === selectedCity) &&
      (selectedCuisine === "All" || r.cuisine === selectedCuisine)
    );
  });

  const parallaxRef = useParallax(30);

  return (
    <div className="relative p-4 flex flex-col items-center overflow-x-hidden min-h-screen">
      <BackgroundGlow />

      <motion.h1
        ref={parallaxRef}
        className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-6 z-10"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        🍽️ Explore Restaurants
      </motion.h1>

      <WorldGlobe onSelectCity={(city) => setSelectedCity(city)} />

      <div className="flex flex-wrap gap-4 mb-8 justify-center z-10 mt-10">
        <CustomSelect
          value={selectedCity}
          onChange={setSelectedCity}
          options={["All", ...cities]}
          placeholder="Select City"
        />
        <CustomSelect
          value={selectedCuisine}
          onChange={setSelectedCuisine}
          options={["All", ...cuisines]}
          placeholder="Select Cuisine"
        />
      </div>

      <div className="flex flex-wrap gap-6 justify-center z-10 w-full max-w-6xl">
        <AnimatePresence>
          {loading
            ? [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
            : filteredRestaurants.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4 }}
                  className="text-gray-500 text-xl font-medium p-8"
                >
                  No restaurants found. Try changing the filters!
                </motion.div>
              ) : (
                filteredRestaurants.map((r) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.13 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <RestaurantCard
                      id={r.id}
                      name={r.name}
                      city={r.city}
                      cuisine={r.cuisine}
                      imageUrl={r.image_url}
                      awards={r.awards}
                      sourceLists={r.source_lists}
                    />
                  </motion.div>
                ))
              )}
        </AnimatePresence>
      </div>
    </div>
  );
}