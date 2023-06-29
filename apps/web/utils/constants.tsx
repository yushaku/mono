import { ActionType } from "@/../../packages/types/src";
import {
  IconBot,
  IconChat,
  IconKnowledge,
  IconLink,
  IconSetting,
  IconUpload,
  IconWrite,
} from "ui";

export const topBar = [
  {
    title: "Chats",
    href: "/chats",
    icon: IconChat,
  },
  {
    title: "Knowledge",
    href: "/knowledge",
    icon: IconKnowledge,
  },
  {
    title: "Bots",
    href: "/bots",
    icon: IconBot,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: IconSetting,
  },
];

export const CreateDocBtn: {
  type: string;
  href: ActionType;
  desc: string;
  Icon: JSX.Element;
}[] = [
  {
    type: "Write",
    href: "TEXT",
    desc: "Write or paste your document",
    Icon: <IconWrite color="green" className="w-6 h-6" />,
  },
  {
    type: "Upload",
    href: "FILE",
    desc: "PDF, Word or Powerpoint file",
    Icon: <IconUpload color="orange" className="w-6 h-6" />,
  },
  {
    type: "Import Website",
    href: "WEBSITE",
    desc: "Webpage with text content",
    Icon: <IconLink color="#1377D3" className="w-6 h-6" />,
  },
];
