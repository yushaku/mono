"use client";

import Link from "next/link";
import React from "react";
import { Action, Chats, MenuFeatures } from "types";
import { DropdownMenu, IconPen, IconTrash } from "ui";

const dropdownFeatures: MenuFeatures = [
  { title: "delete", icon: <IconTrash /> },
  { title: "update", icon: <IconPen /> },
];

export const ListItem = ({ title, id }: Partial<Chats>) => {
  const handleAction = (type: Action, id: string, oldName: string) => {
    if (type === "update") {
    }

    if (type === "delete") {
    }
  };

  return (
    <Link href={`/chats/${id}`}>
      <li className="bg-strokeColor flex justify-between items-center px-4 py-3 rounded-lg text-grayColor w-full">
        {title}

        <DropdownMenu
          menuFeatures={dropdownFeatures}
          handleAction={(type) => handleAction(type, id, title)}
        />
      </li>
    </Link>
  );
};
