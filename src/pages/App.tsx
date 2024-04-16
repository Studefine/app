import React, { PropsWithChildren } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import ContactsPage from "./ContactsPage";
import RegistrationPage from "./RegistrationPage";
import AboutPage from "./AboutPage";
import Layout from "../components/Layout";
import RequireAuth from "../components/RequireAuth";
import ErrorBoundary from "./ErrorBoundary";
import { TopicsPage } from "./TopicsPage";
import ForgotPasswordPage from "./ForgotPasswordPage";

const App: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*public*/}
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="forgot-pass" element={<ForgotPasswordPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="contacts" element={<AboutPage />} />
        {/*protected*/}
        <Route element={<RequireAuth />}>
          <Route path="topics" element={<TopicsPage />} />
          <Route path="contacts" element={<RegistrationPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Route>
        {/*error*/}
        <Route path="*" element={<ErrorBoundary />} />
      </Route>
    </Routes>
  );
};

export default App;
