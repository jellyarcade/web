"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiHome, HiPuzzle, HiSparkles, HiStar } from "react-icons/hi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import ContactModal from "../contact/ContactModal";

const MenuItem = ({ href, children, isActive }) => {
  return (
    <li>
      <Link
        href={href}
        className={`block text-white transition-colors relative group ${
          isActive ? "bg-[#16bf36]" : "hover:bg-[#16bf36]/80"
        }`}
      >
        {children}
      </Link>
    </li>
  );
};

const Sidebar = ({ isOpen, onClose, children }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const staticMenuItems = [
    { href: `/${locale}`, label: t("home"), icon: HiHome },
    {
      href: `/${locale}/${locale === "tr" ? "en-iyi-oyunlar" : "top-games"}`,
      label: t("topGames"),
      icon: HiStar,
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.jellyarcade.com//api/categories"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        // isActive olan ve parent'ı null olan kategorileri filtrele ve order'a göre sırala
        const filteredCategories = data
          .filter((cat) => cat.isActive && cat.parent === null)
          .sort((a, b) => a.order - b.order)
          .map((cat) => {
            // Kategori slug'ına göre ikon seçimi
            let icon = HiPuzzle;
            if (cat.slug.tr === "yeni-oyunlar" || cat.slug.en === "new-games") {
              icon = HiSparkles;
            } else if (
              cat.slug.tr === "en-iyi-oyunlar" ||
              cat.slug.en === "top-games"
            ) {
              icon = HiStar;
            }

            return {
              href: `/${locale}/${locale === "tr" ? "kategori" : "category"}/${
                cat.slug[locale]
              }`,
              label: cat.name[locale],
              icon: icon,
            };
          });
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [locale]);

  const allMenuItems = [...staticMenuItems, ...(loading ? [] : categories)];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-[220px] bg-brand-orange z-30 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)]"
        }`}
      >
        <div className="text-white h-full flex flex-col overflow-hidden">
          {/* UserMenu Container */}
          <div className="md:hidden p-4 pt-20">
            {children}
            <div className="h-px bg-white/20 mt-4 mb-2" />
          </div>

          {/* Ana Menü */}
          <nav className="flex-1 md:pt-[96px] overflow-y-auto overflow-x-hidden">
            <ul className="space-y-2">
              {allMenuItems.map((item) => (
                <MenuItem
                  key={item.href}
                  href={item.href}
                  isActive={
                    item.href === `/${locale}`
                      ? pathname === item.href
                      : pathname.startsWith(item.href)
                  }
                >
                  <span className="flex items-center px-4 py-1 font-semibold">
                    <item.icon className="w-6 h-6 mr-4" />
                    <span className="text-md flex items-center gap-2">
                      {item.label}
                      {item.href.includes("yeni-oyunlar") ||
                      item.href.includes("new-games") ? (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                          NEW
                        </span>
                      ) : null}
                    </span>
                  </span>
                  <div
                    className={`absolute top-0 -right-1 h-full w-1 transition-colors ${
                      (
                        item.href === `/${locale}`
                          ? pathname === item.href
                          : pathname.startsWith(item.href)
                      )
                        ? "bg-[#16bf36]"
                        : "bg-[#16bf36]/80 opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </MenuItem>
              ))}
            </ul>
          </nav>

          {/* İletişim Butonu */}
          <div className="p-4 pb-12">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-[#16bf36] text-white py-2 px-6 rounded-full text-sm font-semilight hover:bg-[#16bf36]/90 transition-colors"
            >
              <HiOutlineEnvelope className="text-sm" />
              {t("contactUs")}
            </button>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;
