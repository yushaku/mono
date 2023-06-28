import Link from "next/link";
import React from "react";
import { Action, MenuFeatures } from "types";
import { DropdownMenu, IconPen, IconTrash } from "ui";

const dropdownFeatures: MenuFeatures = [
  { title: "delete", icon: <IconTrash /> },
  { title: "update", icon: <IconPen /> },
];

type Props = {
  title: string;
  href: string;
  onAction: (type: Action) => void;
};
export const ListItem = ({ title, href, onAction }: Props) => {
  return (
    <li className="bg-strokeColor flex justify-between items-center px-4 py-3 rounded-lg text-grayColor w-full">
      <Link href={href} className="hover:text-primaryColor hover:font-medium">
        {title}
      </Link>

      <DropdownMenu
        menuFeatures={dropdownFeatures}
        handleAction={(type) => onAction(type)}
      />
    </li>
  );
};
