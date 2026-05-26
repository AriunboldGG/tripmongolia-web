"use client";

import Image from "next/image";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

const featured = [
  {
    id: 1,
    source: "CNN News",
    sourceColor: "bg-red-600",
    title: "Italy Venice seeks more investment in the real estate...",
    date: "May 27, 2026",
    image: "/images/slider-1.jpg",
  },
  {
    id: 2,
    source: "BBC News",
    sourceColor: "bg-black",
    title: "United States, the economy of Central America the key",
    date: "May 26, 2026",
    image: "/images/slider-2.jpg",
  },
  {
    id: 3,
    source: "The New York Times",
    sourceColor: "bg-gray-800",
    title: "The role of the real estate sector in global markets",
    date: "May 25, 2026",
    image: "/images/slider-3.jpg",
  },
];

const moreNews = [
  {
    id: 1,
    source: "CNN News",
    sourceColor: "bg-red-600",
    title: "Italy Venice seeks more investment in the real estate world.",
    excerpt: "Italy Venice seeks more investment in the real estate world.",
    date: "May 3, 2026",
    image: "/images/slider-1.jpg",
  },
  {
    id: 2,
    source: "News Mundo",
    sourceColor: "bg-black",
    title: "United States, the economy of Central America the key",
    excerpt:
      "Real estate in Central America rises 13%, this is due to multiple investment...",
    date: "May 3, 2026",
    image: "/images/slider-2.jpg",
  },
  {
    id: 3,
    source: "The New York Times",
    sourceColor: "bg-gray-800",
    title: "The role of the real estate sector",
    excerpt:
      "Builders, owners of real estate areas in Barko county, 4%, trapping people in their cars. Much of the Northeast...",
    date: "May 3, 2026",
    image: "/images/slider-3.jpg",
  },
  {
    id: 4,
    source: "CNN News",
    sourceColor: "bg-red-600",
    title: "Italy Venice seeks more investment in the real estate world.",
    excerpt: "Italy Venice seeks more investment in the real estate world.",
    date: "May 3, 2026",
    image: "/images/slider-1.jpg",
  },
];

export default function TodayNews() {
  const [current, setCurrent] = useState(0);
  const article = featured[current];

  return (
    <section className="py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Featured article */}
        <div className="lg:col-span-2">
          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            <span className="font-black">Today</span>{" "}
            <span className="font-light text-gray-500">news</span>
          </h2>

          {/* Featured card */}
          <div className="relative rounded-xl overflow-hidden bg-gray-900 h-64 sm:h-80 cursor-pointer group">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover opacity-80 group-hover:opacity-70 transition-opacity"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              {/* Source badge */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className={`${article.sourceColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-sm`}
                >
                  CNN
                </span>
                <span className="text-white/80 text-sm">{article.source}</span>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-bold leading-snug mb-1">
                {article.title}
              </h3>
              <p className="text-white/60 text-xs">{article.date}</p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${
                  i === current
                    ? "w-4 h-2.5 bg-gray-800"
                    : "w-2.5 h-2.5 bg-gray-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right: More news */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">More news</h2>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            {moreNews.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {/* Text */}
                <div className="flex-1 min-w-0">
                  {/* Source row */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`${item.sourceColor} text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm`}
                      >
                        CNN
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        {item.source}
                      </span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 shrink-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-1">
                    {item.excerpt}
                  </p>
                  <p className="text-[11px] text-gray-400">• • •</p>
                  <p className="text-[11px] text-gray-400">{item.date}</p>
                </div>

                {/* Thumbnail */}
                <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Learning More link */}
          <div className="flex justify-end mt-3">
            <a
              href="/news"
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              Learning More...
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
