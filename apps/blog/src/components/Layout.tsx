import { topItems } from "@/utils/constants";
import React from "react";
import { Header, Footer } from "ui";

type Props = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};
export const Layout = ({ children, ...props }: Props) => {
  return (
    <section>
      <Header topItems={topItems} />
      <section className="mx-auto mt-[20vh] min-h-[100vh] max-w-[1110px]">
        <div {...props}>{children}</div>
      </section>
      <Footer />
    </section>
  );
};
