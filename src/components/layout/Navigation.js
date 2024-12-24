"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

const Navigation = () => {
  const t = useTranslations("navigation");

  return (
    <nav>
      <ul className="flex gap-6">
        <li>
          <Link href="/games" className="text-white hover:text-white/90">
            {t("games")}
          </Link>
        </li>
        <li>
          <Link href="/categories" className="text-white hover:text-white/90">
            {t("categories")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
