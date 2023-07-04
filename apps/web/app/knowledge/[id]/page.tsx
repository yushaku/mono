"use client";

import { Card } from "@/components/chats/Card";
import { useDeleteContent, useGetfolderContent } from "@/services";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Action } from "types";
import { DeleteDialog } from "ui";

const DocumentPage = () => {
  const idProject = usePathname().substring(11);
  const [id, setId] = useState<string | undefined>();

  const { data } = useGetfolderContent(idProject);
  const { mutate: deleteContent } = useDeleteContent();

  const handleAction = (type: Action, id: string) => {
    if (type === "update") {
      setId(id);
    }

    if (type === "delete") {
      setId(id);
    }
  };

  const handleDelete = () => {
    deleteContent(id);
  };
  const handleCancel = () => {
    setId(undefined);
  };

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
                onAction={(type) => handleAction(type, el.id)}
              />
            );
          })}
        </ul>
      </article>

      <DeleteDialog
        isShow={!!id}
        onSubmit={handleDelete}
        onCancel={handleCancel}
      />
    </section>
  );
};

export default DocumentPage;
