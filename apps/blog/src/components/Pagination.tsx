"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const Pagination = ({
  id,
  hasMore,
}: {
  id: string;
  hasMore: boolean;
}) => {
  const router = useRouter();

  return (
    <section className="mt-5 flex gap-5 justify-center flex-1">
      <button
        className="dark:hover:text-secondColor"
        onClick={() => router.back()}
      >
        Previous page
      </button>

      <Link
        className="dark:hover:text-secondColor"
        href={`?page=${id}&limit=10`}
      >
        {hasMore ?? "Next page"}
      </Link>
    </section>
  );
};
