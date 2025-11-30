import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyBookings, cancelBooking } from "../services/bookingApi";
import { Button } from "../components/ui/button";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Destinations from "../components/Destinations";
import OffersCarousel from "../components/OffersCarousel";

function formatDate(d) {
  if (!d) return "--";
  const obj = new Date(d);
  return obj.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Trips() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    try {
      setLoading(true);
      const data = await getMyBookings(token);
      setBookings(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await cancelBooking(id, token);
      await load();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (token) load();
  }, [token]);

  return (
    <div className="bg-gradient-to-b from-[#e6f3ff] to-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0000cc] mb-6 text-center">
            My Trips
          </h1>

          {!token ? (
            <div className="text-center text-gray-600 mb-10">
              <p>Please log in to view your trips.</p>
              <Link to="/login">
                <Button className="mt-4 bg-[#0000cc] hover:bg-[#0000aa]">
                  Go to Login
                </Button>
              </Link>
            </div>
          ) : loading ? (
            <p className="text-gray-600">Loading your bookings...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : bookings.length === 0 ? (
            <div className="text-center mb-10">
              <p className="text-gray-600 mb-4">
                You haven’t booked any flights yet.
              </p>
              <Link to="/">
                <Button className="bg-[#0000cc] hover:bg-[#0000aa]">
                  Book your first flight
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4 mb-10">
              {bookings.map((b) => (
                <div
                  key={b._id}
                  className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      ✈ Flight {b.flight.flightNo} • {b.flight.fromCode} →{" "}
                      {b.flight.toCode}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatDate(b.departureDate)}
                      {b.returnDate ? ` → ${formatDate(b.returnDate)}` : ""}
                      <span className="mx-2">•</span>
                      {b.passengers}{" "}
                      {b.passengers > 1 ? "Passengers" : "Passenger"}
                    </div>
                    <div className="text-xs text-gray-500">
                      Class: {b.classType.toUpperCase()}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="text-xl font-bold text-[#0000cc]">
                      ₹{b.totalPrice}
                    </div>

                    {b.status === "cancelled" ? (
                      <div className="text-sm text-red-600 flex items-center gap-1">
                        <XCircle className="h-4 w-4" /> Cancelled
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleCancel(b._id)}
                        className="bg-red-600 hover:bg-red-700 text-white h-9 px-4 text-sm"
                      >
                        Cancel Flight
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recommendations & deals below trips */}
          <Recommendations />
          <Deals />
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ---------------- Recommendations ---------------- */
function Recommendations() {
  return <Destinations />;
}

/* ---------------- Deals ---------------- */
function Deals() {
  return <OffersCarousel />;
}

export default Trips;
