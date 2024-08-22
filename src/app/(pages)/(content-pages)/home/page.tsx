"use client";
import { HomeHeader } from "@/components";
import { useAction } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { ConvexError } from "convex/values";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const relevantPapers = useAction(api.semantic_scholar.getRelevantPapers);

  async function getRelevantPapers(searchTerm: string) {
    if (!searchTerm) return;
    setIsLoading(true);
    try {
      const papers = await relevantPapers({ searchTerm });

      toast({
        variant: "success",
        title: "File Uploaded",
        description: "Now everyone can view your file",
      });
      setIsLoading(false);
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Algo deu errado",
        description: error as string,
      });
      setIsLoading(false);
    }
  }

  return (
    <div>
      <header className="bg-gradient-to-t from-indigo-100 via-purple-100 to-pink-100 py-10">
        <HomeHeader getRelevantPapers={getRelevantPapers} />
      </header>

      {isLoading && (
        <div className="flex flex-col space-y-10 h-full mx-auto ">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      )}

      <main className="grid grid-cols-3 gap-6 container mx-auto py-10"></main>
    </div>
  );
}
