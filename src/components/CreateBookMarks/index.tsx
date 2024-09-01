"use client";

import { LayoutList } from "lucide-react";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function CreateBookMarks({
  tokenIdentifier,
  userLibrary,
}: {
  tokenIdentifier: string;
  userLibrary: { name: string; papers: string[] }[];
}) {
  const updateDataUser: any = useMutation(api.users.updateDataUser);

  const formSchema = z.object({
    listName: z
      .string()
      .min(4, {
        message: "List name must be at least 4 characters.",
      })
      .max(15, {
        message: "List name must have at most 15 characters.",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values) return;
    const library = [{ name: values.listName, papers: [] }];
    const hasLibraryName = userLibrary.some(
      (item) => item.name === values.listName
    );

    if (hasLibraryName) return;

    const newLibrary = [...userLibrary, ...library];

    updateDataUser({ tokenIdentifier: tokenIdentifier, library: newLibrary });
  }
  return (
    <>
      <h1 className="flex justify-between item center gap-4 mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        <span className="flex items-center gap-2">
          <LayoutList /> Bookmarks
        </span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="listName"
            render={({ field }) => (
              <FormItem className="flex  gap-6">
                <div className="w-4/12">
                  <FormLabel>List name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="This is your list name."
                      className="bg-white  py-6"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </div>
                <div>
                  <Button type="submit" className="h-10 mt-5 ">
                    Create
                  </Button>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}
