"use client";

import { Loader } from "@/components";

export default function Loading() {
  return (
    <main className="flex flex-col  gap-6 container mx-auto py-10 ">
      <Loader />
    </main>
  );
}
