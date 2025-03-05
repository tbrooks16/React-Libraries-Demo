import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Message, questions } from "./Chatbot";

export const Combobox = ({
  value,
  setValue,
  data,
}: {
  value: string;
  setValue: (q: string) => void;
  data: Message[] | undefined;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full my-2 cursor-pointer"
        >
          {value || "Ask a question..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Ask a question..." />
          <CommandList>
            <CommandEmpty>No question found.</CommandEmpty>
            <CommandGroup>
              {questions.map((question, i) => (
                <CommandItem
                  disabled={data?.some((m) => m.message === question)}
                  key={question}
                  value={question}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === question ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {question}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
