'use client';

import { useTranslations } from 'next-intl';
import Carousel from './Carousel';
import Container from '../layout/Container';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';

const HeroSection = () => {
  const t = useTranslations('home.hero');
  const [games, setGames] = useState([]);
  const locale = useLocale();
  const params = useParams();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/games?lang=${params.locale}`,
          {
            cache: 'no-store',
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        );

        if (!res.ok) {
          throw new Error('Failed to fetch games');
        }

        const data = await res.json();
        console.log('data', data);
        const featuredGames = data.filter(game => game.isNew || game.isPopular);
        setGames(
          featuredGames.map(game => ({
            id: game._id,
            image: game.image,
            title: game.title[locale],
            slug: game.slug[locale],
            isNew: game.isNew,
            isPopular: game.isPopular,
          }))
        );
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <section className='relative mt-[72px] bg-gray-50'>
      <Container className='pt-6 sm:pt-8'>
        <Carousel items={games} />
      </Container>
    </section>
  );
};

export default HeroSection;
