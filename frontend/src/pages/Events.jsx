import React, { useState, useEffect } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import Loader from "../components/Loader";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/events/getall");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data.events);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleAddToCalendar = (event) => {
    const formattedDate = event.date.replace(/-/g, ""); // Converts 'YYYY-MM-DD' to 'YYYYMMDD'
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${formattedDate}T000000/${formattedDate}T235959&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(event.location)}`;
    window.open(googleCalendarUrl, "_blank");
  };

  const getCalendarSymbol = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 inline-block ml-2 -mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Z"
        />
      </svg>
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-16">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <CalendarIcon className="h-20 w-20 text-orange-400 mb-4" />
          <h1 className="text-5xl font-extrabold tracking-tight text-white text-center">
            Monastery <span className="text-orange-400">Events</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl text-center">
            Stay updated with the vibrant cultural festivals and spiritual
            ceremonies happening at monasteries across Sikkim.
          </p>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="flex justify-center items-center text-xl font-semibold text-red-500">
            Error loading events: {error}
          </div>
        ) : events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {events.map((event) => (
              <div
                key={event._id}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900/20 via-gray-800/40 to-gray-900/60 backdrop-blur-sm p-8 shadow-2xl border border-amber-700/20 hover:border-amber-500/40 hover:shadow-amber-500/10 hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                {/* Decorative background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex-grow">
                    <div
                      className="w-full h-48 rounded-xl mb-4 bg-cover bg-center"
                      style={{ backgroundImage: `url(${event.image})` }}
                    ></div>
                    <h2 className="text-2xl font-bold text-amber-50 mb-2 group-hover:text-white transition-colors duration-300">
                      {event.title}
                    </h2>
                    <p className="text-sm text-amber-100/70 mb-1">
                      📅 {event.date}
                    </p>
                    <p className="text-sm text-amber-100/70 mb-3">
                      📍 {event.location}
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed group-hover:text-amber-50/90 transition-colors duration-300">
                      {event.description}
                    </p>
                  </div>
                  <button
                    className="mt-6 w-full rounded-lg bg-orange-600 px-6 py-3 text-base font-semibold shadow-sm hover:bg-orange-700 transition-colors duration-300 flex items-center justify-center"
                    onClick={() => handleAddToCalendar(event)}
                  >
                    Add to Calendar
                    {getCalendarSymbol()}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center text-xl font-semibold text-gray-400">
            <p>No events found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
