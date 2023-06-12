import React from "react";
import Image from "next/image";
import space from "@/public/spaceUp.gif";

type Props = { children: React.ReactNode };

const layout = ({ children }: Props) => {
  return (
    <section className="grid h-[100vh] w-[100vw] grid-cols-1 md:grid-cols-2">
      <div className="flex min-h-[250px] items-center justify-center bg-[#234f66]">
        <Image src={space} alt="space up" width={700} height={700} />
      </div>

      <div className="flexCenter lg:bg-[#F1F2F3]">{children}</div>
    </section>
  );
};

export default layout;
