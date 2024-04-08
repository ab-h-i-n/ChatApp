import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}) {

  const hasLoggedIn = localStorage.getItem('hasLoggedIn');

  console.log(hasLoggedIn);

  return !hasLoggedIn ? <Navigate to={'/login'} /> : children;
}

export default ProtectedRoute;
