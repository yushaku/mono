import Providers from "@/utils/provider";
import React from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "YuPoller",
  description: "I do not know what i am doing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
