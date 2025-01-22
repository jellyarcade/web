import MostPlayedGrid from "@/components/games/MostPlayedGrid";
import HeroSection from "@/components/home/HeroSection";
import RecentlyPlayed from "@/components/home/RecentlyPlayed";
import { redirect } from "next/navigation";

const API_URL = "https://api.jellyarcade.com//api";

async function getMostPlayedGames() {
  try {
    const res = await fetch(`${API_URL}/games/most-played`, {
      cache: "no-store",
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching most played games:", error);
    return null;
  }
}

export default async function MostPlayedPage({ params: { locale } }) {
  // İngilizce URL'ye yönlendir
  if (locale === "en") {
    redirect("/en/top-games");
  }

  const mostPlayedData = await getMostPlayedGames();

  // API'den gelen veriyi GameGrid formatına dönüştür
  const games =
    mostPlayedData?.map((game) => ({
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
    <div className="mt-24">
      <HeroSection />
      <RecentlyPlayed />
      <div className="mb-8"></div>
      <MostPlayedGrid games={games} />
    </div>
  );
}
