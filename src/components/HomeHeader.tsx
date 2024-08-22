"use client";
import Search from "./Search";
import { useAction } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

export default function HomeHeader({
  getRelevantPapers,
}: {
  getRelevantPapers(searchTerm: string): Promise<void>;
}) {
  const [results, setResults] = useState<string[]>([]);
  const autocomplete = useAction(api.semantic_scholar.autocomplete);

  const search = async (term: string) => {
    if (!term) {
      setResults([]);
      return;
    }

    const responseAutoComplete = await autocomplete({ query: term });

    const results = responseAutoComplete
      ? responseAutoComplete.map((names: any) => names.title)
      : [];

    const filteredResults = results.filter((item: any) =>
      item.toLowerCase().includes(term.toLowerCase())
    );

    setResults(filteredResults);
  };

  return (
    <div className="container mx-auto flex flex-col justify-center gap-8  min-h-40 ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome to Find Research 👋
      </h1>

      <div>
        <label>Aqui você pode buscar o tema que deseja</label>
        <Search
          search={search}
          results={results}
          setResults={setResults}
          getRelevantPapers={getRelevantPapers}
        />
      </div>
    </div>
  );
}
