'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

const GameGrid = ({ games = [] }) => {
  const locale = useLocale();

  if (games.length === 0) {
    return (
      <div className='text-center py-8'>
        <p className='text-gray-500'>No games found</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
      {games.map(game => (
        <Link
          key={game._id}
          href={`/${locale}/${game.slug[locale]}`}
          className='group'
        >
          <div className='relative aspect-[3/4] overflow-hidden rounded-lg'>
            <Image
              src={game.thumbnail || '/images/game-placeholder.png'}
              alt={game.title[locale]}
              fill
              className='object-cover group-hover:scale-110 transition-transform duration-300'
              sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            <div className='absolute inset-x-0 bottom-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
              <h3 className='font-semibold text-lg truncate'>
                {game.title[locale]}
              </h3>
              {game.keywords[locale]?.length > 0 && (
                <p className='text-sm text-gray-200 truncate'>
                  {game.keywords[locale].join(', ')}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GameGrid;
