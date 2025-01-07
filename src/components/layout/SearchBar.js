'use client';

import { useState } from 'react';
import SearchModal from '@/components/search/SearchModal';
import { IoSearch } from 'react-icons/io5';

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className='flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500'
      >
        <IoSearch className='w-5 h-5' />
        <span>Oyun ara...</span>
      </button>

      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default SearchBar;
