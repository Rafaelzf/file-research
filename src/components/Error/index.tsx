import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function ErrorComponent() {
  const handleClick = () => {
    window.location.reload();
  };
  return (
    <>
      <h4 className="scroll-m-20 text-xl text-primary font-semibold tracking-tight text-center mb-10">
        Ops!! something went wrong, try again.
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
      <Button
        className="h-10 w-[25%] mt-10 mx-auto block"
        onClick={handleClick}
      >
        Try Again
      </Button>
    </>
  );
}
