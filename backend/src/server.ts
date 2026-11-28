import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gameRoutes from "../routes/gameRoutes.js";
import loginRoute from "../routes/login.js";
import signupRoute from "../routes/signup.js";
import profileRoute from "../routes/profile.js"
import pool from "./db.js"
import session from "express-session";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }
}));

app.use("/", gameRoutes);
app.use("/login", loginRoute)
app.use("/signup", signupRoute)
app.use("/profile", profileRoute)



app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});