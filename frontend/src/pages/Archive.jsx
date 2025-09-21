import React, { useEffect, useState } from "react";
import axios from "axios";
import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/outline";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Archive = () => {
  const [monasteries, setMonasteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    const fetchMonasteries = async () => {
      setLoading(true);
      setError(null);
      try {
        const req_url = `http://localhost:5002/api/monasteries/getall?page=${page}&limit=${limit}&search=${debouncedSearch}`;
        const response = await axios.get(req_url);
        setMonasteries(response.data.monasteries);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch monasteries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMonasteries();
  }, [page, limit, debouncedSearch]);

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      <div className="container mx-auto">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-amber-400 mb-8 sm:mb-12">
          Archive
        </h1>

        {/* Search Bar always visible */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="🔍 Search monasteries..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full max-w-lg px-4 py-3 rounded-xl border border-amber-500/40 bg-gray-800/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300"
          />
        </div>

        {/* Loader below search */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg py-12">{error}</div>
        ) : monasteries.length > 0 ? (
          <>
            {/* Monasteries Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {monasteries.map((monastery) => (
                <div
                  key={monastery._id}
                  className="bg-gradient-to-br from-amber-900/20 via-gray-800/40 to-gray-900/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-700/20 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:border-amber-500/40 hover:shadow-amber-500/10 hover:shadow-2xl"
                >
                  <Link to={`/monastery/${monastery._id}`}>
                    <div className="h-48 sm:h-56 w-full overflow-hidden">
                      <img
                        src={
                          monastery.images[0]?.url ||
                          "https://placehold.co/400x200"
                        }
                        alt={monastery.name}
                        className="w-full h-full object-cover rounded-t-2xl"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/400x200";
                        }}
                      />
                    </div>
                    <div className="p-4 sm:p-6 text-center">
                      <h2 className="text-xl font-bold text-amber-50 mb-2">
                        {monastery.name}
                      </h2>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    page === 1
                      ? "text-gray-500 cursor-not-allowed"
                      : "text-amber-400 hover:bg-amber-100/10"
                  }`}
                  aria-label="Previous Page"
                >
                  <BackwardIcon className="h-6 w-6" />
                </button>
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${
                        pageNumber === page
                          ? "bg-amber-500 text-white shadow-md"
                          : "text-amber-400 hover:bg-amber-100/10"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    page === totalPages
                      ? "text-gray-500 cursor-not-allowed"
                      : "text-amber-400 hover:bg-amber-100/10"
                  }`}
                  aria-label="Next Page"
                >
                  <ForwardIcon className="h-6 w-6" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-400 text-lg py-12">
            No monasteries found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;
