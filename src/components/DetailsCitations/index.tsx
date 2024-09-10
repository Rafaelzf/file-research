"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getDetailsCitations } from "@/app/actions/papers";
import { useQuery as tanstackUseQuery } from "@tanstack/react-query";
import { PaperContext } from "./types";
import { FileText, BellPlus, Scaling, MailOpen } from "lucide-react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
export default function DetailsCitations({ paperId }: { paperId: string }) {
  const { user } = useUser();
  const updateDataUser: any = useMutation(api.users.updateDataUser);

  const { isPending, error, data } = tanstackUseQuery({
    queryKey: ["getDetailsCitations"],
    queryFn: () => getDetailsCitations(paperId),
  });

  const infoUser = useQuery(api.users.getInfoUser, {
    tokenIdentifier: user?.id || "",
  });

  const handleSeelater = async (paperId: string) => {
    if (!paperId || !user?.id) return;
    updateDataUser({ tokenIdentifier: user?.id, seeLater: paperId });
  };

  const citations: PaperContext[] = data?.data || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="scroll-m-20 border-slate-300 border-b pb-2 text-2xl font-semibold tracking-tight">
          Citations
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

        {citations.length === 0 && !isPending && (
          <Alert>
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Message</AlertTitle>
            <AlertDescription>No citations found</AlertDescription>
          </Alert>
        )}

        {citations.length > 0 && (
          <>
            <Accordion type="single" collapsible>
              {citations.map((item, index) => (
                <AccordionItem
                  key={item.citingPaper.corpusId}
                  value={`item-${index}`}
                >
                  <AccordionTrigger className="flex items-center gap-2 justify-start">
                    <FileText className="hidden sm:block" />{" "}
                    <span className="text-left">{item.citingPaper.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="flex items-center gap-3">
                    <div className=" border-slate-300 border-r  pr-6">
                      <Link
                        href={`/paper/${item.citingPaper.paperId}`}
                        className="border-slate-300  hover:text-primary   flex items-center gap-2"
                      >
                        <MailOpen height={16} width={16} />
                        Read
                      </Link>
                    </div>
                    <div>
                      {!infoUser?.seeLater?.includes(
                        item.citingPaper.paperId
                      ) && (
                        <Button
                          variant="ghost"
                          className="flex items-center gap-2 p-0 h-fit hover:bg-transparent hover:text-primary"
                          onClick={() =>
                            handleSeelater(item.citingPaper.paperId)
                          }
                        >
                          <BellPlus height={16} width={16} />
                          See later
                        </Button>
                      )}
                    </div>
                    {item?.isInfluential && (
                      <div className=" border-slate-300 border-l  pl-6">
                        <Link
                          href={`/paper/${item.citingPaper.paperId}`}
                          className="border-slate-300  hover:text-primary   flex items-center gap-2 semi-bold"
                        >
                          <strong className="semi-bold text-green-700">
                            ⭐️ Influential
                          </strong>{" "}
                        </Link>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </>
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
