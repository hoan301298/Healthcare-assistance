import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

interface DropDownProps<T extends String> {
    values: T[];
    selectedValue: T;
    label?: string | null;
    setValue: (value: T) => void;
}

const DropDown = <T extends String,>({ values, selectedValue, label, setValue }: DropDownProps<T>) => {
    const filteredValues = values.filter(value => value !== selectedValue);

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    size="sm"
                    variant="default"
                    className="gap-1 text-md w-[7rem] py-4 h-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                    {selectedValue}
                    <ChevronDown className="w-8 h-8 pt-1 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 shadow-xl">
                <DropdownMenuLabel className="flex justify-center">
                    <span>--Select Radius--</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {filteredValues.map((value, index) =>
                        <DropdownMenuItem
                            key={index}
                            onClick={() => setValue(value)}
                        >
                            <span>{label? `${label}` : ""}{value}</span>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDown;