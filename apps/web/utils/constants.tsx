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

export type priceType = "Premium" | "Basic" | "Advanced";
export type PriceData = {
  type: priceType;
  description: string;
  cost: number;
  features: string[];
};

export const mocPricingData: PriceData[] = [
  {
    type: "Basic",
    description:
      "Designed for small businesses and start-ups looking to implement AI solutions on a smaller scale, our Starter Plan offers essential AI tools and services to help you get started.",
    cost: 29,
    features: [
      "2,500 GPT3.5 Queries Per Month",
      "10 Users",
      "10 Bots",
      "1,000 Documents",
    ],
  },
  {
    type: "Premium",
    description:
      "Ideal for growing businesses in need of more comprehensive AI solutions, our Professional Plan offers advanced AI tools and services to help you stay ahead of the competition.",
    cost: 99,
    features: [
      "1,000 GPT4 Queries or 10,000 GPT3.5 Queries Per Month",
      "25 Users",
      "50 Bots",
      "Embedded Chatbot",
      "Website Crawler",
      "1,000 Documents",
    ],
  },
  {
    type: "Advanced",
    description:
      "Ideal for deploying bots for multiple businesses and leveraging the latest AI models, our Advanced Plan offers AI tools and services to help you tackle any challenge.",
    cost: 249,
    features: [
      "2,500 GPT4 Queries or 25,000 GPT3.5 Queries Per Month",
      "100 Users",
      "100 Bots",
      "Embedded Chatbot",
      "Website Crawler",
      "25,000 Documents",
      "Customize Widget Appearance",
    ],
  },
];
