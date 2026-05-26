"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatHotelPrice, hotels } from "../../lib/hotels";

const CARDS_PER_PAGE = 4;
const totalPages = Math.ceil(hotels.length / CARDS_PER_PAGE);

export default function TopHotels() {
  const [page, setPage] = useState(0);

  const visibleHotels = hotels.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  return (
    <section className="py-10 sm:py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-2 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="border-l-4 border-gray-900 pl-3">Top</span>
            <span className="font-light text-gray-500">буудлууд</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Prev */}
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {visibleHotels.map((hotel) => (
              <Card
                key={hotel.id}
                className="overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-0 gap-0"
              >
                <div className="relative w-full aspect-4/3 bg-gray-100 overflow-hidden">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/10 to-transparent" />
                  <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-800 shadow-sm">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {hotel.rating}
                  </div>
                  <button className="absolute top-2 right-2 w-7 h-7 bg-white/80 rounded-md flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                  </button>
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-0.5 text-xs font-semibold text-gray-800">
                    {formatHotelPrice(hotel.price)}
                  </div>
                </div>

                <CardContent className="space-y-2 px-3 py-3">
                  <div>
                    <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 sm:text-base">
                      {hotel.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1.5">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{hotel.locationText}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                    <Star className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400" />
                    <span>{hotel.stars} одтой</span>
                  </div>
                  <Link href="/hotels" className="block">
                    <Button
                      variant="outline"
                      className="w-full h-8 text-xs font-semibold tracking-wide border-gray-300 hover:bg-gray-100 rounded"
                    >
                      SHOW MORE...
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            aria-label="Next"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Footer: dots + view more */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
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
          <Link href="/hotels" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto rounded-full text-sm px-5 border-gray-300 hover:bg-gray-100">
              View more...
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
