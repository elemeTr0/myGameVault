import express from "express";
import { getAccessToken } from "../src/igdb.js";

const router = express.Router();

// router.get("/search", async (req, res) => {
//     try {
//         const search = req.query.search;

//         const token = await getAccessToken();

//         const response = await fetch(
//             "https://api.igdb.com/v4/games",
//             {
//                 method: "POST",
//                 headers: {
//                     "Client-ID": process.env.TWITCH_CLIENT_ID!,
//                     "Authorization": `Bearer ${token}`,
//                     "Content-Type": "text/plain"
//                 },
//                 body: `
//                     fields name, cover.url, first_release_date, genres.name;
//                     search "${search}";
//                     limit 1;
//                 `
//             }
//         );

//         const games = await response.json();

//         res.json(games);

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to fetch games" });
//     }
// });

router.get("/popularGames", async (req, res) => {
    try {
        const search = req.query.search;

        const token = await getAccessToken();

        const response = await fetch(
            "https://api.igdb.com/v4/games",
            {
                method: "POST",
                headers: {
                    "Client-ID": process.env.TWITCH_CLIENT_ID!,
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "text/plain"
                },
                body: `
                    fields id, name, cover.image_id, rating, artworks.image_id;
                    where rating_count > 10;
                    sort rating_count desc;
                    limit 10;
                `
            }
        );

        const games = await response.json();

        res.json(games);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch games" });
    }
});

export default router;