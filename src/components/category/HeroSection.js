'use client';

import { useTranslations } from 'next-intl';
import Carousel from '../home/Carousel';
import Container from '../layout/Container';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

const HeroSection = ({ categoryId }) => {
  const t = useTranslations('home.hero');
  const [games, setGames] = useState([]);
  const locale = useLocale();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        console.log('Fetching games for category:', categoryId);
        const res = await fetch(
          `https://api.jellyarcade.com/api/games/showcased/category/${categoryId}`,
          {
            cache: 'no-store',
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        );

        if (!res.ok) {
          throw new Error('Failed to fetch category showcased games');
        }

        const data = await res.json();
        console.log('API Response:', data);

        const mappedGames = data.map(game => ({
          id: game._id,
          image: game.image,
          title: game.title[locale],
          slug: game.slug[locale],
          isNew: game.isNew,
          isPopular: game.isPopular,
        }));

        console.log('Mapped games:', mappedGames);
        setGames(mappedGames);
      } catch (error) {
        console.error('Error fetching category showcased games:', error);
      }
    };

    if (categoryId) {
      fetchGames();
    }
  }, [categoryId, locale]);

  console.log('Current games state:', games);

  if (games.length === 0) {
    return null;
  }

  return (
    <section className='relative mt-[72px] bg-gray-50'>
      <Container className='pt-6 sm:pt-8'>
        <Carousel items={games} />
      </Container>
    </section>
  );
};

export default HeroSection;
