import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const { slug } = params;

  // Oyun verilerini gamelist.txt'den oku
  const gamelistPath = path.join(process.cwd(), 'gamelist.txt');
  const gamelistContent = fs.readFileSync(gamelistPath, 'utf8');
  const games = parseGamelist(gamelistContent);

  const game = games[slug];

  if (!game) {
    return new NextResponse(JSON.stringify({ error: 'Game not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new NextResponse(JSON.stringify(game), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function parseGamelist(content) {
  const games = {};
  const lines = content.split('\n').filter(line => line.trim());

  let currentGame = null;
  let isHorizontal = false;

  for (const line of lines) {
    if (line.includes('YATAY OYUN')) {
      isHorizontal = true;
      continue;
    }
    if (line.includes('DIKEY OYUN')) {
      isHorizontal = false;
      continue;
    }

    if (line.startsWith('http')) {
      const url = line.trim();
      const gameId = extractGameId(url);

      if (gameId) {
        games[gameId] = {
          id: gameId,
          url,
          title: {
            tr: formatGameTitle(gameId),
            en: formatGameTitle(gameId),
          },
          orientation: isHorizontal ? 'landscape' : 'portrait',
        };
      }
    }
  }

  return games;
}

function extractGameId(url) {
  // URL'den oyun ID'sini çıkar
  const match = url.match(/deeplinksApp=([^&]+)/);
  if (match) {
    const fullId = match[1];
    const parts = fullId.split('.');
    return parts[parts.length - 1].toLowerCase();
  }
  return null;
}

function formatGameTitle(gameId) {
  // ID'yi başlığa dönüştür
  return gameId
    .split(/[-_.]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
