"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Search, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const slides = [
  {
    id: 1,
    image: "/images/slider-1.png",
    heading: "The ease of buying",
    subheading: "a dream hotel",
  },
];

const searchTabs = ["BUY HOTELS", "TRAIDING", "FEATURED"] as const;

const countries = ["United States", "Mongolia", "Japan", "France", "Germany"];
const cities: Record<string, string[]> = {
  "United States": ["Miami", "New York", "Los Angeles", "Chicago"],
  Mongolia: ["Ulaanbaatar", "Erdenet", "Darkhan", "Choibalsan"],
  Japan: ["Tokyo", "Osaka", "Kyoto", "Sapporo"],
  France: ["Paris", "Lyon", "Marseille", "Nice"],
  Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
};
const propertyTypes = ["Hotels", "Resorts", "Villas", "Apartments"];
const priceRanges = [
  "$ 3,000,00... → $ 5,000,000...",
  "$ 1,000,000 → $ 3,000,000",
  "$ 5,000,000 → $ 10,000,000",
  "$ 10,000,000+",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState<(typeof searchTabs)[number]>("BUY HOTELS");
  const [selectedCountry, setSelectedCountry] = useState<string>("United States");

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const currentCities = cities[selectedCountry] ?? [];

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "820px" }}>
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.heading}
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/35" />
          </div>
        ))}
      </div>

      {/* Hero Text */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-350 mx-auto px-6 pb-48">
        <h1 className="text-white font-bold leading-tight drop-shadow-lg max-w-xl">
          <span className="block text-5xl xl:text-6xl">{slides[current].heading}</span>
          <span className="block text-5xl xl:text-6xl">{slides[current].subheading}</span>
        </h1>
      </div>

      {/* Prev Arrow */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-8 h-8" strokeWidth={1.5} />
      </button>

      {/* Next Arrow */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
      >
        <ChevronRight className="w-8 h-8" strokeWidth={1.5} />
      </button>

      {/* Search Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-350 mx-auto px-6">
          <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-t-sm overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {searchTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold tracking-wide transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-gray-900 text-gray-900 bg-white"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab === "BUY HOTELS" && <DollarSign className="w-4 h-4" />}
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Form */}
            <div className="flex flex-wrap items-end gap-0 bg-white px-4 py-4">
              {/* Country */}
              <div className="flex flex-col min-w-40 flex-1 px-3 border-r border-gray-200">
                <span className="text-xs text-gray-500 mb-1 font-medium">Contry</span>
                <Select value={selectedCountry} onValueChange={(v) => v !== null && setSelectedCountry(v)}>
                  <SelectTrigger className="border-0 p-0 h-auto shadow-none focus:ring-0 text-gray-800 font-medium text-sm bg-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* City */}
              <div className="flex flex-col min-w-35 flex-1 px-3 border-r border-gray-200">
                <span className="text-xs text-gray-500 mb-1 font-medium">City</span>
                <Select defaultValue={currentCities[0]}>
                  <SelectTrigger className="border-0 p-0 h-auto shadow-none focus:ring-0 text-gray-800 font-medium text-sm bg-transparent">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type */}
              <div className="flex flex-col min-w-40 flex-1 px-3 border-r border-gray-200">
                <span className="text-xs text-gray-500 mb-1 font-medium">Property Type</span>
                <Select defaultValue="Hotels">
                  <SelectTrigger className="border-0 p-0 h-auto shadow-none focus:ring-0 text-gray-800 font-medium text-sm bg-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className="flex flex-col min-w-55 flex-1 px-3">
                <span className="text-xs text-gray-500 mb-1 font-medium">Prince</span>
                <Select defaultValue={priceRanges[0]}>
                  <SelectTrigger className="border-0 p-0 h-auto shadow-none focus:ring-0 text-gray-800 font-medium text-sm bg-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div className="pl-3">
                <Button className="bg-gray-900 hover:bg-black text-white px-8 py-6 rounded-sm flex items-center gap-2 font-bold text-sm tracking-wider h-auto">
                  <Search className="w-5 h-5" />
                  SEARCH
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
