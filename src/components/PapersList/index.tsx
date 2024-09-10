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

import { useEffect, useState } from "react";
import { Paper } from "@/app/(pages)/(content-pages)/(inter-pages)/papers/[...query]/types";
import PaperActions from "../PaperActions";

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
      {localPapers.length > 0 &&
        localPapers.map((paper: Paper, index: number) => (
          <Card key={index} className="border border-sky-500">
            <CardHeader>
              <CardTitle className="leading-6 text-sm sm:text-base mb-5 sm:mb-0">
                {paper?.title}
              </CardTitle>
              {paper?.authors?.length > 0 && (
                <ul
                  className={`flex text-xs ${styles.authorslist} flex-wrap gap-2 sm:gap-0 `}
                >
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
            <CardContent className="p-6 bg-violet-100 text-sm sm:text-base">
              <p>
                {paper?.tldr?.text || truncateText(paper?.abstract, 370) || (
                  <span className="text-slate-800">No content available</span>
                )}
              </p>
            </CardContent>
            <CardFooter className="p-4 flex flex-col gap-5 justify-start items-start flex-wrap">
              <ul
                className={`text-xs text-zinc-700 flex justify-start  gap-3 sm:gap-4  items-center  ${styles.footerlist} flex-wrap`}
              >
                {paper?.year && <li>{paper.year}</li>}
                {paper?.citationCount && (
                  <li className="gap-3">
                    citations <Badge>{paper?.citationCount}</Badge>
                  </li>
                )}
                {paper?.fieldsOfStudy?.length > 0 && (
                  <Fields fieldsOfStudy={paper.fieldsOfStudy} />
                )}

                {paper?.publicationTypes?.length > 0 && (
                  <Fields fieldsOfStudy={paper.publicationTypes} />
                )}
              </ul>

              <PaperActions paperId={paper.paperId} />
            </CardFooter>
          </Card>
        ))}
    </>
  );
}
