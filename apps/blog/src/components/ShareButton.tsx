"use client";

import React, { useEffect, useRef } from "react";
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
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

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
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const path = location.href;
  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);

  return (
    <div className="relative">
      <ul className="top-1/5 fixed left-0 z-20 flex flex-col gap-2 rounded-r-lg bg-white px-2 py-4 lg:left-10 lg:bg-transparent">
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

      {/* <div className="top-1/5 fixed right-0"></div> */}
      {/* <Bubble /> */}
    </div>
  );
};

export const Bubble = () => {
  const isDragging = useRef<boolean>(false);
  const position = useRef({ x: 150, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) {
      position.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="absolute h-12 w-12 rounded-full bg-blue-500 transition-all duration-300"
      style={{
        top: position.current.y,
        left: position.current.x,
      }}
      onMouseDown={handleMouseUp}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  );
};
