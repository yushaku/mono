"use client";

import { BotAnswer, UserQuestion } from "@/components/chats/UserQuestion";
import { fetchStreamData, useGetMessage } from "@/services/chat";
import { useFormik } from "formik";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  IconArrowDown,
  IconLoading,
  IconMicro,
  IconSend,
  IconSetting,
} from "ui";
import * as Yup from "yup";

let controller = null;

const ConversationPage = () => {
  const chat_id = usePathname().substring(7);
  const { data: messageList } = useGetMessage(chat_id);
  const [message, setMessage] = useState({ question: "", bot_answer: "" });

  controller = new AbortController();
  const signal = controller.signal;

  const endRef = useRef<null | HTMLDivElement>(null);
  const resultRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const {
    handleSubmit,
    handleReset,
    handleChange,
    isValid,
    isSubmitting,
    values,
  } = useFormik({
    initialValues: { prompt: "" },
    validationSchema: Yup.object().shape({ prompt: Yup.string() }),
    onSubmit: async (values) => {
      handleReset("prompt");
      setMessage({ question: values.prompt, bot_answer: "" });
      fetchStreamData(values.prompt, chat_id, signal, (msg: string) => {
        resultRef.current.innerText += msg;
      });
    },
  });

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section id="chat_section" className="relative h-full">
      <article className="mt-2 px-12 pb-12 mx-auto max-w-3xl">
        <div className="grid grid-cols-1 gap-4">
          {messageList?.map((el) => {
            return (
              <div key={el.id} className="text-grayColor">
                <UserQuestion question={el.question} />
                <BotAnswer answer={el.bot_answer} />
              </div>
            );
          })}

          {message.question ? (
            <div className="relative">
              <UserQuestion question={message.question} />
              <span className="absolute top-7 -left-10 w-7 h-7 rounded-full">
                <Image
                  alt="yushaku"
                  src="/bot.png"
                  width={35}
                  height={35}
                  loading="lazy"
                />
              </span>
              <span>
                <p ref={resultRef}></p>
              </span>
            </div>
          ) : null}
        </div>
      </article>

      <button
        onClick={scrollToBottom}
        className="fixed bottom-24 right-24 border p-3 rounded-full animate-bounce"
      >
        <IconArrowDown />
      </button>

      <article className="w-full max-w-3xl bg-white mx-auto shadow-xl border rounded-xl">
        <textarea
          name="prompt"
          value={values.prompt}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className="w-full p-3 h-24"
          placeholder="Ask Tigon..."
        ></textarea>

        <div ref={endRef} className="flex justify-between p-3">
          <div>
            <button className="p-1 border rounded-lg">
              <IconSetting className="w-5 h-5 stroke-dark" />
            </button>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="p-1 border rounded-lg">
              <IconMicro />
            </button>

            <button
              onClick={() => handleSubmit()}
              disabled={!isValid}
              className="px-8 py-1 border rounded-lg bg-primaryColor"
            >
              {isSubmitting ? (
                <IconLoading className="stroke-white animate-spin" />
              ) : (
                <IconSend color="white" />
              )}
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ConversationPage;
