import { ILoginResponse, IUser } from "../../types/types";

export const d_users: Record<"5" | "82" | "123", IUser> = {
  "5": {
    id: "5",
    name: "John Doe",
    email: "john.doe@example.com",
    roles: ["user"],
  },
  "82": {
    id: "82",
    name: "Alice Smith",
    email: "alice.smith@example.com",
    roles: ["user"],
  },
  "123": {
    id: "123",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    roles: ["user"],
  },
};
export const d_getValidateResponse = (
  token: string,
  id: keyof typeof d_users,
  error?: "Invalid token" | "Expired token",
): ILoginResponse =>
  error
    ? { token, user: d_users["123"] }
    : d_getLoginResponse(!!error, id, token);

export const d_getLoginResponse = (
  isFailed: boolean,
  id: keyof typeof d_users,
  token?: string,
): ILoginResponse => ({
  user: isFailed ? undefined : d_users[id],
  token: isFailed
    ? undefined
    : token ??
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkV4YW1wbGUgVXNlciIsImlhdCI6MTY0OTg4MzE3MX0.4umg2FXtFok3yaxU8yM5vvGL2yEMpJLSnR4lN4a9XsA",
});

export const d_getUser = (id: string): IUser | undefined => {
  switch (id) {
    case "5":
    case "82":
    case "123":
      return d_users[id];
    default:
      return undefined;
  }
};
