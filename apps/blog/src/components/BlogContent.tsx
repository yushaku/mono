import {
  BlockCode,
  Heading2,
  Heading3,
  Paragraph,
  callout,
  numberList,
  quoteBlock,
} from "./BlogDetail";
import {
  Render,
  withContentValidation as custom,
} from "@9gustin/react-notion-render";
import React from "react";

const BlogContent = ({ blocks }: { blocks: any }) => {
  return (
    <Render
      blocks={blocks}
      useStyles
      blockComponentsMapper={{
        heading_2: custom(Heading2),
        heading_3: custom(Heading3),
        code: custom(BlockCode),
        paragraph: custom(Paragraph),
        callout: custom(callout),
        numbered_list_item: custom(numberList),
        quote: custom(quoteBlock),
      }}
    />
  );
};

export default BlogContent;
