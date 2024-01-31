import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const ProtectedRoute = ({ element, adminOnly }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If the user is not authenticated or doesn't have the required role, redirect to login
  if (
    !user ||
    (adminOnly && !(user.role === "admin" || user.role === "superAdmin"))
  ) {
    navigate("/login");
    return null; // Returning null to avoid rendering anything while navigating
  }

  // Render the admin route if authenticated
  return element;
};

export default ProtectedRoute;
