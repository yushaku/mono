import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  Icon?: () => JSX.Element;
};

export const Button = ({ title, className, Icon, ...props }: Props) => {
  return (
    <button
      className={`flexCenter h-[52px] gap-3 rounded-lg border text-lg font-medium lg:w-[275px] ${className}`}
      {...props}
    >
      {Icon && <Icon />}
      {title}
    </button>
  );
};
