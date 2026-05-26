export type HotelItem = {
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

type HotelSeed = {
	name: string;
	latitude?: number;
	longitude?: number;
};

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

const mntFormatter = new Intl.NumberFormat("mn-MN");

export const hotels: HotelItem[] = hotelSeedData.map((hotel, index) => {
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

export function formatHotelPrice(price: number) {
	return `${mntFormatter.format(price)} ₮`;
}

export function getPrimaryPhone(phone: string) {
	return phone.split(",")[0].trim().replace(/\s+/g, "");
}