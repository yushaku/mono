import { ListItem } from "../ListItem";
import { SearchBox } from "../SearchBox";
import {
  useCreateChat,
  useDeleteChat,
  useGetChats,
  useUpdateChat,
} from "@/services/chatService";
import React, { useState } from "react";
import { Action } from "types";
import { DeleteDialog, FormDialog } from "ui";

export default function ListChats() {
  const [title, setTitle] = useState<string | undefined>();
  const [id, setId] = useState<string | undefined>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const { mutate: createChat } = useCreateChat();
  const { mutate: updateChatTitle } = useUpdateChat();
  const { mutate: deleteChat } = useDeleteChat();
  const { data, isLoading, isFetching } = useGetChats();

  const handleAction = (type: Action, id: string, oldName: string) => {
    if (type === "update") {
      setId(id);
      setTitle(oldName);
    }

    if (type === "delete") {
      setId(id);
    }
  };

  const handleCancel = () => {
    setTitle(undefined);
    setId(undefined);
  };

  const handleDelete = () => {
    deleteChat(id);
    handleCancel();
  };

  const handleSubmit = () => {
    if (id && title) {
      updateChatTitle({ id, title });
    } else {
      createChat({ title });
    }
    handleCancel();
  };

  return (
    <>
      <SearchBox onAddElement={() => setTitle("")} />
      <hr className="my-4" />

      <ul className="mt-4 flex flex-col gap-3">
        {isLoading || isFetching || !data ? (
          <li>loading....</li>
        ) : (
          data.map((el) => {
            return (
              <ListItem
                key={el.id}
                page="chats"
                title={el.title}
                href={`/chats/${el.id}`}
                onAction={(type) => handleAction(type, el.id, el.title)}
              />
            );
          })
        )}
      </ul>

      <FormDialog
        page="Chats"
        title={title}
        onChange={handleOnChange}
        onsubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <DeleteDialog
        isShow={!!id && !title}
        onSubmit={handleDelete}
        onCancel={handleCancel}
      />
    </>
  );
}
