import Link from "next/link";
import React from "react";
import { IconLinkedin, IconGithub } from "ui";

type Props = React.HTMLAttributes<HTMLSpanElement> & {};

export const SocialMedia = ({ className, ...props }: Props) => {
  return (
    <span className={`flex gap-4 ${className}`} {...props}>
      <Link href="https://www.linkedin.com/in/levanson180200/">
        <IconLinkedin />
      </Link>

      <Link href="https://github.com/yushaku">
        <IconGithub />
      </Link>
    </span>
  );
};
