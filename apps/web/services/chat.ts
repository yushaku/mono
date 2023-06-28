import { httpClient } from ".";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Chats } from "types";

export const fetchStreamData = (
  prompt: string,
  signal: AbortSignal,
  callback: (msg: string) => void
) => {
  fetch(`http://localhost:8005/api/openai/askStream?prompt=${prompt}`, {
    signal,
  })
    .then((response) => {
      const reader = response.body.getReader();

      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            console.log("Stream ended");
            break;
          }
          const chunk = new TextDecoder("utf-8").decode(value);
          const lines = chunk
            .toString()
            .split("\n")
            .filter((line: any) => line.trim() !== "");
          for (const line of lines) {
            const message = line.replace(/^data: /, "");
            if (message === "[DONE]") {
              return;
            }
            try {
              const parsed = JSON.parse(message);
              const work = parsed.choices[0].delta.content;
              callback(work);
            } catch (error) {
              console.error("Error parsing AI response:", error);
            }
          }
        }
      };
      processStream();
    })
    .catch((error) => {
      console.error("Error fetching stream data:", error);
    });
};

const chatPath = "/chats";

export const useGetChats = () => {
  return useQuery([chatPath], async () => {
    return await getChats();
  });
};

export const getChats = async () => {
  const res = await httpClient().get(chatPath);
  const messageList = res.data ?? [];
  return messageList as Chats[];
};

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  return useMutation(
    [chatPath],
    async (data: { title: string }) => {
      const res = await httpClient().post(chatPath, data);
      return res.data.data as any;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([chatPath]);
        toast.success("Create successfully");
      },
    }
  );
};

export const useUpdateChat = () => {
  const queryClient = useQueryClient();

  return useMutation(
    [chatPath],
    async (data: { title: string; id: string }) => {
      const res = await httpClient().patch(chatPath, data);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([chatPath]);
        toast.success("Update successfully");
      },
    }
  );
};

export const useDeleteChat = () => {
  const queryClient = useQueryClient();

  return useMutation(
    [chatPath],
    async (id: string) => {
      const res = await httpClient().delete(`${chatPath}/${id}`);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([chatPath]);
      },
    }
  );
};
