"use client";

import { ReactNode } from "react";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import ActionsContextProvider from "./ActionsProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Providers({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ActionsContextProvider> {children}</ActionsContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
