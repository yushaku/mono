import ReactMarkdown from "@/components/Markdown";
import Image from "next/image";
import React from "react";

export const UserQuestion = ({ question }: { question: string }) => {
  return (
    <p className="relative my-4">
      <span className="absolute -top-1 -left-10 w-7 h-7 rounded-full">
        <Image
          alt="yushaku"
          src="/man.png"
          width={35}
          height={35}
          loading="lazy"
        />
      </span>
      <span>{question}</span>
    </p>
  );
};

export const BotAnswer = ({ answer }: { answer: string }) => {
  return (
    <div className="relative">
      <span className="absolute top-2 -left-10 w-7 h-7 rounded-full">
        <Image
          alt="yushaku"
          src="/bot.png"
          width={35}
          height={35}
          loading="lazy"
        />
      </span>
      <span>
        <ReactMarkdown>{answer}</ReactMarkdown>
      </span>
    </div>
  );
};
