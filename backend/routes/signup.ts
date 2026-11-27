
import { Router } from "express";
import pool from "../src/db.js";
import bcrypt from "bcrypt";

const signupRoute = Router();

function validPass(password: string): boolean {
    if (password.length < 8) return false;

    return true;
}

signupRoute.post("/", async (req, res) => {
    try {
        const { username, password, confirm_pw } = req.body;

        if (!username || !password || !confirm_pw) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const dupTest = await pool.query(
            "SELECT username FROM users WHERE username = $1",
            [username],
        );

        if (dupTest.rows.length > 0) {
            return res.status(409).json({
                message: "Username already exists",
            });
        }

        if (!validPass(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long",
            });
        }

        if (password !== confirm_pw) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2)",
            [username, hashedPassword],
        );

        return res.status(201).json({
            message: "Account created successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

export default signupRoute;
