import { getDetailsPaper } from "@/app/actions/papers";
import { DetailPaper } from "./types";
import DetailPaperPage from "@/components/DetailPaper";

export default async function Paper({
  params,
}: {
  params: { paperId: string };
}) {
  const response: DetailPaper = await getDetailsPaper(params.paperId);

  if (!response) return null;

  console.log(response);

  return (
    <main className="flex flex-col  gap-6 container mx-auto py-10 ">
      <DetailPaperPage detailPaper={response} />
    </main>
  );
}
