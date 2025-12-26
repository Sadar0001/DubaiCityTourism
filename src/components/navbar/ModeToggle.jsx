import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export function ModeToggle() {
  // Humara simple toggle function use karo
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme} // Click par change hoga
    >
      {/* Agar Light hai to Sun dikhao, Dark hai to Moon dikhao */}
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all text-white" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
