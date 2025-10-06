// src/pages/FlightPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export default function FlightPage() {
  const [bookedFlights, setBookedFlights] = useState([]);
  const [allFlights, setAllFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  // Booking modal states
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [seats, setSeats] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch all flights and bookings
  const fetchFlightsAndBookings = React.useCallback(async () => {
    try {
      setLoading(true);
      const [myBookingsRes, allFlightsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/bookings/my", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/flights"),
      ]);

      setBookedFlights(myBookingsRes.data);
      setAllFlights(allFlightsRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching flights");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchFlightsAndBookings();
  }, [token, fetchFlightsAndBookings]);

  // Book a flight
  const handleBooking = async () => {
    if (!selectedFlight) return toast.error("No flight selected");
    if (seats < 1) return toast.error("Seats must be at least 1");

    setBookingLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        { flightId: selectedFlight._id, seats },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Booking successful! Total: $${res.data.totalPrice}`);
      setSelectedFlight(null);
      setSeats(1);

      // Refetch bookings and flights to update state
      fetchFlightsAndBookings();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  // Cancel a booking
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking canceled successfully");

      // Refetch bookings and flights
      fetchFlightsAndBookings();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  return (

    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
      <h1 className="text-4xl font-extrabold mb-8 text-black border-b pb-4">
        My Flights & Available Flights
      </h1>

      {/* --- My Booked Flights --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-500">
          My Booked Flights
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : bookedFlights.length === 0 ? (
          <p className="text-gray-500 italic">
            You have no booked flights yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookedFlights.map((booking) => {
              const f = booking.flight;
              return (
                <div
                  key={booking._id}
                  className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105"
                >
                  <h3 className="font-bold text-lg text-indigo-600 mb-2">
                    {f.airline}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {f.from} → {f.to}
                  </p>
                  <p className="text-sm text-gray-500">
                    Departure: {new Date(f.departureTime).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Arrival: {new Date(f.arrivalTime).toLocaleString()}
                  </p>
                  <p className="text-sm font-semibold text-green-600">
                    Price: ${f.price}
                  </p>
                  <p className="text-xs text-gray-400">
                    Seats Booked: {booking.seats}
                  </p>

                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="mt-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Cancel Booking
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* --- All Available Flights --- */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-500">All Flights</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allFlights.map((f) => (
              <div
                key={f._id}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105"
              >
                <h3 className="font-bold text-lg text-indigo-600 mb-2">
                  {f.airline}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  {f.from} → {f.to}
                </p>
                <p className="text-sm text-gray-500">
                  Departure: {new Date(f.departureTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Arrival: {new Date(f.arrivalTime).toLocaleString()}
                </p>
                <p className="text-sm font-semibold text-green-600">
                  Price: ${f.price}
                </p>
                <p className="text-xs text-gray-400">
                  Seats Available: {f.seatsAvailable}
                </p>

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
      </section>

      {/* --- Booking Modal --- */}
      {selectedFlight && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">
              Booking: {selectedFlight.airline} ({selectedFlight.from} →{" "}
              {selectedFlight.to})
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
