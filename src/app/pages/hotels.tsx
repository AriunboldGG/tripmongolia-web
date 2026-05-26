"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, MapPin, Star } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

const ITEMS_PER_PAGE = 24;

const hotelPhotos = [
	"https://images.pexels.com/photos/34081799/pexels-photo-34081799.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/34710615/pexels-photo-34710615.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/6876607/pexels-photo-6876607.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/29618555/pexels-photo-29618555.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/15263559/pexels-photo-15263559.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/32722830/pexels-photo-32722830.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/33803745/pexels-photo-33803745.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/14036251/pexels-photo-14036251.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/34855485/pexels-photo-34855485.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/10613691/pexels-photo-10613691.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/33330666/pexels-photo-33330666.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/26729558/pexels-photo-26729558.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/34054094/pexels-photo-34054094.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/30774442/pexels-photo-30774442.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/32334284/pexels-photo-32334284.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/34496708/pexels-photo-34496708.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/34076619/pexels-photo-34076619.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/32671518/pexels-photo-32671518.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/32693157/pexels-photo-32693157.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/36970800/pexels-photo-36970800.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/34496713/pexels-photo-34496713.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/30177910/pexels-photo-30177910.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/26729563/pexels-photo-26729563.jpeg?auto=compress&cs=tinysrgb&w=1200",
	"https://images.pexels.com/photos/6876590/pexels-photo-6876590.jpeg?auto=compress&cs=tinysrgb&w=1200",
] as const;

type HotelSeed = {
	name: string;
	latitude?: number;
	longitude?: number;
};

const hotelPhones = [
	"99913100",
	"99379833",
	"99028892",
	"99014696",
	"95271698",
	"99191907",
	"94910004",
	"95200219",
	"99054155",
	"99959256",
	"88069534",
	"99372211",
	"99080782",
	"99991055",
	"99105796, 99048103",
	"99372220",
	"96371002",
	"95235002",
	"80101022",
	"80329090",
	"99099802",
	"99093502",
	"99010855",
	"88370808, 99406767",
	"99110532",
	"99031331",
	"99764565",
	"99050488",
	"93399449",
	"99558009",
	"99085467",
	"99084548",
	"88073577",
	"99914085",
	"99377509",
	"86018559, 99371234",
	"99092284",
] as const;

const hotelSeedData: HotelSeed[] = [
	{ name: "SB зочид буудал", latitude: 49.455750761721106, longitude: 105.96931338421871 },
	{ name: "Зулжавхлан", latitude: 49.48476334483514, longitude: 105.93432856567753 },
	{ name: "Бадмаараг буудал", latitude: 49.49600249267252, longitude: 105.94127414796107 },
	{ name: "Нэгүл буудал", latitude: 49.48519310549282, longitude: 105.94603723756978 },
	{ name: "Нүүдэлчин", latitude: 49.483120384325325, longitude: 105.94168967409539 },
	{ name: "Од", latitude: 49.48271573790716, longitude: 105.94213009628635 },
	{ name: "Од буудал", latitude: 49.47179070787604, longitude: 105.95009433163158 },
	{ name: "Мэргэд", latitude: 49.47118603250075, longitude: 105.95455468960002 },
	{ name: "Ундрал", latitude: 49.46756309066986, longitude: 105.96512059270351 },
	{ name: "Алтай", latitude: 49.45873326725853, longitude: 105.96689725056383 },
	{ name: "Дархан буудал", latitude: 49.46989085458606, longitude: 105.9629171752559 },
	{ name: "МБМ", latitude: 49.477620439972476, longitude: 105.94118893001145 },
	{ name: "RICH", latitude: 49.46806738576901, longitude: 105.96010058002018 },
	{ name: "SKY", latitude: 49.48082214037896, longitude: 105.94290774075802 },
	{ name: "Буудай", latitude: 49.46710122013661, longitude: 105.95615732469214 },
	{ name: "JASPER", latitude: 49.48378154573478, longitude: 105.94150481151618 },
	{ name: "Цацрал", latitude: 49.46661428199093, longitude: 105.96086596337128 },
	{ name: "Mr.Punti", latitude: 49.456991224326906, longitude: 105.96027341686725 },
	{ name: "Киви", latitude: 49.469591793628155, longitude: 105.95313373484194 },
	{ name: "Комфорт", latitude: 49.462281336144336, longitude: 105.95937848140329 },
	{ name: "Роял", latitude: 49.46862035262701, longitude: 105.96291440849033 },
	{ name: "Хараа", latitude: 49.462406669920846, longitude: 105.96028895990311 },
	{ name: "Голд", latitude: 49.4862734655318, longitude: 105.93684891504367 },
	{ name: "Улаан-Үдэ", latitude: 49.46968980623443, longitude: 105.9559469156329 },
	{ name: "Ocean баар, зочид буудал", latitude: 49.49319065617552, longitude: 105.93447642806261 },
	{ name: "Молор-Эрдэнэ", latitude: 49.46712123984562, longitude: 105.98892732389834 },
	{ name: "Сод буудал", latitude: 49.460169858791524, longitude: 105.96951036731288 },
	{ name: "Өсөх буудал", latitude: 49.46059077637988, longitude: 105.96929256263199 },
	{ name: "Queen", latitude: 49.46110312159809, longitude: 105.96783599978725 },
	{ name: "Шүтээн", latitude: 49.48713422527728, longitude: 105.93645194811927 },
	{ name: "Номгон", latitude: 49.487660844788, longitude: 105.9354907749244 },
	{ name: "Vega", latitude: 49.470911834376174, longitude: 105.95228708944603 },
	{ name: "Аз", latitude: 49.485319864338884, longitude: 105.93183711816276 },
	{ name: "Як" },
	{ name: "Нүүдэлчин" },
	{ name: "Шинэ" },
	{ name: "Link зочид буудал" },
] as const;

