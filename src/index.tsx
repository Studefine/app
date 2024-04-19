import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { customTheme } from "./utils/customValues";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "./pages/ErrorBoundary";
import AuthProvider from "./containers/AuthProvider";
import GlobalProgressbarProvider from "./containers/GlobalProgressbarProvider";
import Layout from "./pages/Layout";
import RequireLogout from "./components/Requires/RequireLogout";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import AboutPage from "./pages/AboutPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import SettingsPage from "./pages/SettingsPage";
import RequireAuth from "./components/Requires/RequireAuth";
import { TopicsPage } from "./pages/TopicsPage/TopicsPage";
import GroupsPage from "./pages/GroupsPage";
import { topicsLoader } from "./pages/TopicsPage/hooks/topicsLoader";
import ElementPageWrapper from "./pages/ElementPageWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <RequireLogout />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "registration", element: <RegistrationPage /> },
          { path: "registration/success", element: <RegistrationSuccess /> },
          { path: "forgot-pass", element: <ForgotPasswordPage /> },
        ],
      },
      { path: "contacts", element: <ContactsPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "terms-of-use", element: <TermsOfUsePage /> },
      { path: "settings", element: <SettingsPage /> },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <ElementPageWrapper />,
            children: [
              {
                path: "topics/",
                element: <TopicsPage />,
                loader: topicsLoader,
              },
              {
                path: "topics/:id",
                element: <TopicsPage />,
                loader: topicsLoader,
                errorElement: (
                  <Typography fontSize={"xxx-large"} color={"error"}>
                    Hiba történt az elemek letöltése közben
                  </Typography>
                ),
              },
              { path: "phrase/", element: <TopicsPage /> },
              { path: "phrase/:id", element: <TopicsPage /> },
              { path: "groups", element: <GroupsPage /> },
              { path: "groups/:id", element: <GroupsPage /> },
            ],
          },
        ],
      },
      { path: "*", element: <ErrorBoundary /> },
    ],
  },
]);

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <GlobalProgressbarProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </GlobalProgressbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
