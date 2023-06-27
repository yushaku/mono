import { getChats } from "@/services/chat";
import getQueryClient from "@/utils/getQueryClient";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import React from "react";

const ChatPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-chats"], getChats);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <div></div>
    </Hydrate>
  );
};

export default ChatPage;
