"use client";

import { Button, Header } from "ui";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-[200vh]">
      <Header topItems={topBar} />
      <Button title="click" />
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
