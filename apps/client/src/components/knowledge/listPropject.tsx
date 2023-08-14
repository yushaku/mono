import { ListItem } from "../ListItem";
import { SearchBox } from "../SearchBox";
import {
  getProject,
  knowledgePath,
  useCreateProject,
  useDeleteProject,
  useUpdateProject,
} from "@/services";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Action } from "types";
import { DeleteDialog, FormDialog } from "ui";

export default function ListProject() {
  const [title, setTitle] = useState<string | undefined>();
  const [id, setId] = useState<string | undefined>();

  const { mutate: createProject } = useCreateProject();
  const { mutate: updateProject } = useUpdateProject();
  const { mutate: deleteProject } = useDeleteProject();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [knowledgePath],
    queryFn: () => getProject(),
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

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
    deleteProject(id);
    handleCancel();
  };

  const handleSubmit = () => {
    if (id && title) {
      updateProject({ id, title });
    } else {
      createProject({ title });
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
                page="knowledge"
                onAction={(type) => handleAction(type, el.id, el.title)}
                href={`/knowledge/${el.id}`}
                key={el.id}
                title={el.title}
              />
            );
          })
        )}
      </ul>

      <FormDialog
        page="Project"
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
