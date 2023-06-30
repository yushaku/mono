import { getChats } from "@/services/chat";
import getQueryClient from "@/utils/getQueryClient";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["/bots"], getChats);
  const dehydratedState = dehydrate(queryClient);

  return (
    <section className="h-[87dvh] overflow-scroll">
      <Hydrate state={dehydratedState}>{children} </Hydrate>
    </section>
  );
};

export default Layout;
