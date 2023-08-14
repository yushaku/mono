"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

function Providers({ children }: React.PropsWithChildren) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            // refetchOnMount: "always",
            // refetchOnWindowFocus: "always",
            // refetchOnReconnect: "always",
            cacheTime: 1000 * 60 * 15, // 15 mins
            // refetchInterval: 1000 * 30, //30 seconds
            // staleTime: 1000 * 30, //30 seconds
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
        <RecoilRoot>{children}</RecoilRoot>
      </ThemeProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
