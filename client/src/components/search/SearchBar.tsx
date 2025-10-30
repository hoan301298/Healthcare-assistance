import { SearchIcon } from "lucide-react"
import { Input } from "../ui/input"
import useSearch from "@/hooks/useSearch"
import DropDown from "../helper/DropDown";
import { RadiusType } from "../models/search/RadiusType";

const SearchBar = () => {
    const { search, setSearchQuery, setAddress, setRadiusType } = useSearch();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return; 

        e.preventDefault();
        const trimmedQuery = search.searchQuery.trim();
        if (trimmedQuery.length === 0) return;
        setAddress(trimmedQuery);
    };

    return (
        <div className="mb-8 flex w-full items-center gap-3 h-14">
            <div className="relative flex-[0.8] h-full">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                    type="text"
                    placeholder="Search by city or address..."
                    value={search.searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    className="pl-10 h-full text-base"
                />
            </div>
            <div className="relative flex-[0.2] flex justify-evenly items-center border rounded-md p-2 h-full ">
                <p className="text-lg text-muted-foreground">With in</p>
                <DropDown 
                    values={Object.values(RadiusType)}
                    selectedValue={search.radiusType}
                    setValue={setRadiusType}
                />
            </div>
        </div>
    )
}

export default SearchBar;