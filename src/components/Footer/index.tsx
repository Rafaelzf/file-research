import Link from "next/link";

export function Footer() {
  return (
    <div className="h-20 bg-gray-100 mt-12 flex items-center">
      <div className="w-9/12 mx-auto">
        <div className="container mx-auto flex justify-between items-center">
          <div>FileDrive</div>

          <Link className="text-blue-900 hover:text-blue-500" href="/privacy">
            Privacy Policy
          </Link>
          <Link
            className="text-blue-900 hover:text-blue-500"
            href="/terms-of-service"
          >
            Terms of Service
          </Link>
          <Link className="text-blue-900 hover:text-blue-500" href="/about">
            About
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Footer;
