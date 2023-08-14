import React from "react";

export const ProcessStep = ({
  title,
  step,
  isActive,
  isPass,
  isEnd,
}: {
  title: string;
  step: number;
  isActive: boolean;
  isPass: boolean;
  isEnd: boolean;
}) => {
  const endComponentWidth = isEnd ? "" : "w-full";
  const afterStyled = isEnd
    ? " "
    : "after:content-[''] after:w-full after:h-1 after:border-b after:border-strokeColor  after:border-4 after:inline-block";

  if (isActive)
    return (
      <li className={`flex items-center ${endComponentWidth} ${afterStyled}`}>
        <span className="relative flexCenter w-[34px] h-[32px] bg-blackColor rounded-full">
          <span className="text-secondColor scale-105">{step}</span>
          <span className="absolute top-10 text-textColor text-lg">
            {title}
          </span>
        </span>
      </li>
    );
  else if (isPass)
    return (
      <li
        className={`flex items-center ${endComponentWidth} ${afterStyled} after:border-grayColor`}
      >
        <span className="relative flexCenter w-[34px] h-[32px] bg-grayColor rounded-full">
          <span className="text-secondColor scale-105">{step}</span>
          <span className="absolute top-10 text-grayColor text-lg">
            {title}
          </span>
        </span>
      </li>
    );
  else
    return (
      <li className={`flex items-center ${endComponentWidth} ${afterStyled}`}>
        <span className="relative flexCenter w-[34px] h-[32px] bg-strokeColor text-grayColor font-bold rounded-full">
          {step}
          <span className="absolute top-10 text-textColor text-lg font-normal">
            {title}
          </span>
        </span>
      </li>
    );
};
