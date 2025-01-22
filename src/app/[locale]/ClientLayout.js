"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AuthModalProvider } from "@/contexts/AuthModalContext";
import AuthModal from "@/components/auth/AuthModal";
import { useAuthModal } from "@/contexts/AuthModalContext";

function AuthModalWrapper() {
  const { isOpen, closeAuthModal } = useAuthModal();
  return <AuthModal isOpen={isOpen} onClose={closeAuthModal} />;
}

export default function ClientLayout({ children }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { token: authToken, login } = useAuth();

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (!urlToken) return; // parametre yoksa hiçbir şey yapma

    // Mevcut user/ token varsa tekrar login yapma
    if (authToken) {
      console.log("Zaten login'liyiz, bir şey yapmıyoruz");
      return;
    }

    // URL'deki token'ı kaydet
    console.log("Yeni token bulundu -> login işlemi");
    login(null, urlToken);

    // Parametreyi temizle
    router.replace(router.pathname);
    // veya router.replace("/tr");
  }, [searchParams, router, authToken, login]);

  return (
    <AuthModalProvider>
      <AuthModalWrapper />
      {children}
    </AuthModalProvider>
  );
}
