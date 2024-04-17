import React, { useEffect } from "react";
import { useAuthContext } from "../../containers/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const { user, checkUserHasAuth, isLoading } = useAuthContext();
  const location = useLocation();

  useEffect(() => {
    checkUserHasAuth();
  }, [checkUserHasAuth, location]);

  return isLoading ? null : !user ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default RequireAuth;
