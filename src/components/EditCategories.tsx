"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ConvexError } from "convex/values";

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

interface EditCategoriesProps {
  onSuccess: () => void;
}

export default function EditCategories({ onSuccess }: EditCategoriesProps) {
  const { toast } = useToast();
  const createCategorie = useMutation(api.categories.createCategorie);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values) return;
    console.log(values);

    try {
      await createCategorie({
        name: values.name,
        description: values.description,
      });

      toast({
        variant: "success",
        title: "categoria salva com sucesso",
        description: "Agora essa categoria poderá ser visualizada.",
      });
      form.reset();
      onSuccess();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof ConvexError
          ? (error.data as { message: string }).message
          : "Sua categoria não pode ser salva. Tente novamente mais tarde.";

      toast({
        variant: "destructive",
        title: "Algo deu errado",
        description: errorMessage,
      });
      form.reset();
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias</CardTitle>
        <CardDescription>
          Adicione suas categorias aqui. Clique em savar ao terminar.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-6">
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-1/5">
                    <FormLabel>Nome da categoria</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da categoria" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormLabel>Curta descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Curta descrição" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">
              {form.formState.isSubmitting && (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              )}
              Save changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
