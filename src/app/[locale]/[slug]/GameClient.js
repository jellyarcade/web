'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function GameClient({ game, locale }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [showOrientationModal, setShowOrientationModal] = useState(false);
  const [currentOrientation, setCurrentOrientation] = useState('portrait');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: '',
    type: 'success',
  });
  const { token, user } = useAuth();
  const t = useTranslations();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Fullscreen değişikliklerini izle
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener(
        'MSFullscreenChange',
        handleFullscreenChange
      );
    };
  }, []);

  // Favori durumunu kontrol et
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          'https://api.jellyarcade.com/api/users/favorites',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Favori durumu kontrol edilemedi');
        }

        const favorites = await response.json();
        setIsFavorite(favorites.some(fav => fav._id === game._id));
      } catch (err) {
        console.error('Favori durumu kontrol hatası:', err);
      }
    };

    checkFavoriteStatus();
  }, [token, game._id]);

  // Snackbar'ı göster ve otomatik gizle
  const showSnackbar = (message, type = 'success') => {
    setSnackbar({ show: true, message, type });
    setTimeout(() => {
      setSnackbar({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  // Favoriye ekleme/çıkarma işlemi
  const toggleFavorite = async () => {
    if (!token) {
      setShowAuthModal(true);
      return;
    }

    try {
      setIsLoading(true);
      const method = isFavorite ? 'DELETE' : 'POST';
      const response = await fetch(
        `https://api.jellyarcade.com/api/users/favorites/${game._id}`,
        {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Favori işlemi başarısız oldu');
      }

      const data = await response.json();
      setIsFavorite(!isFavorite);

      // AuthContext'teki user state'ini güncelle
      if (user) {
        user.favorites = data;
      }

      // Başarılı işlem sonrası snackbar göster
      showSnackbar(
        isFavorite
          ? t('game.removedFromFavorites')
          : t('game.addedToFavorites'),
        'success'
      );
    } catch (error) {
      console.error('Favori işlemi hatası:', error);
      showSnackbar(t('game.favoriteError'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Ekran oryantasyonunu kontrol et
  useEffect(() => {
    const checkOrientation = () => {
      if (!isMobile) return; // Sadece mobilde kontrol et

      const isPortrait = window.innerHeight > window.innerWidth;
      setCurrentOrientation(isPortrait ? 'vertical' : 'horizontal');

      // Oyun başladıysa oryantasyon kontrolü yap
      if (isPlaying) {
        const needsLandscape = game.orientation === 'horizontal';
        const needsPortrait = game.orientation === 'vertical';

        setShowOrientationModal(
          (needsLandscape && isPortrait) || (needsPortrait && !isPortrait)
        );
      }
    };

    // İlk kontrol
    checkOrientation();

    // Ekran döndürüldüğünde kontrol et
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, [isPlaying, game.orientation, isMobile]);

  const handlePlay = async () => {
    try {
      // Oyunu başlatmadan önce oryantasyon kontrolü yap
      if (isMobile) {
        const isPortrait = window.innerHeight > window.innerWidth;
        const needsLandscape = game.orientation === 'horizontal';
        const needsPortrait = game.orientation === 'vertical';

        if ((needsLandscape && isPortrait) || (needsPortrait && !isPortrait)) {
          setShowOrientationModal(true);
          return; // Oryantasyon uyarısı gösteriliyorsa burada dur
        }
      }

      // Oyunu başlat
      setIsPlaying(true);

      // Mobilde oyun başladığında otomatik olarak fullscreen yap
      if (isMobile) {
        setTimeout(() => {
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
        }, 1000); // iframe'in yüklenmesi için kısa bir süre bekle
      }

      // Oyun başladıktan sonra API'ye bildir veya localStorage'a kaydet
      if (token) {
        await fetch(`https://api.jellyarcade.com/api/games/${game._id}/play`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Giriş yapmamış kullanıcılar için localStorage'a kaydet
        const recentGames = JSON.parse(
          localStorage.getItem('recentGames') || '[]'
        );
        const gameData = {
          game: {
            _id: game._id,
            title: game.title,
            slug: game.slug,
            image: game.image,
          },
          playedAt: new Date().toISOString(),
        };

        // Aynı oyun varsa listeden çıkar
        const filteredGames = recentGames.filter(
          item => item.game._id !== game._id
        );

        // Yeni oyunu başa ekle ve son 10 oyunu tut
        filteredGames.unshift(gameData);
        if (filteredGames.length > 10) {
          filteredGames.pop();
        }

        localStorage.setItem('recentGames', JSON.stringify(filteredGames));
      }
    } catch (error) {
      console.error('Error playing game:', error);
    }
  };

  // Oryantasyon uyarı modalı
  const OrientationModal = () => (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-white p-6 rounded-lg max-w-sm mx-4 text-center'>
        <div className='mb-4'>
          {game.orientation === 'landscape' ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-16 w-16 mx-auto text-brand-orange'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-16 w-16 mx-auto text-brand-orange rotate-90'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z'
              />
            </svg>
          )}
        </div>
        <h3 className='text-lg font-bold mb-2'>
          {game.orientation === 'landscape'
            ? 'Lütfen cihazınızı yatay çevirin'
            : 'Lütfen cihazınızı dikey çevirin'}
        </h3>
        <p className='text-gray-600 mb-4'>
          {game.orientation === 'landscape'
            ? 'Bu oyun yatay modda oynanmak için tasarlanmıştır.'
            : 'Bu oyun dikey modda oynanmak için tasarlanmıştır.'}
        </p>
        <button
          onClick={() => {
            setShowOrientationModal(false);
            // Oyunu başlat
            setIsPlaying(true);
            // Kısa bir süre bekleyip fullscreen yap
            setTimeout(() => {
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
            }, 1000);
          }}
          className='bg-brand-orange text-white px-4 py-2 rounded hover:bg-brand-orange/90 transition-colors'
        >
          Anladım
        </button>
      </div>
    </div>
  );

  return (
    <div className='container mx-auto px-4 py-8 mt-[72px]'>
      {showOrientationModal && <OrientationModal />}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* Snackbar */}
      {snackbar.show && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white transition-all transform ${
            snackbar.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {snackbar.message}
        </div>
      )}

      <div className='max-w-5xl mx-auto space-y-6'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold'>{game.title[locale]}</h1>
            <div className='text-sm text-gray-500 mt-1'>
              {game.playCount || 0}{' '}
              {locale === 'tr' ? 'kez oynandı' : 'times played'}
            </div>
          </div>

          {/* Favori Butonu */}
          <button
            onClick={toggleFavorite}
            disabled={isLoading}
            className={`p-2 rounded-full transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
            title={
              isFavorite
                ? t('game.removeFromFavorites')
                : t('game.addToFavorites')
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke='currentColor'
              className={`w-6 h-6 ${
                isFavorite ? 'text-red-500' : 'text-gray-600'
              } ${isLoading ? 'opacity-50' : ''}`}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
              />
            </svg>
          </button>
        </div>

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
            <>
              <div className='aspect-video w-full rounded-lg overflow-hidden shadow-lg relative'>
                <iframe
                  src={game.instantLink}
                  className='w-full h-full border-0'
                  allow='fullscreen; autoplay; clipboard-write; encrypted-media; picture-in-picture'
                  allowFullScreen
                  sandbox='allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation'
                  loading='lazy'
                  referrerPolicy='origin'
                  title={game.title[locale]}
                />
                {/* Full Screen Butonu - Masaüstü için */}
                {!isMobile && (
                  <button
                    onClick={() => {
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
                    }}
                    className='absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors'
                    title='Full Screen'
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
                )}
              </div>
              {/* Mobil için tam ekrana dön butonu - Fullscreen modunda değilken göster */}
              {isMobile && isPlaying && !isFullscreen && (
                <div className='mt-4'>
                  <button
                    onClick={() => {
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
                    }}
                    className='w-full bg-brand-orange text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-brand-orange/90 transition-colors'
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
                    {locale === 'tr'
                      ? 'Tam Ekranda Devam Et'
                      : 'Continue in Full Screen'}
                  </button>
                </div>
              )}
            </>
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
