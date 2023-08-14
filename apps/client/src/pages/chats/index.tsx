import { ChatLayout } from "@/components/layout";
import { IconArrowRight } from "ui";

const ChatPage = () => {
  return (
    <div className="flexCenter h-[87dvh]">
      <IconArrowRight className="w-8 h-8 stroke-primaryColor dark:stroke-secondColor animate-shake animate-infinite animate-duration-[1500ms] animate-delay-300" />
      <h2 className="text-3xl ml-7 text-primaryColor dark:text-secondColor">
        Select a conversation
      </h2>
    </div>
  );
};

ChatPage.auth = { required: true };
ChatPage.Layout = ChatLayout;

export default ChatPage;
