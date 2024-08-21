"use client";
import { HomeHeader } from "@/components";
import { useAction } from "convex/react";

import { useState } from "react";
import { api } from "../../../../../convex/_generated/api";

export default function Home() {
  const [term, setTerm] = useState("");
  const getSuggestions = useAction(api.semantic_scholar.getPapers);

  console.log(getSuggestions);

  return (
    <div>
      <header className="bg-gradient-to-t from-indigo-100 via-purple-100 to-pink-100 py-10">
        <HomeHeader />
      </header>

      <main className="grid grid-cols-3 gap-6 container mx-auto py-10"></main>
    </div>
  );
}
