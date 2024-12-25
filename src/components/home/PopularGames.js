"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { getPopularGames } from "@/services/api";
import GameCard from "../shared/GameCard";
import ViewAllButton from "../shared/ViewAllButton";
import Link from "next/link";
import Image from "next/image";

const PopularGames = () => {
  const t = useTranslations("home");

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{t("allGames")}</h2>
        <Link
          href="/all-games"
          className="text-brand-orange hover:text-brand-orange/90"
        >
          {t("seeAll")}
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-2 md:gap-4">
        <div className="relative aspect-[2/1] rounded-lg overflow-hidden shadow-lg group">
          <Image
            src={game.image}
            alt={`${game.title} - ${game.category} game`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </div>
    </section>
  );
};

export default PopularGames;
