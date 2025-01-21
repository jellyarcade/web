"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const t = useTranslations("favorites");
  const locale = useLocale();
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  // İngilizce için favorites sayfasına yönlendir
  useEffect(() => {
    if (locale === "en") {
      router.replace("/en/favorites");
    }
  }, [locale, router]);

  // Favori oyunları getir
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return;

      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:5001/api/users/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Favoriler yüklenirken bir hata oluştu");
        }

        const data = await response.json();
        setFavorites(data);
      } catch (err) {
        console.error("Favoriler yüklenirken hata:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  if (!user) {
    return null;
  }

  return (
    <div className="container mt-24 mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">{t("noFavorites")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((game) => (
              <Link
                key={game._id}
                href={`/${locale}/${game.slug[locale]}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-video">
                  <Image
                    src={game.image || "/images/game-placeholder.jpg"}
                    alt={game.title[locale]}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-2">
                    {game.title[locale]}
                  </h2>
                  {game.keywords?.[locale]?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {game.keywords[locale].map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
