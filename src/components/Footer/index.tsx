import Link from "next/link";
import { MailIcon, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <div className="h-20 bg-gray-100 mt-12 flex  items-center">
      <div className="sm:w-9/12 mx-auto ">
        <div className="container mx-auto flex justify-between items-center flex-col sm:flex-row gap-4">
          <Link
            className="text-blue-900 hover:text-blue-500 text-sm flex gap-2"
            href="https://www.linkedin.com/in/rafaelzaninifrancucci/"
            target="_blank"
          >
            <Linkedin height={18} width={18} />
          </Link>
          <Link
            className="text-blue-900 hover:text-blue-500 text-sm flex gap-2"
            href="/about"
          >
            <MailIcon height={18} width={18} /> rf.francucci@gmail.com
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Footer;
