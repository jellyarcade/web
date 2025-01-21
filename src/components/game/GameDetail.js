"use client";

import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { HiHeart } from "react-icons/hi2";

export default function GameDetail({ game, locale }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user, token } = useAuth();
  const t = useTranslations("game");

  const handlePlayGame = () => {
    const gameWindow = window.open(game.instantLink, "_blank");
    if (gameWindow) {
      gameWindow.addEventListener("load", () => {
        try {
          if (document.fullscreenEnabled) {
            gameWindow.document.documentElement.requestFullscreen();
          }
        } catch (error) {
          console.error("Fullscreen error:", error);
        }
      });
    }
  };

  const toggleFavorite = async () => {
    if (!token) {
      setShowAuthModal(true);
      return;
    }

    try {
      const method = isFavorite ? "DELETE" : "POST";
      const response = await fetch(
        `https://api.jellyarcade.com/api/users/favorites/${game._id}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Favori işlemi başarısız oldu");
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Favori işlemi hatası:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sol Taraf - Oyun Görseli */}
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <img
            src={game.image}
            alt={game.title[locale]}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Sağ Taraf - Oyun Bilgileri */}
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{game.title[locale]}</h1>
              <div className="text-sm text-gray-500 mt-1">
                {game.playCount || 0}{" "}
                {locale === "tr" ? "kez oynandı" : "times played"}
              </div>
            </div>
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full transition-colors ${
                isFavorite
                  ? "text-red-500 hover:bg-red-50"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              <HiHeart className="w-6 h-6" />
            </button>
          </div>

          <p className="text-gray-600">{game.description[locale]}</p>

          <div className="flex flex-wrap gap-2">
            {game.categories.map((category) => (
              <span
                key={category._id}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {category.name[locale]}
              </span>
            ))}
          </div>

          <button
            onClick={handlePlayGame}
            className="w-full md:w-auto px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            {locale === "tr" ? "Şimdi Oyna" : "Play Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
