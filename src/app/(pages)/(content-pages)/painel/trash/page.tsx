"use client";
import { ResearchCards, SearchAllFiles } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function Trash() {
  const files = useQuery(api.files.listAllFiles);

  const trashFiles = files ? files.filter((file) => file.shouldDelete) : [];

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center w-full border-b pb-4">
        <h2 className="flex items-center gap-4  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          <span>Lixeira</span>
          <Trash2 height={30} width={30} />
        </h2>

        <div className="flex items-center">
          <SearchAllFiles />
        </div>
      </div>

      <div>
        <h3 className="flex gap-3 mt-8 scroll-m-20 text-1xl font-semibold tracking-tight mb-10">
          <span>Número de arquivos</span>{" "}
          <Badge>{trashFiles?.length || 0}</Badge>
        </h3>

        {!files && (
          <div className="flex flex-col space-y-10 h-full ">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        )}
        {files && trashFiles?.length === 0 && <main>Não há arquivos</main>}
        {trashFiles && trashFiles?.length > 0 && (
          <main className="grid grid-cols-3 gap-6">
            {trashFiles &&
              trashFiles.map((file) => (
                <ResearchCards file={file} key={file._id} />
              ))}
          </main>
        )}
      </div>
    </div>
  );
}
