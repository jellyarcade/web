'use client';

import HeroSection from '@/components/home/HeroSection';
import RecentlyPlayed from '@/components/home/RecentlyPlayed';
import GameGrid from '@/components/category/GameGrid';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.slug;

  return (
    <>
      <HeroSection />
      <RecentlyPlayed />
      <GameGrid categorySlug={categorySlug} />
    </>
  );
}
