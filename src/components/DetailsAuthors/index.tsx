"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDetailsAuthors } from "@/app/actions/papers";
import { useQuery } from "@tanstack/react-query";
import { Author } from "./types";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Badge } from "../ui/badge";

export default function DetailsAuthors({ paperId }: { paperId: string }) {
  const { isPending, error, data } = useQuery({
    queryKey: ["getDetailsAuthors"],
    queryFn: () => getDetailsAuthors(paperId),
  });

  const authors: Author[] = data?.data || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="scroll-m-20 border-slate-300 border-b pb-2 text-2xl font-semibold tracking-tight">
          Authors ({authors.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 w-[330px] sm:w-full">
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

        {authors.length === 0 && !isPending && (
          <Alert>
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Message</AlertTitle>
            <AlertDescription>No authors found</AlertDescription>
          </Alert>
        )}

        {authors.length > 0 && (
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {authors.map((author) => {
              return (
                <SwiperSlide
                  key={author.authorId}
                  className="flex flex-col justify-between gap-6 cursor-grab"
                >
                  <h2 className="border-slate-300 border-b bold">
                    {author.name}
                  </h2>
                  <ul className="text-sm flex flex-col justify-between gap-6">
                    <li className="flex gap-3 text-muted-foreground">
                      <span>
                        {" "}
                        Citations: <Badge>{author.citationCount}</Badge>
                      </span>
                      |
                      <span>
                        {" "}
                        Papers: <Badge>{author.papers.length}</Badge>
                      </span>
                    </li>
                    <li className="text-center">
                      <Link
                        href={author.url}
                        target="_blank"
                        className="flex gap-3 w-full justify-center text-sm text-muted-foreground"
                      >
                        View page
                      </Link>
                    </li>
                  </ul>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        {/* {citations.length > 0 && (
          <div className="flex flex-col justify-between gap-8">
            {citations.map((citation) => {
              return (
                <div
                  key={citation.citingPaper.paperId}
                  className="text-sm text-muted-foreground "
                >
                  <h3 className="flex items-center gap-6  ">
                    <div className="flex items-center gap-4">
                      <FileText />
                      <Link
                        href={`${citation.citingPaper.url}`}
                        target="_blank"
                        className="border-slate-300 text-slate-800 border-r pr-6 flex items-center gap-2"
                      >
                        {citation.citingPaper.title}
                        <Scaling height={16} width={16} />
                      </Link>
                    </div>

                    <div className=" border-slate-300 border-r  pr-6">
                      <Link
                        href={`/paper/${citation.citingPaper.paperId}`}
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
                  </h3>
                </div>
              );
            })}
          </div>
        )} */}

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
