import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const InteractiveMaps = () => {
  return (
    <MapContainer
      center={[27.35, 88.39]}
      zoom={8}
      style={{ height: "calc(100vh - 64px)", width: "100%", marginTop: "64px" }}
      maxBounds={[
        [26.5, 87.9],
        [28.2, 88.9],
      ]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[27.35, 88.39]}>
        <Popup>A pretty CSS3 popup. Easily customizable.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default InteractiveMaps;
