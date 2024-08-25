"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Error({
  params,
}: {
  params: { query: string; page: string };
}) {
  const handleClick = () => {
    window.location.reload();
  };
  return (
    <>
      <main className="flex flex-col justify-center items-center text-lg pt-16">
        <h4 className="scroll-m-20 text-xl text-primary font-semibold tracking-tight text-center mb-10">
          Algo deu errado! tente novamente
          <Image
            src="/undraw_curved-underline.svg"
            width={100}
            height={100}
            alt="Picture of the author"
            className="mx-auto mt-3"
          />
        </h4>

        <Image
          src="/undraw_notify_re_65on.svg"
          width={670}
          height={150}
          alt="Picture of the author"
          className="mx-auto "
        />
        <Button className="h-10 w-[25%] mt-10" onClick={handleClick}>
          Try Again
        </Button>
      </main>
    </>
  );
}
