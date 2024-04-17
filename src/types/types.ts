export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface LoginResponse {
  user?: User;
  token?: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface LoginParameters extends Credentials {
  stayLoggedIn: boolean;
}