// src/pages/CategoryPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export default function Category() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [airline, setAirline] = useState("");
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  // Booking modal states
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [seats, setSeats] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/flights");
        setFlights(res.data);
        setFilteredFlights(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load flights");
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let filtered = [...flights];
    if (from)
      filtered = filtered.filter((f) =>
        f.from.toLowerCase().includes(from.toLowerCase())
      );
    if (to)
      filtered = filtered.filter((f) =>
        f.to.toLowerCase().includes(to.toLowerCase())
      );
    if (airline)
      filtered = filtered.filter((f) =>
        f.airline.toLowerCase().includes(airline.toLowerCase())
      );
    if (date) {
      const start = new Date(date).setHours(0, 0, 0, 0);
      const end = new Date(date).setHours(23, 59, 59, 999);
      filtered = filtered.filter(
        (f) =>
          new Date(f.departureTime).getTime() >= start &&
          new Date(f.departureTime).getTime() <= end
      );
    }
    setFilteredFlights(filtered);
    if (filtered.length === 0) toast.info("No flights found for these filters");
  };

  const handleBooking = async () => {
    if (!selectedFlight) return toast.error("No flight selected");
    if (seats < 1) return toast.error("Seats must be at least 1");

    setBookingLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        { flightId: selectedFlight._id, seats },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Booking successful! Total: $${res.data.totalPrice}`);
      setSelectedFlight(null);
      setSeats(1);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
      <h1 className="text-4xl font-extrabold mb-8 text-black  border-b pb-4">
        Search Flights
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Airline"
          value={airline}
          onChange={(e) => setAirline(e.target.value)}
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-indigo-600   text-white px-4 py-2 rounded-md hover:bg-indigo-800 transition col-span-1 md:col-span-4"
        >
          Filter Flights
        </button>
      </form>

      {/* Flight Results */}
      {loading ? (
        <p className="text-gray-500">Loading flights...</p>
      ) : filteredFlights.length === 0 ? (
        <p className="text-gray-500 italic">
          No flights found. Try different filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFlights.map((f) => (
            <div
              key={f._id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              <h3 className="font-bold text-lg text-indigo-600  mb-2">{f.airline}</h3>
              <p className="text-sm text-gray-600 mb-1">
                {f.from} → {f.to}
              </p>
              <p className="text-sm text-gray-500">
                Departure: {new Date(f.departureTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Arrival: {new Date(f.arrivalTime).toLocaleString()}
              </p>
              <p className="text-sm font-semibold text-green-600">Price: ${f.price}</p>
              <p className="text-xs text-gray-400">Seats Available: {f.seatsAvailable}</p>

              <button
                onClick={() => setSelectedFlight(f)}
                className="mt-3 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedFlight && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">
              Booking: {selectedFlight.airline} ({selectedFlight.from} → {selectedFlight.to})
            </h2>
            <p>Price per seat: ${selectedFlight.price}</p>
            <p>Seats Available: {selectedFlight.seatsAvailable}</p>

            <div className="mt-3 flex items-center gap-2">
              <label className="font-semibold">Seats:</label>
              <input
                type="number"
                min={1}
                max={selectedFlight.seatsAvailable}
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className="border p-1 rounded w-20"
              />
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setSelectedFlight(null)}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={bookingLoading}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                {bookingLoading
                  ? "Booking..."
                  : `Confirm ($${seats * selectedFlight.price})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
