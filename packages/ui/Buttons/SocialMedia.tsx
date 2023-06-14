import Link from "next/link";
import React from "react";
import { IconLinkedin, IconGithub } from "..";
import { twMerge } from "tailwind-merge";

type Props = React.HTMLAttributes<HTMLSpanElement> & {};

export const SocialMedia = ({ className, ...props }: Props) => {
  const classes = twMerge("flex gap-4 " + className);

  return (
    <span className={classes} {...props}>
      <Link href={""}>
        <IconLinkedin />
      </Link>

      <Link href={""}>
        <IconGithub />
      </Link>
    </span>
  );
};
