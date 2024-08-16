import { FileUploader, SearchAllFiles } from "@/components";
import { Badge } from "@/components/ui/badge";
import { FileUp } from "lucide-react";

export default function Upload() {
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center w-full border-b pb-4">
        <h2 className="flex items-center gap-4  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          <span>Upload File</span>
          <FileUp height={30} width={30} />
        </h2>
      </div>

      <div className="mt-20">
        <FileUploader />
      </div>
    </div>
  );
}
