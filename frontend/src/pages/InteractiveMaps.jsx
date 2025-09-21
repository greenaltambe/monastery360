import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

// Fix for default marker icon not showing up
// This is a common issue with react-leaflet and webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const InteractiveMaps = () => {
  const [monasteries, setMonasteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonasteries = async () => {
      try {
        const response = await fetch(
          "http://localhost:5002/api/monasteries/getwithlocation"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMonasteries(data.monasteries);
      } catch (err) {
        console.error("Failed to fetch monasteries:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMonasteries();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-xl font-semibold text-red-500">
        Error loading map: {error}
      </div>
    );
  }

  return (
    <div className="w-screen h-[calc(100vh-64px)]">
      <MapContainer
        center={[27.35, 88.39]}
        zoom={8}
        style={{ height: "100%", width: "100%" }}
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
        {monasteries.map((monastery) => (
          <Marker
            key={monastery._id}
            position={[
              monastery.location.latitude,
              monastery.location.longitude,
            ]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{monastery.name}</h3>
                {monastery.year && (
                  <p className="text-sm">Built: {monastery.year}</p>
                )}
                {monastery.image && (
                  <img
                    src={monastery.image}
                    alt={monastery.name}
                    className="mt-2 rounded-lg w-full h-24 object-cover"
                  />
                )}
                {monastery.description && (
                  <p className="mt-2 text-sm text-gray-600">
                    {String(monastery.description).substring(0, 100) + "..."}
                  </p>
                )}
                <Link to={`/monastery/${monastery._id}`}>
                  <button className="mt-3 inline-block text-sm text-blue-500 hover:text-blue-700 font-semibold">
                    View Details
                  </button>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMaps;
