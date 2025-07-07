// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Default hardcoded credentials
  const defaultEmail = "admin@example.com";
  const defaultPassword = "123456";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === defaultEmail && password === defaultPassword) {
      const expiration = new Date();
      expiration.setDate(expiration.getDate() + 7); // 7 days from now

      localStorage.setItem(
        "auth",
        JSON.stringify({
          email,
          expiresAt: expiration.toISOString(),
        })
      );

      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
