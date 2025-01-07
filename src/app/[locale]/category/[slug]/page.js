'use client';

import { useParams } from 'next/navigation';
import GameGrid from '@/components/category/GameGrid';

export default function CategoryPage() {
  const { slug } = useParams();

  return (
    <div className='mt-24'>
      <GameGrid categorySlug={slug} />
    </div>
  );
}
