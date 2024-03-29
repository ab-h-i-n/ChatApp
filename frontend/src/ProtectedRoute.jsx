import React from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const ProtectedRoute = ({ children }) => {
  const user = secureLocalStorage.getItem("user");

  return <>{user ? children : <Navigate to={"/login"} />}</>;
};

export default ProtectedRoute;
