import { createContext, useContext, useEffect, useState } from "react";

const ThemeProviderContext = createContext();

export function ThemeProvider({ children, ...props }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const root = window.document.documentElement;

    // 2. Class reset karo aur jo abhi state hai wo laga do
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  // 3. Simple Toggle Function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProviderContext.Provider {...props} value={{ theme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
