"use client";

import { useState, useEffect } from "react";
import RestaurantCard from "@/components/RestaurantCard";
import restaurants from "@/data/restaurants";
import Lottie from "lottie-react";
import emptyAnimation from "@/lotties/empty.json";
import { AnimatePresence, motion } from "framer-motion";

export default function FavoritesPage() {
  const [favIds, setFavIds] = useState<string[]>([]);
  const [removingIds, setRemovingIds] = useState<string[]>([]);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("fork-star-favs") || "[]");
    setFavIds(storedFavs);
  }, []);

  const handleRemove = (id: string) => {
    setRemovingIds((prev) => [...prev, id]);

    setTimeout(() => {
      let updatedFavs = JSON.parse(localStorage.getItem("fork-star-favs") || "[]");
      updatedFavs = updatedFavs.filter((favId: string) => favId !== id);
      localStorage.setItem("fork-star-favs", JSON.stringify(updatedFavs));
      setFavIds(updatedFavs);
      setRemovingIds((prev) => prev.filter((remId) => remId !== id));
    }, 500); // Match animation
  };

  const favRestaurants = restaurants.filter(
    (r) => favIds.includes(r.id) && !removingIds.includes(r.id)
  );

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-500">🌟 Your Favorites</h2>

      {favRestaurants.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="w-60 h-60">
            <Lottie animationData={emptyAnimation} loop autoplay />
          </div>
          <p className="text-lg text-gray-500 mt-4">No favorites yet. Go explore and tap the star!</p>
        </div>
      ) : (
        <motion.div
          className="flex flex-wrap gap-6 justify-center"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
            hidden: {},
          }}
        >
          <AnimatePresence>
            {favRestaurants.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
              >
                <RestaurantCard
                  id={r.id}
                  name={r.name}
                  city={r.city}
                  cuisine={r.cuisine}
                  imageUrl={r.imageUrl}
                  michelinStars={r.michelinStars}
                  greenStar={r.greenStar}
                  eater38={r.eater38}
                  nytTop100={r.nytTop100}
                  isFav={true}
                  onToggleFav={() => handleRemove(r.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}