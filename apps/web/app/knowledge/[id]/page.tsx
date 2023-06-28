"use client";

import { useGetfolderContent } from "@/services";
import { usePathname } from "next/navigation";
import React from "react";
import { IconMore } from "ui";

const DocumentPage = () => {
  const idProject = usePathname().substring(11);
  const { data } = useGetfolderContent(idProject);

  return (
    <section>
      <article className="mt-12 flex items-center gap-1">
        <h3 className="text-xl text-primaryColor font-semibold ">
          {data?.folder?.title}
        </h3>
        <IconMore />
      </article>

      <article className="mt-12 text-center">
        <h3 className="text-xl font-semibold">Stored Documents</h3>
        <p className="text-grayColor">
          These are all uploaded documents that Tigon Ai can learn from.
        </p>

        <ul>
          {data?.contentList.map((el) => {
            return <li key={el.id}></li>;
          })}
        </ul>
      </article>
    </section>
  );
};

export default DocumentPage;
