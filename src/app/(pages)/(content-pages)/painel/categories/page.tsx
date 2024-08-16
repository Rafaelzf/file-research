"use client";
import { Badge } from "@/components/ui/badge";
import { FileUp } from "lucide-react";
import { columns } from "./columns";
import { categoriesData } from "./categoriesTypes";
import DataTable from "@/components/Datatable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditCategories } from "@/components";
import { useState } from "react";

export default function Categories() {
  const [activeTab, setActiveTab] = useState("categorias");
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
          <span>Número de categorias</span> <Badge>1</Badge>
        </h3>

        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="categorias">Categorias</TabsTrigger>
              <TabsTrigger value="addNew">Adicionar novas</TabsTrigger>
            </TabsList>
            <TabsContent value="categorias">
              <DataTable columns={columns} data={categoriesData} />
            </TabsContent>
            <TabsContent value="addNew">
              <EditCategories onSuccess={() => setActiveTab("categorias")} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
