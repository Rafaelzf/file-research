"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { PanelRightClose, BellPlus, Pin, LayoutList } from "lucide-react";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";

import { api } from "../../../convex/_generated/api";
import { Badge } from "../ui/badge";
export default function Sidebar() {
  const { user } = useUser();
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const infoUser = useQuery(api.users.getInfoUser, {
    tokenIdentifier: user?.id || "",
  });

  //   router.push(`/papers/${encodeURIComponent(values.query)}`);

  return (
    <div className="fixed left-0 top-52 sm:bottom-5 z-50">
      <Sheet open={confirmOpen} onOpenChange={setConfirmOpen}>
        <SheetTrigger className=" top-36 cursor-pointer text-primary bg-white px-6 py-3 rounded-r-lg shadow-sm">
          <PanelRightClose width={35} height={35} className="text-primary" />
        </SheetTrigger>
        <SheetContent side="left" className="pt-40  w-fit">
          <SheetHeader>
            <SheetDescription>
              <ul className="flex flex-col gap-10">
                <li
                  className="flex items-center gap-3 text-lg text-primary py-3 px-20 hover:bg-slate-100 rounded-md cursor-pointer"
                  onClick={() => {
                    router.push("/favorites");
                    setConfirmOpen(false);
                  }}
                >
                  <Pin className="text-primary" />
                  <span>Favorites</span>
                  {infoUser &&
                    infoUser?.favorites &&
                    infoUser?.favorites?.length > 0 && (
                      <Badge>{infoUser?.favorites?.length}</Badge>
                    )}
                </li>
                <li
                  className="flex items-center gap-3 text-lg text-primary py-3 px-20 hover:bg-slate-100 rounded-md cursor-pointer"
                  onClick={() => {
                    router.push("/see-later");
                    setConfirmOpen(false);
                  }}
                >
                  <BellPlus className="text-primary" />
                  <span>See Later</span>

                  {infoUser &&
                    infoUser?.seeLater &&
                    infoUser?.seeLater?.length > 0 && (
                      <Badge>{infoUser?.seeLater?.length}</Badge>
                    )}
                </li>
                <li
                  className="flex items-center gap-3 text-lg text-primary py-3 px-20 hover:bg-slate-100 rounded-md cursor-pointer"
                  onClick={() => {
                    router.push(`/bookmarks/${infoUser?.tokenIdentifier}`);
                    setConfirmOpen(false);
                  }}
                >
                  <LayoutList className="text-primary" />
                  <span>Bookmarks</span>

                  {infoUser &&
                    infoUser?.library &&
                    infoUser?.library?.length > 0 && (
                      <Badge>{infoUser?.library?.length}</Badge>
                    )}
                </li>
              </ul>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      {/* <PanelRightOpen /> */}
    </div>
  );
}
