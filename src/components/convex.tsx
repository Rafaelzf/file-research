"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Convex() {
  const tasks = useQuery(api.tables.tasks.get);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      fff
      {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
    </main>
  );
}
