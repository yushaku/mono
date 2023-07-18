import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <section className="h-[88dvh] overflow-scroll">{children}</section>;
};

export default Layout;
