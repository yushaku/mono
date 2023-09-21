import Link from "next/link";
import React from "react";
import { Action, MenuFeatures } from "types";
import {
  DropdownMenu,
  IconFolder,
  IconMessage,
  IconPen,
  IconPin,
  IconTrash,
} from "ui";

export const dropdownFolderItem: MenuFeatures = [
  { title: "delete", icon: <IconTrash /> },
  { title: "update", icon: <IconPen /> },
];

export const dropdownChatItem: MenuFeatures = [
  ...dropdownFolderItem,
  { title: "pin", icon: <IconPin /> },
];

type Props = {
  page: "chats" | "knowledge";
  title: string;
  href: string;
  onAction: (type: Action) => void;
};
export const ListItem = ({ page, title, href, onAction }: Props) => {
  const dropDown = page === "chats" ? dropdownChatItem : dropdownFolderItem;

  return (
    <li className="bg-strokeColor flex justify-between items-center px-4 py-3 rounded-lg text-grayColor w-full">
      <Link
        href={href}
        className="flexCenter gap-2 hover:text-primaryColor hover:font-medium"
      >
        {page === "chats" ? <IconMessage /> : <IconFolder />}
        {title}
      </Link>

      <DropdownMenu
        menuFeatures={dropDown}
        handleAction={(type) => onAction(type)}
      />
    </li>
  );
};
