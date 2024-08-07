import Search from "./Search";

export default function HomeHeader() {
  return (
    <div className="container mx-auto flex flex-col justify-center gap-8  min-h-40 ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome to Find Research 👋
      </h1>

      <div>
        <label>Aqui você pode buscar o tema que deseja</label>
        <Search />
      </div>
    </div>
  );
}
