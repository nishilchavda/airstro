import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Calendar, Users, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BookingWidget() {
  const [tripType, setTripType] = useState("oneWay");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [classType, setClassType] = useState("economy");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const handleSearch = () => {
    setError("");

    const cleanFrom = from.trim().toLowerCase();
    const cleanTo = to.trim().toLowerCase();

    if (!cleanFrom || !cleanTo) {
      setError("Please enter both origin and destination.");
      return;
    }

    if (cleanFrom === cleanTo) {
      setError("From and To cannot be the same location.");
      return;
    }

    if (!departureDate) {
      setError("Please select a departure date.");
      return;
    }

    if (tripType === "roundTrip") {
      if (!returnDate) {
        setError("Please select a return date for round trip.");
        return;
      }
      if (returnDate < departureDate) {
        setError("Return date cannot be earlier than departure date.");
        return;
      }
    }

    // Build query string for /search page
    const params = new URLSearchParams({
      tripType,
      from,
      to,
      departureDate,
      passengers,
      classType,
    });

    if (tripType === "roundTrip" && returnDate) {
      params.set("returnDate", returnDate);
    }

    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 -mt-4">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Trip type tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setTripType("oneWay")}
            className={`pb-3 px-4 font-medium ${
              tripType === "oneWay"
                ? "text-[#0000cc] border-b-2 border-[#0000cc]"
                : "text-gray-600"
            }`}
          >
            One Way
          </button>
          <button
            onClick={() => setTripType("roundTrip")}
            className={`pb-3 px-4 font-medium ${
              tripType === "roundTrip"
                ? "text-[#0000cc] border-b-2 border-[#0000cc]"
                : "text-gray-600"
            }`}
          >
            Round Trip
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {/* Form */}
        <div
          className={`grid grid-cols-1 ${
            tripType === "roundTrip" ? "md:grid-cols-6" : "md:grid-cols-5"
          } gap-4 mb-6`}
        >
          {/* From */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">From</label>
            <Input
              placeholder="Where from?"
              className="h-12"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          {/* To */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">To</label>
            <Input
              placeholder="Going to?"
              className="h-12"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          {/* Departure */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">
              Departure
            </label>
            <div className="relative">
              <Input
                type="date"
                className="h-12 pl-10"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                min={today}
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Return – only for round trip */}
          {tripType === "roundTrip" && (
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Return</label>
              <div className="relative">
                <Input
                  type="date"
                  className="h-12 pl-10"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={departureDate || today}
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          )}

          {/* Travellers */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">
              Travellers
            </label>
            <div className="relative">
              <select
                className="h-12 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
              >
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4 Passengers</option>
                <option value="5">5 Passengers</option>
                <option value="6">6 Passengers</option>
              </select>
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Class type */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Class</label>
            <select
              className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
            >
              <option value="economy">Economy</option>
              <option value="business">Business</option>
            </select>
          </div>
        </div>

        <Button
          onClick={handleSearch}
          className="w-full md:w-auto bg-[#0000cc] hover:bg-[#0000aa] text-white h-12 px-8"
        >
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </div>
    </section>
  );
}

export default BookingWidget;
