"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { PanelRightClose, BellPlus, Pin } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);

  //   router.push(`/papers/${encodeURIComponent(values.query)}`);

  return (
    <div className="fixed left-0 bottom-5 ">
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
