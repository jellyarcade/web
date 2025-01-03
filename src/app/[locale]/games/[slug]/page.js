import { getGame } from "@/lib/api";

export async function generateMetadata({ params }) {
  const game = await getGame(params.slug, params.locale);

  return {
    title: game.title[params.locale],
    description: {
      tr: "Efsanevi tank savaş oyunu World of Tanks Blitz'de savaş meydanlarında hakimiyet kurun! Modern ve tarihi tankların yer aldığı bu heyecan verici oyunda, dünyanın dört bir yanından oyuncularla rekabet edebilirsiniz. 400'den fazla benzersiz tank arasından seçim yaparak kendi savaş tarzınızı geliştirebilir, tankınızı özelleştirebilir ve mürettebatınızı eğitebilirsiniz. Gerçekçi grafikleri, detaylı tank modelleri ve etkileyici savaş mekanikleriyle World of Tanks Blitz, mobil platformda en iyi tank savaş deneyimini sunuyor. Farklı haritalar, çeşitli oyun modları ve stratejik takım savaşları ile her maç benzersiz bir deneyim yaşayacaksınız. Tank teknolojisinin gelişimini yansıtan araştırma sistemi sayesinde, sürekli yeni tanklara ve geliştirmelere erişebilirsiniz. Arkadaşlarınızla klan oluşturabilir, ortak hedefler için savaşabilir ve dünya çapındaki turnuvalara katılabilirsiniz. Ücretsiz oynayabileceğiniz bu oyunda, taktiksel düşünce ve hızlı reflekslerinizi birleştirerek zafere ulaşın!",
      en: "Dominate the battlefields in the legendary tank battle game World of Tanks Blitz! Experience intense combat with both modern and historical tanks in this thrilling game where you can compete with players from around the world. Choose from over 400 unique tanks to develop your own combat style, customize your vehicle, and train your crew. With realistic graphics, detailed tank models, and impressive combat mechanics, World of Tanks Blitz offers the best tank warfare experience on mobile platforms. You'll enjoy a unique experience in every match with diverse maps, various game modes, and strategic team battles. Through the research system that reflects the evolution of tank technology, you can continuously unlock new tanks and upgrades. Form clans with your friends, fight for common goals, and participate in worldwide tournaments. Combine tactical thinking and quick reflexes to achieve victory in this free-to-play game that brings the excitement of tank warfare to your fingertips!",
    }[params.locale],
    keywords: game.keywords[params.locale].join(", "),
  };
}

export default async function GamePage({ params }) {
  const game = await getGame(params.slug, params.locale);

  return (
    <div className="container mx-auto px-4 py-8 mt-[72px]">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sol Taraf - Oyun Görseli */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={game.image}
              alt={game.title[params.locale]}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Sağ Taraf - Oyun Bilgileri */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{game.title[params.locale]}</h1>
            <p className="text-gray-600">{game.description[params.locale]}</p>

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
    </div>
  );
}
