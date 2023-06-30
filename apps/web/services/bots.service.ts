import { axiosClient } from ".";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Bot } from "types";

export const botPath = "/bots";

export const useGetBots = () => {
  return useQuery([botPath], async () => {
    return await getBots();
  });
};

export const getBots = async () => {
  const res = await axiosClient.get(botPath);
  const botList = res.data ?? [];
  return botList as Bot[];
};

export const useCreateBot = () => {
  const queryClient = useQueryClient();

  return useMutation(
    [botPath],
    async (data: { title: string }) => {
      const res = await axiosClient.post(botPath, data);
      return res.data.data as any;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([botPath]);
        toast.success("Create successfully");
      },
    }
  );
};
