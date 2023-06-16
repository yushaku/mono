"use client";

import React from "react";
import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinIcon,
  LinkedinShareButton,
  FacebookIcon,
  FacebookShareButton,
} from "next-share";
import { IconCopy } from "ui";
import { toast } from "react-hot-toast";

export const TwitterShareBtn = ({ url }: { url: string }) => {
  return (
    <TwitterShareButton
      url={url}
      title={"next-share is a social share buttons for your next React apps."}
    >
      <TwitterIcon size={32} round />
    </TwitterShareButton>
  );
};

export const LinkedinShareBtn = ({
  url,
  title,
}: {
  url: string;
  title: string;
}) => {
  return (
    <LinkedinShareButton url={url} title={title}>
      <LinkedinIcon size={32} round />
    </LinkedinShareButton>
  );
};

export const FaceBookShareBtn = ({ url }: { url: string }) => {
  return (
    <FacebookShareButton
      url={url}
      quote={"next-share is a social share buttons for your next React apps."}
      hashtag={"#yushaku"}
    >
      <FacebookIcon size={32} round />
    </FacebookShareButton>
  );
};

export const ProviderShareBlock = ({
  path = location.href,
  title,
  children,
}: {
  path?: string;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <ul className="fixed left-10 top-1/3 ml-2 flex gap-2 lg:flex-col">
        <li>
          <FacebookShareButton url={path} quote={title} hashtag={"#yushaku"}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </li>
        <li>
          <LinkedinShareButton url={path} title={title}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </li>
        <li>
          <TwitterShareButton url={path} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </li>
        <li
          className="flexCenter h-8 w-8 cursor-pointer rounded-full border bg-green-50"
          onClick={() => {
            navigator.clipboard.writeText(path);
            toast.success("Copied!");
          }}
        >
          <IconCopy width="28px" height="28px" />
        </li>
      </ul>

      {children}
    </div>
  );
};
