import { rnrSlugify } from "@9gustin/react-notion-render";
import { DropedProps } from "@9gustin/react-notion-render/dist/hoc/withContentValidation";
import React from "react";
import { IconCopy, IconInfo } from "ui";

export const Heading2 = ({ plainText }: { plainText: string }) => {
  return (
    <h2
      id={rnrSlugify(plainText)}
      className="text-primaryColor dark:text-secondColor/90 mb-4 mt-8 text-2xl font-semibold"
    >
      {plainText}
    </h2>
  );
};

export const Heading3 = ({ plainText }: { plainText: string }) => {
  return (
    <h3
      id={rnrSlugify(plainText)}
      className="text-primaryColor dark:text-secondColor/80 mb-3 mt-7 text-lg font-semibold"
    >
      {plainText}
    </h3>
  );
};

export const Paragraph = ({ plainText }: { plainText: string }) => {
  return (
    <p className="text-textColor/80 dark:text-strokeColor/90 my-6">
      {plainText}
    </p>
  );
};

export const BlockCode = ({ plainText, language }: DropedProps) => {
  return (
    <pre
      className={`language-${language} group relative mt-8 overflow-auto rounded-xl`}
      style={{ paddingTop: "2.5rem" }}
    >
      <div className="absolute left-0 top-0 z-30 flex w-full justify-between p-4">
        <p className="flex gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-yellow-400"></span>
          <span className="inline-block h-3 w-3 rounded-full bg-green-400"></span>
          <span className="inline-block h-3 w-3 rounded-full bg-red-400"></span>
        </p>
        <span
          // onClick={() => navigator.clipboard.writeText(plainText)}
          className="hidden cursor-pointer rounded-md border border-[#cdcdcd]/40 group-hover:block"
        >
          <IconCopy className="h-7 w-7" color="#cdcdcd" />
        </span>
      </div>
      <code>{plainText}</code>
    </pre>
  );
};

export const numberList = ({ config }: DropedProps) => {
  return (
    <ol className="list-decimal">
      {config.block.items.map((el, num) => {
        return (
          <ul key={el.id} className="list-decimal">
            {el.content.text.map((te, index) => {
              return (
                <li key={index}>
                  <span className="text-primaryColor dark:text-secondColor mr-2 text-sm">
                    {num}.
                  </span>
                  {te.plain_text}
                </li>
              );
            })}
          </ul>
        );
      })}
    </ol>
  );
};

export const callout = ({ config, plainText }: DropedProps) => {
  return (
    <div className="bg-strokeColor/70 text-textColor m-4 flex items-center rounded-md p-4">
      <span className="w-8">{config.block.content.icon.emoji}</span>
      <p>{plainText}</p>
    </div>
  );
};

export const quoteBlock = ({ plainText }: DropedProps) => {
  return (
    <div className="relative mx-3 my-8 border-l-[3px] border-[#617bff] bg-dark-100/80 rounded-r-lg p-4">
      <IconInfo
        width="35px"
        height="35px"
        className="absolute -left-4 -top-3 rounded-full bg-dark stroke-white p-1"
      />
      <p>{plainText}</p>
    </div>
  );
};
