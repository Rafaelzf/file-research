"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, FileX, FileHeart, FileCheck2 } from "lucide-react";
import ComboBox from "./ComboBox";

const formSchema = z.object({
  fileName: z.string().min(1, "Nome do arquivo é obrigatório").max(200),
  file: z
    .custom<FileList>(
      (val) => val instanceof FileList,
      "É necessário um arquivo"
    )
    .refine(
      (files) => files.length > 0,
      "É necessário selecionar pelo menos um arquivo e de tipo PDF"
    )
    .refine(
      (files) =>
        Array.from(files).every((file) => file.type === "application/pdf"),
      "Somente arquivos PDF são permitidos"
    ),
  tags: z.array(z.string()).optional(),
});

export default function FileUploader() {
  const [file, setFile] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileName: "",
      file: undefined,
      tags: [],
    },
  });

  const addCategories = useCallback(
    (categorie: string) => {
      if (!categorie || categories.length >= 3) return;
      const newCategories = [...categories, categorie];
      setCategories(newCategories);
      form.setValue("tags", newCategories);
    },
    [form, categories, setCategories]
  );

  const removeCategories = useCallback(
    (index: number) => {
      if (index === null || index === undefined) return;
      const newCategories = categories.filter((_, i) => i !== index);
      setCategories(newCategories);
      form.setValue("tags", newCategories);
    },
    [form, categories, setCategories]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Verifica se todos os arquivos são PDFs
      const allFilesArePDF = acceptedFiles.every(
        (file) => file.type === "application/pdf"
      );

      if (!allFilesArePDF) {
        setFileError("Somente arquivos PDF são permitidos");
        return;
      }

      setFileError(null); // Limpa o erro se os arquivos forem válidos
      setFile(acceptedFiles);

      const fileList = new DataTransfer();
      acceptedFiles.forEach((file) => fileList.items.add(file));
      const fileListValue = fileList.files;
      form.setValue("file", fileListValue, { shouldValidate: true });
    },
    [form]
  );

  const removeFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Impede a propagação do evento para outros elementos
    event.preventDefault(); // Impede a ação padrão do evento

    const emptyFileArray: File[] = [];
    const emptyFileList = new DataTransfer().files;
    setFile(emptyFileArray);
    form.setValue("file", emptyFileList, { shouldValidate: true });
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between items-end">
          <FormField
            control={form.control}
            name="fileName"
            render={({ field }) => (
              <FormItem className="w-2/5">
                <FormLabel>Nome do arquivo</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do arquivo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <p className="text-sm text-destructive text-right mb-2">
              {categories.length >= 3 && <> Máximo de categorias atingido.</>}
            </p>

            <ComboBox
              addCategories={addCategories}
              removeCategories={removeCategories}
              limit={3}
            />
          </div>
        </div>

        <div
          {...getRootProps()}
          className={`p-3 flex flex-col gap-8 justify-center items-center border-current h-60 outline-2 outline-offset-2 rounded-md outline-dashed text-center ${fileError ? "border-red-500" : ""}`}
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(event) => {
                      if (!event.target.files) return;
                      const file = event.target.files[0];
                      if (file && file.type !== "application/pdf") {
                        setFileError("Somente arquivos PDF são permitidos");
                      } else {
                        setFileError(null);
                        field.onChange(event.target.files);
                      }
                    }}
                    {...getInputProps()}
                    style={{ display: "none" }} // Escondendo o input de arquivo nativo
                  />
                </FormControl>
                {fileError && <p className="text-red-500">{fileError}</p>}
                <FormMessage />
              </FormItem>
            )}
          />

          {isDragActive ? (
            <>
              {!isDragReject && (
                <p>
                  Solte os arquivos{" "}
                  <strong className="text-primary">aqui</strong>
                  ...
                </p>
              )}
            </>
          ) : (
            <>
              {file.length < 1 && (
                <p>
                  Arraste e solte alguns
                  <strong className="text-primary"> arquivos PDF aqui</strong>,
                  ou <strong className="text-primary">clique</strong> para
                  selecionar arquivos
                </p>
              )}
            </>
          )}

          {isDragAccept && (
            <p className="text-green-500 flex gap-4">
              <span> Arquivo no formato válido.</span> <FileHeart />
            </p>
          )}

          {isDragReject && (
            <p className="text-destructive flex gap-4">
              <span>O arquivo não é compatível com o formato PDF</span>{" "}
              <FileX />
            </p>
          )}

          {file.length > 0 && (
            <p className=" text-black flex flex-col justify-center items-center gap-5">
              <FileCheck2 height={50} width={50} className="text-green-500" />
              <span>
                Aquivo:{" "}
                <strong className="text-green-500">{file[0].name}</strong>{" "}
                anexado
              </span>
              <Button
                type="button"
                onClick={removeFile}
                className="bg-slate-500 hover:bg-slate-700"
              >
                Remover
              </Button>
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
