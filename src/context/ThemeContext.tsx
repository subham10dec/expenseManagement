import React, { FC, useState } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type CreatecontentProp = {
  currentTheme: string;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<CreatecontentProp | null>(null);

export default ThemeContext;

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const toggleTheme = () => {
    console.log("clicked");
    const mode = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(mode);
  };
  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
