export async function generateMetadata({ params }) {
  const gameDetails = {
    title: {
      tr: "World of Tanks Blitz",
      en: "World of Tanks Blitz",
    },
    description: {
      tr: "Modern ve tarihi tankların yer aldığı bu heyecan verici oyunda, dünyanın dört bir yanından oyuncularla rekabet edebilirsiniz. 400'den fazla benzersiz tank arasından seçim yaparak kendi savaş tarzınızı geliştirebilir, tankınızı özelleştirebilir ve mürettebatınızı eğitebilirsiniz.",
      en: "Experience intense combat with both modern and historical tanks in this thrilling game where you can compete with players from around the world. Choose from over 400 unique tanks to develop your own combat style, customize your vehicle, and train your crew.",
    },
  };

  return {
    title: gameDetails.title[params.locale],
    description: gameDetails.description[params.locale],
  };
}
