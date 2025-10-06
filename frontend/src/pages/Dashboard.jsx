/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaClipboardList, FaBuilding, FaPlane } from "react-icons/fa";
import API from "../api"; // Axios instance configured with baseURL
import { toast } from "react-toastify";


// --- Card Component ---
const Card = ({ title, value, icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white shadow-xl rounded-2xl p-6 text-center border border-gray-100 flex flex-col items-center justify-center transition duration-300"
  >
    {Icon && (
      <div className="p-3 rounded-full mb-3 bg-blue-100 text-indigo-600">
        <Icon className="w-6 h-6" />
      </div>
    )}
    <h3 className="text-gray-500 text-sm font-medium uppercase">{title}</h3>
    <p className="text-4xl font-extrabold text-indigo-600 mt-2">{value}</p>
  </motion.div>
);

// --- Booking Card ---
const BookingCard = ({ booking, onCancel }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.02 }}
    className="bg-white p-5 rounded-xl shadow-md border border-gray-100 cursor-pointer transition duration-300"
  >
    <div className="flex justify-between items-start mb-2">
      <h4 className="font-bold text-lg text-indigo-600">
        {booking.flight?.airline || "N/A"}
      </h4>
      <span className="text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
        BOOKED
      </span>
    </div>
    <p className="text-base font-semibold text-gray-600 mb-1">
      {booking.flight?.from || "Unknown"} → {booking.flight?.to || "Unknown"}
    </p>
    <p className="text-sm text-gray-500">
      Seats: <span className="font-medium">{booking.seats}</span> | Price:{" "}
      <span className="font-bold text-green-600">${booking.totalPrice}</span>
    </p>
    <p className="text-xs text-gray-400 mt-1">
      Date:{" "}
      {booking.flight?.departureTime
        ? new Date(booking.flight.departureTime).toLocaleDateString()
        : "N/A"}
    </p>
    <button
      onClick={() => onCancel(booking._id)}
      className="mt-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
    >
      Cancel Booking
    </button>
  </motion.div>
);

// --- Company Card ---
const CompanyCard = ({ company }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.05 }}
    className="bg-gray-50 p-4 rounded-xl shadow border border-gray-200 mb-2 transition duration-300"
  >
    <h4 className="font-semibold text-indigo-600">{company.name}</h4>
    <p className="text-xs text-indigo-600 font-medium">
      Category: {company.category}
    </p>
    {company.country && (
      <p className="text-xs text-gray-500">Country: {company.country}</p>
    )}
  </motion.div>
);

// --- Flight Card with Booking ---
const FlightCard = ({ flight, onBook }) => {
  const [seats, setSeats] = useState(1);
  const handleBooking = () => {
    if (seats < 1 || seats > flight.seatsAvailable) {
      toast.error("Invalid number of seats");
      return;
    }
    onBook(flight, seats);
    setSeats(1); // reset seats after booking
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white p-4 rounded-xl shadow border border-gray-200 mb-2 transition duration-300"
    >
      <h4 className="font-bold text-lg text-indigo-600">{flight.airline}</h4>
      <p className="text-sm text-gray-600">
        {flight.from} → {flight.to}
      </p>
      <p className="text-sm text-gray-500">
        Departure: {new Date(flight.departureTime).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">
        Arrival: {new Date(flight.arrivalTime).toLocaleString()}
      </p>
      <p className="text-sm font-semibold text-green-600">
        Price: ${flight.price}
      </p>
      <p className="text-xs text-gray-400">
        Seats Available: {flight.seatsAvailable}
      </p>

      <div className="mt-2 flex items-center gap-2">
        <input
          type="number"
          min={1}
          max={flight.seatsAvailable}
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="border rounded p-1 w-20"
        />
        <button
          onClick={handleBooking}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-800"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

export default function Dashboard() {
  const [flights, setFlights] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const [flightsRes, companiesRes, bookingsRes] = await Promise.all([
        API.get("/flights", { headers: { Authorization: `Bearer ${token}` } }),
        API.get("/companies", { headers: { Authorization: `Bearer ${token}` } }),
        API.get("/bookings/my", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setFlights(flightsRes.data);
      setCompanies(companiesRes.data);
      setBookings(bookingsRes.data);

      const uniqueCategories = [...new Set(companiesRes.data.map((c) => c.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleBookFlight = async (flight, seats) => {
    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/bookings",
        { flightId: flight._id, seats },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Booking successful!`);
      fetchDashboardData(); // reload dashboard after booking
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`/bookings/${bookingId}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Booking canceled successfully");
      fetchDashboardData(); // reload dashboard after cancellation
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  if (isLoading) {
    return (
      <div className="ml-64 p-8 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg font-semibold text-indigo-600">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 bg-gray-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto w-full">
      <h1 className="text-4xl font-extrabold mb-8 indigo-600 border-b pb-4">
        📊 Aviation Dashboard Overview
      </h1>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card title="Total Flights" value={flights.length} icon={FaPlane} />
        <Card title="Total Bookings" value={bookings.length} icon={FaClipboardList} />
      </section>

      {/* Best Flights */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5 text-gray-700 border-b pb-2">
          ✈️ Best Flights
        </h2>
        {flights.length === 0 ? (
          <p className="text-gray-500 italic p-4 bg-white rounded-lg shadow-sm">
            No flights available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.slice(0, 6).map((f) => (
              <FlightCard key={f._id} flight={f} onBook={handleBookFlight} />
            ))}
          </div>
        )}
      </section>

      {/* My Bookings */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5 text-gray-700 border-b pb-2">
          ✈️ My Recent Bookings
        </h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500 italic p-4 bg-white rounded-lg shadow-sm">
            You have no flight bookings yet. Start your journey!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.slice(0, 6).map((b) => (
              <BookingCard key={b._id} booking={b} onCancel={handleCancelBooking} />
            ))}
          </div>
        )}
      </section>
      </div>
    </motion.div>
  );
}