type HotelItem = {
	id: number;
	name: string;
	image: string;
	rating: number;
	reviewCount: number;
	stars: number;
	locationText: string;
	phone: string;
	price: number;
	mapUrl: string;
};

const mntFormatter = new Intl.NumberFormat("mn-MN");

const hotels: HotelItem[] = hotelSeedData.map((hotel, index) => {
	const rating = Number((8.2 + ((index * 2) % 15) / 10).toFixed(1));
	const stars = 2 + (index % 4);
	const price = 95_000 + index * 12_000;
	const latitude = hotel.latitude;
	const longitude = hotel.longitude;
	const hasCoordinates = typeof latitude === "number" && typeof longitude === "number";
	const phone = hotelPhones[index] ?? "Утас байхгүй";
	const mapUrl = hasCoordinates
		? `https://www.google.com/maps?q=${latitude},${longitude}`
		: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.name}, Darkhan, Mongolia`)}`;

	return {
		id: index + 1,
		name: hotel.name,
		image: hotelPhotos[index % hotelPhotos.length],
		rating,
		reviewCount: 18 + ((index * 19) % 210),
		stars,
		locationText: hasCoordinates ? "Дархан, Монгол Улс" : "Дархан хотын хайлтын байршил",
		phone,
		price,
		mapUrl,
	};
});

function HotelStars({ count }: { count: number }) {
	return (
		<div className="flex items-center gap-0.5 text-amber-400">
			{Array.from({ length: count }).map((_, index) => (
				<Star key={index} className="h-3.5 w-3.5 fill-current" />
			))}
		</div>
	);
}

function formatPrice(price: number) {
	return `${mntFormatter.format(price)} ₮`;
}

function getPrimaryPhone(phone: string) {
	return phone.split(",")[0].trim().replace(/\s+/g, "");
}

