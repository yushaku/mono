"use client";

import { IconWarning } from "..";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type Props = {
  id: string;
  onSubmit: () => void;
  onCancel: () => void;
};

export const DeleteDialog = ({ id, onSubmit, onCancel }: Props) => {
  return (
    <Transition appear show={id !== undefined} as={Fragment}>
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
              <Dialog.Panel className="flexCenter flex-col w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Are you sure?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-grayColor">
                    Your delete stuff can not be recover!
                  </p>
                </div>
                <IconWarning className="w-28 h-28 stroke-red-500" />

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={onSubmit}
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    className="rounded-md border ml-4 border-transparent bg-white px-4 py-2 text-sm font-medium text-grayColor hover:bg-gray-100"
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
