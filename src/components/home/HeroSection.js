'use client';

import { useTranslations } from 'next-intl';
import Carousel from './Carousel';
import Container from '../layout/Container';

const games = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop',
    title: 'Fortnite',
    category: 'Action',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop',
    title: 'Minecraft',
    category: 'Adventure',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&auto=format&fit=crop',
    title: 'Among Us',
    category: 'Strategy',
  },
];

const HeroSection = () => {
  const t = useTranslations('home.hero');

  return (
    <section className='relative mt-[72px] bg-gray-50'>
      <Container className='pt-6 sm:pt-8'>
        <Carousel items={games} className='rounded-lg overflow-hidden' />
      </Container>
    </section>
  );
};

export default HeroSection;
