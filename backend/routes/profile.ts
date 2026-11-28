import { Router } from "express";
import pool from "../src/db.js";

const profileRoute = Router()

profileRoute.get("/", async (req,res) => {
    if (!req.session.userId) {
        return res.status(401).json({
            message: "Not authenticated"
        });
    }

    return res.json({
        userId: req.session.userId
    });
})

export default profileRoute