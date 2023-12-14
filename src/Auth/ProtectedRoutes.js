import React from 'react';
import { Outlet, Navigate } from "react-router-dom";


const useAuth = () => {
    const user = localStorage.getItem("token");
    return user
}

function ProtectedRoutes() {
    const auth = useAuth();
    return auth ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes