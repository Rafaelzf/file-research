"use client";

import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { CategoriesType } from "./categoriesTypes";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { sortColorsTag } from "@/lib/utils";

import { Actions } from "@/components";

export const columns: ColumnDef<CategoriesType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Badge className={`${sortColorsTag()} ml-3 `}>
          {row.original.name}
        </Badge>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => {
      return <div>{row.original.description}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions row={row} />,
  },
];
