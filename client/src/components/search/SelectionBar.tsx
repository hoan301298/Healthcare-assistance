import useSearch from "@/hooks/useSearch"
import Selection from "../helper/Selection"
import { MedicalType } from "../models/search/MedicalType"

const SelectionBar = () => {
    const { search, setMedicalType } = useSearch();
    return (
        <div>
            <Selection<MedicalType>
                values={Object.values(MedicalType)}
                selectedValue={search.medicalType}
                setValue={setMedicalType}
            />
            <p className="text-muted-foreground my-6">
                Found {(search.places?.length ?? 0)} {(search.places?.length === 1 ? 'place' : 'places')}
            </p>
        </div>
    )
}

export default SelectionBar;