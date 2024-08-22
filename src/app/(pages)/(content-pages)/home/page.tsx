"use client";
import { HomeHeader } from "@/components";
import { useAction } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { ConvexError } from "convex/values";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(undefined);
  const { toast } = useToast();
  const relevantPapers = useAction(api.semantic_scholar.getRelevantPapers);

  async function getRelevantPapers(searchTerm: string) {
    if (!searchTerm) return;
    setIsLoading(true);
    try {
      const papers = await relevantPapers({ searchTerm });
      console.log(papers);
      setResults(papers);
    

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
        description:"Abusca por papers não funcionou.",
      });
      setIsLoading(false);
    }
  }

  return (
    <div>
      <header className="bg-gradient-to-t from-indigo-100 via-purple-100 to-pink-100 py-10">
        <HomeHeader getRelevantPapers={getRelevantPapers} />
      </header>



      <main className="grid grid-row-3 gap-6 container mx-auto py-10 w-4/5">
      {isLoading && (
        <div className="flex flex-col space-y-5  ">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          
        </div>
      )}

      {!isLoading && results && results.length > 0 && (
        <>
          {results.map((result: any, index: number) => (

              <Card key={index}>
                <CardHeader>
                  <CardTitle>{result.title}</CardTitle>
                  {/* <CardDescription>{result.authors[0].name}</CardDescription> */}
                </CardHeader>
                <CardContent>
                  <p>{result.abstract}</p>
                </CardContent>
                <CardFooter>
                  <p>Author: {result.authors.map((author: any) =>( <span key={author.authorId}>{author.name}</span>))}</p>
                </CardFooter>
              </Card>
          
          ))}
        </>
      )}

      {!isLoading && results && results.length === 0 && (
        <p>Nenhum resultado encontrado</p>
      )}

      


      </main>
    </div>
  );
}
