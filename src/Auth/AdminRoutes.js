import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const decodedToken = jwtDecode(token);
  return decodedToken.role === "admin" ? token : null;
};

function AdminRoutes() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/admin-login" />;
}

export default AdminRoutes;
