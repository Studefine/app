import React from "react";
import Divider from "@mui/material/Divider";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../containers/AuthProvider";
import { useForm } from "react-hook-form";
import { Credentials } from "../api/user";

export interface LoginParameters extends Credentials {
  stayLoggedIn: boolean;
}

const LoginPage = () => {
  const { login } = useAuthContext();
  const { spacing, palette } = useTheme();
  const navigate = useNavigate();
  const { register, watch, getValues } = useForm<LoginParameters>();

  const handleLogin = () => {
    console.log(getValues());
    login(getValues());
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
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <TextField
            {...register("email", { required: true })}
            fullWidth
            size="small"
            label="E-mail"
            type="email"
            autoComplete="email"
          />
          <TextField
            {...register("password", { required: true })}
            fullWidth
            size="small"
            label="Jelszó"
            type="password"
            autoComplete="current-password"
          />
          <Box sx={{ alignItems: "center", display: "flex", gap: 4 }}>
            <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox {...register("stayLoggedIn")} sx={{ marginRight: 2 }} />
              <Typography fontSize="small">Maradjak bejelentkezve</Typography>
            </FormControl>
            <Link onClick={() => navigate("/forgot-pass")}>
              Elfelejtettem a jelszavam
            </Link>
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
            onClick={handleLogin}
          >
            Bejelentkezés
          </Button>
          <Divider>Vagy</Divider>
          <Button variant="contained" onClick={() => navigate("/registration")}>
            Regisztráció
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginPage;
