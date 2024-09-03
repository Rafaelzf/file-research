"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Trash2, Glasses } from "lucide-react";
import Link from "next/link";

export function BookmarksBoxes({
  tokenIdentifier,
  library,
  handleUDeleteLibrary,
}: {
  tokenIdentifier: string;
  library: { name: string; papers: string[] };
  handleUDeleteLibrary: (libraryName: string) => Promise<void>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="border-b pb-2">{library.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {"Number's paper"} <Badge>{library.papers.length}</Badge>
        </p>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Link
          href={`/bookmarks/${tokenIdentifier}/${library.name}`}
          className="flex items-center gap-2 justify-between hover:cursor-pointer  hover:bg-transparent hover: group"
        >
          <span className="text-sm text-muted-foreground">See</span>
          <Glasses
            className="text-primary transition-all duration-300 ease-in-out fill-none group-hover:fill-current"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
          />
        </Link>
        <div
          className="flex items-center gap-2   justify-between hover:cursor-pointer  hover:bg-transparent hover: group"
          onClick={() => handleUDeleteLibrary(library.name)}
        >
          <span className="text-sm text-muted-foreground">Delete</span>

          <Trash2
            className="text-primary transition-all duration-300 ease-in-out fill-none group-hover:fill-current"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
