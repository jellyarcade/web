import { notFound, redirect } from 'next/navigation';
import GameClient from './GameClient';

const API_URL = 'http://localhost:5001/api';

async function getGame(slug) {
  try {
    // Slug ile oyunu bul
    const res = await fetch(`${API_URL}/games/by-slug/${slug}`, {
      cache: 'no-store',
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    console.log('API Request URL:', `${API_URL}/games/by-slug/${slug}`);
    console.log('Response status:', res.status);

    if (!res.ok) {
      return null;
    }

    const game = await res.json();
    console.log('Response data:', game);

    if (!game) {
      return null;
    }

    console.log('Found game:', game);
    return game;
  } catch (error) {
    console.error('Error fetching game:', error);
    return null;
  }
}

export default async function GamePage({ params: { locale, slug } }) {
  console.log('Page params:', { locale, slug });

  // Check if this is a game slug or a special page
  const specialPages = [
    'notifications',
    'favorites',
    'account',
    'hesabim',
    'bildirimler',
    'favoriler',
  ];
  if (specialPages.includes(slug)) {
    return notFound();
  }

  const game = await getGame(slug);

  if (!game) {
    return notFound();
  }

  // Gelen slug'ı kontrol et
  const currentSlug = slug;
  const correctSlug = locale === 'tr' ? game.slug.tr : game.slug.en;

  // Eğer yanlış dildeki slug ile gelindiyse, doğru dildeki slug'a yönlendir
  if (currentSlug !== correctSlug) {
    console.log('Redirecting to correct slug:', {
      from: currentSlug,
      to: correctSlug,
      locale,
    });
    redirect(`/${locale}/${correctSlug}`);
  }

  return <GameClient game={game} locale={locale} />;
}
