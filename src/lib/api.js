export async function getGame(slug, locale) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
  const response = await fetch(`${baseUrl}/api/game/${slug}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const game = await response.json();
  return game;
}
