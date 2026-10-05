import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { MyStore } from "../../app/context/MyContext";
import SessionLoader from "../../feature/transaction/ui/components/SessionLoader";

const PublicProtectedRoute = () => {
  const { user,  loading} = useContext(MyStore);

  if (loading) {
    return <SessionLoader />;
  }

  if (user) return <Navigate to={"/home"} />;

  return <Outlet />;
};

export default PublicProtectedRoute;
