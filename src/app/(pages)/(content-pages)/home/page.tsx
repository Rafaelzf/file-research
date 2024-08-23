"use client";
import { Fields, HomeHeader } from "@/components";
import { api } from "../../../../../convex/_generated/api";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "@tanstack/react-query";
import { useAction } from "convex/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { truncateText } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

import styles from "./home.module.css";
import { Button } from "@/components/ui/button";
import { Pin, Glasses, Rocket, TriangleAlert } from "lucide-react";
import { Paper, SearchResponse } from "./types";

export default function Home() {
  const [total, setTotal] = useState<number | undefined>();
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const [papers, setPapers] = useState<Paper[]>([]);
  const relevantPapers = useAction(api.semantic_scholar.getRelevantPapers);

  const { mutate, isIdle, isPending, isSuccess, error } = useMutation({
    mutationFn: (term: string) => relevantPapers({ searchTerm: term, page }),
    onSuccess: (response: SearchResponse) => {
      const { data, total } = response;
      console.log("Papers obtidos com sucesso:", data);
      setPapers((prevPapers) => [...prevPapers, ...data]);
      setTotal(total);
    },
    onError: (error) => {
      setTerm("");
      setPage(1);
      setPapers([]);
      console.error("Erro ao obter papers:", error);
    },
  });

  return (
    <div>
      <header className="py-10">
        <HomeHeader
          getRelevantPapers={mutate}
          setTerm={setTerm}
          setPapers={setPapers}
        />
      </header>

      <main className="flex flex-col  gap-6 container mx-auto py-10 ">
        {isIdle && (
          <Image
            src="/undraw_connected_world_wuay.svg"
            width={670}
            height={150}
            alt="Picture of the author"
            className="mx-auto "
          />
        )}
        {isPending && (
          <Image
            src="/undraw_connected_world_wuay.svg"
            width={670}
            height={150}
            alt="Picture of the author"
            className="mx-auto animate-pulse"
          />
        )}

        {isSuccess && (
          <>
            {total && (
              <Alert className="flex justify-between items-center">
                <AlertTitle className="flex items-center gap-4">
                  <Rocket className="h-4 w-4 text-primary" />
                  <span className="flex items-center gap-3 text-zinc-700">
                    <span className="text-blue-700 font-semibold">
                      {papers.length}
                    </span>{" "}
                    relevant papers from a total of
                    <span className="text-blue-700 font-semibold">{total}</span>
                  </span>
                </AlertTitle>
              </Alert>
            )}

            {papers.map((paper: any, index: number) => (
              <Card key={index} className="border border-sky-500">
                <CardHeader>
                  <CardTitle className="leading-6">{paper?.title}</CardTitle>
                  {paper?.authors?.length && (
                    <CardDescription>
                      <ul className={`flex text-xs ${styles.authorslist}`}>
                        {paper?.authors.map((author: any, index: number) => {
                          if (index === 6)
                            return (
                              <li key={author?.authorId}>
                                ... more {paper?.authors.length - 7}
                              </li>
                            );
                          if (index > 5) return;
                          return <li key={author?.authorId}>{author.name}</li>;
                        })}
                      </ul>
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="p-6 bg-violet-100">
                  <p>
                    {paper?.tldr?.text || truncateText(paper.abstract, 370) || (
                      <span className="text-slate-800">
                        No content available
                      </span>
                    )}
                  </p>
                </CardContent>
                <CardFooter className="p-4 flex justify-between items-center">
                  <ul
                    className={`text-xs text-zinc-700 flex h-5 items-center  ${styles.footerlist}`}
                  >
                    {paper?.year && <li className="flex">{paper.year}</li>}
                    {paper?.citationCount && (
                      <li className="flex justify-between items-center gap-3">
                        citations <Badge>{paper.citationCount}</Badge>
                      </li>
                    )}
                    {paper?.fieldsOfStudy?.length && (
                      <Fields fieldsOfStudy={paper.fieldsOfStudy} />
                    )}

                    {paper?.publicationTypes?.length && (
                      <Fields fieldsOfStudy={paper.publicationTypes} />
                    )}
                  </ul>

                  <ul className={`flex h-5 items-center`}>
                    <li>
                      <Button
                        variant="outline"
                        className="flex items-center justify-between gap-1 p-0 px-3 border-0 bg-transparent shadow-transparent hover:bg-transparent hover: group"
                      >
                        <Pin
                          className="text-primary transition-all duration-300 ease-in-out fill-none group-hover:fill-current"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        />
                        <span className="text-primary text-base">Save</span>
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="outline"
                        className="flex items-center justify-between gap-1 p-0 px-3 border-0 bg-transparent shadow-transparent hover:bg-transparent hover: group"
                      >
                        <Glasses
                          className="text-primary transition-all duration-300 ease-in-out fill-none group-hover:fill-current"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        />
                        <span className="text-primary text-base">See</span>
                      </Button>
                    </li>
                  </ul>
                </CardFooter>
              </Card>
            ))}
            <Button
              className="h-10"
              onClick={() => {
                setPage((prevPage) => prevPage + 1);
                mutate(term);
              }}
              disabled={isPending && total && papers.length >= total}
            >
              See more
            </Button>
          </>
        )}

        {error && (
          <main className="flex flex-col justify-center pt-0 text-lg">
            <h4 className="scroll-m-20 text-xl text-primary font-semibold tracking-tight text-center mb-10">
              Algo deu errado! tente novamente
              <Image
                src="/undraw_curved-underline.svg"
                width={100}
                height={100}
                alt="Picture of the author"
                className="mx-auto mt-3"
              />
            </h4>

            <Image
              src="/undraw_notify_re_65on.svg"
              width={670}
              height={150}
              alt="Picture of the author"
              className="mx-auto "
            />
          </main>
        )}
      </main>
    </div>
  );
}
