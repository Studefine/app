import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Icon,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Check } from "@mui/icons-material";

const RegistrationSuccess = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!location?.state?.email)
    return <Navigate to="/about" state={{ from: location }} replace />;

  const handleCopyEmailAddress = () => {
    navigator.clipboard
      .writeText(location.state.email)
      .then(() => setCopied(true));
  };

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
        <CardHeader title={"Sikeres regisztráció"} />
        <CardContent>
          <Stack direction="column" alignItems="center" gap={1}>
            <Typography>
              A megerősítő emailt kiküldtük a megadott címre
            </Typography>
            <Chip
              label={location?.state.email}
              variant="outlined"
              onClick={handleCopyEmailAddress}
              sx={{ paddingLeft: copied ? 0 : 1 }}
              icon={
                copied ? (
                  <Check color="success" />
                ) : (
                  <Icon fontSize="small">content_copy</Icon>
                )
              }
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Button onClick={() => navigate("/about")}>visza a főoldalra</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default RegistrationSuccess;
