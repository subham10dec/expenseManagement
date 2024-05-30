import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export const useContextTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("use Modecontext only inside Modecontext Provider");

  return context;
};
