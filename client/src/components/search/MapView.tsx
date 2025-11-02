import { useEffect, useRef, useState } from "react";
import { mapApiKey } from "@/constant";
import { Place } from "../models/search/Place";
import { useLocation } from "@/hooks/useLocation";
import { defaultMapLocation } from "@/state/searchSlice";

interface MapViewProps {
  places: Place[];
}

const containerStyle: React.CSSProperties = {
  height: "500px",
  width: "100%",
  marginBottom: "2rem",
};

const MapView: React.FC<MapViewProps> = ({ places }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const infoWindowsRef = useRef<google.maps.InfoWindow[]>([]);
  const { mapLocation, error } = useLocation();
  const [isReady, setIsReady] = useState(false);

  // Load Google Maps script
  useEffect(() => {
    const existingScript = document.querySelector(
      `script[src*="maps.googleapis.com/maps/api/js"]`
    );

    if (existingScript) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.body.appendChild(script);
  }, []);

  // Initialize map once
  async function initMap() {
    if (!mapRef.current) return;

    const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

    const map = new Map(mapRef.current, {
      zoom: mapLocation?.zoom || defaultMapLocation.zoom,
      center: mapLocation?.center || defaultMapLocation.center,
      mapId: "DEMO_MAP_ID",
    });

    mapInstanceRef.current = map;
    setIsReady(true);
  }

  // Update markers + InfoWindows whenever `places` changes
  useEffect(() => {
    if (!isReady || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    const { AdvancedMarkerElement } = google.maps.marker as google.maps.MarkerLibrary;

    // Clear old markers and InfoWindows
    markersRef.current.forEach((marker) => (marker.map = null));
    infoWindowsRef.current.forEach((info) => info.close());
    markersRef.current = [];
    infoWindowsRef.current = [];

    // Add new markers
    places.forEach((place) => {
      if (place.location?.latitude && place.location?.longitude) {
        const position = {
          lat: place.location.latitude,
          lng: place.location.longitude,
        };

        const marker = new AdvancedMarkerElement({
          map,
          position,
          title: place.displayName?.text || "Place",
        });

        // Create InfoWindow
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="font-family:Arial;padding:6px 10px;">
              <h3 style="margin:0;font-size:16px;">${place.displayName?.text || "Unnamed Place"}</h3>
              <p style="margin:2px 0;">${place.formattedAddress || "No address available"}</p>
              ${
                place.distance
                  ? `<p style="margin:2px 0;">${(place.distance / 1000).toFixed(2)} km away</p>`
                  : ""
              }
            </div>
          `,
        });

        // Add click event to open InfoWindow
        marker.addListener("click", () => {
          // Close other open info windows
          infoWindowsRef.current.forEach((info) => info.close());
          infoWindow.open({ anchor: marker, map });
        });

        markersRef.current.push(marker);
        infoWindowsRef.current.push(infoWindow);
      }
    });

    // Optionally center map on first place
    if (places.length > 0) {
      map.setCenter({
        lat: places[0].location.latitude,
        lng: places[0].location.longitude,
      });
      map.setZoom(13);
    }
  }, [places, isReady]);

  // Update map center when user location changes
  useEffect(() => {
    if (!isReady || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    map.setCenter(mapLocation?.center || defaultMapLocation.center);
    map.setZoom(mapLocation?.zoom || defaultMapLocation.zoom);
  }, [mapLocation, isReady]);

  return (
    <div>
      {error && <p>Error loading location</p>}
      <div ref={mapRef} style={containerStyle} />
    </div>
  );
};

export default MapView;