import React, { PropsWithChildren } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import ContactsPage from "./ContactsPage";
import RegistrationPage from "./RegistrationPage";
import AboutPage from "./AboutPage";
import Layout from "./Layout";
import RequireAuth from "../components/Requires/RequireAuth";
import ErrorBoundary from "./ErrorBoundary";
import { TopicsPage } from "./TopicsPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import RequireLogout from "../components/Requires/RequireLogout";

const App: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*public*/}
        <Route element={<RequireLogout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Route>
        <Route path="forgot-pass" element={<ForgotPasswordPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="about" element={<AboutPage />} />
        {/*protected*/}
        <Route element={<RequireAuth />}>
          <Route path="topics" element={<TopicsPage />} />
          <Route path="contacts" element={<RegistrationPage />} />
        </Route>
        {/*error*/}
        <Route path="*" element={<ErrorBoundary />} />
      </Route>
    </Routes>
  );
};

export default App;
