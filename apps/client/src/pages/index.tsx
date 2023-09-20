import ChatPage from "./chats";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/chats");
  }, []);

  return <ChatPage />;
}

Home.auth = { required: true };
