import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  ArrowRight,
  ArrowUpDown,
  Filter,
  Briefcase,
  Plane,
  Clock,
} from "lucide-react";
import { Button } from "../components/ui/button";

const API_BASE_URL = "http://localhost:5000"; // your Node backend

function useQueryParams() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function formatDate(dateStr) {
  if (!dateStr) return "--";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isInTimeRange(timeStr, range) {
  if (!range || range === "any") return true;
  const [h] = timeStr.split(":").map(Number);
  if (range === "morning") return h >= 5 && h < 12;
  if (range === "afternoon") return h >= 12 && h < 17;
  if (range === "evening") return h >= 17 && h < 21;
  if (range === "night") return h >= 21 || h < 5;
  return true;
}

// ---- helpers for sorting ----
function parseTimeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(":").map((v) => Number(v) || 0);
  return h * 60 + m;
}

function parseDurationToMinutes(durationStr) {
  if (!durationStr) return 0;
  if (typeof durationStr === "number") return durationStr;

  const text = String(durationStr);
  const hMatch = text.match(/(\d+)\s*h/);
  const mMatch = text.match(/(\d+)\s*m/);
  const h = hMatch ? Number(hMatch[1]) : 0;
  const m = mMatch ? Number(mMatch[1]) : 0;
  return h * 60 + m;
}

function getPriceForClass(flight, classType) {
  const raw =
    classType === "business"
      ? flight.businessPrice ?? flight.economyPrice
      : flight.economyPrice ?? flight.businessPrice;

  if (raw == null) return Infinity;

  if (typeof raw === "number") return raw;
  const num = Number(String(raw).replace(/[^\d]/g, ""));
  return Number.isNaN(num) ? Infinity : num;
}

