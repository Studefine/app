export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

