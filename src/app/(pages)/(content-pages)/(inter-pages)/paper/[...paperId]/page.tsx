import { getDetailsPaper } from "@/app/actions/papers";
import { DetailPaper } from "./types";
import DetailPaperPage from "@/components/DetailsPaper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DetailsAuthors,
  DetailsCitations,
  DetailsReferences,
} from "@/components";

export default async function Paper({
  params,
}: {
  params: { paperId: string };
}) {
  const response: DetailPaper = await getDetailsPaper(params.paperId);

  if (!response) return null;

  // console.log(response);

  return (
    <main className="flex flex-col  gap-6 container mx-auto py-10 ">
      <Tabs defaultValue="paper">
        <TabsList>
          <TabsTrigger value="paper">Paper</TabsTrigger>
          <TabsTrigger value="references">References</TabsTrigger>
          <TabsTrigger value="citations">Citations</TabsTrigger>
          <TabsTrigger value="authors">Authors</TabsTrigger>
        </TabsList>
        <TabsContent value="paper">
          <DetailPaperPage detailPaper={response} />
        </TabsContent>
        <TabsContent value="references">
          <DetailsReferences paperId={params.paperId} />
        </TabsContent>
        <TabsContent value="citations">
          <DetailsCitations paperId={params.paperId} />
        </TabsContent>
        <TabsContent value="authors">
          <DetailsAuthors paperId={params.paperId} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
