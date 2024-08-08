import React, { useState, useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AuthLayout, BasicLayout } from "./layout/index";
import {
  AddStudent,
  ErrorPage,
  ListStudent,
  Login,
  Register,
  UpdateStudent,
} from "./pages/index";
import isTokenExpired from "./utils/isTokenExp.js";

import { AuthContextProvider } from "./context/authContext.js";
const App = () => {
  const [isAuth, setIsAuth] = useState("");
  const [storageItem, setStorageItem] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authentication");
    const isExp = isTokenExpired(token);
    if (isExp) {
      setIsAuth("");
    } else {
      setIsAuth(token);
    }
  }, [storageItem]);

  const routers = createBrowserRouter([
    { path: "*", element: <ErrorPage /> },
    {
      path: "/",
      element: isAuth ? <BasicLayout /> : <Navigate to="/auth" />,
      children: [
        {
          path: "",
          element: <AddStudent />,
        },
        {
          path: "/list",
          element: <ListStudent />,
        },
        {
          path: "/edit/:Id",
          element: <UpdateStudent />,
        },
      ],
    },

    {
      path: "auth",
      element: isAuth ? <Navigate to="/" /> : <AuthLayout />,
      children: [
        { path: "", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);

  return (
    <AuthContextProvider value={{ storageItem, setStorageItem }}>
      <RouterProvider router={routers} />
    </AuthContextProvider>
  );
};

export default App;
