import React from "react";
import { useTheme } from "../containers/ThemeProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./LoginPage";
import ErrorBoundary from "./ErrorBoundary";
import RegistrationPage from "./RegistrationPage";

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
      <div className="App">
        <button onClick={toggleTheme}>changeTheme</button>
      </div>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
