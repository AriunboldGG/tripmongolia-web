"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  Minus,
  Plus,
} from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/images/slider-1.jpg",
    heading: "Дархан хотод зочлох",
    subheading: "тансаг зочид буудлууд",
  },
  {
    id: 2,
    image: "/images/slider-2.jpg",
    heading: "Дээд зэрэглэлийн",
    subheading: "амралтын газрууд",
  },
  {
    id: 3,
    image: "/images/slider-3.jpg",
    heading: "Орон сууц түрээслэх",
    subheading: "өргөн сонголтууд",
  },
  {
    id: 4,
    image: "/images/slider4.jpg",
    heading: "Тансаг байдлыг мэдрэх",
    subheading: "ресторанууд",
  },
];

const searchTabs = [
  { label: "Зочид буудал", icon: BedDouble },
  { label: "Амралтын газар", icon: Compass },
  { label: "Орон сууц", icon: Home },
  { label: "Ресторанууд", icon: Utensils },
] as const;

// ── Date helpers ──────────────────────────────────────────────
function today0(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function inRange(d: Date, s: Date, e: Date): boolean {
  return d > s && d < e;
}
function fmtShort(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
function nightsBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ── CalendarMonth sub-component ───────────────────────────────
function CalendarMonth({
  year,
  month,
  checkIn,
  checkOut,
  hovered,
  selecting,
  onSelect,
  onHover,
}: {
  year: number;
  month: number;
  checkIn: Date;
  checkOut: Date;
  hovered: Date | null;
  selecting: "in" | "out";
  onSelect: (d: Date) => void;
  onHover: (d: Date | null) => void;
}) {
  const tod = today0();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const rangeEnd = selecting === "out" && hovered ? hovered : checkOut;

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  return (
    <div className="flex-1 min-w-0">
      <div className="text-center text-sm font-semibold text-gray-900 mb-3">
        {MONTH_NAMES[month]} {year}
      </div>
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-[11px] font-medium text-blue-600 py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((date, i) => {
          if (!date) return <div key={`e${i}`} className="h-9" />;
          const past = date < tod;
          const isIn = sameDay(date, checkIn);
          const isOut = sameDay(date, checkOut);
          const ranged = !past && !isIn && !isOut && inRange(date, checkIn, rangeEnd);
          const isSat = date.getDay() === 6;
          return (
            <button
              key={`${year}-${month}-${date.getDate()}`}
              disabled={past}
              onClick={() => !past && onSelect(date)}
              onMouseEnter={() => !past && onHover(date)}
              onMouseLeave={() => onHover(null)}
              className={[
                "h-9 text-sm flex items-center justify-center transition-colors",
                past ? "text-gray-300 cursor-not-allowed" : "cursor-pointer",
                isIn || isOut
                  ? "bg-blue-600 text-white rounded-full font-semibold"
                  : ranged
                  ? "bg-blue-100 text-gray-900"
                  : !past
                  ? `hover:bg-gray-100 ${isSat ? "text-blue-600 font-medium" : "text-gray-800"}`
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [destination, setDestination] = useState("");

  // Date range
  const [checkIn, setCheckIn] = useState<Date>(() => today0());
  const [checkOut, setCheckOut] = useState<Date>(() => addDays(today0(), 1));
  const [showCal, setShowCal] = useState(false);
  const [selecting, setSelecting] = useState<"in" | "out">("in");
  const [hovered, setHovered] = useState<Date | null>(null);

  // Calendar view (left month)
  const [calMonth, setCalMonth] = useState(() => today0().getMonth());
  const [calYear, setCalYear] = useState(() => today0().getFullYear());
  const rightMonth = calMonth === 11 ? 0 : calMonth + 1;
  const rightYear = calMonth === 11 ? calYear + 1 : calYear;

  // Guests
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showGuests, setShowGuests] = useState(false);

  // Outside-click refs
  const calRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (calRef.current && !calRef.current.contains(e.target as Node))
        setShowCal(false);
      if (guestsRef.current && !guestsRef.current.contains(e.target as Node))
        setShowGuests(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  function handleDaySelect(date: Date) {
    if (selecting === "in") {
      setCheckIn(date);
      setCheckOut(addDays(date, 1));
      setSelecting("out");
    } else {
      if (date <= checkIn) {
        setCheckIn(date);
        setCheckOut(addDays(date, 1));
        setSelecting("out");
      } else {
        setCheckOut(date);
        setShowCal(false);
        setSelecting("in");
      }
    }
  }

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); }
    else setCalMonth((m) => m - 1);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); }
    else setCalMonth((m) => m + 1);
  }

  const nights = nightsBetween(checkIn, checkOut);

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1)), []);
  const next = useCallback(() => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1)), []);
  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative w-full overflow-hidden min-h-[780px] sm:min-h-[860px] lg:h-[820px]">
      {/* Slides */}
      <div className="absolute inset-0 h-full">
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
      <div className="relative z-10 flex h-full flex-col justify-center max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-[23rem] sm:pb-64 lg:pb-56">
        <h1 className="text-white font-bold leading-tight drop-shadow-lg max-w-xl">
          <span className="block text-3xl sm:text-5xl xl:text-6xl">{slides[current].heading}</span>
          <span className="block mt-1 text-3xl sm:text-5xl xl:text-6xl">{slides[current].subheading}</span>
        </h1>
      </div>

      {/* Prev Arrow */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
      </button>

      {/* Next Arrow */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-[20.5rem] sm:bottom-44 left-1/2 -translate-x-1/2 z-20 flex gap-2">
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
        <div className="max-w-5xl mx-auto px-3 sm:px-6">
          <div className="bg-white shadow-2xl rounded-t-xl overflow-visible">

            {/* Tab Bar */}
            <div className="bg-gray-900 px-1 sm:px-2 pt-2 flex gap-1 overflow-x-auto rounded-t-xl">
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
            <div className="px-2 sm:px-4 py-4 relative">
              <div className="flex flex-col md:flex-row items-stretch border border-gray-200 rounded-lg overflow-visible">

                {/* Destination */}
                <div className="flex-1 min-w-0 px-2 sm:px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200">
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
                <div
                  className={`px-2 sm:px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors min-w-32 sm:min-w-36 select-none ${
                    showCal && selecting === "in" ? "bg-blue-50" : ""
                  }`}
                  onClick={() => { setSelecting("in"); setShowCal(true); setShowGuests(false); }}
                >
                  <div className={`text-xs font-semibold mb-1 ${showCal && selecting === "in" ? "text-blue-600 border-b border-blue-500 pb-0.5" : "text-gray-500"}`}>
                    Орох
                  </div>
                  <div className="text-sm font-semibold text-gray-800">{fmtShort(checkIn)}</div>
                </div>

                {/* Nights badge */}
                <div className="px-2 sm:px-3 py-3 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col items-center justify-center bg-gray-50 min-w-14 sm:min-w-16">
                  <span className="text-sm font-semibold text-gray-700">{nights}</span>
                  <span className="text-[10px] text-gray-400">шөнө</span>
                </div>

                {/* Check-out */}
                <div
                  className={`px-2 sm:px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors min-w-32 sm:min-w-36 select-none ${
                    showCal && selecting === "out" ? "bg-blue-50" : ""
                  }`}
                  onClick={() => { setSelecting("out"); setShowCal(true); setShowGuests(false); }}
                >
                  <div className={`text-xs font-semibold mb-1 ${showCal && selecting === "out" ? "text-blue-600 border-b border-blue-500 pb-0.5" : "text-gray-500"}`}>
                    Гарах
                  </div>
                  <div className="text-sm font-semibold text-gray-800">{fmtShort(checkOut)}</div>
                </div>

                {/* Rooms & Guests */}
                <div
                  ref={guestsRef}
                  className="relative flex items-center gap-2 px-2 sm:px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors min-w-44 sm:min-w-52 select-none"
                  onClick={() => { setShowGuests((v) => !v); setShowCal(false); }}
                >
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">Өрөө ба зочид</div>
                    <div className="text-sm font-semibold text-gray-800">
                      {rooms} өрөө, {adults} насанд хүрэгч, {children} хүүхэд
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${showGuests ? "rotate-180" : ""}`} />

                  {/* Guests dropdown */}
                  {showGuests && (
                    <div
                      className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-2xl p-5 w-72 z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {(
                        [
                          { label: "Өрөө", sub: "", value: rooms, min: 1, onChange: setRooms },
                          { label: "Насанд хүрсэн", sub: "18+ нас", value: adults, min: 1, onChange: setAdults },
                          { label: "Хүүхдүүд", sub: "0–17 нас", value: children, min: 0, onChange: setChildren },
                        ] as { label: string; sub: string; value: number; min: number; onChange: (v: number) => void }[]
                      ).map(({ label, sub, value, min, onChange }) => (
                        <div key={label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                          <div>
                            <span className="text-sm font-semibold text-gray-900">{label}</span>
                            {sub && <span className="text-xs text-gray-400 ml-1.5">{sub}</span>}
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => onChange(Math.max(min, value - 1))}
                              disabled={value <= min}
                              className="w-7 h-7 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 hover:bg-blue-50 disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-semibold w-4 text-center">{value}</span>
                            <button
                              onClick={() => onChange(value + 1)}
                              className="w-7 h-7 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => setShowGuests(false)}
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>

                {/* Search Button */}
                <button className="flex w-full md:w-auto items-center justify-center gap-2 px-4 py-3 md:px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors rounded-b-lg md:rounded-b-none md:rounded-r-lg">
                  <Search className="w-4 h-4" />
                  Хайх
                </button>
              </div>

              {/* Calendar dropdown */}
              {showCal && (
                <div
                  ref={calRef}
                  className="absolute bottom-full left-0 right-0 md:left-4 md:right-4 mb-2 bg-white border border-gray-200 rounded-xl shadow-2xl p-3 sm:p-5 z-50"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Prev month */}
                    <button
                      onClick={prevMonth}
                      className="mt-0.5 w-8 h-8 shrink-0 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Left month */}
                    <CalendarMonth
                      year={calYear}
                      month={calMonth}
                      checkIn={checkIn}
                      checkOut={checkOut}
                      hovered={hovered}
                      selecting={selecting}
                      onSelect={handleDaySelect}
                      onHover={setHovered}
                    />

                    <div className="hidden md:block w-px bg-gray-200 self-stretch mx-1" />

                    {/* Right month */}
                    <div className="hidden md:block flex-1 min-w-0">
                      <CalendarMonth
                        year={rightYear}
                        month={rightMonth}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        hovered={hovered}
                        selecting={selecting}
                        onSelect={handleDaySelect}
                        onHover={setHovered}
                      />
                    </div>

                    {/* Next month */}
                    <button
                      onClick={nextMonth}
                      className="mt-0.5 w-8 h-8 shrink-0 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col items-end gap-0.5">
                    <span className="text-sm text-gray-700">
                      {fmtShort(checkIn)} – {fmtShort(checkOut)}{" "}
                      <strong>({nights} night{nights !== 1 ? "s" : ""})</strong>
                    </span>
                    <span className="text-xs text-gray-400">All dates are in local time</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

