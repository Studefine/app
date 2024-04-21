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
  ICredentials,
  ILoginParameters,
  ILoginResponse,
  IUser,
} from "../types/types";
import { useMutation } from "react-query";
import { loginUser, validateToken } from "../api/user";
import { useCookies } from "react-cookie";
import { useGlobalProgressbarContext } from "./GlobalProgressbarProvider";

interface AuthContext {
  isLoading: boolean;
  isAuthCheckedOnLoad: boolean;
  user: IUser | undefined;
  login: (parameters: ILoginParameters) => void;
  checkUserHasAuth: () => void;
  logout: () => void;
  loginResponses: {
    data: any;
    isError: boolean;
    error: any;
    reset: () => void;
  };
}

const authContext = createContext<AuthContext>({
  isLoading: true,
  isAuthCheckedOnLoad: true,
  user: undefined,
  login: async () => {},
  checkUserHasAuth: () => {},
  logout: () => {},
  loginResponses: {
    data: undefined,
    isError: false,
    error: undefined,
    reset: () => {},
  },
});

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { setIsLoading } = useGlobalProgressbarContext();

  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const [isAuthCheckedOnLoad, setIsAuthCheckedOnLoad] =
    useState<boolean>(false);
  const [user, setUser] = useState<IUser | undefined>();
  const stayLoggedIn = useRef(false);

  const logout = () => {
    setUser(undefined);
    removeCookie("authToken");
    setIsLoading(false);
  };

  const onValidated = useCallback(
    async (response: ILoginResponse) => {
      if (!response.token) {
        setUser(undefined);
        setIsAuthCheckedOnLoad(true);
        return;
      }

      if (stayLoggedIn.current) {
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
    ILoginResponse,
    ILoginResponse,
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

  const {
    mutate: login,
    isLoading,
    data,
    error,
    isError,
    reset,
  } = useMutation<ILoginResponse, any, ICredentials>("login", loginUser, {
    onSuccess: onValidated,
    onError: (error) => {
      setIsLoading(false);
      return error;
    },
  });

  const handleLogin: (params: ILoginParameters) => void = useCallback(
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
        loginResponses: { data, isError, error, reset },
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export const useAuthContext = () => useContext(authContext);

export default AuthProvider;
