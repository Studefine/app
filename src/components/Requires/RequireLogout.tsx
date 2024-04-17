import React from "react";
import { useAuthContext } from "../../containers/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireLogout = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  return user ? (
    <Navigate to="/about" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default RequireLogout;
