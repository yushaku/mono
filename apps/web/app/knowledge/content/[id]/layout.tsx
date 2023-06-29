import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <section className="h-[87dvh] overflow-scroll">{children}</section>;
};

export default Layout;
