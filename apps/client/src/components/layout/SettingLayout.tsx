import { TopPage } from "@/components/TopPage";
import { SettingItems } from "@/components/settings/SettingItem";
import { isShowPanel } from "@/utils/atom";
import React from "react";
import { useRecoilState } from "recoil";

export const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  const [isShow, setIsShow] = useRecoilState(isShowPanel);

  const styled = isShow ? "w-0" : "w-[350px] px-4 mx-2";

  return (
    <section className="flex w-full ml-8">
      <article
        className={`${styled} overflow-hidden animationShow my-[2dvh] h-[96dvh] bg-white rounded-2xl`}
      >
        <SettingItems />
      </article>

      <article className="ml-4 w-full">
        <div className="mx-auto w-full bg-white my-4 mr-4 rounded-2xl dark:bg-dark px-6 ml-4">
          <TopPage title="Settings" />
          <hr className="my-2" />
          {children}
        </div>
      </article>
    </section>
  );
};
