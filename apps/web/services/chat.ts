import { axiosClient } from ".";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Stream } from "stream";
import { Chats, ResponseMessage } from "types";

export const fetchStreamData = async (
  prompt: string,
  chat_id: string,
  signal: AbortSignal,
  callback: (msg: string) => void
) => {
  const session: any = await getSession();

  fetch(
    `http://localhost:8005/api/chats/ask?chat_id=${chat_id}&prompt=${prompt}`,
    {
      signal,
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${session?.access_token ?? ""}`,
      }),
    }
  )
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
              const word = parsed.choices[0].delta.content;
              callback(word);
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

export const askGPT = (
  prompt: string,
  chat_id: string,
  signal: AbortSignal,
  callback: (msg: string) => void
) => {
  axiosClient
    .post(`/chats/ask?chat_id=${chat_id}&prompt=${prompt}`, {
      signal,
      responseType: "stream",
    })
    .then((response) => {
      const stream = response.data as Stream;
      console.log(typeof stream);

      stream.on("data", (chunk) => {
        const value = new TextDecoder("utf-8").decode(chunk);
        const lines = value
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
            const word = parsed.choices[0].delta.content;
            callback(word);
          } catch (error) {
            console.error("Error parsing AI response:", error);
          }
        }
      });
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
  const res = await axiosClient.get(chatPath);
  const messageList = res.data ?? [];
  return messageList as Chats[];
};

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  return useMutation(
    [chatPath],
    async (data: { title: string }) => {
      const res = await axiosClient.post(chatPath, data);
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
      const res = await axiosClient.patch(chatPath, data);
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
      const res = await axiosClient.delete(`${chatPath}/${id}`);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([chatPath]);
      },
    }
  );
};

export const getMessages = async (chat_id: string) => {
  const res = await axiosClient.get(`${chatPath}/${chat_id}`);
  const messageList = res.data ?? [];
  return messageList as ResponseMessage[];
};

export const useGetMessage = (chat_id: string) => {
  return useQuery([chatPath, chat_id], async () => {
    return await getMessages(chat_id);
  });
};
