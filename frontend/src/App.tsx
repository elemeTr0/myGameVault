import { useEffect, useState } from 'react'

import Catalog from './components/Catalog';

import './App.css'

function App() {

  const [games, setGames] = useState([]);

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

    console.log(games)
  return (
    <>
    <Catalog games={games} />
    </>
  )
}

export default App
