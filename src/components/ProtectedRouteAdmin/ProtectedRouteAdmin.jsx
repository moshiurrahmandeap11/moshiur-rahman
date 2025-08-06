import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const ProtectedRouteAdmin = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (user && user.email !== "admin@moshiurrahmandeap.com") {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        clearInterval(interval);
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-lg">
        Checking permissions...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.email !== "admin@moshiurrahmandeap.com") {
    if (countdown <= 0) {
      return <Navigate to="/" replace />;
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 font-semibold text-lg text-center px-4">
        🚫 Access Denied: Admins only.
        <p className="text-sm mt-2 text-gray-300">
          Redirecting in <span className="font-bold text-white">{countdown}</span>...
        </p>
      </div>
    );
  }

  return children;
};

export default ProtectedRouteAdmin;
