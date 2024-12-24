"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { getNewGames } from "@/services/api";
import GameCard from "../shared/GameCard";
import ViewAllButton from "../shared/ViewAllButton";

const NewGames = () => {
  const t = useTranslations("home.newGames");
  const { data: games, isLoading } = useQuery({
    queryKey: ["newGames"],
    queryFn: () => getNewGames(),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="py-12 bg-gray-50">
      <div className="px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">{t("title")}</h2>
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
