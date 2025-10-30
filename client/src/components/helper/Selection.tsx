import { Button } from "../ui/button"

interface SelectionProps<T extends String> {
    values: T[];
    selectedValue: T;
    label?: string | null;
    setValue: (value: T) => void;
}

const Selection = <T extends String,>({ values, selectedValue, label, setValue } : SelectionProps<T>) => {
    return (
        <div className="flex flex-wrap gap-2">
            {values.map((value, index) => (
                <Button
                    key={index}
                    variant={value === selectedValue ? 'default' : 'outline'}
                    onClick={() => setValue(value)}
                    className={
                        value === selectedValue
                            ? "bg-primary hover:bg-primary-dark w-[130px] h-12"
                            : "w-[130px] h-12"
                    }
                >
                    {`${label? `${label}` : ""}${value.toString()}`}
                </Button>
            ))}
        </div>
    )
}

export default Selection;