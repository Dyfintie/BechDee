"use client";
import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const res = await fetch("/api/login/admin", {
      method: "POST",
      body: JSON.stringify({ username: user, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      window.location.href = "/admin"; 
    } else {
      alert("Invalid credentials");
    }
  };
  

  return (
    <div className="h-[400px]  items-center justify-center bg-custom px-4">
      <div className="card w-full max-w-md p-8 border border-gray-300 rounded-xl shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">🔐 Admin Login</h2>

        <label
          htmlFor="username"
          className="block mb-2 font-semibold text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
          placeholder="Enter admin username"
        />

        <label
          htmlFor="password"
          className="block mb-2 font-semibold text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
          placeholder="Enter password"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
