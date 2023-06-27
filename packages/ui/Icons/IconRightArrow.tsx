import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {};

export const IconArrowRight = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 9 18"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M8.094 16.92l-6.52-6.52c-.77-.77-.77-2.03 0-2.8l6.52-6.52"
      ></path>
    </svg>
  );
};
