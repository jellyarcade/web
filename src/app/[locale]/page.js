import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import RecentlyPlayed from "@/components/home/RecentlyPlayed";
import GameGrid from "@/components/home/GameGrid";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <RecentlyPlayed />
        <GameGrid />
      </main>
    </>
  );
}
