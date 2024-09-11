"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";

import { BookmarksBoxes, CreateBookMarks } from "@/components";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function Bookmarks({ params }: { params: { id: string } }) {
  const { id } = params;

  const infoUser = useQuery(api.users.getInfoUser, {
    tokenIdentifier: id,
  });

  const deleteLibrary: any = useMutation(api.users.updateDataUser);

  const handleUDeleteLibrary = async (libraryName: string) => {
    if (!libraryName) return;
    const newLibrary = infoUser?.library?.filter((l) => l.name !== libraryName);
    deleteLibrary({
      tokenIdentifier: infoUser?.tokenIdentifier,
      library: newLibrary,
    });
  };

  return (
    <main className="flex flex-col  gap-6 container mx-auto py-10 ">
      <CreateBookMarks
        tokenIdentifier={id}
        userLibrary={infoUser?.library || []}
      />

      {infoUser?.library && infoUser?.library?.length > 0 ? (
        <div className="flex flex-col sm:flex-row gap-4">
          {infoUser?.library.map((library) => (
            <BookmarksBoxes
              key={library.name}
              tokenIdentifier={id}
              library={library}
              handleUDeleteLibrary={handleUDeleteLibrary}
            />
          ))}
        </div>
      ) : (
        <Alert className="mt-3  py-7">
          <AlertTitle className="m-0 p-0 flex items-center gap-3">
            <ExclamationTriangleIcon className="m-0 p-0 " /> No lists saved yet
          </AlertTitle>
        </Alert>
      )}
    </main>
  );
}
