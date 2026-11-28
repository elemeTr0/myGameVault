import { useState } from "react";

export default function Signup() {
    const [username, setUser] = useState("");
    const [password, setPw] = useState("");
    const [cpassword, setCPw] = useState("");
    const [error, setError] = useState("")

    async function handleLogin() {
        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
                confirm_pw: cpassword,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
        setError(data.message);
        return;
    }

    setError("");

        console.log(data);
    }
    return (
        <div>
            <a href={"/"}>Escape hatch placeholder</a>
            <p style={{ color: "red" }}>{error}</p>
            <label>Username</label>
            <input
                type="text"
                placeholder="GameVaultID"
                value={username}
                onChange={(e) => setUser(e.target.value)}
            ></input>
            <label>Password</label>
            <input
                type="password"
                placeholder="GameVaultPW"
                value={password}
                onChange={(e) => setPw(e.target.value)}
            ></input>
            <label>Confirm Password</label>
            <input
                type="password"
                placeholder="Confirm GameVaultPW"
                value={cpassword}
                onChange={(e) => setCPw(e.target.value)}
            ></input>

            <button onClick={handleLogin}>Sign Up</button>

            <a href={"/login"}>Already have an account ?</a>
        </div>
    );
}
