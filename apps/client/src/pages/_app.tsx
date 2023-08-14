import { EmptyLayout, HomeLayout } from "@/components/layout";
import Providers from "@/components/provider";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { auth, Layout = EmptyLayout } = Component;

  return (
    <Providers>
      {auth?.required ? (
        <HomeLayout>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </HomeLayout>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </Providers>
  );
}

export type AppPropsWithLayout = AppProps & {
  Component: MyNextPage;
};

export type MyNextPage = NextPage & {
  Layout?: ({ children }: { children: React.ReactNode }) => React.JSX.Element;
  auth?: {
    required?: boolean;
  };
};
