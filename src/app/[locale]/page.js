import GameGrid from "@/components/home/GameGrid";
import HeroSection from "@/components/home/HeroSection";
import RecentlyPlayed from "@/components/home/RecentlyPlayed";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title:
      locale === "tr"
        ? "Ücretsiz Oyunlar & Yüklemeden hemen oyna!"
        : "Free Games & Play without installing!",
    description:
      locale === "tr"
        ? "Ücretsiz online oyunlar oyna. Yükleme yapmadan en iyi ücretsiz oyunlar Jelly Arcade'de."
        : "Play free online games without downloading. Best free online games on Jelly Arcade.",
  };
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <RecentlyPlayed />
      <GameGrid />
    </>
  );
}
