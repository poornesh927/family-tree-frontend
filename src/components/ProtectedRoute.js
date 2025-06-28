import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (adminOnly && role !== "admin") {
    alert("Admin access only");
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;
