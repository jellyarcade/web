'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Container from '../layout/Container';
import { getAllGames } from '@/services/api';

const GameGrid = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const params = useParams();
  const t = useTranslations('home.gameGrid');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:5001/api/games?lang=${params.locale}`
        );

        const data = await response.json();

        if (Array.isArray(data)) {
          setGames(data);
        } else {
          console.error('Invalid games data:', data);
          setError('Oyunlar yüklenirken bir hata oluştu');
        }
      } catch (error) {
        console.error('Error fetching games:', error);
        setError('Oyunlar yüklenirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [params.locale]);

  const handleRetry = () => {
    setGames([]);
    setError(null);
    fetchGames();
  };

  if (error && games.length === 0) {
    return (
      <section className='md:pt-8 pb-8'>
        <Container>
          <div className='text-center'>
            <p className='text-red-600 mb-4'>{error}</p>
            <button
              onClick={handleRetry}
              className='px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700'
            >
              Tekrar Dene
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className='md:pt-8 pb-8'>
      <Container>
        <div className='mb-6'>
          <h2 className='text-2xl font-cocogoose font-medium uppercase mb-2 text-[#2cd284]'>
            {t('title')}
          </h2>
          <p className='text-gray-600'>{t('subtitle')}</p>
        </div>

        {isLoading ? (
          <div
            className={`grid ${
              isMobile ? 'grid-cols-3 gap-2' : 'grid-cols-10 gap-4'
            }`}
          >
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className='aspect-square bg-gray-200 rounded animate-pulse'
              />
            ))}
          </div>
        ) : (
          <div
            className={`grid ${
              isMobile ? 'grid-cols-3 gap-2' : 'grid-cols-10 gap-4'
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
        )}

        {error && (
          <div className='text-center mt-4'>
            <p className='text-red-600 mb-2'>{error}</p>
            <button
              onClick={handleRetry}
              className='px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700'
            >
              Tekrar Dene
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default GameGrid;
