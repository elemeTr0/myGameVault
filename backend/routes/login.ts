import { Router } from "express";

const loginRoute = Router();

loginRoute.post("/", async (req, res) => {
    const { username, password } = req.body;

    console.log(username);
    console.log(password);

    res.json({ message: "Login request received" });
});

export default loginRoute;