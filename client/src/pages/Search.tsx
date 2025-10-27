import Navbar from '@/components/Navbar';
import MapView from '@/components/search/MapView';
import PlaceList from '@/components/search/PlaceList';
import usePlaces from '@/hooks/usePlaces';
import SearchBar from '@/components/search/SearchBar';
import Selection from '@/components/search/Selection';

const Search = () => {
  const { places, isLoading, error } = usePlaces();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Find Healthcare Facilities</h1>
          <p className="text-lg text-muted-foreground">
            Search and discover the best medical places near you
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Map */}
        <MapView places={places} />

        {/* Filter Buttons */}
        <Selection label="type"/>

        <p className="text-muted-foreground my-6">
          Found {(places?.length ?? 0)} {(places?.length === 1 ? 'place' : 'places')}
        </p>

        {/* places Grid */}
        {places && <PlaceList places={places} />}
      </div>
    </div>
  );
};

export default Search;