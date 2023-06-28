import React from "react";
import { IconArrowRight } from "ui";

const Knowledge = () => {
  return (
    <div className="flexCenter h-[87dvh]">
      <IconArrowRight className="w-8 h-8 stroke-primaryColor dark:stroke-secondColor animate-shake animate-infinite animate-duration-[1500ms] animate-delay-300" />
      <h2 className="text-3xl ml-7 text-primaryColor dark:text-secondColor">
        Select a folder
      </h2>
    </div>
  );
};

export default Knowledge;
