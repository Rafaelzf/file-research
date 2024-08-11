import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FileIcon, StarIcon, TrashIcon, Tags, FileUp } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";


export async function SideNav() {
  const user = await currentUser();
  const isAdmin = user?.publicMetadata.role == "admin";
  return (
    <div className="w-40 flex flex-col gap-6">
      <Link href="/painel/all-files">
        <Button variant={"link"} className="flex gap-2 text-current">
          <FileIcon />
          <span>All files</span>
        </Button>
      </Link>
      {isAdmin && (
        <>
          <Link href="/painel/upload">
            <Button variant={"link"} className="flex gap-2 text-current">
              <FileUp />
              <span>Upload</span>
            </Button>
          </Link>

          <Link href="/painel/categories">
            <Button variant={"link"} className="flex gap-2 text-current">
              <Tags />
              <span>Categories</span>
            </Button>
          </Link>
        </>
      )}

      <Link href="/painel/favorites">
        <Button variant={"link"} className="flex gap-2 text-current">
          <StarIcon />
          <span>Favorites</span>
        </Button>
      </Link>

      <Link href="/painel/trash">
        <Button variant={"link"} className="flex gap-2 text-current">
          <TrashIcon />
          <span>Trash</span>
        </Button>
      </Link>
    </div>
  );
}
