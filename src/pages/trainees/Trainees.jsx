import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { ar, en } from "../../assets/langs/translation";
import TraineeCard from "../../components/trainee/TraineeCard";
import { Helmet } from "react-helmet";
import server from "../../assets/axios/server";
import { debounce } from "lodash";

const Trainees = () => {
  const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [last_page, setLastPage] = useState(1);
  const [totalTrainers, setTotalTrainers] = useState(0);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch trainee data from backend
  const fetchTrainees = useCallback(
    async (searchTerm) => {
      setLoading(true);
      setError(null);
      try {
        const response = await server.get("/trainers", {
          params: {
            search: searchTerm,
            page: currentPage,
            country_id: selectedCountry,
          },
        });
        setTrainers(response.data.trainers);
        setLastPage(response.data.pagination?.last_page || 1);
        setTotalTrainers(response.data.pagination?.totalItems || 0);
      } catch (error) {
        console.error("Error fetching trainees:", error);
        setError(error.message || "Failed to fetch trainees");
      } finally {
        setLoading(false);
      }
    },
    [currentPage, selectedCountry]
  );

  // Fetch countries for dropdown
  useEffect(() => {
    server
      .get(`/countries-api`)
      .then((res) => {
        setCountries(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      setCurrentPage(1); // Reset to first page on new search
      fetchTrainees(searchTerm);
    }, 500),
    [fetchTrainees]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    debouncedSearch(searchTerm);
  };

  // Handle country change
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setCurrentPage(1); // Reset to first page on new filter
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > last_page) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Initial data load
  useEffect(() => {
    fetchTrainees(search);
  }, [fetchTrainees, currentPage, selectedCountry]);

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = window.innerWidth < 640 ? 3 : 5; // Fewer buttons on mobile

    // Always show first page
    if (last_page > maxVisibleButtons && currentPage > 3) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white text-sky-600 hover:bg-sky-50 border border-sky-200 transition-all duration-200 text-sm sm:text-base"
        >
          1
        </button>
      );

      // Add ellipsis if needed
      if (currentPage > 4) {
        buttons.push(
          <span key="ellipsis1" className="px-1 sm:px-2">
            ...
          </span>
        );
      }
    }

    // Calculate range of visible page buttons
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    let endPage = Math.min(last_page, startPage + maxVisibleButtons - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // Add visible page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-sm sm:text-base ${
            currentPage === i
              ? "bg-sky-600 text-white"
              : "bg-white text-sky-600 hover:bg-sky-50 border border-sky-200"
          } transition-all duration-200`}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis and last page if needed
    if (last_page > maxVisibleButtons && currentPage < last_page - 2) {
      if (currentPage < last_page - 3) {
        buttons.push(
          <span key="ellipsis2" className="px-1 sm:px-2">
            ...
          </span>
        );
      }

      buttons.push(
        <button
          key={last_page}
          onClick={() => handlePageChange(last_page)}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white text-sky-600 hover:bg-sky-50 border border-sky-200 transition-all duration-200 text-sm sm:text-base"
        >
          {last_page}
        </button>
      );
    }

    return buttons;
  };

  return (
    <main className="container mx-auto mb-10">
      {/* helmet to change page head */}
      <Helmet>
        <title>SportsIn - Trainers</title>
      </Helmet>

      <section className="w-full mt-10">
        <div className="w-full bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-bold mb-5 text-sky-900 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
            {currentLang.filters || "Filters"}
          </h3>
          <div className="w-full flex items-center justify-center gap-3 flex-col md:flex-row">
            <div className="mb-4 w-full md:w-3/4 ">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  className="w-full pl-10 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder={`${currentLang.search || "Search"} (${
                    currentLang.name
                  }, ${currentLang.certificates})`}
                  onChange={handleSearchChange}
                  value={search}
                />
              </div>
            </div>
            <div className="mb-4 w-full md:w-1/4">
              <select
                id="country"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                onChange={handleCountryChange}
                value={selectedCountry}
              >
                <option value="">
                  {currentLang.location || "Country"} -{" "}
                  {currentLang.all || currentLang.all}
                </option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col items-center justify-center mt-10">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4 text-left">
            {currentLang.trainersTitle}
          </h2>
          {!loading && !error && totalTrainers > 0 && (
            <p className="text-gray-600">
              {totalTrainers} {currentLang.results || "results"}
            </p>
          )}
        </div>

        {loading && (
          <div className="w-full text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
            <p className="mt-2 text-gray-600">
              {currentLang.loading || "Loading..."}
            </p>
          </div>
        )}

        {error && (
          <div className="w-full text-center py-8 text-red-500">{error}</div>
        )}

        {!loading && !error && trainers.length === 0 && (
          <div className="w-full text-center py-8 text-gray-600">
            {currentLang.noResults || "No results found"}
          </div>
        )}

        <div className="flex items-start w-full mx-auto justify-center gap-[clamp(10px,1.0416666666666665vw,15px)] flex-wrap ">
          {trainers.map((trainee, index) => {
            return <TraineeCard key={index} trainee={trainee} />;
          })}
        </div>
      </section>

      {/* Pagination Section */}
      {!loading && !error && trainers.length > 0 && (
        <div className="w-full flex justify-center mt-8 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-lg border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-sky-600 hover:bg-sky-50 border-sky-200"
              } transition-all duration-200`}
            >
              <span className="flex items-center gap-1">
                {lang === "ar" ? (
                  <i className="fas fa-chevron-right text-xs"></i>
                ) : (
                  <i className="fas fa-chevron-left text-xs"></i>
                )}
                <span className="hidden sm:inline">{currentLang.prev}</span>
              </span>
            </button>

            <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2">
              {renderPaginationButtons()}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === last_page}
              className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-lg border ${
                currentPage === last_page
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-sky-600 hover:bg-sky-50 border-sky-200"
              } transition-all duration-200`}
            >
              <span className="flex items-center gap-1">
                <span className="hidden sm:inline">{currentLang.next}</span>
                {lang === "ar" ? (
                  <i className="fas fa-chevron-left text-xs"></i>
                ) : (
                  <i className="fas fa-chevron-right text-xs"></i>
                )}
              </span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Trainees;
