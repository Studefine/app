import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Credentials,
  LoginParameters,
  LoginResponse,
  User,
} from "../types/types";
import { useMutation } from "react-query";
import { loginUser, validateToken } from "../api/user";
import { useCookies } from "react-cookie";

interface AuthContext {
  isLoading: boolean;
  isAuthCheckedOnLoad: boolean;
  user: User | undefined;
  login: (parameters: LoginParameters) => void;
  validate: (token: string) => void;
  checkAuthenticatedUser: () => void;
  logout: () => void;
}
const authContext = createContext<AuthContext>({
  isLoading: true,
  isAuthCheckedOnLoad: true,
  user: undefined,
  login: async () => {},
  validate: () => {},
  checkAuthenticatedUser: () => {},
  logout: () => {},
});

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const [isAuthCheckedOnLoad, setIsAuthCheckedOnLoad] =
    useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>();
  let stayLoggedIn = false;

  const logout = () => {
    setUser(undefined);
    removeCookie("authToken");
  };

  const onValidated = useCallback(
    async (response: LoginResponse, stay: boolean) => {
      if (!response.token) {
        setUser(undefined);
        setIsAuthCheckedOnLoad(true);
        return;
      }

      if (stay) {
        const expires = new Date(Date.now() + 604800000); // 7 days
        setCookie("authToken", response.token, { expires, path: "/" });
      } else {
        setCookie("authToken", response.token, { path: "/" });
      }
      setUser(response.user);
      setIsAuthCheckedOnLoad(true);

      return response;
    },
    [setCookie],
  );
  const { mutate: validate, isLoading: isValidateLoading } = useMutation<
    LoginResponse,
    LoginResponse,
    string
  >(["validation"], (token) => validateToken(token), {
    onSuccess: (res) => onValidated(res, stayLoggedIn),
    onError: () => {
      setIsAuthCheckedOnLoad(true);
      logout();
    },
  });

  useEffect(() => {
    if (!isAuthCheckedOnLoad) {
      if (cookies.authToken) {
        validate(cookies.authToken);
      } else {
        setIsAuthCheckedOnLoad(true);
      }
    }
  }, [validate, cookies.authToken, isAuthCheckedOnLoad]);

  const { mutate: login, isLoading } = useMutation<
    LoginResponse,
    LoginResponse,
    Credentials
  >("validation", loginUser, {
    onSuccess: (res) => onValidated(res, stayLoggedIn),
    onError: logout,
  });

  const handleLogin: (params: LoginParameters) => void = ({
    stayLoggedIn: stay,
    ...credentials
  }) => {
    stayLoggedIn = stay;
    login(credentials);
  };

  return (
    <authContext.Provider
      value={{
        isAuthCheckedOnLoad,
        user,
        isLoading: isLoading || isValidateLoading || !isAuthCheckedOnLoad,
        login: handleLogin,
        validate,
        checkAuthenticatedUser: () => validate(cookies.authToken),
        logout,
      }}
    >
      token:{cookies.authToken}
      {children}
    </authContext.Provider>
  );
};
export const useAuthContext = () => useContext(authContext);

export default AuthProvider;
