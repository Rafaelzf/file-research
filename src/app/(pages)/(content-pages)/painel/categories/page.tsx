"use client";
import { Badge } from "@/components/ui/badge";
import { FileUp } from "lucide-react";
import { columns } from "./columns";

import DataTable from "@/components/Datatable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateCategories } from "@/components";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";

export default function Categories() {
  const [activeTab, setActiveTab] = useState("categorias");
  const categories = useQuery(api.categories.listAllCategorie);

  console.log(categories);
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center w-full border-b pb-4">
        <h2 className="flex items-center gap-4  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          <span>Categorias</span>
          <FileUp height={30} width={30} />
        </h2>
      </div>

      <div>
        <h3 className="flex gap-3 mt-8 scroll-m-20 text-1xl font-semibold tracking-tight mb-10">
          <span>Número de categorias</span>
          <Badge>{categories?.length || "?"}</Badge>
        </h3>

        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="categorias">Categorias</TabsTrigger>
              <TabsTrigger value="addNew">Adicionar novas</TabsTrigger>
            </TabsList>
            <TabsContent value="categorias">
              {categories && categories.length && (
                <DataTable columns={columns} data={categories} />
              )}
            </TabsContent>
            <TabsContent value="addNew">
              <CreateCategories onSuccess={() => setActiveTab("categorias")} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
