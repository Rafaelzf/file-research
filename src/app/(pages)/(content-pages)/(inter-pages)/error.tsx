"use client";
import { ErrorComponent } from "@/components";

export default function Error() {
  return (
    <>
      <main className="flex flex-col justify-center items-center text-lg pt-16">
        <ErrorComponent />
      </main>
    </>
  );
}
