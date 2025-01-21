"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { HiHeart, HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import AuthModal from "../auth/AuthModal";
import LanguageSwitcher from "./LanguageSwitcher";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const menuRef = useRef(null);
  const t = useTranslations("navigation");
  const tUser = useTranslations("user");
  const locale = useLocale();
  const { user, logout, token } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `http://localhost:5001/api/users/profile?lang=${locale}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Profil bilgileri alınamadı");
        }

        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Profil bilgileri getirme hatası:", error);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [token, locale, user]);

  useEffect(() => {
    const checkUnreadNotifications = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          "http://localhost:5001/api/notifications/unread-count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Bildirim sayısı alınamadı");
        }

        const { count } = await response.json();
        setHasUnreadNotifications(count > 0);
      } catch (error) {
        console.error("Bildirim kontrolü hatası:", error);
      }
    };

    if (user) {
      checkUnreadNotifications();
    }
  }, [token, user]);

  const getLocalizedPath = (path) => {
    if (locale === "tr") {
      const paths = {
        favorites: "favoriler",
        notifications: "bildirimler",
        account: "hesabim",
      };
      return paths[path] || path;
    }
    return path;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAuthAction = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <div className="flex items-center justify-between space-x-2 md:space-x-2">
          <div className="order-last md:order-first md:mr-4">
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-4 md:gap-6 order-first md:order-last md:ml-6">
            <button
              onClick={handleAuthAction}
              className="w-6 h-6 flex items-center justify-center focus:ring-2 focus:ring-orange-500"
            >
              {user ? (
                <img
                  src={
                    userProfile?.avatar ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  }
                  alt={user.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <BiLogIn className="w-7 h-7 text-white hover:text-white/90" />
              )}
            </button>

            <div className="flex items-center gap-3 md:hidden">
              {user ? (
                <Link
                  href={`/${locale}/${getLocalizedPath("favorites")}`}
                  className="text-white hover:text-white/90"
                >
                  <HiHeart className="w-7 h-7 text-white" />
                </Link>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="text-white hover:text-white/90"
                >
                  <HiHeart className="w-7 h-7 text-white" />
                </button>
              )}
              {/* <div className='relative'>
                {user ? (
                  <Link
                    href={`/${locale}/${getLocalizedPath('notifications')}`}
                    className='text-white hover:text-white/90'
                  >
                    <HiBell className='w-6 h-6 mt-0' />
                  </Link>
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className='text-white hover:text-white/90'
                  >
                    <HiBell className='w-6 h-6 mt-2' />
                  </button>
                )}
                {user && hasUnreadNotifications && (
                  <span className='absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full' />
                )}
              </div> */}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                href={`/${locale}/${getLocalizedPath("favorites")}`}
                className="text-white hover:text-white/90"
              >
                <HiHeart className="w-7 h-7 text-red-500" />
              </Link>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-white hover:text-white/90"
              >
                <HiHeart className="w-7 h-7 text-red-500" />
              </button>
            )}
            {/* <div className='relative mr-1'>
              {user ? (
                <Link
                  href={`/${locale}/${getLocalizedPath('notifications')}`}
                  className='text-white hover:text-white/90'
                >
                  <HiBell className='w-6 h-6 mt-0' />
                </Link>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className='text-white mt-2 hover:text-white/90'
                >
                  <HiBell className='w-6 h-6 mt-0' />
                </button>
              )}
              {user && hasUnreadNotifications && (
                <span className='absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full' />
              )}
            </div> */}
          </div>
        </div>

        {user && isOpen && (
          <div className="absolute right-0 ml-2 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            <Link
              href={`/${locale}/${locale === "tr" ? "hesabim" : "account"}`}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <HiOutlineUser className="text-lg" />
              {tUser("profile")}
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              <HiOutlineLogout className="text-lg" />
              {tUser("logout")}
            </button>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default UserMenu;
