import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Providers from "@/components/provider";
import React from "react";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Tigon AI",
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

        <Providers>
          <section className="flex dark:bg-dark-300 bg-strokeColor">
            <Navbar />
            {children}
          </section>
        </Providers>
      </body>
    </html>
  );
}
