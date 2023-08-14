import { TopPage } from "@/components/TopPage";
import ListChats from "@/components/chats/listChats";
import { isShowPanel } from "@/utils/atom";
import React from "react";
import { useRecoilState } from "recoil";

export const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const [isShow, setIsShow] = useRecoilState(isShowPanel);
  const styled = isShow ? "w-0" : "w-[350px] p-4";

  return (
    <section className="flex w-full ml-8">
      <article
        className={`${styled} overflow-hidden my-[2dvh] h-[96dvh] bg-white animationShow rounded-2xl`}
      >
        <ListChats />
      </article>
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
