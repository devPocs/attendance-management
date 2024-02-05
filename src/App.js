import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Error from "./pages/Error";
import AdminRoutes from "./pages/AdminRoutes";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";
import TimeInPage from "./pages/subPages/TimeInPage";

function App() {
  return (
    <>
      <nav className="bg-blue-500 p-4 text-center">
        <ul className="flex justify-center space-x-4">
          <li>
            <Link
              to="/"
              className="text-2xl text-white hover:font-semibold hover:text-gray-300 hover:no-underline"
            >
              Home |
            </Link>
          </li>

          <li>
            <Link
              to="/admin"
              className="text-2xl text-white hover:font-semibold hover:text-gray-300 hover:no-underline"
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
        <Route path="/time_in_page" element={<TimeInPage />} />

        {/* Use ProtectedRoute for admin route 
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute element={<AdminRoutes />} adminOnly={true} />
          }
        />
        */}

        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
