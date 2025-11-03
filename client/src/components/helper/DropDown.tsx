import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ListFilter } from "lucide-react";

interface DropDownProps<T extends string> {
    values: T[];
    selectedValue: T;
    label?: string | null;
    setValue: (value: T) => void;
}

const DropDown = <T extends string,>({ values, selectedValue, label, setValue }: DropDownProps<T>) => {
    const filteredValues = values.filter(value => value !== selectedValue);

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    size="lg"
                    variant="outline"
                    className="gap-3 text-md min-w-[7rem] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                    <ListFilter className="text-3xl transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    {selectedValue}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 shadow-xl">
                <DropdownMenuLabel className="flex justify-center">
                    <span>-- Select {label} --</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {filteredValues.map((value, index) =>
                        <DropdownMenuItem
                            key={index}
                            onClick={() => setValue(value)}
                        >
                            <span>{value}</span>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDown;