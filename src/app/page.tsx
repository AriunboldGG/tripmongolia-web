import Header from "@/components/layout/Header";
import HeroSlider from "@/components/sections/HeroSlider";
import TopHotels from "@/components/sections/TopHotels";
import TopSights from "@/components/sections/TopSights";
import TodayNews from "@/components/sections/TodayNews";
import SellCTA from "@/components/sections/SellCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <Header />
        <HeroSlider />
      </div>
      <TopHotels />
      <TopSights />
      <TodayNews />
      <SellCTA />
      <Footer />
    </main>
  );
}

