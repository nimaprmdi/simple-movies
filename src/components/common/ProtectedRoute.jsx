import React from "react";
import { useParams, Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

const ProtectedRoute = () => {
    const { id } = useParams();
    const location = useLocation();

    return getCurrentUser() ? <Outlet paramId={id} /> : <Navigate replace state={location.pathname} to="/login" />;
};

export default ProtectedRoute;
