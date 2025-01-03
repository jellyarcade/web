'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const games = [
  {
    id: 'world-of-tanks',
    title: {
      tr: 'World of Tanks Blitz',
      en: 'World of Tanks Blitz',
    },
    image: '/games/wot.jpg',
    orientation: 'landscape',
  },
  {
    id: 'giant-rush',
    title: {
      tr: 'Giant Rush',
      en: 'Giant Rush',
    },
    image: '/games/giant-rush.jpg',
    orientation: 'portrait',
  },
];

const GameGrid = () => {
  const params = useParams();
  const t = useTranslations('home.gameGrid');
  const isMobile = useMediaQuery('(max-width: 1024px)');

  return (
    <section className='md:pt-8 pb-8'>
      <div className='max-w-[90%] mx-auto'>
        <div className='mb-6'>
          <h2 className='text-2xl font-cocogoose font-medium uppercase mb-2 text-[#2cd284]'>
            {t('title')}
          </h2>
          <p className='text-gray-600'>{t('subtitle')}</p>
        </div>

        <div
          className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}
        >
          {games.map(game => (
            <Link
              key={game.id}
              href={`/${params.locale}/${game.id}`}
              className='block'
            >
              <div
                className={`relative ${
                  game.orientation === 'portrait'
                    ? 'aspect-[9/16]'
                    : 'aspect-video'
                } rounded-lg overflow-hidden shadow-lg group`}
              >
                <Image
                  src={game.image}
                  alt={game.title[params.locale]}
                  fill
                  className='object-cover transition-transform duration-300 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                <div className='absolute bottom-2 left-2 right-2'>
                  <h3 className='text-white font-medium truncate'>
                    {game.title[params.locale]}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameGrid;
