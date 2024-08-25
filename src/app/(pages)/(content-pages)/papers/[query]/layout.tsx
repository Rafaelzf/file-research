import { GoToPapers } from "@/components";

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

      <>{children}</>
    </div>
  );
}
