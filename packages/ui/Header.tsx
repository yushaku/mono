import React from "react";

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  text: string;
};

export const Header = ({ text, className }: Props) => {
  return <h1 className={`font-bold text-red-200 ${className}`}>{text}</h1>;
};
