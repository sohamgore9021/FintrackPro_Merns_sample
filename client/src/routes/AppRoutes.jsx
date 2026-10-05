import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "../feature/auth/ui/pages/Login";
import AuthLayout from "../app/layout/AuthLayout";
import Register from "../feature/auth/ui/pages/Register";
import MainLayout from "../app/layout/MainLayout";
import Dashboard from "../feature/transaction/ui/pages/Dashboard";
import Profile from "../feature/transaction/ui/pages/Profile";
import PublicProtectedRoute from "./protected/PublicProtectedRoute";
import MainProtectedRoute from "./protected/MainProtectedRoute";
import { useContext } from "react";
import { MyStore } from "../app/context/MyContext";
import { useEffect } from "react";
import useApi from "../feature/auth/api/authApi";

const AppRoutes = () => {

  const {setUser, setLoading} = useContext(MyStore)
  const api = useApi()

   useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <PublicProtectedRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },
      ],
    },
    {
      path: "/home",
      element: <MainProtectedRoute />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <Dashboard />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
