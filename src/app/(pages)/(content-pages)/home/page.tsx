import { HomeHeader, ResearchCards } from "@/components";

export default async function Home() {
  return (
    <div>
      <header className="bg-gradient-to-t from-indigo-100 via-purple-100 to-pink-100 py-10">
        <HomeHeader />
      </header>

      <main className="grid grid-cols-3 gap-6 container mx-auto py-10">
        <ResearchCards />
        <ResearchCards />
        <ResearchCards />
        <ResearchCards />
        <ResearchCards />
        <ResearchCards />
      </main>
    </div>
  );
}
