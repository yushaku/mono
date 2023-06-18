import { rnrSlugify } from "@9gustin/react-notion-render";
import { DropedProps } from "@9gustin/react-notion-render/dist/hoc/withContentValidation";
import Link from "next/link";
import React from "react";
import { IconCopy } from "ui";

export const Heading2 = ({ plainText }: { plainText: string }) => {
  return (
    <Link href={rnrSlugify(plainText)}>
      <h2
        id={rnrSlugify(plainText)}
        className="text-primaryColor mb-4 mt-8 text-2xl font-semibold"
      >
        {plainText}
      </h2>
    </Link>
  );
};

export const Heading3 = ({ plainText }: { plainText: string }) => {
  return (
    <Link href={rnrSlugify(plainText)}>
      <h3
        id={rnrSlugify(plainText)}
        className="text-primaryColor mb-3 mt-7 text-lg font-semibold"
      >
        {plainText}
      </h3>
    </Link>
  );
};

export const Paragraph = ({ plainText }: { plainText: string }) => {
  return <p className="text-textColor my-6">{plainText}</p>;
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
