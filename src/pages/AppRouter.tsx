import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import RequireLogout from "../components/Requires/RequireLogout";
import LoginPage from "./LoginPage/LoginPage";
import RegistrationPage from "./RegistrationPage/RegistrationPage";
import RegistrationSuccess from "./RegistrationSuccess";
import ForgotPasswordPage from "./ForgotPasswordPage";
import ContactsPage from "./ContactsPage/ContactsPage";
import AboutPage from "./AboutPage";
import TermsOfUsePage from "./TermsOfUsePage";
import SettingsPage from "./SettingsPage";
import RequireAuth from "../components/Requires/RequireAuth";
import ElementPageWrapper from "./ElementPageWrapper";
import { TopicsPage } from "./TopicsPage/TopicsPage";
import GroupsPage from "./GroupsPage";
import ErrorBoundary from "./ErrorBoundary";
import React from "react";

export const AppRouter = createBrowserRouter([
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
                path: "topics",
                element: <TopicsPage />,
              },
              {
                path: "topics/:id",
                element: <TopicsPage />,
              },
              { path: "phrases/", element: <TopicsPage /> },
              { path: "phrases/:id", element: <TopicsPage /> },
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
