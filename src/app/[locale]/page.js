import HeroSection from '@/components/home/HeroSection';
import RecentlyPlayed from '@/components/home/RecentlyPlayed';
import GameGrid from '@/components/home/GameGrid';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title:
      locale === 'tr'
        ? 'Ücretsiz Oyunlar & Yükleme Yok'
        : 'Free Games & No Install',
    description:
      locale === 'tr'
        ? "Ücretsiz online oyunlar oyna. Yükleme yapmadan en iyi ücretsiz oyunlar Jelly Arcade'de."
        : 'Play free online games without downloading. Best free online games on Jelly Arcade.',
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
