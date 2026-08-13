import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("srec-theme") as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("srec-theme", theme);
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="glass glass-hover flex h-10 w-10 items-center justify-center rounded-full text-foreground"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function AmbientOrbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="orb"
        style={{
          width: "42vw",
          height: "42vw",
          left: "-8vw",
          top: "-6vh",
          background: "var(--orb-1)",
        }}
      />
      <div
        className="orb"
        style={{
          width: "36vw",
          height: "36vw",
          right: "-6vw",
          top: "18vh",
          background: "var(--orb-2)",
          animationDelay: "-7s",
        }}
      />
      <div
        className="orb"
        style={{
          width: "40vw",
          height: "40vw",
          left: "25vw",
          bottom: "-14vh",
          background: "var(--orb-3)",
          animationDelay: "-13s",
        }}
      />
    </div>
  );
}
