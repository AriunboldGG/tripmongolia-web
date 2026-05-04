"use client";

import Image from "next/image";
import { Heart, Flame, ChevronRight } from "lucide-react";
import { useState } from "react";

const sights = [
  {
    id: 1,
    name: "Sukhbaatar Square",
    location: "Ulaanbaatar",
    score: 5.3,
    rating: 4.0,
    reviews: 141,
    image: "/images/topplaces/place-1.jpg",
  },
  {
    id: 2,
    name: "National Museum of Mongolia",
    location: "Ulaanbaatar",
    score: 4.5,
    rating: 4.3,
    reviews: 79,
    image: "/images/topplaces/place-2.jpg",
  },
  {
    id: 3,
    name: "Chinggis Khaan Statue Complex",
    location: "Ulaanbaatar",
    score: 4.4,
    rating: 4.6,
    reviews: 34,
    image: "/images/topplaces/place-3.jpg",
  },
  {
    id: 4,
    name: "Gandantegchinlen Monastery",
    location: "Ulaanbaatar",
    score: 4.3,
    rating: 4.2,
    reviews: 86,
    image: "/images/topplaces/place-4.jpg",
  },
];

export default function TopSights() {
  const [liked, setLiked] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-10 px-6 max-w-350 mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Үзвэр үйлчилгээ
        </h2>
        <a
          href="/sights"
          className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black transition-colors"
        >
          More
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sights.map((sight) => (
          <div
            key={sight.id}
            className="rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Image */}
            <div className="relative aspect-4/3">
              <Image
                src={sight.image}
                alt={sight.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Trip Best badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 text-amber-600 text-[11px] font-semibold px-2 py-0.5 rounded-sm border border-amber-200">
                  &#123; Trip Best &#125;
                </span>
              </div>

              {/* Heart button */}
              <button
                onClick={() => toggleLike(sight.id)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                aria-label="Save to favourites"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    liked.includes(sight.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600"
                  }`}
                />
              </button>

              {/* Location + score overlay */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="bg-white/90 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-sm">
                  {sight.location}
                </span>
                <span className="bg-white/90 text-xs font-semibold px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
                  <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                  {sight.score}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="px-3 py-3">
              <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1">
                {sight.name}
              </h3>
              <p className="text-xs text-gray-500">
                {sight.rating}/5 &middot; {sight.reviews} reviews
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
