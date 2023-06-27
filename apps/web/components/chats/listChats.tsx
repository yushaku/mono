"use client";

import { getChats } from "@/services/chat";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function ListChats() {
  const [count, setCount] = React.useState(0);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["hydrate-users"],
    queryFn: () => getChats(),
  });

  return (
    <li style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 20,
          }}
        >
          {data.map((chat) => (
            <div
              key={chat.id}
              style={{ border: "1px solid #ccc", textAlign: "center" }}
            >
              <img
                src={`https://robohash.org/${chat.id}?set=set2&size=180x180`}
                alt={chat.title}
                style={{ height: 180, width: 180 }}
              />
              <h3>{chat.title}</h3>
            </div>
          ))}
        </div>
      ) : null}
    </li>
  );
}
