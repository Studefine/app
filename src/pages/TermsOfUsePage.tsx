import React from "react";
import { Card, CardContent, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { Handyman } from "@mui/icons-material";

const TermsOfUsePage = () => {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card>
        <CardContent>
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Handyman color="warning" />
            <Typography color={palette.warning.main} fontSize={"x-large"}>
              Fejlesztés alatt
            </Typography>
            <Handyman color="warning" />
          </Box>
          <Typography color={palette.warning.main} fontSize={"xx-small"}>
            De ígérem semmi csúnya dolgot nem csinálunk az adataiddal.
          </Typography>
          <Typography color={palette.warning.main} fontSize={"xx-small"}>
            Illetve légy kedves a társaiddal meg ilyenek.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TermsOfUsePage;
