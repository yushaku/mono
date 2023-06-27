import React from "react";
import { IconSearch, IconAdd } from "ui";

type Props = {
  onAddElement: () => void;
};
export const SearchBox = ({ onAddElement }: Props) => {
  return (
    <div className="flex justify-between">
      <label className="relative flex-1">
        <input
          className="bg-strokeColor w-full h-[46px] rounded-lg pl-10 text-grayColor focus:ring-blue-500"
          placeholder="Search..."
        />
        <IconSearch className="w-5 h-5 absolute top-1/2 -translate-y-1/2 left-2" />
      </label>

      <button
        className="bg-primaryColor rounded-lg w-[46px] p-2 ml-2"
        onClick={onAddElement}
      >
        <IconAdd className="w-5 h-5" />
      </button>
    </div>
  );
};
