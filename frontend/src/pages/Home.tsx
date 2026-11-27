import { useEffect, useState } from "react";
import Catalog from "../components/Catalog";
import { useNavigate } from "react-router-dom";

function Home() {
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(async () => {
            const url = search.trim()
                ? `http://localhost:5000/search?q=${encodeURIComponent(search)}`
                : "http://localhost:5000/popularGames";

            const response = await fetch(url);
            const data = await response.json();

            setGames(data);
        }, 500);

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <div id="viewport">
            <nav>
                <button onClick={() => nav("/login")}>
                    Sign In
                </button>

                <button onClick={() => nav("/signup")}>
                    Sign Up
                </button>
            </nav>
            <input
                id="search"
                type="text"
                placeholder="Search for a game title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Catalog games={games} />
        </div>
    );
}

export default Home;