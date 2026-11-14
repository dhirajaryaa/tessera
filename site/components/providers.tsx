"use client";

import * as React from "react";
import { ThemeProvider } from "@/components/tessera/theme";
import { ToastProvider } from "@/components/tessera/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultPreference="system">
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
