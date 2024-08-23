"use client";

import * as React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ComboBox = React.forwardRef(
  (
    {
      tags,
      addCategories,
      removeCategories,
      limit,
    }: {
      tags: string[];
      addCategories: (categorie: string) => void;
      removeCategories: (index: number) => void;
      limit?: number;
    },
    ref
  ) => {
    const [label, setLabel] = React.useState<string[]>([]);
    const [open, setOpen] = React.useState(false);

    const removeCategorie = (index: number) => {
      if (index === null || index === undefined) return;
      removeCategories(index);
      setLabel(label.filter((_, i) => i !== index));
    };

    const clearLabels = () => {
      setLabel([]);
    };

    const addTags = (value: string) => {
      if (!value) return;
      if (label.includes(value)) return;

      if (limit && label.length >= limit) return;
      setLabel((prev) => [...prev, value]);
      addCategories(value);
      setOpen(false);
    };

    // Expondo a função `removeCategorie` para o componente pai
    React.useImperativeHandle(ref, () => ({
      clearLabels,
    }));

    return (
      <div className="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
        <p className="text-sm font-medium leading-none">
          {label &&
            label.map((label, index) => (
              <Button
                key={index}
                className="mr-2 rounded-lg bg-teal-500 hover:bg-teal-600 px-2 py-1 text-xs text-primary-foreground"
                onClick={() => removeCategorie(index)}
                type="button"
              >
                <span>{label}</span>
                <CircleX className="ml-2 h-4 w-4" />
              </Button>
            ))}

          <span className="text-muted-foreground">Adicione categorias</span>
        </p>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <DotsHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuGroup>
              <Command>
                <CommandInput
                  placeholder="Filter tag..."
                  autoFocus={true}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No tag found.</CommandEmpty>
                  <CommandGroup>
                    {tags.map((tag) => (
                      <CommandItem
                        key={tag}
                        value={tag}
                        onSelect={(value) => addTags(value)}
                      >
                        {tag}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);
ComboBox.displayName = "ComboBox";
export default ComboBox;
