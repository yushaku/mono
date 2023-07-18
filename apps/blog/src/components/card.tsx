import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = React.HTMLAttributes<HTMLElement> & {
  name: string;
  author: string;
  date: string;
  imageUrl: string;
  slug: string;
  summary: string;
};

export const Card = ({ name, date, imageUrl, slug, summary }: Props) => {
  return (
    <article className="group max-w-[350px] rounded-lg shadow-lg dark:shadow-card">
      <Link href={`/${slug}`}>
        <div className="relative h-[200px] w-full overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl}
            alt={name}
            loading="lazy"
            placeholder="empty"
            object-fit="cover"
            quality={100}
            fill={true}
          />
        </div>

        <div className="h-[224px] p-6">
          <p className="text-grayColor text-sm">
            <span>yushaku</span>
            <span className="ml-4">{moment(date).format("LL")}</span>
          </p>
          <h3 className="text-textColor dark:text-strokeColor dark:group-hover:text-secondColor group-hover:text-primaryColor my-2 text-xl font-semibold">
            {name}
          </h3>
          <p className="text-grayColor line-clamp-4 text-sm">{summary}</p>
        </div>
      </Link>
    </article>
  );
};

export const BigCard = ({ name, date, imageUrl, slug, summary }: Props) => {
  return (
    <article className="group relative mb-6 w-full overflow-hidden rounded-lg shadow-lg dark:shadow-card">
      <Link href={`/${slug}`}>
        <div className=" h-[424px] w-full">
          <Image
            src={imageUrl}
            alt={name}
            loading="lazy"
            placeholder="empty"
            object-fit="cover"
            quality={100}
            fill={true}
          />
        </div>

        <div className=" absolute bottom-8 left-8 rounded-md bg-white/5 px-2 py-4 backdrop-blur-sm">
          <p className="text-strokeColor text-sm">
            <span>yushaku</span>
            <span className="ml-4">{moment(date).format("LL")}</span>
          </p>
          <h3 className="group-hover:text-primaryColor dark:group-hover:text-secondColor my-2 text-xl font-semibold text-white">
            {name}
          </h3>
          <p className="text-strokeColor line-clamp-4 text-sm">{summary}</p>
        </div>
      </Link>
    </article>
  );
};