function SearchResults() {
  const query = useQueryParams();

  const from = query.get("from") || "From";
  const to = query.get("to") || "To";
  const departureDate = query.get("departureDate");
  const returnDate = query.get("returnDate");
  const passengers = query.get("passengers") || "1";
  const classType = query.get("classType") || "economy";
  const tripType = query.get("tripType") || "oneWay";

  const [outboundFlights, setOutboundFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]); // ["nonstop", "stops"]
  const [timeRange, setTimeRange] = useState("any");

  // UI: filter + sort
  const [showFilters, setShowFilters] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortBy, setSortBy] = useState(""); // "", "priceAsc", "time", "duration"

  const fromCode =
    from.split(",")[1]?.trim()?.toUpperCase() ||
    from.trim().slice(0, 3).toUpperCase() ||
    "DEL";
  const toCode =
    to.split(",")[1]?.trim()?.toUpperCase() ||
    to.trim().slice(0, 3).toUpperCase() ||
    "BOM";

  // ---- Fetch flights from backend (with mock fallback) ----
  useEffect(() => {
    async function fetchFlights() {
      setLoading(true);
      setError("");

      try {
        const resOut = await fetch(
          `${API_BASE_URL}/api/flights/search?from=${fromCode}&to=${toCode}&date=${departureDate}`
        );
        let outData;
        if (resOut.ok) {
          outData = await resOut.json();
        } else {
          throw new Error("Outbound search failed");
        }

        let retData = [];
        if (tripType === "roundTrip" && returnDate) {
          const resRet = await fetch(
            `${API_BASE_URL}/api/flights/search?from=${toCode}&to=${fromCode}&date=${returnDate}`
          );
          if (resRet.ok) {
            retData = await resRet.json();
          } else {
            throw new Error("Return search failed");
          }
        }

        setOutboundFlights(outData);
        setReturnFlights(retData);
      } catch (err) {
        console.error(err);
        setError("Could not fetch live flights. Showing demo results.");
        const mockOut = [
          {
            id: 1,
            airline: "Airstro",
            flightNo: "AS 201",
            fromCode,
            toCode,
            departTime: "17:00",
            arriveTime: "19:25",
            duration: "02h 25m",
            nonStop: true,
            economyPrice: "₹7,699",
            businessPrice: "₹28,534",
          },
          {
            id: 2,
            airline: "Airstro",
            flightNo: "AS 305",
            fromCode,
            toCode,
            departTime: "20:30",
            arriveTime: "22:55",
            duration: "02h 25m",
            nonStop: true,
            economyPrice: "₹8,199",
            businessPrice: "₹29,999",
          },
        ];

        const mockRet =
          tripType === "roundTrip"
            ? [
                {
                  id: 3,
                  airline: "Airstro",
                  flightNo: "AS 402",
                  fromCode: toCode,
                  toCode: fromCode,
                  departTime: "10:15",
                  arriveTime: "12:40",
                  duration: "02h 25m",
                  nonStop: true,
                  economyPrice: "₹7,499",
                  businessPrice: "₹27,999",
                },
              ]
            : [];

        setOutboundFlights(mockOut);
        setReturnFlights(mockRet);
      } finally {
        setLoading(false);
      }
    }

    if (departureDate) {
      fetchFlights();
    }
  }, [fromCode, toCode, departureDate, returnDate, tripType]);

  // Build airline list for filters
  const allAirlines = useMemo(() => {
    const set = new Set();
    [...outboundFlights, ...returnFlights].forEach((f) =>
      f.airline ? set.add(f.airline) : null
    );
    return Array.from(set);
  }, [outboundFlights, returnFlights]);

  const toggleAirline = (airline) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline)
        ? prev.filter((a) => a !== airline)
        : [...prev, airline]
    );
  };

  const toggleStops = (value) => {
    setSelectedStops((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const applyFilters = (flights) =>
    flights.filter((f) => {
      if (selectedAirlines.length && !selectedAirlines.includes(f.airline))
        return false;

      if (selectedStops.length) {
        const isNonStop = f.nonStop || f.stops === 0;
        if (
          isNonStop &&
          !selectedStops.includes("nonstop") &&
          selectedStops.includes("stops")
        ) {
          return false;
        }
        if (
          !isNonStop &&
          !selectedStops.includes("stops") &&
          selectedStops.includes("nonstop")
        ) {
          return false;
        }
      }

      if (!isInTimeRange(f.departTime || "00:00", timeRange)) return false;

      return true;
    });

  // ---- Sorting ----
  const sortFlights = (flights) => {
    const arr = [...flights];
    if (sortBy === "priceAsc") {
      arr.sort(
        (a, b) => getPriceForClass(a, classType) - getPriceForClass(b, classType)
      );
    } else if (sortBy === "time") {
      arr.sort(
        (a, b) =>
          parseTimeToMinutes(a.departTime) - parseTimeToMinutes(b.departTime)
      );
    } else if (sortBy === "duration") {
      arr.sort(
        (a, b) =>
          parseDurationToMinutes(a.duration) - parseDurationToMinutes(b.duration)
      );
    }
    return arr;
  };

  const filteredOutbound = sortFlights(applyFilters(outboundFlights));
  const filteredReturn = sortFlights(applyFilters(returnFlights));

  const activeClassLabel =
    classType === "business" ? "Stretch | Business" : "Economy";

  const sortLabel =
    sortBy === "priceAsc"
      ? "Price (Low → High)"
      : sortBy === "time"
      ? "Departure time"
      : sortBy === "duration"
      ? "Duration"
      : "Sort";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f3ff] to-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-6">
        {/* Top summary bar */}
        <div className="bg-white rounded-full shadow-md px-6 py-3 flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
            <span className="font-semibold">
              {from || "From"}{" "}
              <ArrowRight className="inline-block h-4 w-4 mx-1" /> {to || "To"}
            </span>
            <span className="text-gray-500">• {formatDate(departureDate)}</span>
            {tripType === "roundTrip" && (
              <span className="text-gray-500">
                • Return: {formatDate(returnDate)}
              </span>
            )}
            <span className="text-gray-500">
              • {passengers} {passengers === "1" ? "Passenger" : "Passengers"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs md:text-sm">
            <span className="px-3 py-1 rounded-full border border-gray-200 text-gray-600">
              {activeClassLabel}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-4 text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {/* Main layout: sidebar + results */}
        <div
          className={`grid grid-cols-1 gap-4 ${
            showFilters ? "lg:grid-cols-[260px,1fr]" : ""
          }`}
        >
          {/* Desktop sidebar (only lg+) */}
          {showFilters && (
            <FilterPanel
              className="hidden lg:block"
              allAirlines={allAirlines}
              selectedAirlines={selectedAirlines}
              toggleAirline={toggleAirline}
              selectedStops={selectedStops}
              toggleStops={toggleStops}
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              onApply={() => setShowFilters(false)}
            />
          )}

          {/* Results area */}
          <section className="space-y-4">
            {/* Top filters row (sort + quick chips) */}
            <div className="bg-white rounded-2xl shadow-md p-4 mb-2">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2 text-xs md:text-sm">
                    <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700">
                      Stretch | Business
                    </button>
                    <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700">
                      Non-stop
                    </button>
                    <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700">
                      Low cost first
                    </button>
                    <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700">
                      Day departures
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs md:text-sm relative">
                    {/* Sort button + dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowSortMenu((prev) => !prev)}
                        className="flex items-center gap-1 px-3 py-2 rounded-full bg-gray-100 text-gray-700"
                      >
                        <ArrowUpDown className="h-4 w-4" />
                        {sortLabel}
                      </button>

                      {showSortMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 text-xs">
                          <button
                            className={`block w-full text-left px-3 py-2 hover:bg-gray-50 ${
                              sortBy === "priceAsc"
                                ? "font-semibold text-[#0000cc]"
                                : "text-gray-700"
                            }`}
                            onClick={() => {
                              setSortBy("priceAsc");
                              setShowSortMenu(false);
                            }}
                          >
                            Price (Low → High)
                          </button>
                          <button
                            className={`block w-full text-left px-3 py-2 hover:bg-gray-50 ${
                              sortBy === "time"
                                ? "font-semibold text-[#0000cc]"
                                : "text-gray-700"
                            }`}
                            onClick={() => {
                              setSortBy("time");
                              setShowSortMenu(false);
                            }}
                          >
                            Departure time
                          </button>
                          <button
                            className={`block w-full text-left px-3 py-2 hover:bg-gray-50 ${
                              sortBy === "duration"
                                ? "font-semibold text-[#0000cc]"
                                : "text-gray-700"
                            }`}
                            onClick={() => {
                              setSortBy("duration");
                              setShowSortMenu(false);
                            }}
                          >
                            Duration
                          </button>
                          <button
                            className={`block w-full text-left px-3 py-2 hover:bg-gray-50 text-gray-500 ${
                              !sortBy ? "font-semibold" : ""
                            }`}
                            onClick={() => {
                              setSortBy("");
                              setShowSortMenu(false);
                            }}
                          >
                            Clear sort
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Filter toggle button */}
                    <button
                      type="button"
                      onClick={() => setShowFilters((prev) => !prev)}
                      className="flex items-center gap-1 px-3 py-2 rounded-full bg-gray-100 text-gray-700"
                    >
                      <Filter className="h-4 w-4" />
                      {showFilters ? "Hide Filters" : "Filter"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cabin selection row */}
            <div className="bg-white rounded-2xl shadow-md px-6 py-4 mb-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Briefcase className="h-4 w-4 text-[#1a1ab8]" />
                <span className="font-semibold">Fly Your Way</span>
                <span className="text-gray-500">
                  Select your preferred cabin & seats.
                </span>
              </div>
              <div className="flex gap-2 text-xs md:text-sm">
                <button
                  className={`px-4 py-2 rounded-full border ${
                    classType === "business"
                      ? "bg-[#1a1ab8] text-white border-[#1a1ab8]"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  Stretch | Business
                </button>
                <button
                  className={`px-4 py-2 rounded-full border ${
                    classType === "economy"
                      ? "bg-[#1a1ab8] text-white border-[#1a1ab8]"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  Economy
                </button>
              </div>
            </div>

            {/* Outbound flights */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <Clock className="h-4 w-4 text-[#1a1ab8]" />
                <span>
                  {formatDate(departureDate)} • Outbound ({fromCode} → {toCode})
                </span>
              </div>

              {loading && filteredOutbound.length === 0 ? (
                <p className="text-sm text-gray-500">Loading flights…</p>
              ) : filteredOutbound.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No outbound flights found for selected filters.
                </p>
              ) : (
                filteredOutbound.map((flight) => (
                  <FlightCard
                    key={flight._id || flight.id}
                    flight={flight}
                    classType={classType}
                    tripType={tripType}
                    passengers={passengers}
                    departureDate={departureDate}
                    returnDate={returnDate}
                  />
                ))
              )}
            </div>

            {/* Return flights for round trip */}
            {tripType === "roundTrip" && (
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <Clock className="h-4 w-4 text-[#1a1ab8]" />
                  <span>
                    {formatDate(returnDate)} • Return ({toCode} → {fromCode})
                  </span>
                </div>

                {loading && filteredReturn.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Loading return flights…
                  </p>
                ) : filteredReturn.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No return flights found for selected filters.
                  </p>
                ) : (
                  filteredReturn.map((flight) => (
                    <FlightCard
                      key={flight._id || flight.id}
                      flight={flight}
                      classType={classType}
                      tripType={tripType}
                      passengers={passengers}
                      departureDate={departureDate}
                      returnDate={returnDate}
                    />
                  ))
                )}
              </div>
            )}
          </section>
        </div>

        {/* Mobile filter overlay */}
        {showFilters && (
          <div
            className="fixed inset-0 z-40 bg-black/40 flex items-end lg:hidden"
            onClick={() => setShowFilters(false)}
          >
            <div
              className="w-full bg-transparent px-3 pb-5"
              onClick={(e) => e.stopPropagation()}
            >
              <FilterPanel
                className="bg-white rounded-2xl shadow-md p-4 max-h-[80vh] overflow-y-auto"
                allAirlines={allAirlines}
                selectedAirlines={selectedAirlines}
                toggleAirline={toggleAirline}
                selectedStops={selectedStops}
                toggleStops={toggleStops}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                onApply={() => setShowFilters(false)}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

/* ------------- Filter Panel component (shared by desktop + mobile) ------------- */
function FilterPanel({
  className = "",
  allAirlines,
  selectedAirlines,
  toggleAirline,
  selectedStops,
  toggleStops,
  timeRange,
  setTimeRange,
  onApply,
}) {
  return (
    <aside className={className}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#1a1ab8]" />
          <h2 className="text-sm font-semibold text-gray-800">Filters</h2>
        </div>
      </div>

      {/* Airlines */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-500 mb-2">AIRLINES</h3>
        {allAirlines.length === 0 && (
          <p className="text-xs text-gray-400">No airlines found.</p>
        )}
        <div className="space-y-1">
          {allAirlines.map((airline) => (
            <label
              key={airline}
              className="flex items-center gap-2 text-xs text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedAirlines.includes(airline)}
                onChange={() => toggleAirline(airline)}
              />
              <span>{airline}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Stops */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-500 mb-2">STOPS</h3>
        <div className="space-y-1 text-xs text-gray-700">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedStops.includes("nonstop")}
              onChange={() => toggleStops("nonstop")}
            />
            <span>Non-stop</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedStops.includes("stops")}
              onChange={() => toggleStops("stops")}
            />
            <span>1+ Stops</span>
          </label>
        </div>
      </div>

      {/* Departure time */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-500 mb-2">
          DEPARTURE TIME
        </h3>
        <div className="space-y-1 text-xs text-gray-700">
          {[
            ["any", "Any time"],
            ["morning", "Morning (5–12)"],
            ["afternoon", "Afternoon (12–17)"],
            ["evening", "Evening (17–21)"],
            ["night", "Night (21–5)"],
          ].map(([value, label]) => (
            <label
              key={value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="timeRange"
                value={value}
                checked={timeRange === value}
                onChange={() => setTimeRange(value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <Button
        className="mt-2 w-full bg-[#0000cc] hover:bg-[#0000aa] text-white h-9 text-sm"
        onClick={onApply}
      >
        Apply Filters
      </Button>
    </aside>
  );
}

/* ---------------------- Flight + Book button ---------------------- */
function FlightCard({
  flight,
  classType,
  tripType,
  passengers,
  departureDate,
  returnDate,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Left: timings */}
      <div className="flex items-center gap-6">
        <div className="text-xs text-gray-500 flex flex-col items-center gap-1">
          <Plane className="h-4 w-4" />
          <span>{flight.flightNo}</span>
          <span>{flight.airline}</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-6 text-sm md:text-base">
            <div>
              <div className="font-semibold text-lg">
                {flight.departTime || "--:--"}
              </div>
              <div className="text-xs text-gray-500">
                {flight.fromCode || "--"}
              </div>
            </div>

            <div className="text-center text-xs text-gray-500">
              <div>{flight.duration || "--"}</div>
              <div>{flight.nonStop ? "Non-stop" : "With stops"}</div>
            </div>

            <div>
              <div className="font-semibold text-lg">
                {flight.arriveTime || "--:--"}
              </div>
              <div className="text-xs text-gray-500">
                {flight.toCode || "--"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: price */}
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs uppercase text-gray-500 tracking-wide">
          {classType === "business" ? "Stretch | Business" : "Economy"}
        </span>
        <div className="text-sm text-gray-500">Starts at</div>
        <div className="text-2xl font-bold text-[#1a1ab8]">
          {classType === "business"
            ? flight.businessPrice || flight.economyPrice
            : flight.economyPrice || flight.businessPrice}
        </div>

        <BookButton
          flight={flight}
          classType={classType}
          tripType={tripType}
          passengers={passengers}
          departureDate={departureDate}
          returnDate={returnDate}
        />

        <div className="text-[11px] text-green-600">
          + Earn Airstro points
        </div>
      </div>
    </div>
  );
}

function BookButton({
  flight,
  classType,
  tripType,
  passengers,
  departureDate,
  returnDate,
}) {
  const { token } = useAuth();
  const navigate = useNavigate();

  const isDemoFlight = !flight._id; // mock flights don’t have _id

  const handleBook = async () => {
    if (isDemoFlight) {
      return alert(
        "These are demo flights only. Try again with real search data to book."
      );
    }

    if (!token) {
      return navigate("/login");
    }

    const body = {
      flightId: flight._id,
      tripType,
      classType,
      passengers: Number(passengers),
      departureDate,
      returnDate: tripType === "roundTrip" ? returnDate : null,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");

      alert("Flight booked successfully!");
      navigate("/trips");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Button
      onClick={handleBook}
      disabled={isDemoFlight}
      className="mt-2 h-9 px-4 text-sm bg-[#1a1ab8] hover:bg-[#0000aa] text-white disabled:opacity-60"
    >
      {isDemoFlight ? "Demo Only" : "Select"}
    </Button>
  );
}

export default SearchResults;
