'use client';

import { useState, useEffect, use } from 'react';
import Container from '@/components/layout/Container';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PlayCircleIcon } from '@heroicons/react/24/solid';

export default function GamePage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `http://localhost:5001/api/games/${params.slug}`
        );
        if (!response.ok) {
          throw new Error('Oyun bulunamadı');
        }
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error('Error fetching game:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGame();
  }, [params.slug]);

  useEffect(() => {
    if (game && locale !== params.locale) {
      router.push(`/${locale}/games/${game.slug[locale]}`);
    }
  }, [locale, game, params.locale, router]);

  if (isLoading) {
    return (
      <Container>
        <div className='mt-24 animate-pulse'>
          <div className='max-w-4xl mx-auto'>
            <div className='space-y-8'>
              <div className='relative aspect-video bg-gray-200 rounded-lg' />
              <div className='space-y-4'>
                <div className='h-8 bg-gray-200 rounded w-3/4' />
                <div className='h-4 bg-gray-200 rounded w-full' />
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className='mt-24 text-center'>
          <h1 className='text-2xl font-bold text-red-600 mb-4'>{error}</h1>
          <button
            onClick={() => window.history.back()}
            className='px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700'
          >
            Geri Dön
          </button>
        </div>
      </Container>
    );
  }

  if (!game) {
    return null;
  }

  const handlePlay = () => {
    window.open(game.instantLink, '_blank');
  };

  return (
    <Container>
      <div className='mt-24 max-w-4xl mx-auto space-y-6'>
        {/* Oyun Görseli ve Oynat Butonu */}
        <div className='relative aspect-video rounded-lg overflow-hidden group'>
          <img
            src={game.image}
            alt={game.title[params.locale]}
            className='object-cover w-full h-full'
          />
          <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
            <button
              onClick={handlePlay}
              className='transform scale-90 group-hover:scale-100 transition-transform'
            >
              <PlayCircleIcon className='w-24 h-24 text-white hover:text-orange-500 transition-colors' />
            </button>
          </div>
        </div>

        {/* Oyun Başlığı */}
        <h1 className='text-4xl font-bold text-center'>
          {game.title[params.locale]}
        </h1>

        {/* Oyun Detayları Akordiyon */}
        <div className='border rounded-lg overflow-hidden'>
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className='w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors'
          >
            <span className='font-semibold'>Oyun Detayları</span>
            <ChevronDownIcon
              className={`w-5 h-5 transition-transform ${
                isDetailsOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isDetailsOpen && (
            <div className='p-6 space-y-6 border-t'>
              {/* Açıklama */}
              <div>
                <h2 className='text-lg font-semibold mb-2'>Açıklama</h2>
                <p className='text-gray-600'>
                  {game.description[params.locale]}
                </p>
              </div>

              {/* Kategoriler */}
              <div>
                <h2 className='text-lg font-semibold mb-2'>Kategoriler</h2>
                <div className='flex flex-wrap gap-2'>
                  {game.categories.map(category => (
                    <span
                      key={category._id}
                      className='px-3 py-1 bg-gray-100 rounded-full text-sm'
                    >
                      {category.name[params.locale]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Oynanma Sayısı */}
              <div>
                <h2 className='text-lg font-semibold mb-2'>İstatistikler</h2>
                <p className='text-gray-600'>{game.playCount} kez oynandı</p>
              </div>
            </div>
          )}
        </div>

        {/* Oynat Butonu */}
        <div className='text-center'>
          <button
            onClick={handlePlay}
            className='px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'
          >
            Şimdi Oyna
          </button>
        </div>
      </div>
    </Container>
  );
}
