'use client'

import { signIn } from "next-auth/react";
import { useState } from "react";

const SignIn = ()=> {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")
    const [token, setToken] = useState("");

    const handleSignin = async (e:React.FormEvent) =>{
        e.preventDefault()
        setMessage("");
        setToken("");

        try {
            const res = await signIn("credentials",{
                email,
                password,
                redirect:false
            });

            if(!res?.ok){
                setMessage("Error signing in");
            }else{
                setMessage("Signin successful");
            }
        } catch (error) {
            console.error("Signin error: ", error);
            setMessage("Error signing in");
        }
    };

    return(
        <form className="flex flex-col items-center space-y-4" onSubmit={handleSignin}>
            <h2>Sign In</h2>
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
             <button className="bg-black text-white rounded-xl p-2" type="submit">Sign In</button>
             {message && <p>{message}</p>}
        </form>
    )
}


export default SignIn