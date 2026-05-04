import Header from "@/components/layout/Header";
import HeroSlider from "@/components/sections/HeroSlider";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <Header />
        <HeroSlider />
      </div>
    </main>
  );
}

