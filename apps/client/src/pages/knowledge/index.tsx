import { CrawlWebsiteForm } from "@/components/knowledge/CrawlWebsite";
import { FileDropZone } from "@/components/knowledge/FileDropZone";
import { TextEditor } from "@/components/knowledge/TextEdittor";
import { KLLayout } from "@/components/layout/KLlayout";
import { useCreateContent, useGetProjects } from "@/services";
import { CreateDocBtn } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import { ActionType, UpdateProjectDto as Project } from "types";
import { AutocompleteInput } from "ui";

const Knowledge = () => {
  const [action, setAction] = useState<ActionType>("FILE");
  const [project, setProject] = useState<Project>({ title: "", id: "" });

  const { mutate: createContent } = useCreateContent();
  const { data: projectList } = useGetProjects();

  useEffect(() => {
    const firstOne = projectList?.shift();
    if (firstOne) {
      setProject(firstOne);
    }
  }, [projectList]);

  const handleCrawlWebsite = async (url: string) => {
    console.log(url);
  };

  const handleCreateFile = (title: string, text: string) => {
    createContent({
      text,
      title,
      type: "TEXT",
      knowledge_id: project.id,
    });
  };

  const handleUpload = (url: string, title: string) => {
    createContent({
      title,
      type: "FILE",
      file_link: url,
      knowledge_id: project.id,
    });
  };

  return (
    <section className="h-[87dvh] overflow-auto">
      <article className="mt-4 text-center">
        <h4 className="text-xl font-semibold">Create Documents</h4>
        <p className="text-grayColor">
          You can create a new document in this folder by writing, uploading an
          existing document or importing a webpage.
        </p>

        <ul className="flex items-center justify-evenly flex-wrap gap-8 mt-8">
          {CreateDocBtn.map(({ type, desc, href, Icon }, index) => {
            const styleSelected =
              href === action ? "border shadow-lg -top-3" : "top-1";

            return (
              <li
                key={index}
                onClick={() => setAction(href)}
                className="group cursor-pointer relative w-1/4 min-w-[250px] px-6 pt-12 pb-2 rounded-xl text-center shadow-lg hover:shadow-xl animationShow"
              >
                <span
                  className={`${styleSelected} absolute group-hover:border group-hover:shadow-lg group-hover:-top-3 right-1/2 p-3 m-2 rounded-full translate-x-1/2 animationShow`}
                >
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
        <AutocompleteInput<Project>
          className="md:w-1/2 mt-12"
          title="Select Project"
          selected={project}
          setSelected={setProject}
          rangeValue={projectList ?? []}
        />

        {action === "TEXT" ? (
          <TextEditor
            onCreate={(title: string, text: string) =>
              handleCreateFile(title, text)
            }
          />
        ) : null}

        {action === "FILE" ? (
          <FileDropZone
            onSave={(url: string, title: string) => handleUpload(url, title)}
          />
        ) : null}

        {action === "WEBSITE" ? (
          <CrawlWebsiteForm
            onCrawlWebsite={(link: string) => {
              handleCrawlWebsite(link);
            }}
          />
        ) : null}
      </article>
    </section>
  );
};

Knowledge.auth = { required: true };
Knowledge.Layout = KLLayout;

export default Knowledge;
