
import { Router } from "express";
import pool from "../src/db.js";
import bcrypt from "bcrypt";
import "express-session";

declare module "express-session" {
    interface SessionData {
        userId: number;
    }
}

const loginRoute = Router();

loginRoute.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;

        const foundUser = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (foundUser.rows.length === 0) {
            return res.status(404).json({
                message: "Username does NOT exist"
            });
        }

        const userPw = foundUser.rows[0].password;

        const passwordMatch = await bcrypt.compare(
            password,
            userPw
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        req.session.userId = foundUser.rows[0].id;

        return res.json({
            message: "Login successful"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

export default loginRoute;
