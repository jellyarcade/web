'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useParams } from 'next/navigation';

const MostPlayedGrid = ({ games = [] }) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const params = useParams();

  if (!games || games.length === 0) {
    return (
      <div className='flex justify-center items-center py-8'>
        <div className='w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  return (
    <section className='pb-8'>
      <div className='max-w-[95%] mx-auto'>
        <div className='mb-6'>
          <h2 className='text-2xl font-cocogoose font-medium uppercase mb-2 text-[#2cd284]'>
            {params.locale === 'tr' ? 'En İyi Oyunlar' : 'Most Played Games'}
          </h2>
          <p className='text-gray-600'>
            {params.locale === 'tr'
              ? 'En çok oynanan ve beğenilen oyunları keşfet'
              : 'Discover the most played and liked games'}
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
                  sizes='(max-width: 1024px) 20vw, 10vw'
                  className='object-cover transition-transform duration-300 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                <div className='absolute bottom-2 left-2 right-2'>
                  <h3 className='text-white font-medium truncate text-sm'>
                    {game.title[params.locale]}
                  </h3>
                  <div className='flex items-center gap-2 mt-1'>
                    <span className='text-xs text-gray-300'>
                      {game.playCount || 0}{' '}
                      {params.locale === 'tr' ? 'oynanma' : 'plays'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostPlayedGrid;
