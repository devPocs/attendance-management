import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Error from "./pages/Error";
import AdminRoutes from "./pages/AdminRoutes";
import Login from "./pages/Login";

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

function App() {
  return (
    <>
      <nav className="bg-blue-500 p-4 text-center">
        <ul className="flex justify-center space-x-4">
          <li>
            <Link
              to="/"
              className="text-white hover:no-underline hover:text-gray-300 hover:font-semibold text-2xl"
            >
              Home |
            </Link>
          </li>

          <li>
            <Link
              to="/admin"
              className="text-white hover:no-underline hover:text-gray-300 hover:font-semibold text-2xl"
            >
              | Admin
            </Link>
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
      <ToastContainer />
    </>
  );
}

export default App;
