'use client';

import { useRef, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function GamePage() {
  const iframeRef = useRef(null);
  const params = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/games/${params.slug}`);
        if (!response.ok) {
          throw new Error('Game not found');
        }
        const data = await response.json();
        setGame(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGame();
  }, [params.slug]);

  const handleFullScreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if (iframeRef.current.webkitRequestFullscreen) {
        iframeRef.current.webkitRequestFullscreen();
      } else if (iframeRef.current.mozRequestFullScreen) {
        iframeRef.current.mozRequestFullScreen();
      } else if (iframeRef.current.msRequestFullscreen) {
        iframeRef.current.msRequestFullscreen();
      }
    }
  };

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <h1 className='text-2xl font-bold text-red-500'>{error}</h1>
      </div>
    );
  }

  if (!game) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8 mt-[72px]'>
      <div className='max-w-5xl mx-auto space-y-6'>
        <h1 className='text-3xl font-bold'>{game.title[params.locale]}</h1>

        <div className='relative'>
          <div className='aspect-video w-full rounded-lg overflow-hidden shadow-lg'>
            <iframe
              ref={iframeRef}
              src={game.url}
              className='w-full h-full border-0'
              allow='fullscreen'
            />
          </div>

          <button
            onClick={handleFullScreen}
            className='absolute bottom-4 right-4 px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
              />
            </svg>
          </button>
        </div>

        <p className='text-gray-600'>{game.description?.[params.locale]}</p>

        {game.keywords && (
          <div className='space-y-2'>
            <h2 className='text-lg font-semibold'>Etiketler:</h2>
            <div className='flex flex-wrap gap-2'>
              {game.keywords[params.locale]?.map(keyword => (
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
    </div>
  );
}
