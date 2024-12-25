"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

const FooterLinks = () => {
  const t = useTranslations("navigation");

  const links = [
    { href: "/", label: t("home") },
    { href: "/new-games", label: t("newGames") },
    { href: "/top-games", label: t("topGames") },
    { href: "/games", label: t("games") },
    { href: "/categories", label: t("categories") },
  ];

  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="text-gray-400 hover:text-white">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FooterLinks;
