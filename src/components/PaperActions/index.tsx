"use client";
import { Button } from "../ui/button";
import { Glasses, Pin, PinOff } from "lucide-react";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../convex/_generated/api";

export default function PaperActions({ paperId }: { paperId: string }) {
  const { user } = useUser();
  const updateDataUser: any = useMutation(api.users.updateDataUser);
  const unfavorite: any = useMutation(api.users.unfavoritePaper);

  const infoUser = useQuery(api.users.getInfoUser, {
    tokenIdentifier: user?.id || "",
  });

  const handleSaveFavorites = async (paperId: string) => {
    if (!paperId || !user?.id) return;
    updateDataUser({ tokenIdentifier: user?.id, favorites: paperId });
  };

  const handleUnSaveFavorites = async (paperId: string) => {
    if (!paperId || !user?.id) return;
    unfavorite({ tokenIdentifier: user?.id, paperId: paperId });
  };

  return (
    <ul className={`flex h-5 items-center flex-wrap`}>
      {infoUser?.favorites?.includes(paperId) ? (
        <li>
          <Button
            variant="outline"
            className="flex items-center justify-between gap-1 p-0 px-3 border-0 bg-transparent shadow-transparent hover:bg-transparent hover: group"
            onClick={() => handleUnSaveFavorites(paperId)}
          >
            <PinOff
              className="text-primary transition-all duration-300 ease-in-out fill-none group-hover:fill-current"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
            />
            <span className="text-primary text-base">Unfavorite</span>
          </Button>
        </li>
      ) : (
        <li>
          <Button
            variant="outline"
            className="flex items-center justify-between gap-1 p-0 px-3 border-0 bg-transparent shadow-transparent hover:bg-transparent hover: group"
            onClick={() => handleSaveFavorites(paperId)}
          >
            <Pin
              className="text-primary transition-all duration-300 ease-in-out fill-none group-hover:fill-current"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
            />
            <span className="text-primary text-base">Favorite</span>
          </Button>
        </li>
      )}

      <li>
        <Link
          href={`/paper/${paperId}`}
          className="flex items-center justify-between gap-1 p-0 px-3 border-0 bg-transparent shadow-transparent hover:bg-transparent hover: group"
        >
          <Glasses
            className="text-primary transition-all duration-300 ease-in-out fill-none group-hover:fill-current"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
          />
          <span className="text-primary text-base">See</span>
        </Link>
      </li>
    </ul>
  );
}
