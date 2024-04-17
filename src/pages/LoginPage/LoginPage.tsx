import React from "react";
import Divider from "@mui/material/Divider";
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
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../containers/AuthProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidation } from "./loginValidation";
import { LoginParameters } from "../../types/types";

const LoginPage = () => {
  const { spacing } = useTheme();
  const { login, isLoading } = useAuthContext();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginParameters>({
    defaultValues: { stayLoggedIn: false },
    resolver: yupResolver(loginValidation),
  });

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
        <CardHeader title={"Bejelentkezés"} />
        <form onSubmit={handleSubmit(login)}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            <TextField
              {...register("email")}
              fullWidth
              size="small"
              label="E-mail"
              type="email"
              autoComplete="email"
            />
            <TextField
              {...register("password")}
              fullWidth
              size="small"
              label="Jelszó"
              type="password"
              autoComplete="current-password"
            />
            <Box sx={{ alignItems: "center", display: "flex", gap: 4 }}>
              <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox
                  {...register("stayLoggedIn")}
                  sx={{ marginRight: 2 }}
                />
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
              disabled={isLoading}
            >
              Bejelentkezés
              {isLoading && "..."}
            </Button>
            <Divider>Vagy</Divider>
            <Button
              variant="contained"
              onClick={() => navigate("/registration")}
            >
              Regisztráció
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default LoginPage;
