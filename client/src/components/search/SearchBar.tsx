import { SearchIcon } from "lucide-react"
import { Input } from "../ui/input"
import useSearch from "@/hooks/useSearch"
import Selection from "./Selection";

const SearchBar = () => {
    const { search, setSearchQuery, setAddress } = useSearch();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return; // Exit early if it's not Enter

        e.preventDefault();
        const trimmedQuery = search.searchQuery.trim();

        if (trimmedQuery.length === 0) return; // Prevent empty searches

        setAddress(trimmedQuery);
    };
    
    return (
        <div className="mb-8 flex w-full items-center">
            <div className="relative flex-[0.7] ">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                    type="text"
                    placeholder="Search by city or address..."
                    value={search.searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    className="pl-10 h-12 text-base"
                />
            </div>
            <div className="relative flex-[0.3] ">
                <Selection label="radius" />
            </div>
        </div>
    )
}

export default SearchBar;