import React from "react";
import { twMerge } from "tailwind-merge";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  Icon?: JSX.Element;
};

export const Button = ({ title, className, Icon, ...props }: Props) => {
  const classes = twMerge(
    `flexCenter h-[52px] w-full gap-3 rounded-lg border text-lg font-medium ${className}`
  );

  return (
    <button className={classes} {...props}>
      {Icon && Icon}
      {title}
    </button>
  );
};
