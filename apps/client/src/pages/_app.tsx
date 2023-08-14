import { MainLayout } from "@/components/MainLayout";
import Providers from "@/components/provider";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { auth } = Component;

  return (
    <Providers>
      {auth?.required ? (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </Providers>
  );
}

export type AppPropsWithLayout = AppProps & {
  Component: MyNextPage;
};

export type MyNextPage = NextPage & {
  layout?: (page: React.ReactNode) => JSX.Element;
  auth?: {
    required?: boolean;
  };
};
