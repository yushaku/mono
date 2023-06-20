"use client";

import { Warper } from "@/components";
import { askGpt } from "@/services/chat";
import React, { ChangeEvent } from "react";
import { useRef } from "react";
import { useState } from "react";

let controller = null; // Store the AbortController instance

export default function Page() {
  controller = new AbortController();
  const signal = controller.signal;

  const [promt, setPrompt] = useState("");
  const resultRef = useRef<HTMLParagraphElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleStop = () => {
    if (controller) {
      controller.abort();
      controller = null;
    }
  };

  const handleSend = async () => {
    const stream = await askGpt(promt, signal);
  };

  return (
    <Warper>
      <div className="lg:w-1/2 2xl:w-1/3 p-8 rounded-md bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">
          Streaming OpenAI API Completions in JavaScript
        </h1>

        <div id="resultContainer" className="mt-4 h-48 overflow-y-auto">
          <p className="text-gray-500 text-sm mb-2">Generated Text</p>
          <p ref={resultRef} className="whitespace-pre-line"></p>
        </div>

        <textarea
          className="w-full px-4 py-2 rounded-md bg-gray-200 placeholder-gray-500 focus:outline-none mt-4"
          onChange={handleChange}
          placeholder="Enter prompt..."
        />

        <div className="flex justify-center mt-4">
          <button
            onClick={handleSend}
            className="w-1/2 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-900 focus:outline-none mr-2 disabled:cursor-not-allowed"
          >
            Generate
          </button>
          <button
            onClick={handleStop}
            className="w-1/2 px-4 py-2 rounded-md border text-gray-500 ml-2 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            Stop
          </button>
        </div>
      </div>
    </Warper>
  );
}
