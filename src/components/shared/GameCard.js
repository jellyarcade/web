"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

const GameCard = ({ game }) => {
  const locale = useLocale();

  return (
    <div className="flex-shrink-0 w-1/3 bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full h-48">
        <Image
          src={
            game.image ||
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvXtIAAAAASUVORK5CYII="
          }
          alt={typeof game.title === "object" ? game.title[locale] : game.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold">
          {typeof game.title === "object" ? game.title[locale] : game.title}
        </h3>
        <span className="text-gray-600">{game.category}</span>
      </div>
    </div>
  );
};

export default GameCard;
