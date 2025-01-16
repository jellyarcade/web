'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('search');

  useEffect(() => {
    const handleClickOutside = event => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchGames = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5001/api/games/search?q=${encodeURIComponent(
            query
          )}`
        );
        if (!response.ok) throw new Error('Search failed');
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchGames();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
      setShowResults(false);
    }
  };

  return (
    <div className='relative' ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <div className='relative'>
          <input
            type='text'
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setShowResults(true);
            }}
            placeholder={t('placeholder')}
            className='w-full h-5 pl-5 pr-2 rounded bg-gray-100 border border-transparent focus:border-brand-orange focus:bg-white focus:ring-0 text-[10px] transition-colors'
          />
          <div className='absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none'>
            <svg
              className='h-2.5 w-2.5 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && query.trim() && (
        <div className='absolute w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50'>
          {loading ? (
            <div className='p-1.5 text-center text-gray-500 text-[11px]'>
              {t('searching')}
            </div>
          ) : results.length > 0 ? (
            <div className='py-0.5'>
              {results.map(game => (
                <Link
                  key={game._id}
                  href={`/${locale}/${game.slug}`}
                  onClick={() => setShowResults(false)}
                  className='flex items-center gap-1.5 px-1.5 py-1 hover:bg-gray-50'
                >
                  <div className='relative w-5 h-5 rounded overflow-hidden flex-shrink-0'>
                    <Image
                      src={game.image || '/images/game-placeholder.jpg'}
                      alt={game.title[locale]}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='flex-grow min-w-0'>
                    <div className='text-[11px] font-medium truncate'>
                      {game.title[locale]}
                    </div>
                    <div className='text-[10px] text-gray-500 truncate'>
                      {game.description[locale]}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className='p-1.5 text-center text-gray-500 text-[11px]'>
              {t('noResults')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
