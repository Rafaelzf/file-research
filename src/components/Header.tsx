import { Button } from "@/components/ui/button";
import { PackageSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
function Header() {
  return (
    <div className="relative z-10 border-b py-4 bg-gray-50">
      <div className="items-center container mx-auto justify-between flex">
        <Link href="/" className="flex gap-2 items-center text-xl text-black">
          <PackageSearch width="50" height="50" />
          FileDrive
        </Link>

        <div className="flex gap-2">
          <Button>Sign In</Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
