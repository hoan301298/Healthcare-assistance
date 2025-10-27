import React from "react";
import { SelectedType } from "../models/search/SelectedType"
import { Button } from "../ui/button"
import useSearch from "@/hooks/useSearch";
import { SelectedRadius } from "../models/search/SelectedRadius";

interface SelectionProps {
    label: string;
}

const Selection: React.FC<SelectionProps> = ({ label }) => {
    const { search, setSelectedType, setSelectedRadius} = useSearch();
    return (
        <div className={`flex flex-wrap gap-2 ${label === "type"? "" : "justify-end"}`}>
            {Object.values(label === "type" ? SelectedType : SelectedRadius).map((type, index) => (
                <Button
                    key={index}
                    variant={type === (label === "type"? search.selectedType : search.selectedRadius) ? 'default' : 'outline'}
                    onClick={() => {
                        if (label === "type") setSelectedType(type as SelectedType);
                        else setSelectedRadius(type as SelectedRadius)
                    }}
                    className={
                        search.selectedType === type
                            ? `bg-primary hover:bg-primary-dark ${label === "type" ? "w-[100px]" : "w-[90px]"} h-12`
                            : `${label === "type" ? "w-[130px]" : "w-[90px]"} h-12`
                    }
                >
                    {type}
                </Button>
            ))}
        </div>
    )
}

export default Selection;