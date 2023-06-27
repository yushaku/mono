"use client";

import ListChats from "@/components/chats/listChats";
import { getChats } from "@/services/chat";
import getQueryClient from "@/utils/getQueryClient";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import React from "react";

const ChatPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-chats"], getChats);
  const dehydratedState = dehydrate(queryClient);

  console.log(dehydratedState);

  return (
    <Hydrate state={dehydratedState}>
      <ListChats />
    </Hydrate>
  );
};

export default ChatPage;
