"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../layout/Container";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RecentlyPlayed = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const t = useTranslations("home.recentlyPlayed");
  const locale = useLocale();
  const { token } = useAuth();
  const [recentGames, setRecentGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Son oynanan oyunları getir
  useEffect(() => {
    const fetchRecentGames = async () => {
      setIsLoading(true);

      if (!token) {
        // Eğer kullanıcı giriş yapmamışsa localStorage'dan al
        try {
          const localGames = JSON.parse(
            localStorage.getItem("recentGames") || "[]"
          );
          if (localGames.length > 0) {
            setRecentGames(localGames);
          }
        } catch (error) {
          console.error("LocalStorage read error:", error);
        }
        setIsLoading(false);
        return;
      }

      // Kullanıcı giriş yapmışsa API'den al
      try {
        const response = await fetch(
          "https://api.jellyarcade.com/api/users/recent-games",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Recent games could not be loaded"
          );
        }

        const data = await response.json();

        // Unique oyunları al (son oynanma sırasını koruyarak)
        const uniqueGames = data.reduce((acc, current) => {
          const exists = acc.find((item) => item.game._id === current.game._id);
          if (!exists) {
            acc.push(current);
          }
          return acc;
        }, []);

        setRecentGames(uniqueGames.slice(0, 10)); // Son 10 oyun
      } catch (error) {
        console.error("Recent games fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentGames();
  }, [token]);

  // Eğer yükleme durumunda veya oyun yoksa bileşeni gösterme
  if (isLoading || recentGames.length === 0) {
    return null;
  }

  // Başlık için fallback fonksiyonu
  const getTitle = (game) => {
    return game.title[locale] || game.title["tr"] || game.title["en"] || "Game";
  };

  if (!isMobile) {
    return (
      <section>
        <Container>
          {/* Title Section */}
          <div className="mt-0">
            <h2 className="text-lg font-cocogoose font-medium uppercase mb-0 text-[#2cd284]">
              {t("title")}
            </h2>
            {/* <p className='text-gray-600'>{t('subtitle')}</p> */}
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-5 gap-4">
            {recentGames.map(({ game }) => (
              <Link
                key={game._id}
                href={`/${locale}/${game.slug[locale] || game.slug["tr"]}`}
              >
                <div className="relative aspect-[2/1] rounded-lg overflow-hidden shadow-lg group">
                  <Image
                    src={game.image || "/images/game-placeholder.jpg"}
                    alt={getTitle(game)}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-white text-sm font-medium truncate">
                      {getTitle(game)}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative">
      <Container className="mt-0">
        {/* Title for Mobile */}
        <div className="mb-0">
          <h2 className="text-lg font-cocogoose font-medium uppercase mb-0 text-[#2cd284]">
            {t("title")}
          </h2>
          {/* <p className='text-gray-600'>{t('subtitle')}</p> */}
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={2.25}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={recentGames.length > 2}
          className="!pb-3"
        >
          {recentGames.map(({ game }) => (
            <SwiperSlide key={game._id}>
              <Link href={`/${locale}/${game.slug[locale] || game.slug["tr"]}`}>
                <div className="relative aspect-[2/1] rounded-lg overflow-hidden shadow-lg group">
                  <Image
                    src={game.image || "/images/game-placeholder.jpg"}
                    alt={getTitle(game)}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-white text-sm font-medium truncate">
                      {getTitle(game)}
                    </h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default RecentlyPlayed;
