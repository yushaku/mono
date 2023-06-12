import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  title: string;
  Icon?: () => JSX.Element;
};

export const CheckBox = ({ title, ...props }: Props) => {
  return (
    <label className="flexCenter gap-2">
      <input
        type="checkbox"
        className="accent-primaryColor h-5 w-5"
        {...props}
      />
      <p className="text-grayColor">{title}</p>
    </label>
  );
};
