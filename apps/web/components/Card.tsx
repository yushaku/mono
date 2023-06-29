import moment from "moment";
import Link from "next/link";
import { Content } from "types";

type Props = React.HTMLAttributes<HTMLElement> &
  Partial<Content> & {
    href: string;
  };

export const Card = ({
  href,
  type,
  title,
  created_at,
  updated_at,
  is_trained,
}: Props) => {
  return (
    <li className="dark:shadow-darkShadow h-[170px] flexCenter group w-1/3 rounded-xl shadow-lg">
      <Link href={href}>
        <h3 className="text-textColor dark:text-strokeColor/80 group-hover:text-primaryColor my-2 font-semibold">
          {title}
        </h3>

        <p className="flex gap-2 justify-evenly mt-4">
          <span className="px-3 rounded-xl bg-gray-200/30 text-grayColor">
            {type}
          </span>

          {is_trained ? (
            <span className="px-3 rounded-xl bg-green-200/30 text-green-400">
              trained
            </span>
          ) : (
            <span className="px-3 rounded-xl bg-yellow-200/50 text-orange-400">
              not trained
            </span>
          )}
        </p>

        <div className="text-grayColor text-sm mt-4 flex justify-between">
          <p>
            <strong className="block">create at</strong>
            <time>{moment(created_at).format("LL")}</time>
          </p>
          <p>
            <strong className="block">updated at</strong>
            <time>{moment(updated_at).format("LL")}</time>
          </p>
        </div>
      </Link>
    </li>
  );
};
