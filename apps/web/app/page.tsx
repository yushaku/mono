"use client";

import { fetchStreamData } from "@/services/chat";
import React, { ChangeEvent } from "react";
import { useRef } from "react";
import { useState } from "react";

let controller = null;

export default function Page() {
  controller = new AbortController();
  const signal = controller.signal;

  const [prompt, setPrompt] = useState("How to create React App");
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

  return (
    <div className="p-8 rounded-md">
      <h1 className="text-2xl text-primaryColor font-bold mb-6">
        Streaming OpenAI API Completions
      </h1>

      <div id="resultContainer" className="mt-4 h-48 overflow-y-auto">
        <p className="text-gray-500 text-sm mb-2">Generated Text</p>
        <p ref={resultRef} className="whitespace-pre-line"></p>
      </div>

      <textarea
        className="w-full px-4 py-2 rounded-md bg-gray-200 placeholder-gray-500 focus:outline-none mt-4"
        onChange={handleChange}
        placeholder="Enter prompt..."
        defaultValue={prompt}
      ></textarea>

      <div className="flex justify-center mt-4">
        <button className="w-1/2 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-900 focus:outline-none mr-2 disabled:cursor-not-allowed">
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
  );
}
