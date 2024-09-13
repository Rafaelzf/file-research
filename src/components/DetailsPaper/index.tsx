"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { DetailPaper } from "@/app/(pages)/(content-pages)/(inter-pages)/paper/[...paperId]/types";
import { formatDateToBrazilian } from "@/lib/utils";
import Link from "next/link";
import {
  BookOpenText,
  CalendarDays,
  Scaling,
  Users,
  Newspaper,
  Info,
  ArrowUpRight,
  Lock,
  StarHalf,
  Star,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { api } from "../../../convex/_generated/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LinkCategories from "../LinkCategories";
import { useRouter } from "next/navigation";

export default function DetailPaperPage({
  detailPaper,
}: {
  detailPaper: DetailPaper;
}) {
  const { user } = useUser();
  const router = useRouter();
  const updateDataUser: any = useMutation(api.users.updateDataUser);
  const unfavorite: any = useMutation(api.users.unfavoritePaper);

  const infoUser = useQuery(api.users.getInfoUser, {
    tokenIdentifier: user ? user.id : "",
  });

  const handleSaveFavorites = async (paperId: string) => {
    if (!user) {
      router.push("/sign-in");
    }
    if (!paperId || !user?.id) return;
    updateDataUser({ tokenIdentifier: user?.id, favorites: paperId });
  };

  const handleUnSaveFavorites = async (paperId: string) => {
    if (!paperId || !user?.id) return;
    unfavorite({ tokenIdentifier: user?.id, paperId: paperId });
  };
  return (
    <>
      <Card className="flex flex-wrap md:flex-nowrap justify-between gap-3 ">
        <div className="md:w-9/12 w-full flex flex-col">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-slate-300 border-b pb-4 sm:pb-2 mb-5 sm:mb-0">
              <CardTitle className="scroll-m-20  leading-8 sm:leading-5  sm:text-1xl font-semibold tracking-tight">
                {detailPaper.title}
              </CardTitle>

              <LinkCategories
                library={infoUser?.library || []}
                paperId={detailPaper.paperId}
                tokenIdentifier={infoUser?.tokenIdentifier}
              />
            </div>

            <div className="flex justify-between items-center gap-4 flex-wrap">
              {detailPaper.authors.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <Users />
                  <ul className="flex items-center gap-2 flex-wrap">
                    {detailPaper.authors.map((author, _) => {
                      return (
                        <li
                          key={author.authorId}
                          className="text-sm text-muted-foreground border-slate-300 border-r last:border-none pr-2 flex-wrap"
                        >
                          {author?.url ? (
                            <Link
                              href={author?.url}
                              target="_blank"
                              className="flex items-center gap-1"
                            >
                              <span className="whitespace-nowrap">
                                {" "}
                                {author.name}
                              </span>
                              <ArrowUpRight height={16} width={16} />
                            </Link>
                          ) : (
                            <span className="whitespace-nowrap">
                              {" "}
                              {author.name}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              <div>
                {detailPaper?.venue && (
                  <>
                    {detailPaper.publicationVenue?.url ? (
                      <Link
                        href={detailPaper?.publicationVenue?.url}
                        target="_blank"
                        className="italic text-xs sm:text-sm flex items-center gap-2 text-muted-foreground mt-5 "
                      >
                        <BookOpenText />
                        {detailPaper.venue}
                      </Link>
                    ) : (
                      <span className="italic ttext-xs sm:text-sm flex items-center gap-2 text-muted-foreground">
                        <BookOpenText />
                        {detailPaper.venue}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div>
              <h2 className="font-semibold">Abstract</h2>
              {detailPaper.abstract ? (
                <p className="leading-7">{detailPaper.abstract}</p>
              ) : (
                <Alert className="mt-3">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Message</AlertTitle>
                  <AlertDescription>No abstarct found</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
          <CardFooter className="mt-8">
            <ul className="flex flex-wrap md:flex-nowrap  items-center gap-6 sm:gap-4">
              <li className="text-sm text-muted-foreground border-slate-300 border-r pr-2 flex gap-2 items-center">
                <CalendarDays />{" "}
                {formatDateToBrazilian(detailPaper?.publicationDate)}
              </li>
              {detailPaper?.publicationVenue?.type && (
                <li className="text-sm text-muted-foreground border-slate-300 border-r pr-2 flex gap-2 items-center">
                  <Newspaper />
                  <span className="font-semibold">
                    {detailPaper?.publicationVenue?.type}
                  </span>
                </li>
              )}

              {detailPaper?.journal && detailPaper.journal?.name && (
                <li className="border-slate-300 border-r pr-2 text-muted-foreground">
                  <HoverCard>
                    <HoverCardTrigger className="text-sm flex items-center gap-2">
                      <Info /> Jornal info
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <ul className="text-sm flex flex-col gap-3">
                        <li>
                          <strong>Jornal name</strong>:{" "}
                          {detailPaper?.journal?.name}
                        </li>
                        {detailPaper.journal?.pages && (
                          <li>
                            <strong>Pages</strong>: {detailPaper.journal?.pages}
                          </li>
                        )}
                        {detailPaper.journal?.volume && (
                          <li>
                            <strong>Volume</strong>:{" "}
                            {detailPaper.journal?.volume}
                          </li>
                        )}
                      </ul>
                    </HoverCardContent>
                  </HoverCard>
                </li>
              )}
              <li>
                {detailPaper?.openAccessPdf ? (
                  <span className="text-sm  border-slate-300 ">
                    <Link
                      href={detailPaper?.openAccessPdf?.url}
                      target="_blank"
                      className="flex items-center gap-2"
                    >
                      <Scaling />
                      PDF
                      {detailPaper?.openAccessPdf?.status === "GOLD" && (
                        <sup className="text-yellow-600">Gold</sup>
                      )}
                      {detailPaper?.openAccessPdf?.status === "GREEN" && (
                        <sup className="text-green-700">Green</sup>
                      )}
                      {detailPaper?.openAccessPdf?.status === "HYBRID" && (
                        <sup className="text-blue-700">Hybid</sup>
                      )}
                    </Link>
                  </span>
                ) : (
                  <span className="text-sm  border-slate-300 flex items-center gap-2 ">
                    <Lock />
                    <span className="line-through">PDF</span>
                  </span>
                )}
              </li>
            </ul>
          </CardFooter>
        </div>
        <aside className="p-6 border-l border-slate-300 md:w-4/12 w-full  flex flex-col justify-between">
          <div>
            <ul className="flex justify-end items-center gap-4 mb-10">
              {infoUser?.favorites?.includes(detailPaper.paperId) ? (
                <li
                  className="flex items-center gap-1 cursor-pointer text-lg hover:text-primary"
                  onClick={() => handleUnSaveFavorites(detailPaper.paperId)}
                >
                  <StarHalf /> <span>Unfavorite</span>
                </li>
              ) : (
                <li
                  className="flex items-center gap-1 cursor-pointer text-lg hover:text-primary"
                  onClick={() => handleSaveFavorites(detailPaper.paperId)}
                >
                  <Star /> <span>Favorite</span>
                </li>
              )}
            </ul>
            <ul className="flex flex-col gap-4">
              {detailPaper?.influentialCitationCount > 0 && (
                <li>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 justify-between py-2 px-3"
                  >
                    <div className="flex items-center gap-1 text-green-700">
                      <span>Influential citations</span>{" "}
                      <HoverCard>
                        <HoverCardTrigger>
                          <Info height={12} width={12} />
                        </HoverCardTrigger>
                        <HoverCardContent>
                          The number of citations that were considered
                          influential. These citations are generally considered
                          to be more impactful or relevant in the field of
                          study.
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div>
                      <Badge className="flex items-center bg-green-700">
                        {detailPaper?.influentialCitationCount}
                      </Badge>
                    </div>
                  </Badge>
                </li>
              )}

              {detailPaper?.citationCount > 0 && (
                <li>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 justify-between py-2 px-3"
                  >
                    <div className="flex items-center gap-1 text-sky-700">
                      <span>Citation Count</span>{" "}
                      <HoverCard>
                        <HoverCardTrigger>
                          <Info height={12} width={12} />
                        </HoverCardTrigger>
                        <HoverCardContent>
                          The total number of citations this paper has received.
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div>
                      <Badge className="flex items-center bg-sky-700">
                        {detailPaper?.citationCount}
                      </Badge>
                    </div>
                  </Badge>
                </li>
              )}

              {detailPaper?.referenceCount > 0 && (
                <li>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 justify-between py-2 px-3"
                  >
                    <div className="flex items-center gap-1 text-primary">
                      <span>Reference count</span>{" "}
                      <HoverCard>
                        <HoverCardTrigger>
                          <Info height={12} width={12} />
                        </HoverCardTrigger>
                        <HoverCardContent>
                          The total number of papers referenced by this paper.
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div>
                      <Badge className="flex items-center ">
                        {detailPaper?.referenceCount}
                      </Badge>
                    </div>
                  </Badge>
                </li>
              )}
            </ul>

            <ul className="mt-10">
              <Accordion type="multiple">
                {detailPaper?.citationStyles && (
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="p-1.5">
                      Citation style
                    </AccordionTrigger>
                    <AccordionContent>
                      <span className="font-semibold">Bibtex:</span>
                      <span className="block relative shadow-inner bg-muted p-5 rounded-lg font-mono text-xs ">
                        {detailPaper?.citationStyles.bibtex}
                      </span>
                    </AccordionContent>
                  </AccordionItem>
                )}
                {detailPaper?.s2FieldsOfStudy && (
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="p-1.5">
                      Fields
                    </AccordionTrigger>
                    <AccordionContent>
                      {detailPaper?.s2FieldsOfStudy?.map((camp, index) => (
                        <span key={index} className="  font-mono text-xs mr-2">
                          {camp?.category},
                        </span>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                )}

                {detailPaper?.externalIds && (
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="p-1.5">
                      External Ids
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="text-xs flex flex-col gap-3">
                        {detailPaper?.externalIds?.DBLP && (
                          <li>
                            <strong className="font-semibold">DBLP</strong>:{" "}
                            {detailPaper?.externalIds?.DBLP}
                          </li>
                        )}
                        {detailPaper?.externalIds?.DOI && (
                          <li>
                            <strong className="font-semibold">DOI</strong>:{" "}
                            {detailPaper?.externalIds?.DOI}
                          </li>
                        )}
                        {detailPaper?.externalIds?.MAG && (
                          <li>
                            <strong className="font-semibold">MAG</strong>:{" "}
                            {detailPaper?.externalIds?.MAG}
                          </li>
                        )}
                        {detailPaper?.externalIds?.PubMedCentral && (
                          <li>
                            <strong className="font-semibold">
                              PubMedCentral
                            </strong>
                            : {detailPaper?.externalIds?.PubMedCentral}
                          </li>
                        )}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </ul>
          </div>
          <ul className="mt-10">
            <li className="flex item-center gap-2 text-xs text-muted-foreground">
              <span>See in:</span>
              <Link
                href={detailPaper?.url}
                target="_blank"
                className="flex items-center gap-1"
              >
                <span>Semantic Schoolar</span>{" "}
                <ArrowUpRight height={16} width={16} />
              </Link>
            </li>
          </ul>
        </aside>
      </Card>
    </>
  );
}
