// src/components/BookingForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FlightCard from "./FlightCard";

export default function BookingForm() {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch available flights
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/flights");
        setFlights(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load flights");
      }
    };
    fetchFlights();
  }, []);

  const handleBooking = async () => {
    if (!selectedFlight) return toast.error("No flight selected");
    if (seats < 1) return toast.error("Seats must be at least 1");

    setLoading(true);
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
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Book a Flight</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {flights.map((flight) => (
          <div key={flight._id} className="relative">
            <FlightCard flight={flight} />
            <button
              onClick={() => setSelectedFlight(flight)}
              className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {selectedFlight && (
        <div className="mt-6 p-4 border rounded shadow bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">
            Booking for {selectedFlight.flightNo} - {selectedFlight.airline}
          </h3>
          <p>From: {selectedFlight.from} → To: {selectedFlight.to}</p>
          <p>Price per seat: ${selectedFlight.price}</p>
          <div className="mt-2">
            <label className="mr-2 font-semibold">Seats:</label>
            <input
              type="number"
              value={seats}
              min={1}
              max={selectedFlight.seatsAvailable}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="border rounded p-1 w-20"
            />
          </div>
          <button
            onClick={handleBooking}
            disabled={loading}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {loading ? "Booking..." : `Confirm Booking ($${seats * selectedFlight.price})`}
          </button>
        </div>
      )}
    </div>
  );
}
