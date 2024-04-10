import React from "react";
import { useTheme } from "../containers/ThemeProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./LoginPage";
import ErrorBoundary from "./ErrorBoundary";
import RegistrationPage from "./RegistrationPage";
import SideMenu from "../components/SideMenu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },
]);

const App = () => {
  const { toggleTheme } = useTheme();

  return (
    <>
      <SideMenu />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
