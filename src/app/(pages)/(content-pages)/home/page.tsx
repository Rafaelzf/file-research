"use client";
import { GoToPapers } from "@/components";

export default function Home() {
  return (
    <div>
      <header className="py-10">
        <GoToPapers />
      </header>

      <main className="flex flex-col  gap-6 container mx-auto py-10 ">
        HOME
      </main>
    </div>
  );
}
