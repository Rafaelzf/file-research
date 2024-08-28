"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getDetailsReferences } from "@/app/actions/papers";
import { useQuery } from "@tanstack/react-query";
import { PaperDetails } from "./types";
import { FileText, BellPlus, Scaling, MailOpen } from "lucide-react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Link from "next/link";
export default function DetailsReferences({ paperId }: { paperId: string }) {
  const { isPending, error, data } = useQuery({
    queryKey: ["getDetailsReferences"],
    queryFn: () => getDetailsReferences(paperId),
  });

  const references: PaperDetails[] = data?.data || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="scroll-m-20 border-slate-300 border-b pb-2 text-2xl font-semibold tracking-tight">
          References
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {isPending && (
          <div className="border border-violet-200 shadow rounded-md p-4  w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-400 h-20 w-20"></div>
              <div className="flex-1 space-y-6 py-2">
                <div className="h-6  bg-slate-400 rounded"></div>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-6  bg-slate-400 rounded col-span-2"></div>
                    <div className="h-6  bg-slate-400 rounded col-span-1"></div>
                  </div>
                  <div className="h-6 bg-slate-400 rounded"></div>
                  <div className="h-6 bg-slate-400 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {references.length > 0 && (
          <div className="flex flex-col justify-between gap-8">
            {references.map((reference) => {
              return (
                <div
                  key={reference.citedPaper.corpusId}
                  className="text-sm text-muted-foreground "
                >
                  <h3 className="flex items-center gap-6  ">
                    <div className="flex items-center gap-4">
                      <FileText />
                      <Link
                        href={`${reference.citedPaper.url}`}
                        target="_blank"
                        className="border-slate-300 text-slate-800 border-r pr-6 flex items-center gap-2"
                      >
                        {reference.citedPaper.title}{" "}
                        <Scaling height={16} width={16} />
                      </Link>
                    </div>

                    <div className=" border-slate-300 border-r  pr-6">
                      <Link
                        href={`/paper/${reference.citedPaper.paperId}`}
                        className="border-slate-300  hover:text-primary   flex items-center gap-2"
                      >
                        <MailOpen height={16} width={16} />
                        Read
                      </Link>
                    </div>
                    <div>
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2 p-0 h-fit hover:bg-transparent hover:text-primary"
                      >
                        <BellPlus height={16} width={16} />
                        See later
                      </Button>
                    </div>
                    {reference?.isInfluential && (
                      <div className=" border-slate-300 border-l  pl-6">
                        <Link
                          href={`/paper/${reference.citedPaper.paperId}`}
                          className="border-slate-300  hover:text-primary   flex items-center gap-2 semi-bold"
                        >
                          <strong className="semi-bold text-green-700">
                            ⭐️ Influential
                          </strong>{" "}
                        </Link>
                      </div>
                    )}
                  </h3>
                </div>
              );
            })}
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              An error has occurred, please try later.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
