// src/components/routing/PrivateRoute.tsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default PrivateRoute;
