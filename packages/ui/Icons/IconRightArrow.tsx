import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {};

export const IconArrowRight = ({
  color = "#051320",
  width = 7,
  height = 16,
  ...props
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 9 18"
      {...props}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M8.094 16.92l-6.52-6.52c-.77-.77-.77-2.03 0-2.8l6.52-6.52"
      ></path>
    </svg>
  );
};
