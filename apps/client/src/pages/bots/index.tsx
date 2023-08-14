import { BotCard } from "@/components/bots/BotItem";
import { BotLayout } from "@/components/layout";
import { botPath, getBotList } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { Action } from "types";
import { Button } from "ui";

const Bots = () => {
  const router = useRouter();
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

      <Button
        onClick={() => router.push("/bots/create")}
        title="Create new bot"
        className="border rounded-xl w-1/5 h-12 flexCenter hover:bg-primaryColor hover:text-white"
      />
    </div>
  );
};

Bots.auth = { required: true };
Bots.Layout = BotLayout;

export default Bots;
