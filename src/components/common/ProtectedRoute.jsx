import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

const ProtectedRoute = () => {
    return getCurrentUser() ? <Outlet /> : <Navigate replace to="/login" />;
};

export default ProtectedRoute;
