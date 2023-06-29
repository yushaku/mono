"use client";

import { Card } from "@/components/Card";
import { useGetfolderContent } from "@/services";
import { usePathname } from "next/navigation";
import React from "react";

const DocumentPage = () => {
  const idProject = usePathname().substring(11);
  const { data } = useGetfolderContent(idProject);

  return (
    <section>
      <article className="mt-12 flex items-center gap-1">
        <h3 className="text-xl text-primaryColor font-semibold ">
          {data?.folder?.title}
        </h3>
      </article>

      <article className="mt-12 text-center">
        <h3 className="text-xl font-semibold">Stored Documents</h3>
        <p className="text-grayColor">
          These are all uploaded documents that Tigon Ai can learn from.
        </p>

        <ul className="mt-8">
          {data?.contentList.map((el) => {
            return (
              <Card
                key={el.id}
                type={el.type}
                title={el.title}
                href={`content/${el.id}`}
                is_trained={el.is_trained}
                created_at={el.created_at}
                updated_at={el.updated_at}
              />
            );
          })}
        </ul>
      </article>
    </section>
  );
};

export default DocumentPage;
