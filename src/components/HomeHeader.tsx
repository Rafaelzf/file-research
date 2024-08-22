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
    <div className="w-4/5 mx-auto">
    <div className="container mx-auto flex flex-col justify-center gap-8  min-h-30 ">
        <div>
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight ">
            Welcome to Find Research 👋
          </h1>
          <p>Aqui você pode buscar o tema que deseja</p>
        </div>
        <div>
          <Search
            search={search}
            results={results}
            setResults={setResults}
            getRelevantPapers={getRelevantPapers}
          />
        </div>
      </div>
    </div>
  );
}
