import React, { PropsWithChildren } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import ContactsPage from "./ContactsPage/ContactsPage";
import RegistrationPage from "./RegistrationPage/RegistrationPage";
import AboutPage from "./AboutPage";
import Layout from "./Layout";
import RequireAuth from "../components/Requires/RequireAuth";
import ErrorBoundary from "./ErrorBoundary";
import { TopicsPage } from "./TopicsPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import RequireLogout from "../components/Requires/RequireLogout";
import GroupsPage from "./GroupsPage";
import SettingsPage from "./SettingsPage";
import TermsOfUsePage from "./TermsOfUsePage";
import RegistrationSuccess from "./RegistrationSuccess";

const App: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*public*/}
        <Route element={<RequireLogout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route
            path="registration/success"
            element={<RegistrationSuccess />}
          />
          <Route path="forgot-pass" element={<ForgotPasswordPage />} />
        </Route>
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="terms-of-use" element={<TermsOfUsePage />} />
        <Route path="settings" element={<SettingsPage />} />
        {/*protected*/}
        <Route element={<RequireAuth />}>
          <Route path="topics" element={<TopicsPage />} />
          <Route path="groups" element={<GroupsPage />} />
        </Route>
        {/*error*/}
        <Route path="*" element={<ErrorBoundary />} />
      </Route>
    </Routes>
  );
};

export default App;
