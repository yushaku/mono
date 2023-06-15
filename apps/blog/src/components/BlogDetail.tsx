import { rnrSlugify } from "@9gustin/react-notion-render";
import { DropedProps } from "@9gustin/react-notion-render/dist/hoc/withContentValidation";
import Link from "next/link";
import React from "react";

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
    <pre className="mt-8 overflow-auto">
      <code>{plainText}</code>
    </pre>
  );
};
