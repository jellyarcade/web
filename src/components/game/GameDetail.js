"use client";

export default function GameDetail({ game, locale }) {
  return (
    <div className="max-w-4xl mx-auto">
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
          <h1 className="text-3xl font-bold">{game.title[locale]}</h1>
          <p className="text-gray-600">{game.description[locale]}</p>

          <div className="flex flex-wrap gap-2">
            {game.categories.map((category) => (
              <span
                key={category._id}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {category.name}
              </span>
            ))}
          </div>

          <button
            onClick={() => (window.location.href = game.instantLink)}
            className="w-full md:w-auto px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Şimdi Oyna
          </button>
        </div>
      </div>
    </div>
  );
}
