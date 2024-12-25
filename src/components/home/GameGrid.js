"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslations } from "next-intl";

// Örnek veri - normalde API'den gelecek
const gameImages = [
  // Action/Fighting
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&auto=format&fit=crop",

  // RPG/Adventure
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=800&auto=format&fit=crop",

  // Sports/Racing
  "https://images.unsplash.com/photo-1546027658-7aa750153465?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519326844852-704caea5679e?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1535813547-3e2f91d2e87d?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800&auto=format&fit=crop",

  // Strategy/Puzzle
  "https://images.unsplash.com/photo-1559675531-37f52927816b?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585504198199-20277593b94f?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=800&auto=format&fit=crop",

  // Simulation/Other
  "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548484352-ea579e93b050?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542549237-a85c488a3a80?w=800&auto=format&fit=crop",
];

const gameNames = [
  "Cyber Assault",
  "Dragon's Quest",
  "Speed Legends",
  "Empire Builder",
  "Pro Soccer 24",
  "Lost Paradise",
  "Metal Warriors",
  "Mind Puzzle",
  "City Life",
  "Street Fighter X",
  "Space Explorer",
  "Dark Souls IV",
  "Racing Masters",
  "War Commander",
  "Sports League",
  "Ocean Adventure",
  "Ninja Warriors",
  "Brain Teaser",
  "Farm Simulator",
  "Combat Arena",
  "Galaxy Wars",
  "Medieval Kingdom",
  "Future Racer",
  "Monster Hunter",
  "Basketball Pro",
  "Zombie Defense",
  "Pirate's Tale",
  "Chess Master",
  "Flight Simulator",
  "Boxing Champion",
  "Sniper Elite",
  "Magic Quest",
  "Rally Racing",
  "Tank Battle",
  "Tennis World",
  "Treasure Hunt",
  "Samurai Saga",
  "Math Challenge",
  "Ranch Life",
  "Fight Club",
];

// Oyun sayısını 100'e çıkaralım
const allGames = Array.from({ length: 100 }, (_, i) => ({
  id: i + 11,
  image: gameImages[i % gameImages.length],
  title: gameNames[i % gameNames.length],
  category: [
    "Action",
    "Adventure",
    "RPG",
    "Sports",
    "Strategy",
    "Puzzle",
    "Racing",
    "Simulation",
  ][i % 8],
}));

const GameGrid = () => {
  const [games, setGames] = useState(allGames.slice(0, 10));
  const [hasMore, setHasMore] = useState(true);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const t = useTranslations("home.gameGrid");

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasMore) {
      // Simüle edilmiş yükleme gecikmesi
      setTimeout(() => {
        const nextGames = allGames.slice(games.length, games.length + 10);
        if (nextGames.length > 0) {
          setGames((prev) => [...prev, ...nextGames]);
        }
        if (games.length + nextGames.length >= allGames.length) {
          setHasMore(false);
        }
      }, 1000);
    }
  }, [inView, hasMore, games.length]);

  return (
    <section className="pt-10 pb-8">
      <div className="max-w-[90%] mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-cocogoose font-medium uppercase mb-2 text-[#2cd284]">
            {t("title")}
          </h2>
          <p className="text-gray-600">{t("subtitle")}</p>
        </div>

        <div
          className={`grid ${isMobile ? "grid-cols-5" : "grid-cols-10"} gap-4`}
        >
          {games.map((game) => (
            <Link key={game.id} href={`/games/${game.id}`}>
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg group">
                <Image
                  src={game.image}
                  alt={`${game.title} - ${game.category} game`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div ref={ref} className="flex justify-center items-center py-8">
            <div className="w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </section>
  );
};

export default GameGrid;
