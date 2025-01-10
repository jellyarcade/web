'use client';

import { useTranslations } from 'next-intl';
import Carousel from './Carousel';
import Container from '../layout/Container';
import { useEffect, useState } from 'react';

const API_URL = 'https://api.jellyarcade.com/api';

const HeroSection = () => {
  const t = useTranslations('home.hero');
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`${API_URL}/games`, {
          cache: 'no-store',
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch games');
        }

        const data = await res.json();
        const featuredGames = data.filter(game => game.isNew || game.isPopular);
        setGames(
          featuredGames.map(game => ({
            id: game._id,
            image: game.image,
            title: game.name,
            slug: game.slug,
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
