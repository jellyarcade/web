import HeroSection from "@/components/home/HeroSection";
import RecentlyPlayed from "@/components/home/RecentlyPlayed";
import GameGrid from "@/components/home/GameGrid";

export default function Home() {
  return (
    <>
      <HeroSection />
      <RecentlyPlayed />
      <GameGrid />
    </>
  );
}
