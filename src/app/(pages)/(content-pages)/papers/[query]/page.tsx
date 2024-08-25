import { getPapers } from "@/app/actions/papers";
import { SearchResponse } from "./types";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Glasses, Pin, Rocket } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import styles from "./papers.module.css";
import { truncateText } from "@/lib/utils";
import { Fields } from "@/components";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
export default async function Papers({
  params,
}: {
  params: { query: string; page: string };
}) {
  const response: SearchResponse = await getPapers(params.query, params.page);

  if (!response) return null;

  const { data: papers, total } = response;

  return (
    <main className="flex flex-col  gap-6 container mx-auto py-10 ">
      {total !== undefined && (
        <Alert className="flex justify-between items-center">
          <AlertTitle className="flex items-center gap-4">
            <Rocket className="h-4 w-4 text-primary" />
            <span className="flex items-center gap-3 text-zinc-700">
              <span className="text-blue-700 font-semibold">
                {papers?.length ? papers.length : 0}
              </span>{" "}
              relevant papers from a total of
              <span className="text-blue-700 font-semibold">{total}</span>
            </span>
          </AlertTitle>
        </Alert>
      )}

      {papers &&
        papers.map((paper: any, index: number) => (
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
                    href={`/paper/${paper?.id}`}
                    className="flex items-center justify-between gap-1 p-0 px-3 border-0 bg-transparent shadow-transparent hover:bg-transparent hover: group"
                  >
                    <Glasses
                      className="text-primary transition-all duration-300 ease-in-out fill-none group-hover:fill-current"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    />
                    <span className="text-primary text-base">
                      See {paper?.id}
                    </span>
                  </Link>
                </li>
              </ul>
            </CardFooter>
          </Card>
        ))}
      {total !== 0 && <Button className="h-10">See more</Button>}
      {total === 0 && <p>Sua Busca não retornou nada. BIGA</p>}
    </main>
  );
}
