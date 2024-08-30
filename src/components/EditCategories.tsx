"use client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Id } from "../../convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";
import { ConvexError } from "convex/values";
import { Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Dispatch, SetStateAction } from "react";
const formSchema = z.object({
  name: z
    .string()
    .min(1, "Nome do arquivo é obrigatório")
    .max(15, "Nome da categoria deve ser curta")
    .regex(
      /^[A-Za-zÀ-ÿ\s]+$/,
      "O nome não deve conter números ou caracteres especiais"
    ),
  description: z.optional(z.string().max(50, "A descricao deve ser curta")),
});

export default function EditCategories({
  categoryId,
  setIsOpen,
  propName,
  propDescription,
}: {
  categoryId: Id<"categories">;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  propName: string;
  propDescription: string;
}) {
  const { toast } = useToast();
  const updateCategorie = useMutation(api.categories.updateCategorie);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: propName,
      description: propDescription,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values) return;

    try {
      await updateCategorie({
        _id: categoryId,
        name: values.name.toLowerCase(),
        description: values.description,
      });

      toast({
        variant: "success",
        title: "categoria editada com sucesso",
        description: "Agora essa categoria poderá ser visualizada.",
      });
      form.reset();
      setIsOpen(false);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof ConvexError
          ? (error.data as { message: string }).message
          : "Sua categoria não pode ser editada. Tente novamente mais tarde.";

      toast({
        variant: "destructive",
        title: "Algo deu errado",
        description: errorMessage,
      });
      form.reset();
      setIsOpen(false);
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-9/12">
                  <FormLabel>Nome da categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da categoria" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curta descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Curta descrição" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">
            {form.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            )}
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
}
