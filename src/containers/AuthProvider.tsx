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
  logout: () => void;
  validate: () => void;
  login: (credentials: { username: string; password: string }) => void;
}
const AuthContext = createContext<AuthContext>({
  isLoading: true,
  user: undefined,
  logout: () => {},
  validate: () => {},
  login: async (credentials) => {},
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

  const { mutate: validateMutate, isLoading: isValidateLoading } = useMutation(
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

  const validate = useCallback(() => {
    const cookies = parseCookies();
    const token = cookies.jwtToken;
    validateMutate(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        validate,
        user,
        isLoading: isLoading || isValidateLoading,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
