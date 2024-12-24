"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

const CategoryCard = ({ category }) => {
  const locale = useLocale();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
      <div className="relative w-16 h-16 mx-auto mb-2">
        <Image
          src={
            category.image ||
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvXtIAAAAASUVORK5CYII="
          }
          alt={
            typeof category.name === "object"
              ? category.name[locale]
              : category.name
          }
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-medium">
        {typeof category.name === "object"
          ? category.name[locale]
          : category.name}
      </h3>
    </div>
  );
};

export default CategoryCard;
