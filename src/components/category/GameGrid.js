'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useParams } from 'next/navigation';

const GameGrid = ({ categorySlug }) => {
  const [games, setGames] = useState([]);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const params = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.jellyarcade.com/api/categories/slug/${categorySlug}`
        );
        const data = await response.json();
        setCategory(data);
        setGames(data.games || []);
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categorySlug]);

  return (
    <section className='pb-8'>
      <div className='max-w-[95%] mx-auto'>
        <div className='mb-6'>
          <h2 className='text-2xl font-cocogoose font-medium uppercase mb-2 text-[#2cd284]'>
            {category?.name[params.locale]}
          </h2>
          <p className='text-gray-600'>
            {category?.description[params.locale]}
          </p>
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

        {isLoading && (
          <div className='flex justify-center items-center py-8'>
            <div className='w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin' />
          </div>
        )}
      </div>
    </section>
  );
};

export default GameGrid;
