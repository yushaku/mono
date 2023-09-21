import { logout, useGetProfile } from "@/services";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "ui";

export const TopPage = ({ title = "header" }: { title: string }) => {
  const router = useRouter();
  const { data: userInfo } = useGetProfile();

  return (
    <article className="w-full flex items-center justify-between pt-5">
      <h3 className="text-primaryColor text-2xl font-semibold">{title}</h3>
      <div className="flex items-center">
        <button
          className="relative w-16 h-10"
          onClick={async () => {
            await logout();
            router.push("/auth/login");
          }}
        >
          <Image
            src={userInfo?.avata ?? "/man.png"}
            alt="avatar"
            loading="lazy"
            placeholder="empty"
            object-fit="cover"
            quality={100}
            fill={true}
          />
        </button>

        <Button
          title="help"
          className="px-12 bg-primaryColor text-white ml-2"
        />
      </div>
    </article>
  );
};
