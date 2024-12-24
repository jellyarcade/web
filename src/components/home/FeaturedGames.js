import GameCard from "../shared/GameCard";

const FeaturedGames = ({ games }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {games?.map((game) => (
        <GameCard key={game._id} game={game} />
      ))}
    </div>
  );
};

export default FeaturedGames;
