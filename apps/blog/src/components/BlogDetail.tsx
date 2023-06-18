import { rnrSlugify } from "@9gustin/react-notion-render";
import { DropedProps } from "@9gustin/react-notion-render/dist/hoc/withContentValidation";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";
import { Palanquin } from "next/font/google";
import React from "react";
import { IconCopy, IconInfo } from "ui";

export const Heading2 = ({ plainText }: { plainText: string }) => {
  return (
    <h2
      id={rnrSlugify(plainText)}
      className="text-primaryColor mb-4 mt-8 text-2xl font-semibold"
    >
      {plainText}
    </h2>
  );
};

export const Heading3 = ({ plainText }: { plainText: string }) => {
  return (
    <h3
      id={rnrSlugify(plainText)}
      className="text-primaryColor mb-3 mt-7 text-lg font-semibold"
    >
      {plainText}
    </h3>
  );
};

export const Paragraph = ({ plainText }: { plainText: string }) => {
  return <p className="text-textColor/80 my-6">{plainText}</p>;
};

export const BlockCode = ({ plainText, language }: DropedProps) => {
  return (
    <pre
      className={`language-${language} group relative mt-8 overflow-auto`}
      style={{ paddingTop: "2rem" }}
    >
      <div className="absolute left-0 top-0 z-30 flex w-full justify-between px-4 pt-3">
        <p className="flex gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-yellow-400"></span>
          <span className="inline-block h-3 w-3 rounded-full bg-green-400"></span>
          <span className="inline-block h-3 w-3 rounded-full bg-red-400"></span>
        </p>
        <span
          // onClick={() => navigator.clipboard.writeText(plainText)}
          className="hidden cursor-pointer rounded-md border border-[#cdcdcd] group-hover:block"
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
                  <span className="text-grayColor mr-2 text-sm">{num}.</span>
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
    <div className="bg-strokeColor/70 m-4 flex items-center rounded-md p-4">
      <span className="w-8">{config.block.content.icon.emoji}</span>
      <p>{plainText}</p>
    </div>
  );
};

export const quoteBlock = ({ config, plainText }: DropedProps) => {
  return (
    <div className="relative m-4 border-l-[3px] border-[#4c3cff] bg-[#4c3cff]/10 p-4">
      <IconInfo
        width="25px"
        height="25px"
        className="absolute -left-3 -top-3 rounded-full bg-white stroke-[#4c3cff] p-1"
      />
      <p>{plainText}</p>
    </div>
  );
};
