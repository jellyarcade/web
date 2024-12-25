"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { HiChevronDown } from "react-icons/hi";

const languages = [
  { code: "tr", name: "TR" },
  { code: "en", name: "EN" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = useCallback(
    (newLocale) => {
      const newPath = pathname.replace(/^\/[^\/]+/, `/${newLocale}`);
      router.push(newPath);
    },
    [pathname, router]
  );

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-white hover:text-white/90 font-light text-xl"
      >
        {currentLanguage.name}
        <HiChevronDown
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 text-lg font-light hover:bg-gray-100 dark:hover:bg-gray-700 ${
                locale === lang.code
                  ? "text-brand-orange"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
