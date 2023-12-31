"use client";

import { FormInput } from "..";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type Props = {
  title: string;
  page: string;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onsubmit: () => void;
};
export const FormDialog = ({
  title,
  page,
  onCancel,
  onChange,
  onsubmit,
}: Props) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onsubmit();
    }
  };

  return (
    <Transition appear show={title !== undefined} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Form create
                </Dialog.Title>

                <div className="mt-2">
                  {/* <p className="text-sm text-gray-500"> */}
                  {/*   Your payment has been successfully submitted. We’ve sent you */}
                  {/*   an email with all of the details of your order. */}
                  {/* </p> */}
                  <FormInput
                    value={title}
                    name={`${page} title`}
                    placeholder={`${page} title`}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onsubmit}
                  >
                    Submit
                  </button>

                  <button
                    type="button"
                    className="rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-grayColor hover:bg-blue-200"
                    onClick={onCancel}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
