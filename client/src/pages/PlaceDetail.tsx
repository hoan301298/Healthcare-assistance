import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { Place } from '@/components/models/search/Place';
import useSearch from '@/hooks/useSearch';
import BookingSection from '@/components/place_detail/BookingSection';
import Assistance from '@/components/helper/Assistance';
import SideBar from '@/components/place_detail/SideBar';
import NotFound from './NotFound';
import Description from '@/components/place_detail/Description';

const PlacesDetail = () => {
  const { search } = useSearch();
  const { id } = useParams();

  const place: Place = search?.places?.find((p) => p.id === id);

  if (!place) {
    return <NotFound href="/search" label='Back to search page' />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Link to="/search">
          <Button variant="outline" className="mb-6">
            ← Back to Search
          </Button>
        </Link>
        <div className="grid lg:grid-cols-3 gap-8">
          <Description place={place} />
          <div className="space-y-6">
            <BookingSection id={place.id} />
            <SideBar place={place} />
            <Assistance />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacesDetail;
