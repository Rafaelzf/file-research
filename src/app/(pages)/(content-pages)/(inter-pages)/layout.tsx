import { GoToPapers } from "@/components";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="py-10">
        <GoToPapers />
      </header>

      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
