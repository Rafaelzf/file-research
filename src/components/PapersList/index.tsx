"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import styles from "./papers.module.css";
import { truncateText } from "@/lib/utils";
import { Badge } from "../ui/badge";
import Fields from "../Fields";
import { Button } from "../ui/button";
import { Glasses, Pin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Paper } from "@/app/(pages)/(content-pages)/(inter-pages)/papers/[...query]/types";
export function PapersList({ papers }: { papers: Paper[] }) {
  const [localPapers, setLocalPapers] = useState<Paper[]>(papers);

  useEffect(() => {
    setLocalPapers((prev) => {
      const newPapers = papers.filter(
        (paper) => !prev.some((p) => p.paperId === paper.paperId)
      );
      return [...prev, ...newPapers];
    });
  }, [papers]);

  return (
    <>
      {localPapers &&
        localPapers.map((paper: Paper, index: number) => (
          <Card key={index} className="border border-sky-500">
            <CardHeader>
              <CardTitle className="leading-6">{paper?.title}</CardTitle>
              {paper?.authors?.length && (
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
              )}
            </CardHeader>
            <CardContent className="p-6 bg-violet-100">
              <p>
                {paper?.tldr?.text || truncateText(paper?.abstract, 370) || (
                  <span className="text-slate-800">No content available</span>
                )}
              </p>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
              <ul
                className={`text-xs text-zinc-700 flex h-5 items-center  ${styles.footerlist}`}
              >
                {paper?.year && <li>{paper.year}</li>}
                {paper?.citationCount && (
                  <li className="gap-3">
                    citations <Badge>{paper?.citationCount}</Badge>
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
                  <Link
                    href={`/paper/${paper?.paperId}`}
                    className="flex items-center justify-between gap-1 p-0 px-3 border-0 bg-transparent shadow-transparent hover:bg-transparent hover: group"
                  >
                    <Glasses
                      className="text-primary transition-all duration-300 ease-in-out fill-none group-hover:fill-current"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    />
                    <span className="text-primary text-base">See</span>
                  </Link>
                </li>
              </ul>
            </CardFooter>
          </Card>
        ))}
    </>
  );
}
