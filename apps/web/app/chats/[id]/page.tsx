import { usePathname } from "next/navigation";
import React from "react";

const ConversationPage = () => {
  const pathName = usePathname();

  return <div>page</div>;
};

export default ConversationPage;
