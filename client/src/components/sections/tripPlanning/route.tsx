import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

// Colors matched to your legend
const EVENT_COLORS: Record<string, string> = {
  Current: "#3b82f6", // blue
  Pickup: "#eab308", // amber/yellow
  Dropoff: "#10b981", // emerald/green
  "Fuel Stop": "#f43f5e", // rose/red
  "10 Minute Fuel Break": "#f43f5e",
  "30 Minute Break": "#9ca3af", // gray (Rest)
  "10 Hour Off Duty": "#9ca3af",
};

function createColoredIcon(color: string) {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: 20px;
        height: 20px;
        border-radius: 50% 50% 50% 0;
        background: ${color};
        transform: rotate(-45deg);
        border: 2px solid rgba(0,0,0,0.4);
        box-shadow: 0 2px 4px rgba(0,0,0,0.4);
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 20],
    popupAnchor: [0, -20],
  });
}

// Build once, outside the component, so icons aren't recreated every render
const ICONS: Record<string, L.DivIcon> = Object.fromEntries(
  Object.entries(EVENT_COLORS).map(([event, color]) => [
    event,
    createColoredIcon(color),
  ]),
);
const CURRENT_ICON = createColoredIcon(EVENT_COLORS.Current);
const DEFAULT_ICON = createColoredIcon("#9ca3af");

function FitBounds({ coordinates }: any) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    if (coordinates?.length) {
      map.fitBounds(coordinates, { padding: [50, 50] });
    }
  }, [coordinates, map]);
  return null;
}

export default function RouteMap({ route, stops }: any) {
  if (!route) return null;

  const coordinates = route.map(([lng, lat]: number[]) => [lat, lng]);

  const stopMarkers =
    stops?.filter(
      (stop: any) => stop.latitude != null && stop.longitude != null,
    ) || [];

  return (
    <MapContainer
      center={coordinates[0]}
      zoom={6}
      scrollWheelZoom={true}
      className="h-96 w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={coordinates} />
      <FitBounds coordinates={coordinates} />

      {coordinates.length > 0 && (
        <Marker position={coordinates[0]} icon={CURRENT_ICON}>
          <Popup>Current Location</Popup>
        </Marker>
      )}

      {coordinates.length > 1 && (
        <Marker position={coordinates.at(-1)} icon={ICONS["Dropoff"]}>
          <Popup>Final Destination</Popup>
        </Marker>
      )}

      {stopMarkers.map((stop: any, index: number) => (
        <Marker
          key={`${stop.event}-${stop.location ?? ""}-${index}`}
          position={[stop.latitude, stop.longitude]}
          icon={ICONS[stop.event] || DEFAULT_ICON}
        >
          <Popup>
            <p>{stop.event}</p>
            {stop.location && <p>{stop.location}</p>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
    