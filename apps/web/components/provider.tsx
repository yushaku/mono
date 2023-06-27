"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

function Providers({ children }: React.PropsWithChildren) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            refetchOnMount: "always",
            refetchOnWindowFocus: "always",
            refetchOnReconnect: "always",
            cacheTime: 1000 * 60 * 5, //5 mins
            refetchInterval: 1000 * 30, //30 seconds
            staleTime: 1000 * 30, //30 seconds
            refetchIntervalInBackground: false,
            suspense: false,
          },
          mutations: {
            retry: 2,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <Toaster position="top-center" />
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
