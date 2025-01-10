export async function generateMetadata({ params: { locale, slug } }) {
  const game = await getGame(slug);

  if (!game) {
    return {
      title:
        locale === 'tr'
          ? 'Oyun Bulunamadı - Ücretsiz Oyunlar & Yükleme Yok - Jelly Arcade'
          : 'Game Not Found - Free Games & No Install - Jelly Arcade',
    };
  }

  return {
    title: game.name[locale],
    description: game.description[locale],
  };
}
