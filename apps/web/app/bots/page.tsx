import { BotCard } from "@/components/bots/BotItem";
import { useGetBots } from "@/services/bots.service";
import React from "react";
import { Action } from "types";

const Bots = async () => {
  const { data: botyList } = useGetBots();
  const handleAction = (type: Action, id: string) => {};

  return (
    <div>
      <ul>
        {botyList.map((bot) => {
          return (
            <BotCard
              key={bot.id}
              name={bot.name}
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
