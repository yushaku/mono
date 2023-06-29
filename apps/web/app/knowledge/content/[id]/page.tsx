"use client";

import { IconArrowRight } from "@/../../packages/ui";
import { contentPath, getContentDetail } from "@/services";
import { useQuery } from "@tanstack/react-query";
import parse from "html-react-parser";
import moment from "moment";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const ContentPage = () => {
  const id = usePathname().substring(19);
  const router = useRouter();
  const { data: content, isLoading } = useQuery({
    queryKey: [contentPath, id],
    queryFn: () => getContentDetail(id),
  });

  if (isLoading) return <div></div>;

  return (
    <article className="my-8">
      <h2
        className="text-primaryColor text-xl font-semibold mb-2 flex cursor-pointer items-center gap-2"
        onClick={() => router.back()}
      >
        <IconArrowRight className="stroke-primaryColor w-5 h-5" />
        {content.title}
      </h2>

      <div className="text-grayColor text-sm">
        {content.is_trained ? (
          <span className="px-3 rounded-xl bg-green-200/30 text-green-400">
            trained
          </span>
        ) : (
          <span className="px-3 rounded-xl bg-yellow-200/50 text-orange-400">
            not trained
          </span>
        )}
        <time className="ml-4">{moment(content.created_at).format("LL")}</time>
      </div>

      <div className="mt-8">{parse(content?.text ?? "")}</div>
    </article>
  );
};

export default ContentPage;
