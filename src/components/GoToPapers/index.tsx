"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SearchIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function GoToPapers() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const formSchema = z.object({
    query: z
      .string()
      .min(1, "lembre-se que o campo de busca não pode estar vazio")
      .max(200),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.query) return;
    router.push(`/papers/${encodeURIComponent(values.query)}`);
    form.reset();
  }

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchTerm(value);
    },
    [setSearchTerm]
  );

  return (
    <div className="w-full relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4 justify-center  mt-3"
        >
          <div className="relative w-[80%]">
            <Image
              src="/undraw_arrow.svg"
              width={70}
              height={50}
              alt="Picture of the author"
              className="absolute -left-20 top-5 animate-bounce"
            />
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2  ">
                  <FormControl>
                    <Input
                      placeholder="Search"
                      {...field}
                      className="bg-white pr-16 h-16"
                      onChange={(e) => {
                        field.onChange(e); // Mantém o comportamento do react-hook-form
                        handleInputChange(e);
                      }}
                      value={searchTerm}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !searchTerm}
              className="hover:cursor-pointer rounded-full h-11 w-11 absolute top-[0.75rem] -right-[-1rem]"
            >
              {form.formState.isSubmitting && (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              )}
              <SearchIcon className="h-5 w-5 p-0" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
