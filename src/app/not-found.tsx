import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex flex-col justify-center items-center text-lg pt-16">
      <h2 className="scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight mb-6">
        Not Found
      </h2>
      <p className="scroll-m-20 text-xl font-semibold tracking-tight mb-6">
        Could not find requested resource
      </p>
      <Image
        src="/undraw_page_not_found_re_e9o6.svg"
        width={500}
        height={500}
        alt="Picture of the author"
        className="mx-auto mt-3 mb-6"
      />
      <Link href="/">Return Home</Link>
    </main>
  );
}
