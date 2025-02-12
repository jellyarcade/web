"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLocale, useTranslations } from "use-intl";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Badge = ({ text, className }) => (
  <div className="relative">
    <div
      className={`px-5 py-0.5 text-xl font-bold clip-badge min-w-[160px] ${className}`}
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 45%, 90% 100%, 0 100%)",
      }}
    >
      {text}
    </div>
    <div
      className={`absolute -right-[1px] bottom-0 w-3.5 h-3.5 ${className}`}
      style={{
        clipPath: "polygon(100% 1px, 100% 100%, 2px 100%)",
      }}
    />
  </div>
);

const Carousel = ({ items }) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const t = useTranslations("home.badges");
  const locale = useLocale();
  const getGameUrl = (item) => {
    return `/${locale}/${item.slug}`;
  };

  const renderBadges = (item) => (
    <>
      {item.isNew && (
        <div className="absolute top-3 -left-2 z-10">
          <Badge text={t("updated")} className="bg-[#7be3b2] text-white" />
        </div>
      )}
      {item.isPopular && (
        <div className="absolute top-3 -left-2 z-10">
          <Badge text={t("topRated")} className="bg-[#ffdc00] text-white" />
        </div>
      )}
    </>
  );

  if (!isMobile) {
    return (
      <div className="max-w-[100%] mx-auto">
        <div className="grid grid-cols-3 gap-6">
          {items.slice(0, 3).map((item, index) => (
            <Link key={item.id} href={getGameUrl(item)}>
              <div className="relative aspect-[16/9] shadow-lg rounded-lg overflow-hidden">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                {renderBadges(item)}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-[2px] p-2">
                  <h3 className="text-white text-sm font-medium truncate">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="max-w-[100%] mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="!pb-3"
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.id}>
              <Link href={getGameUrl(item)}>
                <div className="relative aspect-[16/9] shadow-lg rounded-lg overflow-hidden">
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  {renderBadges(item)}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-[2px] p-2">
                    <h3 className="text-white text-sm font-medium truncate">
                      {item.title}
                    </h3>
                  </div>
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

export default Carousel;
