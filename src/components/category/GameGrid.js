'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const GameGrid = ({ categorySlug }) => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const params = useParams();
  const t = useTranslations('category');

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.jellyarcade.com/api/games?category=${categorySlug}&page=${page}&limit=20&lang=${params.locale}`
        );
        const data = await response.json();

        if (data && data.data) {
          setGames(prev => [...prev, ...data.data]);
          setHasMore(data.data.length === 20);
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (inView && hasMore) {
      fetchGames();
      setPage(prev => prev + 1);
    }
  }, [inView, hasMore, categorySlug, page, params.locale]);

  return (
    <section className='md:pt-8 pb-8'>
      <div className='max-w-[95%] mx-auto'>
        <div className='mb-6'>
          <h2 className='text-2xl font-cocogoose font-medium uppercase mb-2 text-[#2cd284]'>
            {t(`categories.${categorySlug}`)}
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
              key={game._id}
              href={`/${params.locale}/${game.slug[params.locale]}`}
              className='block'
            >
              <div className='relative aspect-square rounded-lg overflow-hidden shadow-lg group'>
                <Image
                  src={game.image || '/images/game-placeholder.jpg'}
                  alt={game.title[params.locale]}
                  fill
                  className='object-cover transition-transform duration-300 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                <div className='absolute bottom-2 left-2 right-2'>
                  <h3 className='text-white font-medium truncate text-sm'>
                    {game.title[params.locale]}
                  </h3>
                  <div className='flex items-center gap-2 mt-1'>
                    <span className='text-xs text-gray-300'>
                      {game.playCount || 0} oynanma
                    </span>
                  </div>
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
      </div>
    </section>
  );
};

export default GameGrid;
