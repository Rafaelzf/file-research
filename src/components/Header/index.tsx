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
      <div className="sm:w-9/12 mx-auto">
        <div className="items-center container mx-auto justify-between flex">
          <Link href="/" className="flex gap-2 items-center text-xl text-black">
            <Image
              src="/findpaper_logo_header.svg"
              width="50"
              height="50"
              alt="file drive logo"
              className="border-2 border-primary shadow-2xl rounded-full"
            />
            <span className="text-2xl  font-outline-2 font-extrabold  text-center bg-gradient-to-r from-pink-900 via-violet-500 to-indigo-900 inline-block text-transparent bg-clip-text">
              {" "}
              Find Papers
            </span>
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
