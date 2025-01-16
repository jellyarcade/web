import { notFound, redirect } from 'next/navigation';
import Container from '@/components/layout/Container';
import GameGrid from '@/components/category/GameGrid';
import HeroSection from '@/components/category/HeroSection';
import RecentlyPlayed from '@/components/home/RecentlyPlayed';

const API_URL = 'http://localhost:5001/api';

async function getCategory(slug) {
  try {
    const res = await fetch(`${API_URL}/categories/slug/${slug}`, {
      cache: 'no-store',
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export async function generateMetadata({ params: { locale, slug } }) {
  // Kategori verilerini al
  const category = await getCategory(slug);

  if (!category || !category.name || !category.name[locale]) {
    return {
      title: locale === 'tr' ? 'Kategori Bulunamadı' : 'Category Not Found',
    };
  }

  const categoryName = category.name[locale];
  const categoryNameLower = categoryName.toLowerCase();

  return {
    title:
      locale === 'tr' ? `${categoryName} Oyunları` : `${categoryName} Games`,
    description:
      locale === 'tr'
        ? `${categoryName} kategorisindeki en iyi ücretsiz oyunları oyna. Yükleme yapmadan ${categoryNameLower} oyunlarını Jelly Arcade'de oynayabilirsin.`
        : `Play the best free ${categoryNameLower} games. You can play ${categoryName} games on Jelly Arcade without downloading.`,
  };
}

export default async function CategoryPage({ params: { locale, slug } }) {
  // İngilizce URL'ye yönlendir
  if (locale === 'en') {
    redirect(`/en/category/${slug}`);
    return null;
  }

  const category = await getCategory(slug);

  if (!category || !category.name || !category.name[locale]) {
    return notFound();
  }

  // API'den gelen veriyi GameGrid formatına dönüştür
  const games =
    category?.games?.map(game => ({
      _id: game._id,
      title: {
        [locale]: game.title?.[locale] || game.title?.en || '',
      },
      slug: {
        [locale]: game.slug?.[locale] || game.slug?.en || '',
      },
      instantLink: game.instantLink,
      playCount: game.playCount,
      image: game.image,
    })) || [];

  return (
    <div className='mt-24'>
      <HeroSection categoryId={category._id} />
      <RecentlyPlayed />
      <div className='mb-8'></div>
      <GameGrid
        games={games}
        title={category.name[locale]}
        description={category.description?.[locale] || ''}
      />
    </div>
  );
}
