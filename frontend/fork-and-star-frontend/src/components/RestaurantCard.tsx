"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import useSound from "use-sound";

type RestaurantCardProps = {
  id: string;
  name: string;
  city: string;
  cuisine: string;
  imageUrl: string;
  michelinStars?: number;
  greenStar?: boolean;
  eater38?: boolean;
  nytTop100?: boolean;
  isFav?: boolean;
  onToggleFav?: () => void;
};

export default function RestaurantCard({
  id,
  name,
  city,
  cuisine,
  imageUrl,
  michelinStars = 0,
  greenStar = false,
  eater38 = false,
  nytTop100 = false,
  onToggleFav,
}: RestaurantCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // ✅ Load ding sound
  const [playDing] = useSound("/sounds/ding.wav", { volume: 0.5 });

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("fork-star-favs") || "[]");
    setIsFavorite(storedFavs.includes(id));
  }, [id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    let storedFavs = JSON.parse(localStorage.getItem("fork-star-favs") || "[]");

    if (isFavorite) {
      storedFavs = storedFavs.filter((favId: string) => favId !== id);
      toast.error(`💔 Removed ${name} from favorites`);
    } else {
      storedFavs.push(id);
      confetti({ particleCount: 70, spread: 60 });
      toast.success(`✨ Added ${name} to favorites`);
      playDing(); // ✅ Play ding sound
    }

    localStorage.setItem("fork-star-favs", JSON.stringify(storedFavs));
    setIsFavorite(!isFavorite);

    if (onToggleFav) {
      onToggleFav();
    }
  };

  return (
    <motion.div
      className="relative bg-softGray text-luxeDark rounded-xl overflow-hidden shadow-xl w-72 cursor-pointer group"
      whileHover={{
        scale: 1.05,
        rotateX: 5,
        rotateY: 5,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <div className="relative overflow-hidden rounded-xl">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <Image
            src={imageUrl}
            alt={name}
            width={288}
            height={160}
            className="object-cover h-40 w-full"
          />
        </motion.div>

        <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
          {michelinStars > 0 && (
            <div className="text-white text-xs px-2 py-0.5 rounded-full font-medium shadow-md bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-gradient">
              ⭐ {michelinStars}
            </div>
          )}
          {greenStar && (
            <div className="text-white text-xs px-2 py-0.5 rounded-full font-medium shadow-md bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500 animate-gradient">
              🌿 Green
            </div>
          )}
          {eater38 && (
            <div className="text-white text-xs px-2 py-0.5 rounded-full font-medium shadow-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient">
              🏆 Eater 38
            </div>
          )}
          {nytTop100 && (
            <div className="text-white text-xs px-2 py-0.5 rounded-full font-medium shadow-md bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-gradient">
              📰 NYT 100
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-sm text-gray-700">{city}</p>
        <p className="text-sm text-accent">{cuisine}</p>
      </div>

      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 rounded-full bg-white/80 backdrop-blur p-2 transition-colors hover:bg-yellow-400 z-30"
      >
        <Star
          className={`w-5 h-5 ${isFavorite ? "fill-yellow-500 text-yellow-500" : "text-gray-500"}`}
        />
      </button>
    </motion.div>
  );
}