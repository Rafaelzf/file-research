"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Search({
  query,
  setQuery,
}: {
  query?: string;
  setQuery?: Dispatch<SetStateAction<string>>;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const formSchema = z.object({
    query: z.string().min(1, "O campo de busca não pode estar vazio").max(200),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    form.reset();
  }

  const search = (term: string) => {
    if (!term) {
      setResults([]);
      return;
    }
    const mockResults = [
      "Spellbook of Wonders",
      "Potion of Knowledge",
      "Enchanted Wand",
      "Magical Amulet",
    ];

    const filteredResults = mockResults.filter((result) =>
      result.toLowerCase().includes(term.toLowerCase())
    );

    setResults(filteredResults);
  };

  const handleChooseTerm = useCallback(
    (term: string) => {
      setSearchTerm(term);
      form.setValue("query", term); // Atualiza o valor do formulário no campo "query"
      setResults([]);
    },
    [form]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchTerm(value);
      search(value);
    },
    [searchTerm, search]
  );

  return (
    <div className="relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4 w-3/5 mt-3"
        >
          <div className="w-2/3">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2  ">
                  <FormControl>
                    <Input
                      placeholder="Search"
                      {...field}
                      className="bg-white"
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
          </div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !searchTerm}
            className="hover:cursor-pointer"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            )}
            <SearchIcon /> Search
          </Button>
        </form>
      </Form>
      {results.length > 0 && (
        <ul className="absolute left-0 top-[3rem] flex flex-col gap-2 bg-white w-full p-5 rounded-md  opacity-75 shadow-md">
          {results.map((result, index) => (
            <li
              key={index}
              className="cursor-pointer hover:text-violet-800 hover:font-semibold"
              onClick={() => handleChooseTerm(result)}
            >
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
