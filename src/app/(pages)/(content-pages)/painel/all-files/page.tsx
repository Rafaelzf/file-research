import { SearchAllFiles } from "@/components";
import { Badge } from "@/components/ui/badge";
import { FileUp } from "lucide-react";

export default function AllFiles() {
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center w-full border-b pb-4">
        <h2 className="flex items-center gap-4  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          <span>All files</span>
          <FileUp height={30} width={30} />
        </h2>

        <div className="flex items-center">
          <SearchAllFiles />
        </div>
      </div>

      <div>
        <h3 className="flex gap-3 mt-8 scroll-m-20 text-1xl font-semibold tracking-tight mb-10">
          <span>Número de arquivos</span> <Badge>1</Badge>
        </h3>
        conteudo
      </div>
    </div>
  );
}
