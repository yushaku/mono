import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = React.HTMLAttributes<HTMLElement> & {
  name: string;
  imageUrl: string;
  date: string;
  slug: string;
  category: string;
};
export const ListItem = ({
  name,
  imageUrl,
  date,
  slug,
  category,
  ...props
}: Props) => {
  return (
    <Link href={`/${slug}`}>
      <article {...props} className="group flex items-center gap-4 py-4">
        <div className="relative h-[60px] w-[60px] overflow-hidden rounded-full">
          <Image
            src={imageUrl}
            alt={name}
            loading="lazy"
            placeholder="empty"
            quality={100}
            fill={true}
            object-fit="cover"
          />
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-textColor dark:text-strokeColor dark:group-hover:text-teal-200 group-hover:text-primaryColor animationShow mb-1 text-base font-semibold group-hover:font-bold">
            {name}
          </h3>
          <p className="flex items-center gap-4">
            <span className="text-primaryColor bg-primaryColor/20 dark:text-teal-200 overflow-hidden rounded-lg px-3 py-1">
              {category}
            </span>
            <span className="animationShow text-grayColor w-0 overflow-hidden whitespace-nowrap text-sm group-hover:w-24">
              {moment(date).format("LL")}
            </span>
          </p>
        </div>
      </article>
    </Link>
  );
};
