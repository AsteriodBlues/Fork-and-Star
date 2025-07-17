"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonCard() {
  return (
    <div className="bg-white text-black rounded-xl overflow-hidden shadow-md w-72">
      <Skeleton height={192} width={288} borderRadius={12} />
      <div className="p-4">
        <Skeleton height={24} width={`80%`} borderRadius={8} className="mb-2" />
        <Skeleton height={16} width={`60%`} borderRadius={8} className="mb-1" />
        <Skeleton height={16} width={`40%`} borderRadius={8} />
      </div>
    </div>
  );
}
