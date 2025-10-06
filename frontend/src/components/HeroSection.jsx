/* eslint-disable no-unused-vars */
// src/components/HeroSection.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlaneDeparture, FaTimes, FaRupeeSign, FaCalendarAlt, FaClock, FaCode } from 'react-icons/fa';
import video from "../assets/video/142647-780599383.mp4";

import { use } from 'react';

// --- API BASE URL ---
const API_BASE_URL = "http://localhost:5000/api/flights/search";

// --- Helper Functions ---
const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
};
const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
};

const HeroSection = () => {
  const [tripType, setTripType] = useState('oneway');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('2025-10-05');
  const [passengers, setPassengers] = useState(1);
  const [ticketType, setTicketType] = useState('economy');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);
  const navigate = useNavigate();

  // --- Handle Flight Search ---
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!fromCity || !toCity) {
        alert("Please enter both 'From' and 'To' cities.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);
    setShowModal(true); 

    const queryUrl = `${API_BASE_URL}?from=${fromCity}&to=${toCity}&date=${date || '2025-10-05'}`;

    try {
      const response = await fetch(queryUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Modal Component ---
  const SearchResultsModal = () => {
    if (!showModal) return null;

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
        onClick={() => setShowModal(false)}
      >
        <div 
          className="bg-white rounded-xl shadow-2xl p-6 w-11/12 max-w-3xl transform transition-all duration-300 scale-100 animate-fadeIn"
          onClick={(e) => e.stopPropagation()} 
        >
          <div className="flex justify-between items-start border-b pb-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Flights: {fromCity} → {toCity}</h2>
            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500" aria-label="Close">
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-2 text-indigo-600 font-semibold">Searching for the best deals...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <p className="font-semibold">Error:</p> {error}
            </div>
          )}

          {results && (
            <div className="max-h-96 overflow-y-auto space-y-4">
                <p className="text-sm text-gray-600 flex items-center mb-4">
                    <FaCalendarAlt className='mr-2 text-indigo-500' />
                    Showing results for {formatDate(results[0]?.departureTime || date)}
                </p>
                
                {results.length === 0 ? (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
                        <p className="font-bold">No Flights Found!</p>
                    </div>
                ) : (
                    results.map((flight) => (
                        <div key={flight._id} className="p-4 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center transition hover:shadow-md">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                                <div className="font-bold text-lg text-indigo-600 w-32">{flight.airline}</div>
                                <div className="text-gray-700 flex items-center space-x-2">
                                    <FaClock className='text-sm text-gray-500' />
                                    <span>{formatTime(flight.departureTime)}</span>
                                    <span className="text-gray-400">→</span>
                                    <span>{formatTime(flight.arrivalTime)}</span>
                                </div>
                                <div className="text-sm text-gray-500 hidden md:block">{flight.from} → {flight.to}</div>
                            </div>

                            <div className="flex flex-col items-end">
                                <div className="text-2xl font-extrabold text-green-600 flex items-center">
                                    <FaRupeeSign className='w-4 h-4 mr-1' />
                                    {flight.price.toLocaleString('en-IN')}
                                </div>
                                <button onClick={() => navigate("/login")} className="mt-2 px-4 py-1 bg-indigo-500 text-white text-sm font-semibold rounded hover:bg-indigo-600 transition">
                                    Book Now
                                </button>
                                <p className="text-xs text-gray-500 mt-1">Seats: {flight.seatsAvailable}</p>
                            </div>
                        </div>
                    ))
                )}

                {/* --- JSON View --- */}
                <div className="pt-4 mt-6 border-t border-gray-200">
                    <button 
                        onClick={() => setShowRawJson(!showRawJson)}
                        className="flex items-center text-sm font-semibold text-gray-600 hover:text-indigo-600 transition"
                    >
                        <FaCode className='mr-2' />
                        {showRawJson ? 'Hide Raw API Response' : 'Show Raw API Response'}
                    </button>
                    {showRawJson && (
                        <pre className="mt-3 p-4 bg-gray-100 text-xs text-gray-800 rounded-lg overflow-x-auto whitespace-pre-wrap break-words border border-gray-300">
                            {JSON.stringify(results, null, 2)}
                        </pre>
                    )}
                </div>

            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="relative h-165 bg-gray-900 overflow-hidden">

        <video
          className="absolute inset-0 w-full h-full object-cover opacity-90 scale-x-[-1]
"
          src={video}
          autoPlay
          loop
          muted
          playsInline
        />




        <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-50 py-20">
          <div className="text-white max-w-700px mx-auto text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Fly Anywhere, Anytime with <span className="text-[#4F39F5]">Airstro</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-200">
              Book flights effortlessly with best deals, secure payments, and instant confirmations. Explore destinations around the world with comfort and ease.
            </p>

            
          </div>
          <div className="text-white max-w-700px mx-auto text-right w-full">
            <div className="flex space-x-4 col-span-2">
              <button
                type="button"
                onClick={() => setTripType('oneway')}
                className={`px-4 py-2 rounded-lg font-medium border ${
                  tripType === 'oneway'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                One Way
              </button>
              <button
                type="button"
                onClick={() => setTripType('roundtrip')}
                className={`px-4 py-2 rounded-lg font-medium border ${
                  tripType === 'roundtrip'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                Round Trip
              </button>
            </div>

            <form onSubmit={handleSearch} className="mt-8 grid grid-cols-2 lg:grid-cols-1 gap-3">
              <input
                type="text"
                placeholder="From (e.g., Delhi)"
                className="p-3 rounded-lg col-span-2 lg:col-span-1 bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="To (e.g., Mumbai)"
                className="p-3 rounded-lg col-span-2 lg:col-span-1 bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                required
              />
              {tripType === 'oneway' && (
                  <input
                    type="date"
                    className="p-3 rounded-lg col-span-1 lg:col-span-1 bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
              )} 
              
              {tripType === 'roundtrip' && (
                <div className="grid grid-cols-2 gap-3 col-span-2 lg:col-span-1">
                  <input
                    type="date"
                    placeholder="To (e.g., Mumbai)"
                    className="p-3 rounded-lg col-span-1 lg:col-span-1 bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                  <input
                    type="date"
                    className="p-3 rounded-lg col-span-1 lg:col-span-1 bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

              )} 

              <select
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
                className="p-3 rounded-lg col-span-1 lg:col-span-1 bg-white bg-opacity-90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                {[...Array(6).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1} Passenger{n > 0 && 's'}
                </option>
                ))}
              </select>
              <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                className="p-3 rounded-lg col-span-1 lg:col-span-1 bg-white bg-opacity-90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="economy">Economy</option>
                <option value="business">Business</option>
              </select>
              
              <button
                type="submit"
                className="col-span-2 lg:col-span-1 px-6 py-3 bg-[#4F39F6] hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 flex items-center justify-center"
                disabled={isLoading}
              >
                <FaPlaneDeparture className="mr-2" />
                {isLoading ? 'Searching...' : 'Search Flights'}
              </button>
            </form>
          </div>
        </div>
      </header>

      <SearchResultsModal />
    </>
  );
};

export default HeroSection;
