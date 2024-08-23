"use client";
import Search from "../Search";
import Image from "next/image";
import { UseMutateFunction } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import {
  Paper,
  SearchResponse,
} from "@/app/(pages)/(content-pages)/home/types";

export default function HomeHeader({
  getRelevantPapers,
  setTerm,
  setPapers,
}: {
  setTerm: Dispatch<SetStateAction<string>>;
  getRelevantPapers: UseMutateFunction<SearchResponse, Error, string, unknown>;
  setPapers: Dispatch<SetStateAction<Paper[]>>;
}) {
  return (
    <div className="w-4/5 mx-auto">
      <div className="container mx-auto flex flex-col justify-between gap-8  min-h-30 ">
        <h1 className="text-4xl font-outline-2 font-extrabold  text-center bg-gradient-to-r from-pink-900 via-violet-500 to-indigo-900 inline-block text-transparent bg-clip-text">
          Digite sua pesquisa
        </h1>

        <div className="flex justify-end flex-1">
          <Search
            getRelevantPapers={getRelevantPapers}
            setTerm={setTerm}
            setPapers={setPapers}
          />
        </div>
      </div>
    </div>
  );
}
