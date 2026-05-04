"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { MapPin, BedDouble, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Hotel {
  id: number;
  image: string | null;
  description: string | null;
  price: string;
  location: string;
  rooms: number;
}

const hotels: Hotel[] = [
  {
    id: 1,
    image: "/images/slider-1.png",
    description: null,
    price: "$ 18,000,000.00",
    location: "Venice, Italia",
    rooms: 330,
  },
  {
    id: 2,
    image: null,
    description: "The luxury 5-star hotel is located within the historic central area of the city...",
    price: "$ 15,000,000.00",
    location: "Texas, United State...",
    rooms: 330,
  },
  {
    id: 3,
    image: "/images/slider-2.jpg",
    description: null,
    price: "$ 15,000,000.00",
    location: "Texas, United State...",
    rooms: 510,
  },
  {
    id: 4,
    image: "/images/slider-3.jpg",
    description: null,
    price: "$ 18,000,000.00",
    location: "Venice, Italia",
    rooms: 690,
  },
  {
    id: 5,
    image: "/images/slider-1.png",
    description: null,
    price: "$ 12,000,000.00",
    location: "Paris, France",
    rooms: 220,
  },
];

const CARDS_PER_PAGE = 4;
const totalPages = Math.ceil(hotels.length / CARDS_PER_PAGE);

export default function TopHotels() {
  const [page, setPage] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const visibleHotels = hotels.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-350 mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="border-l-4 border-gray-900 pl-3">Top</span>
            <span className="font-light text-gray-500">hotels</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Prev */}
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous"
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards Grid */}
          <div ref={trackRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {visibleHotels.map((hotel) => (
              <Card
                key={hotel.id}
                className="overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-0 gap-0"
              >
                {/* Image or text placeholder */}
                <div className="relative w-full aspect-4/3 bg-gray-100 overflow-hidden">
                  {hotel.image ? (
                    <>
                      <Image
                        src={hotel.image}
                        alt={hotel.location}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      {/* Dots indicator */}
                      <div className="absolute top-2 left-2 flex gap-1">
                        {[0, 1, 2].map((d) => (
                          <span key={d} className={`w-1.5 h-1.5 rounded-full ${d === 0 ? "bg-white" : "bg-white/50"}`} />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full p-4">
                      <p className="text-sm text-gray-700 font-medium text-center leading-snug">
                        {hotel.description}
                      </p>
                      {/* single dot */}
                      <div className="absolute top-2 left-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 block" />
                      </div>
                    </div>
                  )}
                  {/* Bookmark icon */}
                  <button className="absolute top-2 right-2 w-7 h-7 bg-white/80 rounded-md flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                  </button>
                  {/* Price badge */}
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-0.5 text-xs font-semibold text-gray-800">
                    {hotel.price}
                  </div>
                </div>

                <CardContent className="px-3 py-3">
                  {/* Location */}
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1.5">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{hotel.location}</span>
                  </div>
                  {/* Rooms */}
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                    <BedDouble className="w-3 h-3 shrink-0" />
                    <span>{hotel.rooms} rooms</span>
                  </div>
                  {/* CTA */}
                  <Button
                    variant="outline"
                    className="w-full h-8 text-xs font-semibold tracking-wide border-gray-300 hover:bg-gray-100 rounded"
                  >
                    SHOW MORE...
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            aria-label="Next"
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer: dots + view more */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === page ? "bg-gray-800 w-6" : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>
          <Button variant="outline" className="rounded-full text-sm px-5 border-gray-300 hover:bg-gray-100">
            View more...
          </Button>
        </div>
      </div>
    </section>
  );
}
