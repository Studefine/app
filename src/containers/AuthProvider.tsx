import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { LoginResponse, User } from "../types/types";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useMutation } from "react-query";
import { Credentials, loginUser, validateToken } from "../api/user";

interface AuthContext {
  isLoading: boolean;
  user: User | undefined;
  login: (credentials: { username: string; password: string }) => void;
  validate: (token: string) => void;
  checkAuthenticatedUser: () => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContext>({
  isLoading: true,
  user: undefined,
  login: async (credentials) => {},
  validate: () => {},
  checkAuthenticatedUser: () => {},
  logout: () => {},
});

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();

  const logout = () => {
    setUser(undefined);
    destroyCookie(null, "authToken");
  };

  const onValidated = useCallback(async (response: LoginResponse) => {
    if (!response.token) {
      setUser(undefined);
      return;
    }
    setCookie(null, "authToken", response.token, {
      maxAge: 24 * 60 * 60,
      path: "/",
    });
    setUser(response.user);
  }, []);

  const { mutate: validate, isLoading: isValidateLoading } = useMutation(
    ["validation"],
    validateToken,
    {
      onSuccess: onValidated,
      onError: logout,
    },
  );

  const { mutate: login, isLoading } = useMutation<
    LoginResponse,
    LoginResponse,
    Credentials
  >("validation", loginUser, {
    onSuccess: onValidated,
    onError: logout,
  });

  const checkAuthenticatedUser = useCallback(() => {
    const cookies = parseCookies();
    const token = cookies.jwtToken;
    validate(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isLoading || isValidateLoading,
        login,
        validate,
        checkAuthenticatedUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
