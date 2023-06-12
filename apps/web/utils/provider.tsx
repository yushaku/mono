"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

function Providers({ children }: React.PropsWithChildren) {
  const client = new QueryClient({
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
  });

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
