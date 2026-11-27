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
        <div className="displayGames">
            {filteredGames.map((game) => (
                <Card key={game.id} game={game} />
            ))}
        </div>
    );
}

export function Card({ game }: CardProp) {

    const rating = Math.ceil(Number(game.rating))/10
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
)}        <h2>{game.name}</h2>
            <p>{rating.toFixed(1)}</p>
        </div>
    );
}