export default function HotelsCatalogPage() {
	const [page, setPage] = useState(1);
	const totalPages = Math.ceil(hotels.length / ITEMS_PER_PAGE);

	const visibleHotels = useMemo(() => {
		const start = (page - 1) * ITEMS_PER_PAGE;
		return hotels.slice(start, start + ITEMS_PER_PAGE);
	}, [page]);

	return (
		<main className="min-h-screen bg-slate-50">
			<section className="relative bg-[radial-gradient(circle_at_top,#1d4ed8_0%,#0f172a_52%,#020617_100%)] text-white">
				<Header />
				<div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-32 pb-12 sm:px-6 sm:pt-36 sm:pb-16">
					<div className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-white/80">
						Darkhan Hotels
					</div>
					<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
						<div className="max-w-2xl">
							<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
								Дархан хотын бүртгэгдсэн зочид буудлын жагсаалт
							</h1>
							<p className="mt-3 text-sm text-white/70 sm:text-base">
								Та өөрт таалагдсан зочид буудлаа сонгоорой. Бид хамгийн сүүлийн үеийн мэдээллийг байнга шинэчилсээр байна.
							</p>
						</div>
						{/* <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur">
							<p className="text-xs uppercase tracking-[0.24em] text-white/60">Inventory</p>
							<p className="mt-2 text-2xl font-semibold">{hotels.length} буудал</p>
							<p className="mt-1 text-sm text-white/70">Хуудас {page} / {totalPages}</p>
						</div> */}
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
				<div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h2 className="text-2xl font-semibold text-slate-950">Зочид буудлууд</h2>
						<p className="mt-1 text-sm text-slate-500">
							{(page - 1) * ITEMS_PER_PAGE + 1}-{Math.min(page * ITEMS_PER_PAGE, hotels.length)} / {hotels.length} буудал
						</p>
					</div>
					
				</div>

				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
					{visibleHotels.map((hotel) => (
						<Card
							key={hotel.id}
							className="gap-0 overflow-hidden border-0 bg-white py-0 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] ring-1 ring-slate-200"
						>
							<div className="relative aspect-[4/3] overflow-hidden">
								<Image
									src={hotel.image}
									alt={hotel.name}
									fill
									className="object-cover"
									sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
								<div className="absolute left-3 top-3 inline-flex items-center rounded-full border-2 border-blue-600 bg-white px-2.5 py-1 text-sm font-semibold text-blue-700 shadow-sm">
									{hotel.rating}/10 <span className="ml-1 font-normal text-blue-600">{hotel.reviewCount} сэтгэгдэл</span>
								</div>
							</div>

							<CardContent className="space-y-3 px-4 py-4">
								<CardTitle className="text-xl font-semibold leading-tight text-slate-900">
									{hotel.name}
								</CardTitle>
								<HotelStars count={hotel.stars} />
								<div className="flex items-start gap-2 text-sm leading-6 text-slate-600">
									<MapPin className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
									<div>
										<p>{hotel.locationText}</p>
										<p className="font-medium text-slate-700">Утас: {hotel.phone}</p>
									</div>
								</div>
							</CardContent>

							<CardFooter className="mt-auto grid grid-cols-1 gap-3 border-slate-200 bg-slate-50/80">
								<div>
									<p className="text-xs uppercase tracking-[0.18em] text-slate-400">Үнэ</p>
									<p className="whitespace-nowrap text-2xl font-semibold tracking-tight text-slate-900 xl:text-3xl">{formatPrice(hotel.price)}</p>
								</div>
								<div className="grid grid-cols-1 gap-2">
									<Button
										onClick={() => window.open(hotel.mapUrl, "_blank", "noopener,noreferrer")}
										className="w-full rounded-full bg-slate-950 px-2 text-[11px] text-white hover:bg-slate-800 sm:px-3 sm:text-xs"
									>
										<ExternalLink className="mr-1 h-4 w-4" />
										Show in map
									</Button>
									<div className="grid grid-cols-2 gap-2">
										<Button
											onClick={() => window.open(`tel:${getPrimaryPhone(hotel.phone)}`, "_self")}
											variant="outline"
											className="w-full rounded-full px-2 text-[11px] sm:px-3 sm:text-xs"
										>
											Холбоо барих
										</Button>
										<Button
											onClick={() => window.open(hotel.mapUrl, "_blank", "noopener,noreferrer")}
											className="w-full rounded-full bg-slate-950 px-2 text-[9px] text-white hover:bg-slate-800 sm:px-3 sm:text-[10px]"
										>
											Дэлгэрэнгүй харах
										</Button>
									</div>
								</div>
							</CardFooter>
						</Card>
					))}
				</div>

				<div className="mt-10 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
					<p className="text-sm text-slate-500">
						Нэг хуудсанд {ITEMS_PER_PAGE} буудал харуулж байна.
					</p>

					<div className="flex flex-wrap items-center gap-2">
						<Button
							variant="outline"
							onClick={() => setPage((current) => Math.max(1, current - 1))}
							disabled={page === 1}
							className="rounded-full"
						>
							<ChevronLeft className="mr-1 h-4 w-4" />
							Өмнөх
						</Button>

						{Array.from({ length: totalPages }).map((_, index) => {
							const pageNumber = index + 1;

							return (
								<Button
									key={pageNumber}
									variant={pageNumber === page ? "default" : "outline"}
									onClick={() => setPage(pageNumber)}
									className={pageNumber === page ? "rounded-full bg-blue-600 hover:bg-blue-700" : "rounded-full"}
								>
									{pageNumber}
								</Button>
							);
						})}

						<Button
							variant="outline"
							onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
							disabled={page === totalPages}
							className="rounded-full"
						>
							Дараах
							<ChevronRight className="ml-1 h-4 w-4" />
						</Button>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}