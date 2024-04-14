import { LoginResponse, User } from "../types/types";
import {
  d_getLoginResponse,
  d_getUser,
  d_getValidateResponse,
} from "./dummies/loginResponses";
import { d_fetcher, d_post } from "./dummies/fetcherSimulate";

export const getUser = (id: string) => {
  return d_fetcher<User | undefined>(
    id in ["5"] ? d_getUser(id) : undefined,
    false,
  );
};

export type ValidateToken = (token: string) => Promise<LoginResponse>;
export const validateToken: ValidateToken = d_post<string, LoginResponse>(
  (token) => d_getValidateResponse(token, "123"),
  false,
);

export interface Credentials {
  username: string;
  password: string;
}
export type LoginUser = (credentials: Credentials) => Promise<LoginResponse>;

export const loginUser: LoginUser = d_post<Credentials, LoginResponse>(
  () => d_getLoginResponse(false, "5"),
  false,
);
