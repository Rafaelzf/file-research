"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Id } from "../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import { Heart, Trash2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "./ui/use-toast";
import { ConvexError } from "convex/values";

export type PropsResearchCards = {
  _id: Id<"files">;
  _creationTime: number;
  fileName: string;
  type: "pdf";
  filedId: Id<"_storage">;
  shouldDelete?: boolean;
  uploader: {
    email: string;
    name: string;
    userId: string;
  };
  categories: string[];
};

export default function ResearchCards({ file }: { file: PropsResearchCards }) {
  const deleteFile = useMutation(api.files.deleteFile);

  const handleDeleteClick = async (filedId: Id<"files">) => {
    try {
      await deleteFile({ fileId: filedId });
      toast({
        variant: "success",
        title: "Arquivo deletado com sucesso",
        description: "Você poderá encontrá-lo em sua lixeira.",
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof ConvexError
          ? (error.data as { message: string }).message
          : "Seu arquivo não pode ser deletado. Tente novamente mais tarde.";

      toast({
        variant: "destructive",
        title: "Algo deu errado",
        description: errorMessage,
      });
    }
  };

  return (
    <Card className="border-indigo-500/75">
      <CardHeader className="bg-secondary pt-5 rounded-t-lg">
        <CardTitle className="flex justify-between items-center">
          <span>{file.fileName}</span>
          {!file?.shouldDelete && (
            <div className="flex justify-end items-center gap-2 ">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant={"link"} className="text-current px-0">
                      <Heart />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Favorito</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"link"}
                      className="text-current px-0"
                      onClick={() => handleDeleteClick(file._id)}
                    >
                      <Trash2 />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Deletar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </CardTitle>
        <CardDescription className="flex flex-col gap-2 ">
          <p> CardDescription</p>

          <ul className="flex items-center gap-2 mt-7">
            {file.categories.length ? (
              <>
                {file.categories.map((category) => {
                  return (
                    <li key={category}>
                      <Badge className="bg-indigo-500 hover:bg-indigo-600">
                        {category}
                      </Badge>
                    </li>
                  );
                })}
              </>
            ) : (
              <li>Sem categoria definida</li>
            )}
          </ul>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <Image src="/pdf.jpg" alt="pdf" width={100} height={100} />
      </CardContent>
      <CardFooter className="flex justify-between bg-secondary items-center p-0 px-6 h-10 rounded-b-lg">
        <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
          <Avatar className="w-6 h-6">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {file.uploader.name}
        </div>
        {/* <div className="text-xs text-gray-700">
          Uploaded on {file._creationTime}
        </div> */}
      </CardFooter>
    </Card>
  );
}
