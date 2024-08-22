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
import { Button } from "./ui/button";
function Header() {
  return (
    <div className="relative z-10 border-b py-4 bg-gray-50">
      <div className="w-4/5 mx-auto">
      <div className="items-center container mx-auto justify-between flex">
        <Link href="/" className="flex gap-2 items-center text-xl text-black">
          <Image src="/logo.png" width="50" height="50" alt="file drive logo" />
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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AlignJustify />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/painel/all-files">Meu painel</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
        </div>
      </div>
      </div>
      
    </div>
  );
}

export default Header;
