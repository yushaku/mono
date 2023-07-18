"use client";

import { IconArrowUpDown, IconChecked } from "..";
import { Combobox, Transition } from "@headlessui/react";
import { Fragment, HTMLAttributes, SetStateAction, useState } from "react";

export type AutocompleteType = {
  title: string;
  id: string;
};

type Props<TDefaultValue extends AutocompleteType> =
  HTMLAttributes<HTMLDivElement> & {
    title?: string;
    rangeValue: Array<TDefaultValue>;
    selected: TDefaultValue;
    setSelected: React.Dispatch<SetStateAction<TDefaultValue>>;
  };

export function AutocompleteInput<K extends AutocompleteType>({
  title,
  rangeValue,
  selected,
  setSelected,
  ...props
}: Props<K>) {
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? rangeValue
      : rangeValue.filter((item) =>
          item.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div {...props}>
      <label className="font-semibold text-lg mb-3 text-grayColor">
        {title}
      </label>

      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative">
            <Combobox.Input
              className="mt-3 h-[50px] w-full rounded-lg border bg-white p-5 text-grayColor placeholder-[#A3A9B1] focus:outline-none"
              displayValue={(item: any) => item.title}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 top-1/4 right-4">
              <IconArrowUpDown />
            </Combobox.Button>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 shadow-lg">
              {filteredItems.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredItems.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                      `relative select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-strokeColor text-textColor"
                          : "text-grayColor"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.title}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <IconChecked className="h-5 w-5" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
