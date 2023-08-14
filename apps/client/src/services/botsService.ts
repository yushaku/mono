import { axiosClient, httpClient, httpServer } from ".";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Bot, CreateBotDto, UserProfile } from "types";

export const botPath = "/bots";

export const useGetProfile = () => {
  return useQuery(
    ["/user"],
    async () => {
      const res = await httpClient().get("/user");
      const botList = res.data ?? [];
      return botList as UserProfile;
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetBots = () => {
  return useQuery([botPath], async () => {
    const res = await httpClient().get(botPath);
    const botList = res.data ?? [];
    return botList as Bot[];
  });
};

export const getBotList = async () => {
  const res = await axiosClient.get(botPath);
  const botList = res.data ?? [];
  return botList as Bot[];
};

export const getBots = async () => {
  const res = await httpServer().get(botPath);
  const botList = res.data ?? [];
  return botList as Bot[];
};

export const useCreateBot = () => {
  const queryClient = useQueryClient();

  return useMutation(
    [botPath],
    async (data: CreateBotDto) => {
      const res = await axiosClient.post(botPath, data);
      return res.data as any;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([botPath]);
        toast.success("Create successfully");
      },
    }
  );
};
