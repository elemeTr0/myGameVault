import { useState } from "react";

export default function Login(){
    const [username, setUser] = useState("")
    const [password, setPw] = useState("")

    async function handleLogin(){

        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        const data = await response.json();

        console.log(data);
    }

    return (
        <div>
            <a href={"/"}>Escape hatch placeholder</a>
        <label>Username</label><input type='text' placeholder="GameVaultID" value={username} onChange={e => setUser(e.target.value)}></input>
        <label>Password</label><input type='text' placeholder="GameVaultPW" value={password} onChange={e => setPw(e.target.value)}></input>
        
        <button onClick={handleLogin}>
            Log in
        </button>
        
        <a href={"/signup"}>Don't have an account ?</a>
        </div>
    );
}