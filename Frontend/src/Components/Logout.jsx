import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

function Logout() {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    LogoutUser();
    // You can remove the page reload and just navigate
  }, [LogoutUser]);

  return <Navigate to="/login" replace />;
}

export default Logout;
