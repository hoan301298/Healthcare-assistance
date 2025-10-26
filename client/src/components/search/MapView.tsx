import { memo, useState } from "react";
import { mapApiKey } from "@/constant";
import { Place } from "../models/place/Place";
import { useLocation } from "@/hooks/useLocation";
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

interface MapViewProps {
    places: Place[];
    address: string;
}

const containerStyle: React.CSSProperties = {
    height: "500px",
    width: "100%",
};

const MapViewComponent: React.FC<MapViewProps> = ({ places, address }) => {
    const { mapLocation, isLoading, error } = useLocation(address);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

    const handleMarkerClick = (place: Place) => {
        setSelectedPlace(place);
    };

    return (
        <LoadScript googleMapsApiKey={mapApiKey}>
            {mapLocation && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapLocation.center}
                    zoom={mapLocation.zoom}
                >
                    {/* {places && places.map((facility, index) => (
                        <Marker
                            key={index}
                            title="Marker"
                            position={facility.information.geometry.location}
                            onClick={() => handleMarkerClick(facility)}
                        />
                    ))} */}

                    {/* {selectedFacility && (
                        <InfoWindow
                            key={selectedFacility.information.place_id}
                            position={selectedFacility.information.geometry.location}
                            onCloseClick={() => setSelectedFacility(null)}
                        >
                            <div>
                                <h3>{selectedFacility.name}</h3>
                                <p>
                                    {selectedFacility.information.details.formatted_address}
                                </p>
                                <p>{selectedFacility.information.distance / 1000} km</p>
                            </div>
                        </InfoWindow>
                    )} */}
                </GoogleMap>
            )}
        </LoadScript>
    );
};

export const MapView = memo(
    MapViewComponent,
    (prevProps, nextProps) =>
      prevProps.address === nextProps.address &&
      prevProps.places === nextProps.places
);

export default MapView;