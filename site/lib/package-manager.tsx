"use client";

import * as React from "react";

export type PackageManager = "npm" | "pnpm" | "bun" | "yarn";

export const PACKAGE_MANAGERS: readonly PackageManager[] = [
  "npm",
  "pnpm",
  "bun",
  "yarn",
] as const;

const STORAGE_KEY = "tessera-package-manager";

export function formatInstallCommand(
  rawCommand: string,
  pm: PackageManager
): string {
  const trimmed = rawCommand.trim();

  // Pattern for Tessera CLI commands, e.g. "npx github:dhirajaryaa/tessera#main add button"
  const tesseraMatch = trimmed.match(
    /^(?:npx|pnpm\s+dlx|bunx|yarn\s+dlx)\s+(github:dhirajaryaa\/tessera[^\s]*\s+.*)$/
  );
  if (tesseraMatch) {
    const args = tesseraMatch[1];
    switch (pm) {
      case "npm":
        return `npx ${args}`;
      case "pnpm":
        return `pnpm dlx ${args}`;
      case "bun":
        return `bunx ${args}`;
      case "yarn":
        return `yarn dlx ${args}`;
    }
  }

  // Bare CLI command like "add button" or "init"
  if (
    trimmed.startsWith("init") ||
    trimmed.startsWith("add ") ||
    trimmed.startsWith("list")
  ) {
    const args = `github:dhirajaryaa/tessera#main ${trimmed}`;
    switch (pm) {
      case "npm":
        return `npx ${args}`;
      case "pnpm":
        return `pnpm dlx ${args}`;
      case "bun":
        return `bunx ${args}`;
      case "yarn":
        return `yarn dlx ${args}`;
    }
  }

  // General runner commands like "npx <package>"
  const runnerMatch = trimmed.match(
    /^(?:npx|pnpm\s+dlx|bunx|yarn\s+dlx)\s+(.*)$/
  );
  if (runnerMatch) {
    const args = runnerMatch[1];
    switch (pm) {
      case "npm":
        return `npx ${args}`;
      case "pnpm":
        return `pnpm dlx ${args}`;
      case "bun":
        return `bunx ${args}`;
      case "yarn":
        return `yarn dlx ${args}`;
    }
  }

  return trimmed;
}

interface PackageManagerContextValue {
  packageManager: PackageManager;
  setPackageManager: (pm: PackageManager) => void;
}

const PackageManagerContext =
  React.createContext<PackageManagerContextValue | null>(null);

export function PackageManagerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [packageManager, setPackageManagerState] =
    React.useState<PackageManager>("npm");

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (
        stored === "npm" ||
        stored === "pnpm" ||
        stored === "bun" ||
        stored === "yarn"
      ) {
        setPackageManagerState(stored);
      }
    } catch {
      // Ignore localStorage availability issues
    }

    function handleStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        if (
          e.newValue === "npm" ||
          e.newValue === "pnpm" ||
          e.newValue === "bun" ||
          e.newValue === "yarn"
        ) {
          setPackageManagerState(e.newValue);
        }
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setPackageManager = React.useCallback((pm: PackageManager) => {
    setPackageManagerState(pm);
    try {
      window.localStorage.setItem(STORAGE_KEY, pm);
    } catch {
      // Ignore
    }
  }, []);

  return (
    <PackageManagerContext.Provider
      value={{ packageManager, setPackageManager }}
    >
      {children}
    </PackageManagerContext.Provider>
  );
}

export function usePackageManager(): PackageManagerContextValue {
  const context = React.useContext(PackageManagerContext);
  if (!context) {
    return {
      packageManager: "npm",
      setPackageManager: () => {},
    };
  }
  return context;
}
