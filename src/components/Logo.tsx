import React from "react";
import StudefineLogo from "../assets/StudefineLogo";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const Logo = () => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
      <StudefineLogo fontSize={"large"} />
      <Typography fontSize={"x-large"} fontWeight={"bolder"}>
        Studefine
      </Typography>
    </Box>
  );
};

export default Logo;
