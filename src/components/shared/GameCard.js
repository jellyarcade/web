'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HiPlay, HiHeart } from 'react-icons/hi';
import { useAuth } from '@/contexts/AuthContext';
import { playGame } from '@/services/api';

export default function GameCard({ game }) {
  const { user } = useAuth();

  const handlePlay = async e => {
    e.preventDefault();
    if (!user) {
      // TODO: Show auth modal
      return;
    }

    try {
      await playGame(game._id);
      window.location.href = game.instantLink;
    } catch (error) {
      console.error('Error playing game:', error);
    }
  };

  if (!game) {
    return null;
  }

  return (
    <Link href={`/games/${game.slug.tr}`}>
      <div className='group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105'>
        <div className='aspect-[4/3] relative'>
          <Image
            src={game.image}
            alt={game.title.tr}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
          />
          <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity'>
            <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
              <button
                onClick={handlePlay}
                className='bg-orange-600 text-white p-3 rounded-full hover:bg-orange-700 transition-colors'
              >
                <HiPlay className='w-6 h-6' />
              </button>
            </div>
          </div>
        </div>
        <div className='p-4'>
          <h3 className='font-semibold text-gray-900 truncate'>
            {game.title.tr}
          </h3>
          <div className='flex items-center justify-between mt-2'>
            <div className='flex items-center text-sm text-gray-600'>
              <HiPlay className='w-4 h-4 mr-1' />
              {game.playCount || 0}
            </div>
            <button
              onClick={e => {
                e.preventDefault();
                // TODO: Add to favorites
              }}
              className='text-gray-400 hover:text-red-500 transition-colors'
            >
              <HiHeart className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
