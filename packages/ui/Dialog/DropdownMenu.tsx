"use client";

import { IconMore } from "..";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Action, MenuFeatures } from "types";

interface DropDownMenuProps {
  isPin?: boolean;
  menuFeatures: MenuFeatures;
  handleAction: (type: Action) => void;
}

export const DropdownMenu = ({
  handleAction,
  menuFeatures,
  isPin,
}: DropDownMenuProps) => {
  return (
    <div className="text-right dropdown-action">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-white">
            <IconMore />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="px-1 py-1 ">
              {menuFeatures.map(({ icon, title }, index) => {
                return (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        onClick={() => handleAction(title)}
                        className={`${
                          active ? "bg-grayColor/10" : ""
                        } text-grayColor group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm`}
                      >
                        {icon}
                        <span>
                          {isPin && title === "pin" ? "Unpin" : title}
                        </span>
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
