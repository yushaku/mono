import moment from "moment";
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
  onAction,
}: Props) => {
  return (
    <li className="dark:shadow-darkShadow h-[170px] flexCenter group w-1/3 min-w-[285px] rounded-xl border hover:shadow-xl px-4 animationShow">
      <Link href={href}>
        <h3 className="text-textColor dark:text-strokeColor/80 animationShow group-hover:text-primaryColor flex my-2 font-semibold">
          {title}
          <DropdownMenu
            menuFeatures={dropDown}
            handleAction={(type) => onAction(type)}
          />
        </h3>

        <p className="flex gap-2 justify-evenly mt-4">
          <span className="px-3 rounded-xl bg-gray-200/30 text-grayColor">
            {model}
          </span>
        </p>

        <div className="text-grayColor text-sm mt-4 flex justify-between">
          <p>
            <strong className="block">create at</strong>
            <time>{moment(created_at).format("LL")}</time>
          </p>
        </div>
      </Link>
    </li>
  );
};
