type Game = {
    id: number;
    name: string;
    rating: number;
    url: string;
    cover: {
    image_id: string;
  };
};

type CatalogProp = {
    games: Game[];
};

type CardProp = {
    game: Game;
};

export default function Catalog({ games }: CatalogProp) {

    const filteredGames = games.filter(r => isNaN(r.rating) === false && (r.cover))

    return (
        <>
    <h1>Top-Rated Games</h1>
        <div className="displayGames">
            
            {filteredGames.map((game) => (
                <Card key={game.id} game={game} />
            ))}
        </div>
        </>
    );
}

export function Card({ game }: CardProp) {

    const rating = Math.ceil(Number(game.rating))/20
    console.log(game.name + rating)

    return (
        <div className="gameCard">
{game.cover?.image_id ? (
    <img
        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
        alt={game.name}
    />
) : (
    <div className="no-cover">No cover available</div>
)}        
<div className="gameCardInfo">
<h2>{game.name}</h2>
        <p  className="rating">⭐ {rating.toFixed(1)}</p>
        </div>
        </div>
    );
}
