"use client";

export default function Footer() {
  return (
    <footer className="w-full mt-12 p-6 text-center text-sm text-gray-400 border-t border-yellow-500 backdrop-blur bg-black/50">
      <p className="mb-2">🍽️ Fork & Star — Discover star-worthy dining, one fork at a time.</p>
      <p>&copy; {new Date().getFullYear()} Fork & Star. All rights reserved.</p>
    </footer>
  );
}
