import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Action, Bot, MenuFeatures } from "types";
import { DropdownMenu, IconPen, IconTrash } from "ui";

type Props = React.HTMLAttributes<HTMLElement> &
  Partial<Bot> & {
    href: string;
    onAction: (type: Action) => void;
  };

const dropDown: MenuFeatures = [
  { title: "delete", icon: <IconTrash /> },
  { title: "update", icon: <IconPen /> },
];

export const BotCard = ({
  href,
  model,
  title,
  created_at,
  description,
  onAction,
}: Props) => {
  return (
    <li className="py-3 group w-1/5 min-w-[285px] shadow-md rounded-xl border hover:shadow-xl px-4 animationShow">
      <h3 className="animationShow group-hover:text-primaryColor flex gap-4 items-center my-2 ">
        <Image
          alt="yushaku"
          src="/bot.png"
          width={40}
          height={40}
          loading="lazy"
        />
        <p className="flex flex-col">
          <span className="text-xl font-semibold">{title}</span>
          <span className="text-sm">{model}</span>
        </p>

        <DropdownMenu
          menuFeatures={dropDown}
          handleAction={(type) => onAction(type)}
        />
      </h3>

      <p className="mt-4">{description}</p>

      <div className="text-grayColor text-sm mt-2">
        <p>
          <strong>create at: </strong>
          <time className="ml-2">{moment(created_at).format("LL")}</time>
        </p>
      </div>

      <div className="flex justify-evenly mt-3">
        <Link
          href={href}
          className="w-1/3 text-center py-1 border border-primaryColor rounded-lg text-primaryColor font-semibold"
        >
          Preview
        </Link>
        <Link
          href={href}
          className="w-1/3 text-center py-1 border bg-primaryColor rounded-lg text-white font-semibold"
        >
          View
        </Link>
      </div>
    </li>
  );
};
