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

  useEffect(() => {
    if (!isReady || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    const { AdvancedMarkerElement } = google.maps.marker as google.maps.MarkerLibrary;

    markersRef.current.forEach((marker) => (marker.map = null));
    infoWindowsRef.current.forEach((info) => info.close());
    markersRef.current = [];
    infoWindowsRef.current = [];

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

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="font-family:Arial;padding:6px 10px;">
              <h3 style="margin:0;font-size:16px;">${place.displayName?.text || "Unnamed Place"}</h3>
              <p style="margin:2px 0;">${place.formattedAddress || "No address available"}</p>
              ${place.distance
              ? `<p style="margin:2px 0;">${(place.distance / 1000).toFixed(2)} km away</p>`
              : ""
            }
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindowsRef.current.forEach((info) => info.close());
          infoWindow.open({ anchor: marker, map });
        });

        markersRef.current.push(marker);
        infoWindowsRef.current.push(infoWindow);
      }
    });

    if (places.length > 0) {
      map.setCenter({
        lat: places[0].location.latitude,
        lng: places[0].location.longitude,
      });
      map.setZoom(13);
    }
  }, [places, isReady]);

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