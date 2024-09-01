import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
function Header() {
  return (
    <div className="relative z-10 border-b py-4 ">
      <div className="w-9/12 mx-auto">
        <div className="items-center container mx-auto justify-between flex">
          <Link href="/" className="flex gap-2 items-center text-xl text-black">
            <Image
              src="/logo.png"
              width="50"
              height="50"
              alt="file drive logo"
            />
            Find Research
          </Link>

          <div className="flex gap-2">
            <SignedOut>
              <SignInButton>
                <Button>SignIn</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
