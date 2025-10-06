import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";

export default function FlightCard({ flight }) {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col gap-2">
      <h2 className="text-xl font-bold">{flight.flightNo} - {flight.airline}</h2>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <FaPlaneDeparture /> {flight.from}
        </div>
        <div className="flex items-center gap-2">
          <FaPlaneArrival /> {flight.to}
        </div>
      </div>
      <p>Departure: {new Date(flight.departureTime).toLocaleString()}</p>
      <p>Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
      <p>Price: ${flight.price}</p>
      <p>Seats Available: {flight.seatsAvailable}</p>
    </div>
  );
}
