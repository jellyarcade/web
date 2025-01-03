'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';

export default function GameClient({ game, locale }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { token } = useAuth();
  const t = useTranslations();

  const handlePlay = async () => {
    try {
      // Önce API'ye istek at
      const response = await fetch(
        `http://localhost:5001/api/games/${game._id}/play`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error('Error playing game:', response.statusText);
        return;
      }

      // Sonra oyunu başlat
      setIsPlaying(true);

      // Oyun başladığında otomatik olarak fullscreen yap
      const iframe = document.querySelector('iframe');
      if (iframe) {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
          iframe.webkitRequestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
          iframe.mozRequestFullScreen();
        } else if (iframe.msRequestFullscreen) {
          iframe.msRequestFullscreen();
        }
      }
    } catch (error) {
      console.error('Error playing game:', error);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8 mt-[72px]'>
      <div className='max-w-5xl mx-auto space-y-6'>
        <h1 className='text-3xl font-bold'>{game.title[locale]}</h1>

        <div className='relative'>
          {!isPlaying ? (
            // Oyun başlamadan önce resim ve play butonu göster
            <div className='relative aspect-video w-full rounded-lg overflow-hidden shadow-lg'>
              <Image
                src={game.image || '/images/game-placeholder.jpg'}
                alt={game.title[locale]}
                fill
                className='object-cover'
              />

              {/* Karartma Efekti */}
              <div className='absolute inset-0 bg-black/30 transition-opacity hover:opacity-0' />

              {/* Play Butonu */}
              <button
                onClick={handlePlay}
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-10 h-10 text-brand-orange translate-x-0.5'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          ) : (
            // Oyun başladığında iframe'i göster
            <div className='aspect-video w-full rounded-lg overflow-hidden shadow-lg'>
              <iframe
                src={game.instantLink}
                className='w-full h-full border-0'
                allow='fullscreen'
              />
            </div>
          )}
        </div>

        {/* Oyun Detayları Akordiyon */}
        <div className='border rounded-lg overflow-hidden'>
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className='w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between'
          >
            <span className='font-medium'>{t('game.gameDetails')}</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className={`w-5 h-5 transition-transform ${
                isDetailsOpen ? 'rotate-180' : ''
              }`}
            >
              <path
                fillRule='evenodd'
                d='M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z'
                clipRule='evenodd'
              />
            </svg>
          </button>

          {isDetailsOpen && (
            <div className='p-4 space-y-4'>
              {/* Oynanma Sayısı */}
              <div>
                <span className='text-sm text-gray-500'>
                  {t('game.playCount', { count: game.playCount || 0 })}
                </span>
              </div>

              {/* Açıklama */}
              {game.description?.[locale] && (
                <div>
                  <h3 className='font-medium mb-2'>{t('game.description')}:</h3>
                  <p className='text-gray-600'>{game.description[locale]}</p>
                </div>
              )}

              {/* Kategori */}
              {game.categories?.length > 0 && (
                <div>
                  <h3 className='font-medium mb-2'>{t('game.category')}:</h3>
                  <div className='flex flex-wrap gap-2'>
                    {game.categories.map(category => (
                      <span
                        key={category._id}
                        className='px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm'
                      >
                        {category.name[locale]}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Etiketler */}
              {game.keywords?.[locale]?.length > 0 && (
                <div>
                  <h3 className='font-medium mb-2'>{t('game.tags')}:</h3>
                  <div className='flex flex-wrap gap-2'>
                    {game.keywords[locale].map(keyword => (
                      <span
                        key={keyword}
                        className='px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm'
                      >
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
