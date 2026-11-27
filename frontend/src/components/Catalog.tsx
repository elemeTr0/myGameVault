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
    return (
        <>
            {games.map((game) => (
                <Card key={game.id} game={game} />
            ))}
        </>
    );
}

export function Card({ game }: CardProp) {

    const rating = Math.ceil(game.rating)/10
    return (
        <div className="gameCard">
<img
  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
  alt={game.name}
/>        <h2>{game.name}</h2>
            <p>{rating.toFixed(1)}</p>
        </div>
    );
}
