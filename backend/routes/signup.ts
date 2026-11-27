import { Router } from "express";

const signupRoute = Router();

signupRoute.post("/", async (req, res) => {
    const { username, password, confirm_pw } = req.body;

    console.log(username);
    console.log(password);
    console.log(confirm_pw);

    res.json({ message: "Signup request received" });
});

export default signupRoute;