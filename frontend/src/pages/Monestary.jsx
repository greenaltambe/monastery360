import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  MapPinIcon,
  GlobeAltIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// A simple placeholder for the Loader component for consistent styling.
const Loader = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
  </div>
);

const Monestary = () => {
  const { monastery_id } = useParams();
  const [currentMonastery, setCurrentMonastery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchMonastery = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5002/api/monasteries/getone/${monastery_id}`
        );
        setCurrentMonastery(response.data);
      } catch (err) {
        console.error("Error fetching monastery details:", err);
        setError("Failed to fetch monastery details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMonastery();
  }, [monastery_id]);

  const handleImageChange = (index) => {
    if (
      currentMonastery.images &&
      index >= 0 &&
      index < currentMonastery.images.length
    ) {
      setImageIndex(index);
    }
  };

  const goToPrevImage = () => {
    setImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const goToNextImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex < currentMonastery.images.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500 text-lg p-8 rounded-lg bg-gray-800 shadow-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!currentMonastery) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-400 text-lg p-8 rounded-lg bg-gray-800 shadow-lg">
          No monastery found with that ID.
        </div>
      </div>
    );
  }

  // Build an embeddable Street View URL if possible
  const getEmbeddableStreetViewUrl = () => {
    const url = currentMonastery.virtualTourUrl || "";

    // If already an embeddable maps URL, use as-is
    if (/^https?:\/\/www\.google\.com\/maps\/embed\?/.test(url)) {
      return url;
    }

    // Some share links can be converted to embed by replacing /maps/ with /maps/embed?
    if (/^https?:\/\/(maps\.app\.goo\.gl|goo\.gl)\//.test(url)) {
      // Short links can't be deterministically expanded here; fall back to lat/lng below
    } else if (/^https?:\/\/www\.google\.com\/maps\//.test(url)) {
      try {
        const u = new URL(url);
        if (!u.pathname.includes("/embed")) {
          return `https://www.google.com/maps/embed?${u.searchParams.toString()}`;
        }
      } catch (_) {
        // ignore parse errors and fall through
      }
    }

    // If we have coordinates, construct a Street View embed without API key
    const lat = currentMonastery?.location?.latitude;
    const lng = currentMonastery?.location?.longitude;
    if (typeof lat === "number" && typeof lng === "number") {
      // Old but reliable Street View embed endpoint
      return `https://maps.google.com/maps?layer=c&cbll=${lat},${lng}&cbp=11,0,0,0,0&output=svembed`;
    }

    return null;
  };

  const streetViewSrc = getEmbeddableStreetViewUrl();

  return (
    <div className="relative pt-16 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Monastery Title and Heading Section */}
        <div className="bg-gray-800/60 p-8 rounded-2xl border border-amber-900/40 shadow-xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white drop-shadow-lg">
            {currentMonastery.name}
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-amber-400 drop-shadow-lg mt-2">
            {currentMonastery.heading}
          </h2>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4 bg-gray-800/60 p-6 rounded-2xl border border-amber-900/40 shadow-xl">
            <MapPinIcon className="w-8 h-8 text-amber-500" />
            <div>
              <p className="text-sm text-gray-400">District</p>
              <p className="text-lg font-bold">{currentMonastery.district}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-gray-800/60 p-6 rounded-2xl border border-amber-900/40 shadow-xl">
            <CalendarIcon className="w-8 h-8 text-amber-500" />
            <div>
              <p className="text-sm text-gray-400">Established</p>
              <p className="text-lg font-bold">{currentMonastery.year}</p>
            </div>
          </div>
          {currentMonastery.source && (
            <div className="flex items-center space-x-4 bg-gray-800/60 p-6 rounded-2xl border border-amber-900/40 shadow-xl">
              <GlobeAltIcon className="w-8 h-8 text-amber-500" />
              <div>
                <p className="text-sm text-gray-400">Source</p>
                <a
                  href={currentMonastery.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold hover:text-amber-400 transition-colors"
                >
                  Official Website
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Monastery Images & Virtual Tour Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="space-y-6">
            <h3 className="text-3xl font-extrabold text-amber-400 mb-4">
              Image Gallery
            </h3>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={
                  currentMonastery.images[imageIndex]?.url ||
                  "https://placehold.co/1200x600?text=Monastery"
                }
                alt={currentMonastery.name}
                className="w-full h-96 object-cover object-center transition-opacity duration-300 cursor-pointer"
                onClick={() => openModal(currentMonastery.images[imageIndex])}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/1200x600?text=Image+Not+Available";
                }}
              />
              {/* Previous/Next Buttons */}
              {currentMonastery.images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevImage}
                    disabled={imageIndex === 0}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-900/40 text-white hover:bg-gray-900/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeftIcon className="w-6 h-6" />
                  </button>
                  <button
                    onClick={goToNextImage}
                    disabled={imageIndex === currentMonastery.images.length - 1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-900/40 text-white hover:bg-gray-900/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            {/* Image Thumbnails */}
            {currentMonastery.images.length > 1 && (
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {currentMonastery.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleImageChange(index);
                    }}
                    className={`overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                      index === imageIndex
                        ? "border-amber-400 scale-110 shadow-lg"
                        : "border-gray-700 hover:border-amber-400"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-20 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Virtual Tour Section */}
          <div>
            <h3 className="text-3xl font-extrabold text-amber-400 mb-4">
              Virtual Tour
            </h3>
            {streetViewSrc ? (
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-amber-900/40 bg-gray-800/60">
                  <iframe
                    title={`Street View of ${currentMonastery.name}`}
                    src={streetViewSrc}
                    width="100%"
                    height="420"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                {currentMonastery.virtualTourUrl && (
                  <div className="text-center">
                    <a
                      href={currentMonastery.virtualTourUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold"
                    >
                      <PlayCircleIcon className="h-6 w-6" />
                      Open in Google Maps
                    </a>
                  </div>
                )}
              </div>
            ) : currentMonastery.virtualTourUrl ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 rounded-3xl bg-gray-800/60 border border-amber-900/40">
                <a
                  href={currentMonastery.virtualTourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 text-lg font-bold hover:text-amber-300"
                >
                  <PlayCircleIcon className="h-20 w-20 text-gray-500 mb-4" />
                  Watch Virtual Tour on a separate page
                </a>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 rounded-3xl bg-gray-800/60 border border-amber-900/40">
                <PlayCircleIcon className="h-20 w-20 text-gray-500 mb-4" />
                <p className="text-gray-400 text-lg font-semibold">
                  Virtual Tour not available for this monastery.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-6">
          <h3 className="text-3xl font-extrabold text-amber-400 mb-4">
            About {currentMonastery.name}
          </h3>
          {currentMonastery.description.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed text-gray-300">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Full-screen Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeModal}
        >
          <div className="relative p-4 sm:p-6 lg:p-8 max-w-7xl max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors p-2 rounded-full bg-gray-800/50"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>
            <img
              src={modalImage.url}
              alt={currentMonastery.name}
              className="object-contain w-full h-full rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Monestary;
