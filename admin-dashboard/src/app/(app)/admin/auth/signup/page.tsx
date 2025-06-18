'use client'
import { useState } from "react";

export default function SignIn () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")

    const handleSignup = async (e:React.FormEvent) =>{
        e.preventDefault()
        setMessage("");

        try {
            const res = await fetch("/api/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email,password,name}),
            });
            console.log(JSON.stringify({email,password,name}));
            const data = await res?.json();

            if(!res?.ok){
                setMessage(data.message || "Error signing up");
            }else{
                setMessage("Signup successful");
                setEmail("");
                setName("");
                setPassword("");
            }
            

        } catch (error) {
            console.error("Signup error: ", error);
            setMessage("Error signing up");
        }
    };

    return(
        <form className="flex flex-col items-center space-y-4" onSubmit={handleSignup}>
            <h2>Sign Up</h2>
            <input
             className="border-black-1 border-2"
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e)=>setName(e.target.value)}
            />
            <input
            className="border-black-1 border-2"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e)=>setEmail(e.target.value)}
            />
             <input
             className="border-black-1 border-2"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e)=>setPassword(e.target.value)}
            />
            
             <button className="bg-black text-white rounded-xl p-2" type="submit">Sign up</button>
             {message && <p>{message}</p>}
        </form>
    )
}


