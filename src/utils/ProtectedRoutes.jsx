import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const [logged, setLogged] = useState(null); // Set initial state to null

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userData"));
    if (user?.username === "Admin") {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  if (logged === null) {
    // Optional: return a loading spinner or message while checking authentication
    return (
      <div className="flex justify-center items-center w-full h-screen">
        Loading...
      </div>
    );
  }

  return logged ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
