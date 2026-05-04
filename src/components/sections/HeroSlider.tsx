"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  BedDouble,
  Compass,
  Home,
  Utensils,
  ChevronDown,
} from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/images/slider-1.png",
    heading: "The ease of buying",
    subheading: "a dream hotel",
  },
  {
    id: 2,
    image: "/images/slider-2.jpg",
    heading: "Discover luxury",
    subheading: "properties worldwide",
  },
  {
    id: 3,
    image: "/images/slider-3.jpg",
    heading: "Your perfect stay",
    subheading: "starts here",
  },
];

const searchTabs = [
  { label: "Зочид буудал", icon: BedDouble },
  { label: "Амралтын газар", icon: Compass },
  { label: "Орон сууц", icon: Home },
  { label: "Ресторанууд", icon: Utensils },
] as const;

// Simple date helpers
function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [destination, setDestination] = useState("");
  const [nights] = useState(1);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + nights);

  const checkIn = formatDate(today);
  const checkOut = formatDate(tomorrow);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

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
            <div className="absolute inset-0 bg-black/35" />
          </div>
        ))}
      </div>

      {/* Hero Text */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-350 mx-auto px-6 pb-56">
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

      {/* Dots */}
      <div className="absolute bottom-44 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-6" : "bg-white/50 w-2"
            }`}
          />
        ))}
      </div>

      {/* Search Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-350 mx-auto px-6">
          <div className="bg-white shadow-2xl rounded-t-xl overflow-hidden">

            {/* Tab Bar */}
            <div className="bg-gray-900 px-2 pt-2 flex gap-1 overflow-x-auto">
              {searchTabs.map((tab, i) => {
                const Icon = tab.icon;
                const isActive = i === activeTab;
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                      isActive
                        ? "bg-white text-gray-900"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search Form */}
            <div className="px-4 py-4">
              <div className="flex items-stretch gap-0 border border-gray-200 rounded-lg overflow-hidden">
                {/* Destination */}
                <div className="flex-1 min-w-0 px-4 py-3 border-r border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Хаана</div>
                  <input
                    type="text"
                    placeholder="City, airport, region, landmark or property name"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent font-medium"
                  />
                </div>

                {/* Check-in */}
                <div className="px-4 py-3 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors min-w-32">
                  <div className="text-xs text-gray-500 mb-1">Орох</div>
                  <div className="text-sm font-semibold text-gray-800">{checkIn}</div>
                </div>

                {/* Nights */}
                <div className="px-3 py-3 border-r border-gray-200 flex flex-col items-center justify-center bg-gray-50">
                  <span className="text-xs text-gray-500">{nights} шөнө</span>
                </div>

                {/* Check-out */}
                <div className="px-4 py-3 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors min-w-32">
                  <div className="text-xs text-gray-500 mb-1">Гарах</div>
                  <div className="text-sm font-semibold text-gray-800">{checkOut}</div>
                </div>

                {/* Rooms & Guests */}
                <div className="flex items-center gap-2 px-4 py-3 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors min-w-52">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">Өрөө ба зочид</div>
                    <div className="text-sm font-semibold text-gray-800">1 өрөө, 2 насанд хүрэгчид, 0 хүүхэд</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                </div>

                {/* Search Button */}
                <button className="flex items-center gap-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors">
                  <Search className="w-4 h-4" />
                  Хайх
                </button>
              </div>

            
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

