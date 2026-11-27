import { useEffect, useState } from 'react'

import Catalog from './components/Catalog';

import './App.css'

function App() {

  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
        async function fetchGames() {
            const response = await fetch(
                "http://localhost:5000/popularGames"
            );

            const data = await response.json();

            setGames(data);
        }

        fetchGames();
    }, []);

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
    <div>
    <input id="search" type='text' placeholder='Search for a game title' value={search} onChange={(e) => setSearch(e.target.value)}></input>
    <Catalog games={games} />
    </div>
  )
}

export default App
