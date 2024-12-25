"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  HiOutlineUser,
  HiOutlineLogout,
  HiBell,
  HiHeart,
} from "react-icons/hi";
import LanguageSwitcher from "./LanguageSwitcher";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const t = useTranslations("user");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center space-x-6" ref={menuRef}>
      {/* Dil Seçimi */}
      <LanguageSwitcher />
      {/* Favoriler */}
      <Link href="/favorites" className="text-white hover:text-white/90">
        <HiHeart className="w-8 h-8" />
      </Link>

      {/* Bildirimler */}
      <div className="relative">
        <Link href="/notifications" className="text-white hover:text-white/90">
          <HiBell className="w-7 h-7" />
        </Link>
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full" />
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50">
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <HiOutlineUser className="text-lg" />
            {t("profile")}
          </Link>
          <button
            onClick={() => {
              // Logout logic here
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <HiOutlineLogout className="text-lg" />
            {t("logout")}
          </button>
        </div>
      )}

      {/* Avatar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden focus:ring-2 focus:ring-[#ff4f00]"
      >
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
          alt="User avatar"
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
};

export default UserMenu;
