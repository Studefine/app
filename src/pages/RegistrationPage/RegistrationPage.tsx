import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useRegistration } from "./hooks/useRegistration";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegistrationValidation } from "./RegistrationValidation";
import { ILoginParameters } from "../../types/types";
import { bindField } from "../../utils/bindField";

export interface RegistrationParameters
  extends Omit<ILoginParameters, "stayLoggedIn"> {
  name: string;
  passwordAgain: string;
}

const RegistrationPage = () => {
  const { handleSubmit, control, setError, formState } =
    useForm<RegistrationParameters>({
      resolver: yupResolver(RegistrationValidation),
    });
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
  const { mutate: registration, isLoading } = useRegistration(setError);
  const { spacing } = useTheme();
  const navigate = useNavigate();

  const handleRegistration = (data: RegistrationParameters) => {
    registration(data);
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
        <CardHeader title={"Regisztráció"} />
        <form onSubmit={handleSubmit(handleRegistration)}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            <TextField
              {...bindField("name", formState, control)}
              fullWidth
              size="small"
              label="név"
              type="name"
              autoComplete="name"
            />
            <TextField
              {...bindField("email", formState, control)}
              fullWidth
              size="small"
              label="E-mail"
              type="email"
              autoComplete="email"
            />
            <TextField
              {...bindField("password", formState, control)}
              fullWidth
              size="small"
              label="Jelszó"
              type="password"
              autoComplete="new-password"
            />
            <TextField
              {...bindField("passwordAgain", formState, control)}
              fullWidth
              size="small"
              label="Jelszó ismét"
              type="password"
              autoComplete="new-password"
            />
            <Box sx={{ alignItems: "center", display: "flex", gap: 4 }}>
              <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox
                  value={termsAgreed}
                  onChange={(_, checked) => {
                    setTermsAgreed(checked);
                  }}
                  sx={{ marginRight: 2 }}
                />
                <Typography fontSize="small">
                  Elolvastam és elfogadom a{" "}
                  <Link
                    component="a"
                    href="/terms-of-use"
                    rel="noopener"
                    target="_blank"
                  >
                    felhasználási feltételeket
                  </Link>
                </Typography>
              </FormControl>
            </Box>
          </CardContent>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              padding: spacing(2),
              gap: spacing(1),
            }}
          >
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              disabled={isLoading || !termsAgreed}
            >
              Regisztráció
              {isLoading && "..."}
            </Button>
            <Divider>Vagy</Divider>
            <Button variant="contained" onClick={() => navigate("/login")}>
              Bejelentkezés
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default RegistrationPage;
