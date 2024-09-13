"use client";
import { Button } from "../ui/button";
import { Glasses, Pin, PinOff, BellPlus } from "lucide-react";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function PaperActions({ paperId }: { paperId: string }) {
  const { user } = useUser();
  const router = useRouter();
  const updateDataUser: any = useMutation(api.users.updateDataUser);
  const unfavorite: any = useMutation(api.users.unfavoritePaper);
  const undoSeelater: any = useMutation(api.users.undoSeelater);
  const infoUser = useQuery(api.users.getInfoUser, {
    tokenIdentifier: user ? user.id : "",
  });
  const handleSaveFavorites = async (paperId: string) => {
    if (!user) {
      router.push("/sign-in");
    }
    if (!paperId || !user?.id) return;
    updateDataUser({ tokenIdentifier: user?.id, favorites: paperId });
  };

  const handleUnSaveFavorites = async (paperId: string) => {
    if (!paperId || !user?.id) return;
    unfavorite({ tokenIdentifier: user?.id, paperId: paperId });
  };

  const handleSeelater = async (paperId: string) => {
    if (!user) {
      router.push("/sign-in");
    }
    if (!paperId || !user?.id) return;
    updateDataUser({ tokenIdentifier: user?.id, seeLater: paperId });
  };

  const handleUndoSeelater = async (paperId: string) => {
    if (!paperId || !user?.id) return;
    undoSeelater({ tokenIdentifier: user?.id, paperId: paperId });
  };

  return (
    <ul className={`flex items-center flex-wrap gap-5`}>
      {infoUser?.favorites?.includes(paperId) ? (
        <li>
          <Button
            variant="outline"
            className="flex items-center justify-between gap-1 p-0 border-0 bg-transparent shadow-transparent hover:bg-transparent hover: group"
            onClick={() => handleUnSaveFavorites(paperId)}
          >
            <PinOff
              className="text-primary transition-all duration-300 ease-in-out fill-none group-hover:fill-current"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              height={16}
              width={16}
            />
            <span className="text-primary ">Unfavorite</span>
          </Button>
        </li>
      ) : (
        <li>
          <Button
            variant="outline"
            className="flex items-center justify-between gap-1 p-0  border-0 bg-transparent shadow-transparent hover:bg-transparent hover: group"
            onClick={() => handleSaveFavorites(paperId)}
          >
            <Pin
              className="text-primary transition-all duration-300 ease-in-out fill-none group-hover:fill-current"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              height={16}
              width={16}
            />
            <span className="text-primary">Favorite</span>
          </Button>
        </li>
      )}

      <li>
        <Link
          href={`/paper/${paperId}`}
          className="flex items-center justify-between gap-1 p-0  border-0 bg-transparent shadow-transparent hover:bg-transparent hover: group"
        >
          <Glasses
            className="text-primary transition-all duration-300 ease-in-out fill-none group-hover:fill-current"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            height={16}
            width={16}
          />
          <span className="text-primary ">Read</span>
        </Link>
      </li>
      <li>
        {infoUser?.seeLater?.includes(paperId) ? (
          <Button
            variant="outline"
            className="flex items-center justify-between gap-1 p-0  border-0 bg-transparent shadow-transparent hover:bg-transparent hover: group"
            onClick={() => handleUndoSeelater(paperId)}
          >
            <BellPlus
              className="text-primary transition-all duration-300 ease-in-out fill-none group-hover:fill-current"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              height={16}
              width={16}
            />
            <span className="text-primary">Viewed</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            className="flex items-center justify-between gap-1 p-0  border-0 bg-transparent shadow-transparent hover:bg-transparent hover: group"
            onClick={() => handleSeelater(paperId)}
          >
            <BellPlus
              className="text-primary transition-all duration-300 ease-in-out fill-none group-hover:fill-current"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              height={16}
              width={16}
            />
            <span className="text-primary">See later</span>
          </Button>
        )}
      </li>
    </ul>
  );
}
