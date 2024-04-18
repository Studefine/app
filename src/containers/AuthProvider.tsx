import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
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
import { useGlobalProgressbarContext } from "./GlobalProgressbarProvider";

interface AuthContext {
  isLoading: boolean;
  isAuthCheckedOnLoad: boolean;
  user: User | undefined;
  login: (parameters: LoginParameters) => void;
  checkUserHasAuth: () => void;
  logout: () => void;
}
const authContext = createContext<AuthContext>({
  isLoading: true,
  isAuthCheckedOnLoad: true,
  user: undefined,
  login: async () => {},
  checkUserHasAuth: () => {},
  logout: () => {},
});

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { setIsLoading } = useGlobalProgressbarContext();

  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const [isAuthCheckedOnLoad, setIsAuthCheckedOnLoad] =
    useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>();
  const stayLoggedIn = useRef(false);

  const logout = () => {
    setUser(undefined);
    removeCookie("authToken");
    setIsLoading(false)
  };

  const onValidated = useCallback(
    async (response: LoginResponse) => {
      if (!response.token) {
        setUser(undefined);
        setIsAuthCheckedOnLoad(true);
        return;
      }

      if (stayLoggedIn) {
        const expires = new Date(Date.now() + 604800000); // 7 days
        setCookie("authToken", response.token, { expires, path: "/" });
      } else {
        setCookie("authToken", response.token, { path: "/" });
      }
      setUser(response.user);
      setIsAuthCheckedOnLoad(true);
      setIsLoading(false);

      return response;
    },
    [setCookie, setIsLoading],
  );
  const { mutate: validate, isLoading: isValidateLoading } = useMutation<
    LoginResponse,
    LoginResponse,
    string
  >(["validation"], (token) => validateToken(token), {
    onSuccess: onValidated,
    onError: () => {
      setIsAuthCheckedOnLoad(false);
      setIsLoading(false);
      logout();
    },
  });

  const checkUserHasAuth = useCallback(() => {
    if (cookies.authToken) {
      setIsLoading(true);
      validate(cookies.authToken);
    }
  }, [cookies.authToken, validate, setIsLoading]);

  useEffect(() => {
    if (!isAuthCheckedOnLoad) {
      if (cookies.authToken) {
        checkUserHasAuth();
      } else {
        setIsAuthCheckedOnLoad(true);
      }
    }
  }, [checkUserHasAuth, cookies.authToken, isAuthCheckedOnLoad]);

  const { mutate: login, isLoading } = useMutation<
    LoginResponse,
    LoginResponse,
    Credentials
  >("validation", loginUser, {
    onSuccess: onValidated,
    onError: logout,
  });

  const handleLogin: (params: LoginParameters) => void = useCallback(
    ({ stayLoggedIn: stay, ...credentials }) => {
      setIsLoading(true);
      stayLoggedIn.current = stay;
      login(credentials);
    },
    [login, setIsLoading],
  );

  return (
    <authContext.Provider
      value={{
        isAuthCheckedOnLoad,
        user,
        isLoading: isLoading || isValidateLoading || !isAuthCheckedOnLoad,
        login: handleLogin,
        checkUserHasAuth,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export const useAuthContext = () => useContext(authContext);

export default AuthProvider;
