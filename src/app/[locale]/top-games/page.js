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
  // Türkçe URL'ye yönlendir
  if (locale === 'tr') {
    redirect('/tr/en-iyi-oyunlar');
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
      <MostPlayedGrid games={games} />
    </div>
  );
}
