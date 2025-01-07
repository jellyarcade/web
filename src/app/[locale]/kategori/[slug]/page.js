import { notFound, redirect } from 'next/navigation';
import GameGrid from '@/components/category/GameGrid';
import Carousel from '@/components/home/Carousel';
import RecentlyPlayed from '@/components/home/RecentlyPlayed';
import Container from '@/components/layout/Container';

const API_URL = 'https://api.jellyarcade.com/api';

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

export default async function CategoryPage({ params: { locale, slug } }) {
  // İngilizce URL'ye yönlendir
  if (locale === 'en') {
    redirect(`/en/category/${slug}`);
    return null;
  }

  const category = await getCategory(slug);

  if (!category) {
    return notFound();
  }

  // API'den gelen veriyi GameGrid formatına dönüştür
  const games =
    category?.games?.map(game => ({
      _id: game._id,
      title: {
        [locale]: game.title[locale] || game.title.en,
      },
      slug: {
        [locale]: game.slug[locale] || game.slug.en,
      },
      instantLink: game.instantLink,
      playCount: game.playCount,
      image: game.image,
    })) || [];

  return (
    <div className='mt-24'>
      <Container>
        <div className='mb-8'>
          <Carousel
            items={[
              {
                id: 1,
                title: 'Game 1',
                image: '/images/games/featured-1.jpg',
              },
              {
                id: 2,
                title: locale === 'tr' ? 'En İyi Oyunlar' : 'Top Games',
                image: '/images/games/featured-2.jpg',
              },
              {
                id: 3,
                title: 'Game 3',
                image: '/images/games/featured-3.jpg',
              },
            ]}
          />
        </div>
      </Container>
      <RecentlyPlayed />
      <div className='mb-8'></div>
      <GameGrid
        games={games}
        title={category.name[locale]}
        description={category.description[locale]}
      />
    </div>
  );
}
