import { useState} from "react";

export default function Login(){
    const [username, setUser] = useState("")
    const [password, setPw] = useState("")
    const [error, setError] = useState("")

    async function handleLogin() {
    const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        setError(data.message);
        return;
    }

    setError("");
    console.log(data.message);
}

    return (
        <div>
            <a href={"/"}>Escape hatch placeholder</a>
           <p style={{ color: "red" }}>{error}</p>
        <label>Username</label><input type='text' placeholder="GameVaultID" value={username} onChange={e => setUser(e.target.value)}></input>
        <label>Password</label><input type='password' placeholder="GameVaultPW" value={password} onChange={e => setPw(e.target.value)}></input>
        
        <button onClick={handleLogin}>
            Log in
        </button>
        
        <a href={"/signup"}>Don't have an account ?</a>
        </div>
    );
}