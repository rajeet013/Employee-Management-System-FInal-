"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-80 p-6 bg-gray-900 border border-gray-800 rounded-xl">
        <h1 className="text-lime-400 text-xl font-bold mb-4">Admin Login</h1>

        <input
          className="w-full p-2 mb-3 bg-black border border-gray-700"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 bg-black border border-gray-700"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-lime-500 text-black p-2 font-bold"
          onClick={() =>
            signIn("credentials", {
              email,
              password,
              callbackUrl: "/dashboard",
            })
          }
        >
          Login
        </button>
      </div>
    </div>
  );
}
