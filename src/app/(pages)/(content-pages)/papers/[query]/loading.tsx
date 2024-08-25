"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <main className="flex flex-col  gap-6 container mx-auto py-10 ">
      <div className="border border-violet-200 shadow rounded-md p-4  w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-400 h-20 w-20"></div>
          <div className="flex-1 space-y-6 py-2">
            <div className="h-6  bg-slate-400 rounded"></div>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-6  bg-slate-400 rounded col-span-2"></div>
                <div className="h-6  bg-slate-400 rounded col-span-1"></div>
              </div>
              <div className="h-6 bg-slate-400 rounded"></div>
              <div className="h-6 bg-slate-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-violet-200 shadow rounded-md p-4  w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-400 h-20 w-20"></div>
          <div className="flex-1 space-y-6 py-2">
            <div className="h-6  bg-slate-400 rounded"></div>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-6  bg-slate-400 rounded col-span-2"></div>
                <div className="h-6  bg-slate-400 rounded col-span-1"></div>
              </div>
              <div className="h-6 bg-slate-400 rounded"></div>
              <div className="h-6 bg-slate-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
