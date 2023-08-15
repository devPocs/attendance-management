import React from "react";

function Login() {
  return (
    <>
      <div>
        <h1>Login</h1>
      </div>
      <form id="login">
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" name="email" />
        <br />
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" name="password" />
        <br />
        <button id="login" type="submit">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
