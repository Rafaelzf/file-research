"use client";
import { useState } from "react";
import { CategoriesType } from "@/app/(pages)/(content-pages)/painel/categories/categoriesTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";
import { ConvexError } from "convex/values";
import { Button } from "./ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import EditCategories from "./EditCategories";
import DialogModal from "./Modal";

export default function Actions({ row }: { row: Row<CategoriesType> }) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteCategorie = useMutation(api.categories.deleteCategorie);
  const { toast } = useToast();

  const handleDelete = async (id: Id<"categories">) => {
    try {
      await deleteCategorie({ _id: id });
      toast({
        variant: "success",
        title: "categoria deletada com sucesso",
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof ConvexError
          ? (error.data as { message: string }).message
          : "Sua categoria não pode ser deletada. Tente novamente mais tarde.";

      toast({
        variant: "destructive",
        title: "Algo deu errado",
        description: errorMessage,
      });
    }
  };

  return (
    <>
      <DialogModal
        title="Edit categories"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <EditCategories
          categoryId={row.original._id}
          setIsOpen={setIsOpen}
          propName={row.original.name}
          propDescription={row.original.description || ""}
        />
      </DialogModal>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2"
          >
            <Pencil width={17} height={17} />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={async () => await handleDelete(row.original._id)}
          >
            <Trash2 width={17} height={17} />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
