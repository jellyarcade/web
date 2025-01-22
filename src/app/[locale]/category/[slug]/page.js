import GameGrid from "@/components/category/GameGrid";
import HeroSection from "@/components/category/HeroSection";
import RecentlyPlayed from "@/components/home/RecentlyPlayed";
import { notFound, redirect } from "next/navigation";

const API_URL = "https://api.jellyarcade.com//api";

async function getCategory(slug) {
  try {
    const res = await fetch(`${API_URL}/categories/slug/${slug}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export async function generateMetadata({ params: { locale, slug } }) {
  const category = await getCategory(slug);

  if (!category) {
    return {
      title:
        locale === "tr"
          ? "Kategori Bulunamadı - Ücretsiz Oyunlar & Yükleme Yok - Jelly Arcade"
          : "Category Not Found - Free Games & No Install - Jelly Arcade",
    };
  }

  return {
    title: category.name[locale],
    description: category.description[locale],
  };
}

export default async function CategoryPage({ params: { locale, slug } }) {
  // Türkçe URL'ye yönlendir
  if (locale === "tr") {
    redirect(`/tr/kategori/${slug}`);
    return null;
  }

  const category = await getCategory(slug);

  if (!category || !category.name || !category.name[locale]) {
    return notFound();
  }

  // API'den gelen veriyi GameGrid formatına dönüştür
  const games =
    category?.games?.map((game) => ({
      _id: game._id,
      title: {
        [locale]: game.title?.[locale] || game.title?.en || "",
      },
      slug: {
        [locale]: game.slug?.[locale] || game.slug?.en || "",
      },
      instantLink: game.instantLink,
      playCount: game.playCount,
      image: game.image,
    })) || [];

  return (
    <div className="mt-24">
      <HeroSection categoryId={category._id} />
      <RecentlyPlayed />
      <div className="mb-8"></div>
      <GameGrid
        games={games}
        title={category.name[locale]}
        description={category.description?.[locale] || ""}
      />
    </div>
  );
}
