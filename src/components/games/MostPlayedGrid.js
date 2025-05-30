"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BiSolidJoystick } from "react-icons/bi";

const MostPlayedGrid = ({ games = [] }) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const params = useParams();

  if (!games || games.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="pb-2">
      <div className="max-w-[95%] mx-auto">
        <div className>
          <h2 className="text-lg font-extrabold uppercase mb-0 text-[#ff7e00]">
            {params.locale === "tr" ? "En İYİ Oyunlar" : "Most Played Games"}
          </h2>
          {/* <p className='text-gray-600'>
            {params.locale === 'tr'
              ? 'En çok oynanan ve beğenilen oyunları keşfet'
              : 'Discover the most played and liked games'}
          </p> */}
        </div>

        <div
          className={`grid ${
            isMobile ? "grid-cols-3 gap-2" : "grid-cols-10 gap-4"
          }`}
        >
          {games.map((game) => (
            <Link
              key={game._id}
              href={`/${params.locale}/${game.slug[params.locale]}`}
              className="block"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg group">
                <Image
                  src={game.image || "/images/game-placeholder.jpg"}
                  alt={game.title[params.locale] || "Game thumbnail"}
                  fill
                  sizes="(max-width: 1024px) 20vw, 10vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white font-medium truncate text-sm">
                    {game.title[params.locale]}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <BiSolidJoystick className="w-4 h-4 text-gray-300" />
                    <span className="text-xs text-gray-300">
                      {game.playCount || 0}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostPlayedGrid;
