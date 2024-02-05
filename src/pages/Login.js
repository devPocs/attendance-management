import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    const formData = { email: email, password: password };

    const options = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        "https://attendance-manager-back-i4so-4u3ylam7c-pokoh-ufuomas-projects.vercel.app/app/v1/admin/login",
        options,
      );
      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        // Set the user in the context
        login(data);
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        <form id="login" onSubmit={handleLogin}>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded-md border px-3 py-2 shadow-md focus:border-blue-300 focus:outline-none focus:ring"
          />

          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold"
          >
            Password:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded-md border px-3 py-2 shadow-md focus:border-blue-300 focus:outline-none focus:ring"
          />

          <button
            id="login"
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
