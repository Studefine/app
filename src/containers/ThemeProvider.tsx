import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export const THEME_MODE_PROP_NAME = "app-theme";

export type ThemeMode = "light" | "dark";
export interface ThemeContext {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const themeContext = createContext<ThemeContext>({
  mode: "dark",
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  const toggleTheme = () => {
    const body: HTMLElement | null = document.querySelector("body");
    body?.setAttribute(
      THEME_MODE_PROP_NAME,
      (theme === "light" ? "dark" : "light") satisfies ThemeMode,
    );
    setTheme((t): ThemeMode => (t === "light" ? "dark" : "light"));
  };

  return (
    <themeContext.Provider value={{ mode: theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export const useTheme = () => useContext(themeContext);
