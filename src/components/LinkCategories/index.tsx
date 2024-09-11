"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  className,
}: {
  library: IPropsCategories[];
  paperId: string;
  tokenIdentifier?: string;
  className?: string;
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
  }, [library, paperId]);

  useEffect(() => {}, [bookmarks]);
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="flex items-center gap-2 cursor-pointer hover:text-primary"
      >
        <span className={className}>
          <BookmarkPlus /> Add Bookmarks
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="color-primary">
            These are your favorite lists
          </DialogTitle>
          <DialogDescription>
            Choose the list where your paper will be saved, or uncheck to remove
            it from the list.
          </DialogDescription>
        </DialogHeader>
        <ul className="flex flex-col gap-3 py-3">
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
      </DialogContent>
    </Dialog>
  );
}
