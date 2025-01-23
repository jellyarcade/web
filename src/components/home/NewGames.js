"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import GameCard from "../shared/GameCard";
import ViewAllButton from "../shared/ViewAllButton";

const NewGames = () => {
  const t = useTranslations("home.newGames");
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      const res = await fetch(`https://api.jellyarcade.com/api/games/`);
      const data = await res.json();
      console.log("newgames data", data);
      setGames(data);
    };

    fetchGames();
  }, []);

  if (error) {
    return (
      <div className="py-12 text-center text-red-600">
        Oyunlar yüklenirken bir hata oluştu
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">{t("title")}</h2>
          <ViewAllButton href="/games/new">{t("viewAll")}</ViewAllButton>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games?.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewGames;
