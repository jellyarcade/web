"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiStar, HiSparkles } from "react-icons/hi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import UserMenu from "./UserMenu";

const Sidebar = ({ isOpen, onClose }) => {
  const t = useTranslations("navigation");

  const menuItems = [
    { href: "/", label: t("home"), icon: HiHome },
    { href: "/new-games", label: t("newGames"), icon: HiSparkles },
    { href: "/top-games", label: t("topGames"), icon: HiStar },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 left-0 bottom-0 w-[280px] bg-brand-orange z-30 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)]"
        }`}
      >
        <div className="text-white h-full flex flex-col">
          <div className="md:hidden p-4 pt-28">
            <UserMenu />
            <div className="h-px bg-white/20 mt-4 mb-2" />
          </div>

          <nav className="flex-1 md:pt-[96px]">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <MenuItem key={item.href} {...item} onClose={onClose} />
              ))}
            </ul>
          </nav>

          <div className="p-4 pb-12">
            <button className="w-full flex items-center justify-center gap-2 bg-[#16bf36] text-white py-4 px-6 rounded-full text-lg font-semilight hover:bg-[#16bf36]/90 transition-colors">
              <HiOutlineEnvelope className="text-2xl" />
              {t("contactUs")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const MenuItem = ({ href, icon: Icon, label, onClose }) => {
  const pathname = usePathname();

  const isHome = href === "/" && (pathname === "/tr" || pathname === "/en");
  const isCurrentPage = pathname.endsWith(href) && href !== "/";
  const isActive = isHome || isCurrentPage;

  return (
    <li>
      <Link
        href={href}
        className={`block text-white transition-colors relative group ${
          isActive ? "bg-[#16bf36]" : "hover:bg-[#16bf36]/80"
        }`}
        onClick={onClose}
      >
        <span className="flex items-center px-4 py-4 font-semibold">
          <Icon className="w-6 h-6 mr-4" />
          <span className="text-lg">{label}</span>
        </span>
        <div
          className={`absolute top-0 -right-1 h-full w-1 transition-colors ${
            isActive
              ? "bg-[#16bf36]"
              : "bg-[#16bf36]/80 opacity-0 group-hover:opacity-100"
          }`}
        />
      </Link>
    </li>
  );
};

export default Sidebar;
