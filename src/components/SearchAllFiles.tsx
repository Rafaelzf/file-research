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
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SearchAllFiles({
  query,
  setQuery,
}: {
  query?: string;
  setQuery?: Dispatch<SetStateAction<string>>;
}) {
  const formSchema = z.object({
    query: z.string().min(0).max(200),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // setQuery(values.query);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="flex gap-4 w-5/5">
              <FormControl>
                <Input placeholder="Search" {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <Loader2 className="h-4 w-4 animate-spin mr-1" />
          )}
          <SearchIcon /> Search
        </Button>
      </form>
    </Form>
  );
}
