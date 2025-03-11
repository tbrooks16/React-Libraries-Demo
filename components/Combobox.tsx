import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "./ui/button";
import { FormControl } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

export const ExperienceComboBox = ({
  value,
  onSelect,
  controlled = false,
}: {
  value: (typeof experienceOptions)[number];
  onSelect: (name: (typeof experienceOptions)[number]) => void;
  controlled: boolean;
}) => (
  <Popover>
    <PopoverTrigger asChild>
      {controlled ? (
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !value && "text-muted-foreground",
            )}
          >
            {value
              ? experienceOptions.find((val) => val === value)
              : "Select an option"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      ) : (
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-[200px] justify-between",
            !value && "text-muted-foreground",
          )}
        >
          {value
            ? experienceOptions.find((val) => val === value)
            : "Select an option"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      )}
    </PopoverTrigger>
    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandInput placeholder="Search options..." className="h-9" />
        <CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {experienceOptions.map((val) => (
              <CommandItem
                className="cursor-pointer"
                value={val}
                key={val}
                onSelect={() => onSelect(val)}
              >
                {val}
                <Check
                  className={cn(
                    "ml-auto",
                    val === value ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
);

export const experienceOptions = [
  "I loved this form",
  "This form was ok",
  "I did not like this form",
  "Other",
] as const;
