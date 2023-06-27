"use client";

import { ListItem } from "../ListItem";
import { SearchBox } from "../SearchBox";
import { getChats, useCreateChat } from "@/services/chat";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FormCreateDialog } from "ui";

export default function ListChats() {
  const [title, setTitle] = useState<string | undefined>();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const { mutate: createChat } = useCreateChat();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["hydrate-chats"],
    queryFn: () => getChats(),
  });

  return (
    <article className="my-[2dvh] h-[96dvh] p-4 bg-white w-1/4 rounded-2xl">
      <SearchBox onAddElement={() => setTitle("")} />

      <hr className="my-4" />

      <ul className="mt-4 flex flex-col gap-3">
        {isLoading || isFetching || !data ? (
          <li>loading....</li>
        ) : (
          data.map((el) => {
            return <ListItem key={el.id} title={el.title} id={el.id} />;
          })
        )}
      </ul>

      <FormCreateDialog
        title={title}
        onChange={handleOnChange}
        onsubmit={() => {
          createChat({ title });
          setTitle(undefined);
        }}
        setToggle={() => setTitle(undefined)}
      />
    </article>
  );
}
