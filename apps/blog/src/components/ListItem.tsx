import React from "react";
import Image from "next/image";
import moment from "moment";

type Props = React.HTMLAttributes<HTMLElement> & {
  name: string;
  imageUrl: string;
  date: string;
};
export const ListItem = ({ name, imageUrl, date, ...props }: Props) => {
  return (
    <article {...props} className="flex items-center gap-4 py-4">
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
        <h3 className="text-textColor text-base font-semibold">{name}</h3>
        <p className="text-grayColor text-sm">{moment(date).format("LL")}</p>
      </div>
    </article>
  );
};
