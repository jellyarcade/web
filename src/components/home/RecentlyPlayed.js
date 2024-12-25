"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslations } from "next-intl";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const recentGames = [
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&auto=format&fit=crop",
    title: "Call of Duty",
    category: "Action",
    lastPlayed: "2 hours ago",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop",
    title: "Red Dead Redemption 2",
    category: "Adventure",
    lastPlayed: "Yesterday",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop",
    title: "FIFA 24",
    category: "Sports",
    lastPlayed: "3 days ago",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=800&auto=format&fit=crop",
    title: "Cyberpunk 2077",
    category: "RPG",
    lastPlayed: "Last week",
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&auto=format&fit=crop",
    title: "The Last of Us",
    category: "Action",
    lastPlayed: "2 weeks ago",
  },
];

const RecentlyPlayed = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const t = useTranslations("home.recentlyPlayed");

  if (!isMobile) {
    return (
      <div className="max-w-[90%] mx-auto mt-8">
        {/* Title Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-cocogoose font-medium uppercase mb-2 text-[#2cd284]">
            {t("title")}
          </h2>
          <p className="text-gray-600">{t("subtitle")}</p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-5 gap-4">
          {recentGames.map((game) => (
            <Link key={game.id} href={`/games/${game.id}`}>
              <div className="relative aspect-[2/1] rounded-lg overflow-hidden shadow-lg group">
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
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="max-w-[90%] mx-auto">
        {/* Title for Mobile */}
        <div className="mb-6">
          <h2 className="text-2xl font-cocogoose font-medium uppercase mb-2 text-[#2cd284]">
            {t("title")}
          </h2>
          <p className="text-gray-600">{t("subtitle")}</p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={2}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="!pb-10"
        >
          {recentGames.map((game) => (
            <SwiperSlide key={game.id}>
              <Link href={`/games/${game.id}`}>
                <div className="relative aspect-[2/1] rounded-lg overflow-hidden shadow-lg group">
                  <Image
                    src={game.image}
                    alt={`${game.title} - ${game.category} game`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-pagination !bottom-0" />
      </div>
    </div>
  );
};

export default RecentlyPlayed;
