'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { IoClose, IoSearch } from 'react-icons/io5';
import { useTranslations } from 'next-intl';

const SearchModal = ({ isOpen, onClose, searchQuery: initialQuery = '' }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const params = useParams();
  const t = useTranslations('search');

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Simüle edilmiş API çağrısı
        await new Promise(resolve => setTimeout(resolve, 500));

        // Örnek veri
        const mockResults = Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          title: `Game ${i + 1}`,
          image: `https://picsum.photos/seed/${i + 1}/400/300`,
          category: i % 2 === 0 ? 'action' : 'adventure',
          slug: `game-${i + 1}`,
        }));

        setResults(mockResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20'>
      <div className='bg-white w-full max-w-3xl rounded-lg shadow-xl max-h-[80vh] overflow-hidden'>
        {/* Header with Search Input */}
        <div className='p-4 border-b'>
          <div className='flex items-center gap-3'>
            <div className='relative flex-1'>
              <input
                type='text'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('search')}
                className='w-full h-11 pl-12 pr-4 bg-gray-100 rounded-lg outline-none focus:ring-2 ring-brand-orange/50'
                autoFocus
              />
              <IoSearch className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
            </div>
            <button
              onClick={onClose}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
            >
              <IoClose className='w-6 h-6' />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className='p-4 overflow-y-auto max-h-[calc(80vh-73px)]'>
          {loading ? (
            <div className='flex justify-center py-8'>
              <div className='w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin' />
            </div>
          ) : results.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {results.map(game => (
                <Link
                  key={game.id}
                  href={`/${params.locale}/${game.slug}`}
                  onClick={onClose}
                  className='block group'
                >
                  <div className='relative aspect-square rounded-lg overflow-hidden shadow-lg'>
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill
                      className='object-cover transition-transform duration-300 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                    <div className='absolute bottom-2 left-2 right-2'>
                      <h3 className='text-white font-medium truncate text-sm'>
                        {game.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className='text-center py-8 text-gray-500'>
              {searchQuery ? t('noResults') : t('startTyping')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
