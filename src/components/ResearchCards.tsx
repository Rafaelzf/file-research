import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ResearchCards() {
  return (
    <Card className="border-indigo-500/75">
      <CardHeader className="bg-secondary py-10 rounded-t-lg">
        <CardTitle className="flex justify-between items-center">
          file name
        </CardTitle>
        <CardDescription className="flex gap-2 items-center">
          CardDescription
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <Image src="/pdf.jpg" alt="pdf" width={300} height={300} />
      </CardContent>
      <CardFooter className="flex justify-between bg-secondary items-center p-0 px-6 h-10 rounded-b-lg">
        <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
          <Avatar className="w-6 h-6">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          userProfile?.name
        </div>
        <div className="text-xs text-gray-700">Uploaded on</div>
      </CardFooter>
    </Card>
  );
}
