import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Error from "./pages/Error";
import AdminRoutes from "./pages/AdminRoutes";
import Login from "./pages/Login";

function App() {
  const AdminRouteGuard = ({ element }) => {
    const navigate = useNavigate();
    const isAuthenticated = true; // Replace with your authentication logic

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? element : null;
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin">Admin Home</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/error" element={<Error />} />
        <Route
          path="/admin/*"
          element={<AdminRouteGuard element={<AdminRoutes />} />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
