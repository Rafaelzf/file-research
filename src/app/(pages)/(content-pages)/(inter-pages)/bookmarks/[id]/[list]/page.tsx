"use client";
import { getMultiplePapers } from "@/app/actions/papers";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../../../../../../convex/_generated/api";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { ErrorComponent, Loader, PapersList } from "@/components";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BookMarkList({
  params,
  searchParams,
}: {
  params: { list: string };
  searchParams: { [key: string]: string };
}) {
  const { list } = params;
  const listName = decodeURI(list);
  const page = searchParams.page;
  const { user } = useUser();

  const infoUser = useQuery(api.users.getInfoUser, {
    tokenIdentifier: user?.id || "",
  });

  const mutation = useMutation({
    mutationFn: (searchTerm: string[]) => {
      return getMultiplePapers(searchTerm);
    },
  });

  useEffect(() => {
    if (infoUser) {
      const list = infoUser?.library?.filter((item) => item.name === listName);
      const dataparams = list ? list[0].papers : [];
      mutation.mutate(dataparams);
    }
  }, [infoUser, listName]);

  return (
    <>
      <main className="flex flex-col  gap-6 container mx-auto py-10 ">
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          {listName}
        </h2>
        {mutation.isPending && <Loader />}
        {mutation.error && (
          <p>
            <ErrorComponent />
          </p>
        )}

        {mutation?.data?.length > 0 && <PapersList papers={mutation?.data} />}

        {mutation?.data?.length < 1 && (
          <Card>
            <CardContent className="py-10">
              <Alert>
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Message</AlertTitle>
                <AlertDescription>List empty</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
