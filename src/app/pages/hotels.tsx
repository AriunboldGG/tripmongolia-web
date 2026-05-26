"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, MapPin, Star } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { formatHotelPrice, getPrimaryPhone, hotels } from "../../lib/hotels";

const ITEMS_PER_PAGE = 24;

function HotelStars({ count }: { count: number }) {
	return (
		<div className="flex items-center gap-0.5 text-amber-400">
			{Array.from({ length: count }).map((_, index) => (
				<Star key={index} className="h-3.5 w-3.5 fill-current" />
			))}
		</div>
	);
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
									<p className="whitespace-nowrap text-2xl font-semibold tracking-tight text-slate-900 xl:text-3xl">{formatHotelPrice(hotel.price)}</p>
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