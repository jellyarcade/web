'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { getCategories } from '@/services/api';
import CategoryCard from '../shared/CategoryCard';

const Categories = () => {
  const t = useTranslations('home.categories');
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className='py-12 bg-gray-50 dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        <h2 className='text-xl font-bold mb-4'>{t('title')}</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {categories?.map(category => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
