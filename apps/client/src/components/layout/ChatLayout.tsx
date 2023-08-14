import { TopPage } from "@/components/TopPage";
import ListChats from "@/components/chats/listChats";
import React from "react";
import { IconArrowRight } from "ui";

export const ChatLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <section className="relative flex w-full ml-8">
      <div className="absolute top-[190px] -left-3 bg-white rounded-lg border-4 border-strokeColor animate-fade-left animate-once animate-duration-300 animate-ease-linear">
        <IconArrowRight className="stroke-primaryColor rotate-180 w-4 h-4" />
      </div>

      <ListChats />

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
