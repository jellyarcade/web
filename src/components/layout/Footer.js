"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import FooterLinks from "./FooterLinks";
import NewsletterSignup from "./NewsletterSignup";
import Logo from "./Logo";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-400">{t("description")}</p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("quickLinks")}</h3>
            <FooterLinks />
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("categories")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/action-games"
                  className="text-gray-400 hover:text-white"
                >
                  {t("actionGames")}
                </Link>
              </li>
              <li>
                <Link
                  href="/adventure-games"
                  className="text-gray-400 hover:text-white"
                >
                  {t("adventureGames")}
                </Link>
              </li>
              <li>
                <Link
                  href="/sports-games"
                  className="text-gray-400 hover:text-white"
                >
                  {t("sportsGames")}
                </Link>
              </li>
              <li>
                <Link
                  href="/racing-games"
                  className="text-gray-400 hover:text-white"
                >
                  {t("racingGames")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Bülten */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("newsletterTitle")}
            </h3>
            <NewsletterSignup />
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
