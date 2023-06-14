"use client";

import { Button, Footer, Header } from "ui";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-[200vh]">
      <Header topItems={topBar} />
      <Button title="click" />
      <Footer />
    </div>
  );
}

const topBar = [
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "Developer",
    href: "/introduction",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "About",
    href: "/about",
  },
];
