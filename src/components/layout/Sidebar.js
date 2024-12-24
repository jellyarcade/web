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
    { href: "/", label: "home", icon: HiHome },
    { href: "/new-games", label: "newGames", icon: HiSparkles },
    { href: "/top-games", label: "topGames", icon: HiStar },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-brand-orange transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Profil Bölümü - Sadece Mobilde */}
        <div className="md:hidden px-6 py-4 border-b border-gray-800">
          <UserMenu />
        </div>

        <nav className="h-full pt-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <MenuItem key={item.href} {...item} onClose={onClose} />
            ))}
          </ul>
        </nav>

        {/* Contact Us Button */}
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <button className="w-full flex items-center justify-center gap-2 bg-[#16bf36] text-white py-4 px-6 rounded-full text-lg font-semilight hover:bg-[#16bf36]/90 transition-colors">
            <HiOutlineEnvelope className="text-2xl" />
            Contact Us
          </button>
        </div>
      </div>
    </>
  );
};

const MenuItem = ({ href, icon: Icon, label, onClose }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`block text-white transition-colors w-[calc(100%+12px)] ${
          isActive ? "bg-brand-green" : "hover:bg-brand-green-light"
        }`}
        onClick={onClose}
      >
        <span className="flex items-center px-8 py-3 font-semibold">
          <Icon className="w-5 h-5 mr-3" />
          {label}
        </span>
      </Link>
    </li>
  );
};

export default Sidebar;
