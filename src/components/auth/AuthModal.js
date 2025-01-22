"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const t = useTranslations("auth");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const body = isLogin ? { email, password } : { name, email, password };

      const response = await fetch(
        `https://api.jellyarcade.com//api${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.msg || t("error"));
      }

      if (!data.token) {
        throw new Error(t("tokenError"));
      }

      await login(data.user, data.token);
      onClose();
    } catch (error) {
      console.error("Auth error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `https://api.jellyarcade.com//api/auth/${provider}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 md:flex md:items-center md:justify-center z-[9999]">
      <div className="fixed inset-0 bg-[#ff4f00] text-white md:static md:rounded-lg md:h-auto md:max-w-md md:mx-4 flex flex-col justify-center items-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {isLogin ? t("login") : t("signup")}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-white/90"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => handleSocialLogin("google")}
              disabled={loading}
              className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-white/20 rounded-md shadow-sm bg-white/10 text-sm font-medium text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle className="h-5 w-5" />
              <span className="ml-2">Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin("facebook")}
              disabled={loading}
              className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-white/20 rounded-md shadow-sm bg-white/10 text-sm font-medium text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaFacebook className="h-5 w-5 text-blue-600" />
              <span className="ml-2">Facebook</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#ff4f00] text-white">
                {t("continueWith")}
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-white">
                  {t("name")}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-white/20 rounded-md shadow-sm bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-[#16bf36] focus:border-[#16bf36]"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white">
                {t("email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-white/20 rounded-md shadow-sm bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-[#16bf36] focus:border-[#16bf36]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                {t("password")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-white/20 rounded-md shadow-sm bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-[#16bf36] focus:border-[#16bf36]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-white text-base font-medium bg-[#16bf36] hover:bg-[#16bf36]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16bf36] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t("processing") : isLogin ? t("login") : t("signup")}
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={() => setIsLogin(!isLogin)}
              disabled={loading}
              className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-white text-base font-medium bg-[#16bf36] hover:bg-[#16bf36]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16bf36] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLogin ? "Kayıt ol" : "Giriş yap"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
