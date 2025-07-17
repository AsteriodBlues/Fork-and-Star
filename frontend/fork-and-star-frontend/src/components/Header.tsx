"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full p-6 flex justify-between items-center bg-white shadow-md">
      <h1 className="text-2xl font-bold text-yellow-500">🍽️ Fork & Star</h1>
      <nav className="flex gap-4">
        <Link
          href="/explore"
          className="text-gray-700 hover:text-yellow-500 transition-colors"
        >
          Explore
        </Link>
        <Link
          href="/favorites"
          className="text-gray-700 hover:text-yellow-500 transition-colors"
        >
          Favorites
        </Link>
      </nav>
    </header>
  );
}