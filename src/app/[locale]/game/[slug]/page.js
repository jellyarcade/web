export async function generateMetadata({ params: { locale, slug } }) {
  const game = await getGame(slug);

  if (!game) {
    return {
      title:
        locale === 'tr'
          ? 'Oyun Bulunamadı - Ücretsiz Oyunlar & Yüklemeden hemen oyna! - Jelly Arcade'
          : 'Game Not Found - Free Games & Play without installing! - Jelly Arcade',
    };
  }

  return {
    title: game.name[locale],
    description: game.description[locale],
  };
}
