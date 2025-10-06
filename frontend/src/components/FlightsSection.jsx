// src/components/FlightsSection.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FlightsSection = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/flights"); // Update your API URL
        // Sort by latest (descending by _id or departureTime) and get first 3
        const latestFlights = res.data
          .sort((a, b) => new Date(b.departureTime) - new Date(a.departureTime))
          .slice(0, 3);
        setFlights(latestFlights);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  // Helper function to calculate duration
  const getDuration = (departure, arrival) => {
    const dep = new Date(departure);
    const arr = new Date(arrival);
    const diff = arr - dep; // milliseconds
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <section className="h-170 py-16 bg-gray-50">
      <div className='flex items-center justify-center'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12 pb-15">
          Latest Flights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {flights.map((flight) => (
            <div
              key={flight._id}
              className="bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {flight.airline}
              </h3>
              <p className="text-gray-700 mb-1">
                From: <strong>{flight.from}</strong> → To: <strong>{flight.to}</strong>
              </p>
              <p className="text-gray-700 mb-1">
                Departure: {new Date(flight.departureTime).toLocaleString()}
              </p>
              <p className="text-gray-700 mb-1">
                Arrival: {new Date(flight.arrivalTime).toLocaleString()}
              </p>
              <p className="text-indigo-600 font-semibold mb-2">
                Duration: {getDuration(flight.departureTime, flight.arrivalTime)}
              </p>
              <p className="text-indigo-600 text-xl font-bold mb-4">
                Price: ${flight.price}
              </p>
              <button className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition duration-200">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default FlightsSection;
