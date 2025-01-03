'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllGames } from '@/services/api';
import GameCard from '@/components/shared/GameCard';

export default function GamesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ['games', page],
    queryFn: () => getAllGames(page),
  });

  const games = data?.games || [];
  const totalPages = data?.totalPages || 1;

  if (error) {
    return (
      <div className='py-12 text-center text-red-600'>
        Oyunlar yüklenirken bir hata oluştu
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold'>Tüm Oyunlar</h1>
      </div>

      {isLoading ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className='aspect-[4/3] bg-gray-200 rounded animate-pulse'
            ></div>
          ))}
        </div>
      ) : (
        <>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {games.map(game => (
              <GameCard key={game._id} game={game} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className='mt-8 flex justify-center gap-2'>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className='px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
              >
                Önceki
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 border rounded-md ${
                    page === i + 1
                      ? 'bg-orange-600 text-white'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className='px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
              >
                Sonraki
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
