"use client";

import moment from "moment";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { UserProfile } from "types";
import { IconCopy } from "ui";

const Settings = () => {
  const path = "sdfsadfsdfsadfsdfsdfsdfsd";

  const handleCopy = () => {
    navigator.clipboard.writeText(path);
    toast.success("Copyed!!!");
  };

  return (
    <section className="h-[85dvh]">
      <article>
        <h2 className="text-textColor text-xl font-semibold">
          Invite your peers
        </h2>
        <div className="flex items-center gap-4 mt-4">
          <span className="flex-1 text-grayColor py-2 px-4 border border-primaryColor rounded-lg">
            {path}
          </span>
          <button
            onClick={handleCopy}
            className="bg-primaryColor py-2 px-4 rounded-lg"
          >
            <IconCopy color="white" width={25} height={25} />
          </button>
        </div>
      </article>

      <article className="mt-8">
        <h2 className="text-textColor text-xl font-semibold">Users list</h2>
        <ul className="mt-4 flex flex-col gap-4">
          {userList.map((user) => {
            return (
              <li
                key={user.id}
                className="flex text-grayColor items-center justify-between hover:shadow-[-2px_5px_2px_2px_#E2E8F0] px-2 py-2 rounded-lg animationShow"
              >
                <p className="flexCenter gap-4 w-1/5 justify-start">
                  <Image
                    src={user.avata ? user.avata : "/man.png"}
                    alt="user avata"
                    width={30}
                    height={30}
                  />
                  <span>{user.name}</span>
                </p>
                <span>{user.role}</span>
                <time>{moment(user.created_at).format("LL")}</time>
                <time>{moment(user.updated_at).format("LL")}</time>
                <div></div>
              </li>
            );
          })}
        </ul>
      </article>
    </section>
  );
};

Settings.auth = {
  required: true,
};

export default Settings;

const userList: Array<UserProfile & { id: string; role: string }> = [
  {
    id: "djfhdsadfasdfsdfsdf",
    name: "yusaku",
    email: "yushaku@gmail.com",
    role: "admin",
    avata: "",
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },

  {
    id: "sfhsdkfhskdjfhksdfjhskdfhsdf",
    name: "tigon",
    email: "tigon@gmail.com",
    role: "admin",
    avata: "",
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },
];
