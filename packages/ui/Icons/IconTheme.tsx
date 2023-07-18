import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {};

export const IconTheme = ({ color = "#627480", ...props }: Props) => {
  return (
    <svg viewBox="0 0 34 34" fill="none" {...props}>
      <path
        d="M11.1632 17.0991C11.1632 16.5183 11.6448 16.0366 12.2257 16.0366H19.989V4.05165C19.9748 3.37165 19.4365 2.83331 18.7565 2.83331C10.4123 2.83331 4.58984 8.65581 4.58984 17C4.58984 25.3441 10.4123 31.1666 18.7565 31.1666C19.4223 31.1666 19.9748 30.6283 19.9748 29.9483V18.1475H12.2257C11.6307 18.1616 11.1632 17.68 11.1632 17.0991Z"
        fill={color}
      />
      <path
        d="M29.0979 16.3483L25.0746 12.3108C24.6638 11.9 23.9838 11.9 23.5729 12.3108C23.1621 12.7216 23.1621 13.4016 23.5729 13.8125L25.7829 16.0225H19.9746V18.1475H25.7688L23.5588 20.3575C23.1479 20.7683 23.1479 21.4483 23.5588 21.8591C23.7713 22.0716 24.0404 22.1708 24.3096 22.1708C24.5788 22.1708 24.8479 22.0716 25.0604 21.8591L29.0838 17.8216C29.5088 17.425 29.5088 16.7591 29.0979 16.3483Z"
        fill={color}
      />
    </svg>
  );
};
