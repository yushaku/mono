import { httpClient } from ".";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  CreateProjectDto,
  FolderContent,
  Project,
  UpdateProjectDto,
} from "types";

export const knowledgePath = "/knowledge";

export const getProject = async () => {
  const res = await httpClient().get(knowledgePath);
  const messageList = res.data ?? [];
  return messageList as Project[];
};

export const useGetfolderContent = (id: string) => {
  return useQuery([knowledgePath, id], async () => {
    const res = await httpClient().get(`${knowledgePath}/${id}`);
    return res.data as FolderContent;
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation(
    [knowledgePath],
    async (data: CreateProjectDto) => {
      const res = await httpClient().post(knowledgePath, data);
      return res.data as any;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([knowledgePath]);
        toast.success("Create successfully");
      },
    }
  );
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation(
    [knowledgePath],
    async (data: UpdateProjectDto) => {
      const res = await httpClient().patch(knowledgePath, data);
      return res.data as any;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([knowledgePath]);
        toast.success("Create successfully");
      },
    }
  );
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation(
    [knowledgePath],
    async (id: string) => {
      const res = await httpClient().delete(`${knowledgePath}/${id}`);
      return res.data as any;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([knowledgePath]);
        toast.success("Create successfully");
      },
    }
  );
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation(
    [knowledgePath],
    async (file: File) => {
      const res = await httpClient().delete(`${knowledgePath}/${file}`);
      return res.data as any;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([knowledgePath]);
        toast.success("Create successfully");
      },
    }
  );
};
