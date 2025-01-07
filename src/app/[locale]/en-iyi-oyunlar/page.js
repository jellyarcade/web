import { redirect } from 'next/navigation';
import Container from '@/components/layout/Container';
import MostPlayedGrid from '@/components/games/MostPlayedGrid';
import Carousel from '@/components/home/Carousel';
import RecentlyPlayed from '@/components/home/RecentlyPlayed';

const API_URL = 'https://api.jellyarcade.com/api';

async function getMostPlayedGames() {
  try {
    const res = await fetch(`${API_URL}/games/most-played`, {
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
    console.error('Error fetching most played games:', error);
    return null;
  }
}

export default async function MostPlayedPage({ params: { locale } }) {
  // İngilizce URL'ye yönlendir
  if (locale === 'en') {
    redirect('/en/top-games');
    return null;
  }

  const mostPlayedData = await getMostPlayedGames();

  // API'den gelen veriyi GameGrid formatına dönüştür
  const games =
    mostPlayedData?.map(game => ({
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

  const carouselItems = [
    {
      id: 1,
      title: locale === 'tr' ? 'Yeni Oyunlar' : 'New Games',
      image:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop',
    },
    {
      id: 2,
      title: locale === 'tr' ? 'En İyi Oyunlar' : 'Top Games',
      image:
        'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop',
    },
    {
      id: 3,
      title: locale === 'tr' ? 'Macera Oyunları' : 'Adventure Games',
      image:
        'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className='mt-24'>
      <Container>
        <div className='mb-8'>
          <Carousel items={carouselItems} />
        </div>
      </Container>
      <RecentlyPlayed />
      <div className='mb-8'></div>
      <MostPlayedGrid games={games} />
    </div>
  );
}
