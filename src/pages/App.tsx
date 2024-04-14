import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import SideMenu from "../components/SideMenu/SideMenu";
import Box from "@mui/material/Box";

const App = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      component="main"
      height={"100vh"}
    >
      <SideMenu />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </Box>
  );
};

export default App;
