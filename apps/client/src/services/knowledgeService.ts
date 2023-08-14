import { axiosClient } from ".";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Content,
  CreateContentDto,
  CreateProjectDto,
  FolderContent,
  PreSignFile,
  Project,
  UpdateProjectDto,
} from "types";

export const knowledgePath = "/knowledge";
export const contentPath = "/knowledge/content";

export const getProject = async () => {
  const res = await axiosClient.get(knowledgePath);
  const messageList = res.data ?? [];
  return messageList as Project[];
};

export const useGetProjects = () => {
  return useQuery([knowledgePath], async () => {
    return getProject();
  });
};

export const useGetfolderContent = (id: string) => {
  return useQuery([knowledgePath, id], async () => {
    const res = await axiosClient.get(`${knowledgePath}/${id}`);
    return res.data as FolderContent;
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation(
    [knowledgePath],
    async (data: CreateProjectDto) => {
      const res = await axiosClient.post(knowledgePath, data);
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
      const res = await axiosClient.patch(knowledgePath, data);
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
      const res = await axiosClient.delete(`${knowledgePath}/${id}`);
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

const uploadFile = async (
  file: File,
  url: string,
  fields: Record<string, string>
) => {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.append("file", file);
  return axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUploadFile = () => {
  return useMutation([`${knowledgePath}/presigned`], async (file: File) => {
    const res = await axiosClient.post(`${knowledgePath}/presigned`, {
      fileName: file.name,
    });

    const preSign = res.data as PreSignFile;
    await uploadFile(file, preSign.postURL, preSign.formData);
    return preSign.postURL;
  });
};

export const getContentDetail = async (id: string) => {
  const res = await axiosClient.get(`${contentPath}/${id}`);
  return res.data as Content;
};
export const useGetContent = async (id: string) => {
  return useQuery([contentPath, id], () => {
    return getContentDetail(id);
  });
};

export const useCreateContent = () => {
  return useMutation(
    [contentPath],
    async (data: CreateContentDto) => {
      const res = await axiosClient.post(contentPath, data);
      return res.data as any;
    },
    {
      onSuccess: () => {
        toast.success("Create successfully");
      },
    }
  );
};

export const useDeleteContent = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [contentPath],
    async (id: string) => {
      return axiosClient.delete(`${contentPath}/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([contentPath]);
      },
    }
  );
};
