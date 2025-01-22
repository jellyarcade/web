"use client";

import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiSolidJoystick } from "react-icons/bi";
import { RiLoginBoxLine } from "react-icons/ri";

export default function GameClient({ game, locale }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [showOrientationModal, setShowOrientationModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const { token, user } = useAuth();
  const [favoriteCount, setFavoriteCount] = useState(game.favoriteCount || 0);
  const { sendEvent } = useAnalytics();

  // Log game data
  useEffect(() => {
    console.log("Game Data:", {
      id: game._id,
      title: game.title,
      description: game.description,
      categories: game.categories,
      keywords: game.keywords,
      playCount: game.playCount,
      instantLink: game.instantLink,
      orientation: game.orientation,
      isNew: game.isNew,
      isPopular: game.isPopular,
      fullGameData: game,
    });
  }, [game]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `https://api.jellyarcade.com//api/users/profile?lang=${locale}`,
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

  const t = useTranslations();

  // Mobil cihaz kontrolü
  const isMobileScreen = useMediaQuery("(max-width: 640px)");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice =
        /iphone|ipad|ipod|android|webos|blackberry|windows phone/i.test(
          userAgent
        );
      setIsMobile(isMobileDevice);
    };

    checkMobile();
  }, []);

  // Ekran yönüne göre arka plan rengini ayarla
  useEffect(() => {
    const handleOrientation = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      const mainElement = document.querySelector("main");

      if (isLandscape) {
        // Main elementinin arka planını değiştir
        if (mainElement) {
          mainElement.style.backgroundColor = "#000000";
        }
        // Body'nin arka planını değiştir
        document.body.style.backgroundColor = "#000000";
      } else {
        // Main elementinin arka planını sıfırla
        if (mainElement) {
          mainElement.style.backgroundColor = "";
        }
        // Body'nin arka planını sıfırla
        document.body.style.backgroundColor = "";
      }
    };

    // Event listener'ları ekle
    window.addEventListener("resize", handleOrientation);
    window.addEventListener("orientationchange", handleOrientation);

    // İlk yüklemede kontrol et
    handleOrientation();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleOrientation);
      window.removeEventListener("orientationchange", handleOrientation);
      const mainElement = document.querySelector("main");
      if (mainElement) {
        mainElement.style.backgroundColor = "";
      }
      document.body.style.backgroundColor = "";
    };
  }, []); // Boş dependency array ile sadece mount/unmount'ta çalışsın

  useEffect(() => {
    const handleFullscreenChange = () => {
      const newIsFullscreen = !!document.fullscreenElement;
      setIsFullscreen(newIsFullscreen);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }
    };

    const handlePopState = () => {
      // Overflow'ları temizle
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.documentElement.style.position = "";
      setIsFullscreen(false);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      // Cleanup yaparken stilleri temizle
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.documentElement.style.position = "";
    };
  }, []);

  // Favori durumunu kontrol et
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          "https://api.jellyarcade.com//api/users/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Favori durumu kontrol edilemedi");
        }

        const favorites = await response.json();
        setIsFavorite(favorites.some((fav) => fav._id === game._id));
      } catch (err) {
        console.error("Favori durumu kontrol hatası:", err);
      }
    };

    checkFavoriteStatus();
  }, [token, game._id]);

  // Snackbar'ı göster ve otomatik gizle
  const showSnackbar = (message, type = "success") => {
    setSnackbar({ show: true, message, type });
    setTimeout(() => {
      setSnackbar({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // Favoriye ekleme/çıkarma işlemi
  const toggleFavorite = async () => {
    if (!token) {
      setShowAuthModal(true);
      return;
    }

    try {
      setIsLoading(true);
      const method = isFavorite ? "DELETE" : "POST";
      const response = await fetch(
        `https://api.jellyarcade.com//api/users/favorites/${game._id}`,
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

      const data = await response.json();
      setIsFavorite(!isFavorite);
      // Favori sayısını güncelle
      setFavoriteCount((prev) => (isFavorite ? prev - 1 : prev + 1));

      // AuthContext'teki user state'ini güncelle
      if (user) {
        user.favorites = data;
      }

      showSnackbar(
        isFavorite
          ? t("game.removedFromFavorites")
          : t("game.addedToFavorites"),
        "success"
      );
    } catch (error) {
      console.error("Favori işlemi hatası:", error);
      showSnackbar(t("game.favoriteError"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlay = async () => {
    // Sadece mobilde oryantasyon kontrolü yap
    if (isMobile) {
      // Şu anki ekran oryantasyonunu kontrol et
      const currentOrientation =
        window.innerHeight > window.innerWidth ? "vertical" : "horizontal";

      // Oyunun oryantasyonu ile karşılaştır
      if (currentOrientation !== game.orientation) {
        setShowOrientationModal(true);
        return;
      }
    }

    // Oyunu başlat
    setIsPlaying(true);

    // Oyun başlatma eventi gönder
    sendEvent("game_play", {
      game_id: game._id,
      game_title: game.title[locale],
      game_category: game.categories?.[0]?.name[locale] || "Uncategorized",
    });

    // 1. Oyun oynama kaydını API'ye gönder (giriş yapmış kullanıcılar için)
    if (token) {
      try {
        await fetch(`https://api.jellyarcade.com//api/games/${game._id}/play`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error recording game play:", error);
      }
    }

    // 2. Oyun sayacını artır (tüm kullanıcılar için)
    try {
      fetch(
        `https://api.jellyarcade.com//api/games/${game._id}/increment-play`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then(async (response) => {
          const data = await response.text();
          if (!response.ok) {
            throw new Error(
              `Play count increment failed: ${response.status} - ${data}`
            );
          }
          try {
            return data ? JSON.parse(data) : null;
          } catch (e) {
            console.log("Response was not JSON:", data);
            return null;
          }
        })
        .then((data) => {
          if (data) {
            console.log("Play count updated:", data);
          }
        })
        .catch((error) => {
          console.error("Play count increment error:", error.message);
        });
    } catch (error) {
      console.error("Play count increment error:", error.message);
    }

    // Fullscreen'e geç
    setTimeout(() => {
      const gameContainer = document.querySelector("#game-container");
      if (gameContainer) {
        try {
          if (isMobile) {
            // iOS kontrolü
            const isIOS =
              /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            if (isIOS) {
              // iOS için özel tam ekran yöntemi
              gameContainer.style.position = "fixed";
              gameContainer.style.top = "0";
              gameContainer.style.left = "0";
              gameContainer.style.right = "0";
              gameContainer.style.bottom = "0";
              gameContainer.style.width = "100vw";
              gameContainer.style.height = "100vh";
              gameContainer.style.maxWidth = "100%";
              gameContainer.style.maxHeight = "100%";
              gameContainer.style.zIndex = "9999";
              document.body.style.overflow = "hidden";
              setIsFullscreen(true);
            } else {
              // Diğer mobil cihazlar için normal tam ekran
              if (gameContainer.requestFullscreen) {
                gameContainer.requestFullscreen();
              } else if (gameContainer.webkitRequestFullscreen) {
                gameContainer.webkitRequestFullscreen();
              } else if (gameContainer.mozRequestFullScreen) {
                gameContainer.mozRequestFullScreen();
              } else if (gameContainer.msRequestFullscreen) {
                gameContainer.msRequestFullscreen();
              }
            }
          } else {
            // Desktop için normal tam ekran
            if (gameContainer.requestFullscreen) {
              gameContainer.requestFullscreen();
            } else if (gameContainer.webkitRequestFullscreen) {
              gameContainer.webkitRequestFullscreen();
            } else if (gameContainer.mozRequestFullScreen) {
              gameContainer.mozRequestFullScreen();
            } else if (gameContainer.msRequestFullscreen) {
              gameContainer.msRequestFullscreen();
            }
          }
        } catch (error) {
          console.error("Fullscreen error:", error);
        }
      }
    }, 1000);

    // Eğer kullanıcı giriş yapmamışsa localStorage'a kaydet
    if (!token) {
      const recentGames = JSON.parse(
        localStorage.getItem("recentGames") || "[]"
      );
      const gameData = {
        game: {
          _id: game._id,
          title: game.title,
          slug: game.slug,
          image: game.image,
        },
        playedAt: new Date().toISOString(),
      };

      // Aynı oyun varsa listeden çıkar
      const filteredGames = recentGames.filter(
        (item) => item.game._id !== game._id
      );

      // Yeni oyunu başa ekle ve son 10 oyunu tut
      filteredGames.unshift(gameData);
      if (filteredGames.length > 10) {
        filteredGames.pop();
      }

      localStorage.setItem("recentGames", JSON.stringify(filteredGames));
    }
  };

  // Oryantasyon uyarı modalı
  const OrientationModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg max-w-sm mx-4 text-center">
        <div className="mb-4">
          {game.orientation === "horizontal" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-brand-orange"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-brand-orange rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"
              />
            </svg>
          )}
        </div>
        <h3 className="text-lg font-bold mb-2">
          {game.orientation === "horizontal"
            ? "Lütfen cihazınızı yatay çevirin"
            : "Lütfen cihazınızı dikey çevirin"}
        </h3>
        <p className="text-gray-600 mb-4">
          {game.orientation === "horizontal"
            ? "Bu oyun yatay modda oynanmak için tasarlanmıştır."
            : "Bu oyun dikey modda oynanmak için tasarlanmıştır."}
        </p>
        <button
          onClick={() => {
            setShowOrientationModal(false);
          }}
          className="bg-brand-orange text-white px-4 py-2 rounded hover:bg-brand-orange/90 transition-colors"
        >
          Anladım
        </button>
      </div>
    </div>
  );

  return (
    <div className="mt-[52px]">
      {/* Snackbar */}
      {snackbar.show && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg text-white z-[999999] ${
            snackbar.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {snackbar.message}
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[999999]">
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => {
              setShowAuthModal(false);
              // Eğer iOS'ta isek ve fullscreen'den çıkılmışsa tekrar fullscreen'e dön
              const isIOS =
                /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                !window.MSStream;
              if (isIOS && isFullscreen) {
                const gameContainer = document.querySelector("#game-container");
                if (gameContainer) {
                  gameContainer.style.position = "fixed";
                  gameContainer.style.top = "0";
                  gameContainer.style.left = "0";
                  gameContainer.style.width = "100%";
                  gameContainer.style.height = "100%";
                  gameContainer.style.zIndex = "9999";
                  document.body.style.overflow = "hidden";
                }
              } else if (isFullscreen) {
                // Desktop için fullscreen'e dön
                const gameContainer = document.querySelector("#game-container");
                if (gameContainer && gameContainer.requestFullscreen) {
                  gameContainer.requestFullscreen();
                }
              }
            }}
          />
        </div>
      )}

      {showOrientationModal && <OrientationModal />}

      <div className="max-w-5xl w-full mx-auto px-4 py-4">
        <div>
          {/* Oyun alanı ve Game Details */}
          <div className="max-w-5xl mr-auto space-y-2">
            {/* Oyun alanı */}
            {!isPlaying ? (
              // Preview image ve play butonu
              <div className="relative w-full h-[73vh] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={game.image || "/images/game-placeholder.jpg"}
                  alt={game.title[locale]}
                  fill
                  className="object-cover"
                />

                {/* Karartma Efekti */}
                <div className="absolute inset-0 bg-black/30 transition-opacity hover:opacity-0" />

                {/* Play Butonu */}
                <button
                  onClick={handlePlay}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10 text-brand-orange translate-x-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Alt Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/75 backdrop-blur-sm flex items-center justify-between px-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/images/avatar.png"
                      alt="Jelly Arcade"
                      width={36}
                      height={36}
                      className="rounded"
                    />
                    <h1 className="text-white font-medium">
                      {game.title[locale]}
                    </h1>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <BiSolidJoystick className="w-5 h-5 text-white" />
                      <span className="text-sm text-white">
                        {game.playCount || 0}
                      </span>
                    </div>
                    <button
                      onClick={toggleFavorite}
                      className="flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`w-5 h-5 ${
                          isFavorite ? "text-red-500" : "text-white"
                        }`}
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                      <span className="text-sm text-white">
                        {favoriteCount}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Game Container
              <div
                id="game-container"
                className={`relative w-full h-[70vh] ${
                  isFullscreen
                    ? "fixed inset-0 w-screen h-screen"
                    : "rounded-lg"
                } overflow-hidden shadow-lg`}
              >
                {/* Fullscreen Control Bar */}
                {isFullscreen && (
                  <div className="absolute top-0 left-0 right-0 h-6 bg-black backdrop-blur-sm flex items-center justify-between px-4 z-[99999]">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          setIsPlaying(false);
                          if (document.fullscreenElement) {
                            document.exitFullscreen();
                          }
                          window.location.href = "/";
                        }}
                        className="bg-brand-orange hover:bg-brand-orange/90 text-white p-1 rounded flex items-center justify-center transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-3"
                        >
                          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                        </svg>
                      </button>
                    </div>

                    {!token ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (document.fullscreenElement) {
                              document.exitFullscreen().then(() => {
                                setTimeout(() => {
                                  setShowAuthModal(true);
                                }, 100);
                              });
                            } else {
                              setShowAuthModal(true);
                            }
                          }}
                          className="p-1 rounded-full transition-colors hover:bg-white/10 text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            if (document.fullscreenElement) {
                              document.exitFullscreen().then(() => {
                                setTimeout(() => {
                                  setShowAuthModal(true);
                                }, 100);
                              });
                            } else {
                              setShowAuthModal(true);
                            }
                          }}
                          className="bg-brand-orange hover:bg-brand-orange/90 text-white px-2 py-1 rounded flex items-center gap-1 transition-colors text-xs"
                        >
                          <RiLoginBoxLine className="size-3" />
                          {locale === "tr" ? "Giriş Yap" : "Login"}
                        </button>
                      </div>
                    ) : (
                      <div className="text-white flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={toggleFavorite}
                            className={`p-1 rounded-full transition-colors hover:bg-white/10 ${
                              isFavorite ? "text-red-500" : "text-white"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                          </button>
                          <span className="text-xs">{favoriteCount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              userProfile?.avatar ||
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                            }
                            alt={user?.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          {user?.username && (
                            <span className="text-xs">{user.username}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Fullscreen Button for Web */}
                {!isMobile && !isFullscreen && (
                  <button
                    onClick={() => {
                      const gameContainer =
                        document.querySelector("#game-container");
                      if (gameContainer && gameContainer.requestFullscreen) {
                        gameContainer.requestFullscreen();
                      }
                    }}
                    className="absolute top-4 right-4 bg-black hover:bg-black/90 text-white p-2 rounded transition-colors z-[99999]"
                    title={locale === "tr" ? "Tam Ekran" : "Fullscreen"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                      />
                    </svg>
                  </button>
                )}

                <div
                  className={`w-full h-full ${
                    isFullscreen ? "fixed inset-0 pt-6" : ""
                  } relative`}
                >
                  <iframe
                    src={game.instantLink}
                    className={`w-full h-full border-0 ${
                      isFullscreen
                        ? "fixed inset-0 h-[calc(100%-18px)] top-[18px]"
                        : ""
                    }`}
                    style={{ backgroundColor: "#000000" }}
                    allow="clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen={false}
                    sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
                    loading="lazy"
                    referrerPolicy="origin"
                    title={game.title[locale]}
                  />
                </div>
              </div>
            )}

            {/* Mobil için tam ekrana dön butonu */}
            {isMobile && isPlaying && !isFullscreen && (
              <div className="mt-4">
                <button
                  onClick={() => {
                    const gameContainer =
                      document.querySelector("#game-container");
                    if (gameContainer) {
                      try {
                        if (isIOS) {
                          gameContainer.style.position = "fixed";
                          gameContainer.style.top = "0";
                          gameContainer.style.left = "0";
                          gameContainer.style.width = "100%";
                          gameContainer.style.height = "100%";
                          gameContainer.style.zIndex = "9999";
                          document.body.style.overflow = "hidden";
                          setIsFullscreen(true);
                        } else {
                          if (gameContainer.requestFullscreen) {
                            gameContainer.requestFullscreen();
                          } else if (gameContainer.webkitRequestFullscreen) {
                            gameContainer.webkitRequestFullscreen();
                          } else if (gameContainer.mozRequestFullScreen) {
                            gameContainer.mozRequestFullScreen();
                          } else if (gameContainer.msRequestFullscreen) {
                            gameContainer.msRequestFullscreen();
                          }
                        }
                      } catch (error) {
                        console.error("Fullscreen error:", error);
                      }
                    }
                  }}
                  className="w-full bg-brand-orange text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-brand-orange/90 transition-colors active:bg-brand-orange/80 cursor-pointer touch-manipulation"
                  style={{
                    WebkitTapHighlightColor: "transparent",
                    WebkitTouchCallout: "none",
                    WebkitUserSelect: "none",
                    userSelect: "none",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                    />
                  </svg>
                  {locale === "tr"
                    ? "Tam Ekranda Devam Et"
                    : "Continue in Full Screen"}
                </button>
              </div>
            )}

            {/* Game Details Akordiyon */}
            <div className="border rounded-lg overflow-hidden">
              <button
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
              >
                <span className="font-medium">
                  {locale === "tr" ? "Oyun Detayları" : "Game Details"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-5 h-5 transition-transform ${
                    isDetailsOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Game Details İçeriği */}
              <div
                className={`transition-all duration-300 ${
                  isDetailsOpen ? "block" : "hidden"
                }`}
              >
                <div className="p-4 space-y-4">
                  {/* Açıklama */}
                  {game.description?.[locale] && (
                    <div>
                      <h3 className="font-medium mb-2">
                        {t("game.description")}:
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {game.description[locale]}
                      </p>
                    </div>
                  )}

                  {/* Kategori */}
                  {game.categories?.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">
                        {t("game.category")}:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {game.categories.map((category) => (
                          <span
                            key={category._id}
                            className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm"
                          >
                            {category.name[locale]}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Etiketler */}
                  {game.keywords?.[locale]?.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">{t("game.tags")}:</h3>
                      <div className="flex flex-wrap gap-2">
                        {game.keywords[locale].map((keyword) => (
                          <span
                            key={keyword}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                          >
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
