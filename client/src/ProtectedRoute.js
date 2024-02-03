import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const ProtectedRoute = ({ element, adminOnly }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Inside useEffect to ensure it runs after initial render
    if (
      !user ||
      (adminOnly && !(user.role === "admin" || user.role === "superAdmin"))
    ) {
      navigate("/login");
    }
  }, [user, adminOnly, navigate]);

  // Render the admin route if authenticated
  return element;
};

export default ProtectedRoute;
