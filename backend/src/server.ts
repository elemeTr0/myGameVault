import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gameRoutes from "../routes/gameRoutes.js";
import loginRoute from "../routes/login.js";
import signupRoute from "../routes/signup.js";
import pool from "./db.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", gameRoutes);
app.use("/login", loginRoute)
app.use("/signup", signupRoute)



app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});