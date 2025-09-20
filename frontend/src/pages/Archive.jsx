import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/outline";

const Archive = () => {
  const [monasteries, setMonasteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    const fetchMonasteries = async () => {
      try {
        const req_url = `http://localhost:5002/api/monasteries/getall?page=${page}&limit=${limit}`;
        const response = await axios.get(req_url);
        console.log(response.data);
        setMonasteries(response.data.monasteries);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonasteries();
  }, [page, limit]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {monasteries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {monasteries.map((monastery) => (
                <div key={monastery._id}>
                  <h2>{monastery.name}</h2>
                  <img src={monastery.images[0].url} alt={monastery.name} />
                </div>
              ))}
            </div>
          ) : (
            <p>No monasteries found</p>
          )}

          {/* Page Number */}
          <div className="flex justify-center items-center">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={
                page === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-orange-400 cursor-pointer"
              }
            >
              <BackwardIcon className="h-6 w-6" />
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={
                    pageNumber === page
                      ? "bg-orange-400 text-white px-2 py-1 rounded"
                      : "text-orange-400 px-2 py-1 rounded"
                  }
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={
                page === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-orange-400 cursor-pointer"
              }
            >
              <ForwardIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Archive;
