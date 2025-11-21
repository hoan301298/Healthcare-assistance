import Navbar from '@/components/Navbar';
import MapView from '@/components/search/MapView';
import PlaceList from '@/components/search/PlaceList';
import usePlaces from '@/hooks/search/usePlaces';
import SearchBar from '@/components/search/SearchBar';
import SelectionBar from '@/components/search/SelectionBar';

const Search = () => {
  const { places } = usePlaces();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Find Healthcare Facilities</h1>
          <p className="text-lg text-muted-foreground">
            Search and discover the best medical places near you
          </p>
        </div>
        <SearchBar />
        <MapView places={places} />
        <SelectionBar />
        {places && <PlaceList places={places} />}
      </div>
    </div>
  );
};

export default Search;