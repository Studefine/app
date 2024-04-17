import { Credentials, LoginResponse } from "../types/types";
import { d_getValidateResponse } from "./dummies/loginResponses";
import { d_post } from "./dummies/fetcherSimulate";
import { fetcher } from "./fetcher";
import { RegistrationParameters } from "../pages/RegistrationPage/RegistrationPage";

export type ValidateToken = (token: string) => Promise<LoginResponse>;
export const validateToken: ValidateToken = d_post<string, LoginResponse>(
  (token) => d_getValidateResponse(token, "123"),
  false,
);

export const loginUser = (credentials: Credentials) =>
  fetcher<LoginResponse>("login", {
    method: "POST",
    body: JSON.stringify(credentials),
  }).json();

export const registration = (params: RegistrationParameters) =>
  fetcher("register", { method: "POST", body: JSON.stringify(params) }).json();
