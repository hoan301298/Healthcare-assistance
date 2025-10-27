import { useState } from "react";
import { mapApiKey } from "@/constant";
import { Place } from "../models/search/Place";
import { useLocation } from "@/hooks/useLocation";
import {
    GoogleMap,
    Marker,
    InfoWindow,
    useJsApiLoader,
} from "@react-google-maps/api";

interface MapViewProps {
    places: Place[];
}

const containerStyle: React.CSSProperties = {
    height: "500px",
    width: "100%",
    marginBottom: "2rem",
};

const MapView: React.FC<MapViewProps> = ({ places }) => {
    const { mapLocation, isLoading, error } = useLocation();
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: mapApiKey,
    });
    
    if (!isLoaded) return <p>Loading map...</p>;
    if (error || loadError) return <p>Error loading map</p>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapLocation.center}
            zoom={mapLocation.zoom}
        >
            {places.map((place) => (
                <Marker
                    key={place.id}
                    title="Marker"
                    position={{
                        lat: place.location.latitude,
                        lng: place.location.longitude
                    }}
                    onClick={() => setSelectedPlace(place)}
                />
            ))}

            {selectedPlace && (
                <InfoWindow
                    position={{
                        lat: selectedPlace.location.latitude,
                        lng: selectedPlace.location.longitude
                    }}
                    onCloseClick={() => setSelectedPlace(null)}
                >
                    <div>
                        <h3>{selectedPlace.detail.name}</h3>
                        <p>{selectedPlace.formattedAddress}</p>
                        <p>{(selectedPlace.distance / 1000).toFixed(2)} km</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default MapView;