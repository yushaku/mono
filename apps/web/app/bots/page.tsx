"use client";

import { BotCard } from "@/components/bots/BotItem";
import { botPath, getBotList } from "@/services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Action } from "types";

const Bots = () => {
  const { data: botyList } = useQuery({
    queryKey: [botPath],
    queryFn: () => getBotList(),
  });

  const handleAction = (type: Action, id: string) => {};

  return (
    <div>
      <ul>
        {botyList?.map((bot) => {
          return (
            <BotCard
              key={bot.id}
              title={bot.name}
              model={bot.model}
              href={`/${bot.id}`}
              created_at={bot.created_at}
              description={bot.description}
              onAction={(type) => handleAction(type, bot.id)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Bots;
