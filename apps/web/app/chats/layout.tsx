import { TopPage } from "@/components/TopPage";
import ListChats from "@/components/chats/listChats";
import { getChats } from "@/services/chat";
import getQueryClient from "@/utils/getQueryClient";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import React from "react";
import { IconArrowRight } from "ui";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["/chats"], getChats);
  const dehydratedState = dehydrate(queryClient);

  return (
    <section className="relative flex w-full ml-8">
      <div className="absolute top-[180px] -left-3 bg-white rounded-lg border-4 border-strokeColor animate-fade-left animate-once animate-duration-300 animate-ease-linear">
        <IconArrowRight className="stroke-primaryColor rotate-180 w-4 h-4" />
      </div>

      <Hydrate state={dehydratedState}>
        <ListChats />
      </Hydrate>

      <article className="mx-4 my-4 w-full">
        <div className="bg-white dark:bg-dark rounded-2xl px-6">
          <TopPage title="Chats" />

          <hr className="my-2" />

          {children}
        </div>
      </article>
    </section>
  );
};

export default Layout;
