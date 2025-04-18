import { notFound, redirect } from "next/navigation";
import GameClient from "./GameClient";

const API_URL = "https://api.jellyarcade.com/api";

async function getGame(slug) {
  try {
    // Slug ile oyunu bul
    const res = await fetch(`${API_URL}/games/by-slug/${slug}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return null;
    }

    const game = await res.json();

    if (!game) {
      return null;
    }

    return game;
  } catch (error) {
    console.error("Error fetching game:", error);
    return null;
  }
}

export async function generateMetadata({ params: { locale, slug } }) {
  // Oyun verilerini al
  const game = await getGame(slug);

  if (!game) {
    return {
      title: locale === "tr" ? "Oyun Bulunamadı" : "Game Not Found",
    };
  }

  return {
    title: game.title[locale],
    description:
      game.description?.[locale] ||
      (locale === "tr"
        ? "Ücretsiz online oyunlar oyna. Yükleme yapmadan en iyi ücretsiz oyunlar Jelly Arcade'de."
        : "Play free online games without downloading. Best free online games on Jelly Arcade."),
  };
}

export default async function GamePage({ params: { locale, slug } }) {
  // Check if this is a game slug or a special page
  const specialPages = [
    "notifications",
    "favorites",
    "account",
    "hesabim",
    "bildirimler",
    "favoriler",
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
  const correctSlug = locale === "tr" ? game.slug.tr : game.slug.en;

  // Eğer yanlış dildeki slug ile gelindiyse, doğru dildeki slug'a yönlendir
  if (currentSlug !== correctSlug) {
    redirect(`/${locale}/${correctSlug}`);
  }

  return <GameClient game={game} locale={locale} />;
}
