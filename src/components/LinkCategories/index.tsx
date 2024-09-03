"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Checkbox } from "@/components/ui/checkbox";
import { BookmarkPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { ICategoriesCheck, IPropsCategories } from "./types";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
export default function LinkCategories({
  library,
  paperId,
  tokenIdentifier,
}: {
  library: IPropsCategories[];
  paperId: string;
  tokenIdentifier?: string;
}) {
  const updateDataUser: any = useMutation(api.users.updateDataUser);

  const [bookmarks, setBookmarks] = useState<ICategoriesCheck[]>();

  function handleChoose(name: string) {
    const updatedBookmarks = library?.map((lb, index) => {
      if (lb.name === name) {
        if (lb.papers.includes(paperId)) {
          const flteredPapers = lb.papers.filter((prId) => prId !== paperId);
          return { ...lb, papers: flteredPapers };
        } else {
          return { ...lb, papers: [...lb.papers, paperId] };
        }
      }
      return library[index];
    });

    updateDataUser({
      tokenIdentifier: tokenIdentifier,
      library: updatedBookmarks,
    });
  }

  useEffect(() => {
    if (library) {
      const bookmarks = library.map((category) => ({
        name: category.name,
        checked: category.papers.some((item) => item === paperId),
      }));
      setBookmarks(bookmarks);
    }
  }, [library]);

  useEffect(() => {}, [bookmarks]);
  return (
    <HoverCard>
      <HoverCardTrigger className="flex items-center gap-2 cursor-pointer hover:text-primary">
        <BookmarkPlus /> Add Bookmarks
      </HoverCardTrigger>
      <HoverCardContent>
        <ul className="flex flex-col gap-5 py-3">
          {bookmarks?.map((category, index) => (
            <li
              key={index}
              className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 hover:text-primary py-3 px-2"
              onClick={() => handleChoose(category.name)}
            >
              <Checkbox id={`category-${index}`} checked={category.checked} />
              <label
                htmlFor={`category-${index}`}
                className="text-sm font-medium leading-none"
              >
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
}
