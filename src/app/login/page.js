"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn("credentials", { email, password, redirect: true, callbackUrl: "/employee" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80 text-black">
          <p className="text-sm text-center mt-2">
             Not registered? <Link href="/" className="text-green-500">Sign up</Link>
           </p>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input className="w-full p-2 border mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full p-2 border mb-4" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-green-500 text-white p-2">Login</button>
      </form>
    </div>
  );
}
