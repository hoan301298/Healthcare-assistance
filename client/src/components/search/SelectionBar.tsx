import useSearch from "@/hooks/useSearch"
import Selection from "../helper/Selection"
import { Filter, MedicalType } from "../models/search/Properties";
import DropDown from "../helper/DropDown";

const SelectionBar = () => {
    const { search, setMedicalType, setFilter } = useSearch();
    console.log(search.filter);
    return (
        <div>
            <div className="flex justify-between">
                <Selection<MedicalType>
                    values={Object.values(MedicalType)}
                    selectedValue={search.medicalType}
                    setValue={setMedicalType}
                />
                <DropDown<Filter>
                    values={Object.values(Filter)}
                    selectedValue={search.filter}
                    setValue={setFilter}
                    label="Filter"
                />
            </div>
            <p className="text-muted-foreground my-6">
                Found {(search.places?.length ?? 0)} {(search.places?.length === 1 ? 'place' : 'places')}
            </p>
        </div>
    )
}

export default SelectionBar;