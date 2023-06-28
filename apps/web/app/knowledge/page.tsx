"use client";

import { CrawlWebsiteForm } from "@/components/knowledge/CrawlWebsite";
import { FileDropZone } from "@/components/knowledge/FileDropZone";
import { TextEditor } from "@/components/knowledge/TextEdittor";
import { CreateDocBtn } from "@/utils/constants";
import React, { useState } from "react";
import { ActionType } from "types";

const Knowledge = () => {
  const [action, setAction] = useState<ActionType>("UPLOAD");

  const handleCrawlWebsite = async (url: string) => {
    console.log(url);
  };

  const handleCreateFile = (title: string, text: string) => {
    console.log({ title, text });
  };

  const handleUpload = (url: string, title: string) => {
    console.log({ url, title });
  };

  return (
    <section className="h-[87dvh] overflow-auto">
      <article className="mt-4 text-center">
        <h4 className="text-xl font-semibold">Create Documents</h4>
        <p className="text-grayColor">
          You can create a new document in this folder by writing, uploading an
          existing document or importing a webpage.
        </p>

        <ul className="flex items-center justify-evenly flex-wrap mt-8">
          {CreateDocBtn.map(({ type, desc, href, Icon }, index) => {
            return (
              <li
                key={index}
                onClick={() => setAction(href)}
                className="group cursor-pointer relative w-1/4 px-6 pt-12 pb-2 rounded-xl text-center shadow-lg hover:shadow-xl animationShow"
              >
                <span className="absolute group-hover:border group-hover:shadow-lg group-hover:-top-3 top-1 right-1/2 p-3 m-2 rounded-full translate-x-1/2 animationShow">
                  {Icon}
                </span>
                <h5 className="text-primaryColor text-lg mt-2 group-hover:font-semibold animationShow">
                  {type}
                </h5>
                <p className="text-grayColor">{desc}</p>
              </li>
            );
          })}
        </ul>
      </article>

      <article>
        {action === "WRITE" ? (
          <TextEditor
            onCreate={(title: string, text: string) =>
              handleCreateFile(title, text)
            }
          />
        ) : null}

        {action === "UPLOAD" ? (
          <FileDropZone
            onSave={(url: string, title: string) => handleUpload(url, title)}
          />
        ) : null}
      </article>

      {action === "CRAWL" ? (
        <CrawlWebsiteForm
          onCrawlWebsite={(link: string) => {
            handleCrawlWebsite(link);
          }}
        />
      ) : null}
    </section>
  );
};

export default Knowledge;
