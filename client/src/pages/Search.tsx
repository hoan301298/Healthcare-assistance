import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import MapView from '@/components/search/MapView';
import PlaceList from '@/components/search/PlaceList';
import usePlaces from '@/hooks/usePlaces';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string | null>("");
  const [address, setAddress] = useState<string | null>("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const {
    places,
    isLoading,
    error
  } = usePlaces(address);

  const types = ['All', 'Hospital', 'Clinic', 'Dental', 'Medical Center', 'Urgent Care'];

  const filteredPlaces = places.filter((facility) => {
    const matchesSearch =
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = !selectedType || selectedType === 'All' || facility.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchQuery.trim() !== '') {
        setAddress(searchQuery);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Find Healthcare places</h1>
          <p className="text-lg text-muted-foreground">
            Search and discover the best medical places near you
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by city or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Map */}
        <div className='mb-8 flex justify-center'>
          <MapView places={places} address={address} />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {types.map((type) => (
            <Button
              key={type}
              variant={selectedType === type || (type === 'All' && !selectedType) ? 'default' : 'outline'}
              onClick={() => setSelectedType(type === 'All' ? null : type)}
              className={
                selectedType === type || (type === 'All' && !selectedType)
                  ? 'bg-primary hover:bg-primary-dark'
                  : ''
              }
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          Found {filteredplaces.length} {filteredplaces.length === 1 ? 'facility' : 'places'}
        </p>

        {/* places Grid */}
        <PlaceList filteredPlaces={filteredPlaces} />
      </div>
    </div>
  );
};

export default Search;