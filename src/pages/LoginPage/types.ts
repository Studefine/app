import { Credentials } from "../../api/user";

export interface LoginParameters extends Credentials {
  stayLoggedIn: boolean;
}