import React, { createContext, useCallback, useContext, useState } from "react";

interface IContext {
  theme: string;
  toggleTheme?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ThemeContext = createContext<IContext>({ theme: "light" });

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const LocalTheme = window.localStorage.getItem('theme');
  const [theme, setTheme] = useState(LocalTheme!);
  const toggleTheme = useCallback(() => {
    if (theme === "light") {
      setTheme("dark");
      window.localStorage.setItem('theme', 'dark');
    } else {
      setTheme("light");
      window.localStorage.setItem('theme', 'light');
    }
  }, [theme]);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
};
