'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Container from '../layout/Container';

const GameGrid = () => {
  const [games, setGames] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const params = useParams();
  const t = useTranslations('home.gameGrid');

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 20 oyun yükle (2 tam satır)
        const newGames = Array.from({ length: 20 }, (_, i) => ({
          id: games.length + i + 1,
          title: `Game ${games.length + i + 1}`,
          image: `https://picsum.photos/seed/${games.length + i + 1}/800/600`,
          slug: `game-${games.length + i + 1}`,
        }));

        setGames(prev => [...prev, ...newGames]);
        setHasMore(newGames.length === 20);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching games:', error);
        setIsLoading(false);
      }
    };

    if (inView && hasMore) {
      fetchGames();
    }
  }, [inView, hasMore, games.length]);

  return (
    <section className='md:pt-8 pb-8'>
      <Container>
        <div className='mb-6'>
          <h2 className='text-2xl font-cocogoose font-medium uppercase mb-2 text-[#2cd284]'>
            {t('title')}
          </h2>
          <p className='text-gray-600'>{t('subtitle')}</p>
        </div>

        <div
          className={`grid ${
            isMobile ? 'grid-cols-5 gap-2' : 'grid-cols-10 gap-4'
          }`}
        >
          {games.map(game => (
            <Link
              key={game.id}
              href={`/${params.locale}/${game.slug}`}
              className='block'
            >
              <div className='relative aspect-square rounded-lg overflow-hidden shadow-lg group'>
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className='object-cover transition-transform duration-300 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                <div className='absolute bottom-2 left-2 right-2'>
                  <h3 className='text-white font-medium truncate text-sm'>
                    {game.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {(hasMore || isLoading) && (
          <div ref={ref} className='flex justify-center items-center py-8'>
            <div className='w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin' />
          </div>
        )}
      </Container>
    </section>
  );
};

export default GameGrid;
