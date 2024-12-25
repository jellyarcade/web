"use client";

import { useState } from "react";
import { HiMenu, HiSearch, HiX, HiBell } from "react-icons/hi";
import { useTranslations } from "next-intl";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";
import LanguageSwitcher from "./LanguageSwitcher";

const SearchModal = ({ isOpen, onClose }) => {
  const t = useTranslations("navigation");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="fixed top-0 left-0 right-0 bg-white p-4">
        <div className="relative">
          <input
            type="search"
            placeholder={t("search")}
            className="w-full px-8 py-3 rounded-full bg-gray-100 border-0 focus:ring-2 focus:ring-brand-orange font-light text-base"
            autoFocus
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            <HiX className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Header = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const t = useTranslations("navigation");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-[#b6e18a] to-[#16bf36]" />

        <div className="relative px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-8">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-brand-orange hover:text-brand-orange/90 text-2xl sm:text-3xl"
              >
                <HiMenu />
              </button>
              <Logo />
            </div>

            {/* Desktop Search */}
            <div className="hidden md:block flex-1 max-w-xl mx-8 relative">
              <input
                type="search"
                placeholder={t("search")}
                className="w-full px-8 py-3 rounded-full bg-white/90 border-0 focus:ring-2 focus:ring-brand-orange font-light text-base"
              />
              <button className="absolute right-6 top-1/2 -translate-y-1/2 text-[#16bf36] hover:text-[#16bf36]/80 transition-colors">
                <HiSearch className="text-2xl" />
              </button>
            </div>

            {/* Mobile Search Button ve Desktop UserMenu Container */}
            <div className="flex items-center gap-4">
              <button
                className="md:hidden text-white hover:text-white/90"
                onClick={() => setIsSearchOpen(true)}
              >
                <HiSearch className="text-2xl" />
              </button>
              <div className="hidden md:block">
                <UserMenu />
              </div>
            </div>
          </div>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        children={children}
      />
    </>
  );
};

export default Header;
