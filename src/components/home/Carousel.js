"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useMediaQuery } from "@/hooks/useMediaQuery";

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

  if (!isMobile) {
    return (
      <div className="max-w-[90%] mx-auto">
        <div className="grid grid-cols-3 gap-6">
          {items.slice(0, 3).map((item, index) => (
            <Link key={item.id} href={`/games/${item.id}`}>
              <div className="relative aspect-[16/9] shadow-lg rounded-lg overflow-hidden">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                {index === 0 && (
                  <div className="absolute top-3 -left-2 z-10">
                    <Badge text="UPDATED" className="bg-[#7be3b2] text-white" />
                  </div>
                )}
                {index === 1 && (
                  <div className="absolute top-3 -left-2 z-10">
                    <Badge
                      text="TOP RATED"
                      className="bg-[#ffdc00] text-white"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-white text-xs font-regular">
                    <span className="opacity-90">{item.category}</span>
                  </div>
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
      <div className="max-w-[90%] mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
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
          className="!overflow-visible !pb-10"
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.id}>
              <Link href={`/games/${item.id}`}>
                <div className="relative aspect-[16/9] shadow-lg rounded-lg overflow-hidden">
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  {index === 0 && (
                    <div className="absolute top-3 -left-2 z-10">
                      <Badge
                        text="UPDATED"
                        className="bg-[#7be3b2] text-white"
                      />
                    </div>
                  )}
                  {index === 1 && (
                    <div className="absolute top-3 -left-2 z-10">
                      <Badge
                        text="TOP RATED"
                        className="bg-[#ffdc00] text-white"
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-white text-xs font-regular">
                      <span className="opacity-90">{item.category}</span>
                    </div>
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
