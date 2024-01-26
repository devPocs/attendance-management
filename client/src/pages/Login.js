import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

    const response = await fetch(
      "http://localhost:5000/app/v1/admin/login",
      options
    );
    const data = await response.json();
    console.log(data);
    if (data.status === "success") {
      navigate("/admin");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form id="login" onSubmit={handleLogin}>
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-4 shadow-md focus:outline-none focus:ring focus:border-blue-300"
          />

          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-2"
          >
            Password:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-4 shadow-md focus:outline-none focus:ring focus:border-blue-300"
          />

          <button
            id="login"
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 font-semibold "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
