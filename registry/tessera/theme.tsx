"use client";

import * as React from "react";

export type ThemeName = "paper" | "ink" | "moss";
export type ThemePreference = ThemeName | "system";

export const themeOptions = [
  { value: "paper", label: "Paper", note: "Warm light" },
  { value: "ink", label: "Ink", note: "Near black" },
  { value: "moss", label: "Moss", note: "Deep green" },
  { value: "system", label: "Auto", note: "Follow the OS" },
] as const satisfies ReadonlyArray<{
  value: ThemePreference;
  label: string;
  note: string;
}>;

type ThemeContextValue = {
  preference: ThemePreference;
  theme: ThemeName;
  setPreference: (next: ThemePreference) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function systemTheme(): ThemeName {
  if (typeof window === "undefined") return "paper";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "ink"
    : "paper";
}

function resolveTheme(preference: ThemePreference): ThemeName {
  return preference === "system" ? systemTheme() : preference;
}

function applyTheme(theme: ThemeName) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme === "paper" ? "light" : "dark";
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultPreference?: ThemePreference;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultPreference = "system",
  storageKey = "tessera-theme",
}: ThemeProviderProps) {
  const [preference, setPreferenceState] =
    React.useState<ThemePreference>(defaultPreference);
  const [theme, setTheme] = React.useState<ThemeName>(() =>
    resolveTheme(defaultPreference)
  );

  React.useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(storageKey);
    } catch {
      stored = null;
    }
    if (stored && ["paper", "ink", "moss", "system"].includes(stored)) {
      setPreferenceState(stored as ThemePreference);
    }
  }, [storageKey]);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");

    function update() {
      const next = preference === "system" ? (query.matches ? "ink" : "paper") : preference;
      setTheme(next);
      applyTheme(next);
    }

    update();
    if (preference === "system") query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [preference]);

  const setPreference = React.useCallback(
    (next: ThemePreference) => {
      setPreferenceState(next);
      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        // Storage can be unavailable in private or embedded contexts.
      }
    },
    [storageKey]
  );

  return (
    <ThemeContext.Provider value={{ preference, theme, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>.");
  return context;
}
