import { memo, useState } from "react";
import { mapApiKey } from "@/constant";
import { Facility } from "../models/Facility";
import { useLocation } from "@/hooks/useLocation";
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

interface MapViewProps {
    facilities: Facility[];
    address: string;
}

const containerStyle: React.CSSProperties = {
    height: "500px",
    width: "100%",
};

const MapViewComponent: React.FC<MapViewProps> = ({ facilities, address }) => {
    const { location, isLoading, error } = useLocation(address);
    const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

    const handleMarkerClick = (facility: Facility) => {
        setSelectedFacility(facility);
    };
    console.log(location)
    return (
        <LoadScript googleMapsApiKey={mapApiKey}>
            {location && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={location.center}
                    zoom={location.zoom}
                >
                    {/* {facilities && facilities.map((facility, index) => (
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
      prevProps.facilities === nextProps.facilities
);

export default MapView;