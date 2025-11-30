import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getAdminFlights,
  createFlight,
  updateFlight,
  deleteFlight,
  getAdminBookings,
  updateBooking,
  deleteBooking,
} from "../services/adminApi";
import { Button } from "../components/ui/button";
import {
  Plane,
  Trash2,
  Users,
  PlusCircle,
  Edit2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDashboard() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState("flights"); // flights | bookings

  return (
    <div className="bg-gradient-to-b from-[#e6f3ff] to-white min-h-screen flex flex-col">
    <Navbar />
    <section className="min-h-screen bg-[#f5f5f5] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0000cc] mb-4">
          Admin Dashboard
        </h1>

        <div className="bg-white rounded-2xl shadow-md mb-4 p-2 flex gap-2">
          <button
            onClick={() => setActiveTab("flights")}
            className={`flex-1 py-2 rounded-xl text-sm font-medium ${
              activeTab === "flights"
                ? "bg-[#0000cc] text-white"
                : "bg-transparent text-gray-700"
            }`}
          >
            Manage Flights
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex-1 py-2 rounded-xl text-sm font-medium ${
              activeTab === "bookings"
                ? "bg-[#0000cc] text-white"
                : "bg-transparent text-gray-700"
            }`}
          >
            View Bookings
          </button>
        </div>

        {activeTab === "flights" ? (
          <AdminFlights token={token} />
        ) : (
          <AdminBookings token={token} />
        )}
      </div>
    </section>
    <Footer />
    </div>
  );
}

/* ---------------- Flights Management ---------------- */

function AdminFlights({ token }) {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    airline: "Airstro",
    flightNo: "",
    fromCode: "DEL",
    toCode: "BOM",
    date: "",
    departTime: "",
    arriveTime: "",
    duration: "02h 25m",
    nonStop: true,
    stops: 0,
    economyPrice: "",
    businessPrice: "",
  });
  const [editingId, setEditingId] = useState(null);

  const loadFlights = async () => {
    try {
      setLoading(true);
      const data = await getAdminFlights(token);
      setFlights(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadFlights();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm({
      airline: "Airstro",
      flightNo: "",
      fromCode: "DEL",
      toCode: "BOM",
      date: "",
      departTime: "",
      arriveTime: "",
      duration: "02h 25m",
      nonStop: true,
      stops: 0,
      economyPrice: "",
      businessPrice: "",
    });
    setEditingId(null);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        economyPrice: Number(form.economyPrice),
        businessPrice: Number(form.businessPrice),
      };

      if (editingId) {
        await updateFlight(token, editingId, payload);
      } else {
        await createFlight(token, payload);
      }
      resetForm();
      await loadFlights();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this flight?")) return;
    try {
      await deleteFlight(token, id);
      await loadFlights();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditClick = (flight) => {
    setEditingId(flight._id);
    setForm({
      airline: flight.airline || "Airstro",
      flightNo: flight.flightNo || "",
      fromCode: flight.fromCode || "",
      toCode: flight.toCode || "",
      date: flight.date || "",
      departTime: flight.departTime || "",
      arriveTime: flight.arriveTime || "",
      duration: flight.duration || "",
      nonStop: flight.nonStop ?? true,
      stops: flight.stops ?? 0,
      economyPrice: String(flight.economyPrice || ""),
      businessPrice: String(flight.businessPrice || ""),
    });
  };

  return (
    <>
    
    <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6">
      {/* Add / Edit flight form */}
      <form
        onSubmit={handleCreateOrUpdate}
        className="bg-white rounded-2xl shadow-md p-4 space-y-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <PlusCircle className="h-4 w-4 text-[#0000cc]" />
          <h2 className="text-sm font-semibold text-gray-800">
            {editingId ? "Edit Flight" : "Add Flight"}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="col-span-2">
            <label className="block text-xs text-gray-500 mb-1">Airline</label>
            <input
              name="airline"
              value={form.airline}
              onChange={handleChange}
              className="w-full h-9 border rounded-md px-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Flight No
            </label>
            <input
              name="flightNo"
              value={form.flightNo}
              onChange={handleChange}
              className="w-full h-9 border rounded-md px-2 text-sm"
              placeholder="AS 201"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Date (YYYY-MM-DD)
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full h-9 border rounded-md px-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              From code
            </label>
            <input
              name="fromCode"
              value={form.fromCode}
              onChange={handleChange}
              className="w-full h-9 border rounded-md px-2 text-sm"
              placeholder="DEL"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              To code
            </label>
            <input
              name="toCode"
              value={form.toCode}
              onChange={handleChange}
              className="w-full h-9 border rounded-md px-2 text-sm"
              placeholder="BOM"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Depart time
            </label>
            <input
              type="time"
              name="departTime"
              value={form.departTime}
              onChange={handleChange}
              className="w-full h-9 border rounded-md px-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Arrive time
            </label>
            <input
              type="time"
              name="arriveTime"
              value={form.arriveTime}
              onChange={handleChange}
              className="w-full h-9 border rounded-md px-2 text-sm"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs text-gray-500 mb-1">
              Duration
            </label>
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="w-full h-9 border rounded-md px-2 text-sm"
              placeholder="02h 25m"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Economy Price
            </label>
            <input
              type="number"
              name="economyPrice"
              value={form.economyPrice}
              onChange={handleChange}
              className="w-full h-9 border rounded-md px-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Business Price
            </label>
            <input
              type="number"
              name="businessPrice"
              value={form.businessPrice}
              onChange={handleChange}
              className="w-full h-9 border rounded-md px-2 text-sm"
              required
            />
          </div>

          <div className="col-span-2 flex items-center gap-2 text-xs">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                name="nonStop"
                checked={form.nonStop}
                onChange={handleChange}
              />
              Non-stop
            </label>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <Button
            type="submit"
            className="flex-1 bg-[#0000cc] hover:bg-[#0000aa] text-white h-9 text-sm"
          >
            {editingId ? "Save Changes" : "Add Flight"}
          </Button>
          {editingId && (
            <Button
              type="button"
              onClick={resetForm}
              className="flex-1 h-9 text-sm"
              variant="outline"
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </form>

      {/* Flights list */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="flex items-center gap-2 mb-3">
          <Plane className="h-4 w-4 text-[#0000cc]" />
          <h2 className="text-sm font-semibold text-gray-800">All Flights</h2>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading flights…</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : flights.length === 0 ? (
          <p className="text-sm text-gray-500">No flights yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs md:text-sm">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="py-2 pr-3 text-left">Flight</th>
                  <th className="py-2 px-3 text-left">Route</th>
                  <th className="py-2 px-3 text-left">Date</th>
                  <th className="py-2 px-3 text-left">Time</th>
                  <th className="py-2 px-3 text-right">Economy</th>
                  <th className="py-2 px-3 text-right">Business</th>
                  <th className="py-2 pl-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((f) => (
                  <tr key={f._id} className="border-b last:border-0">
                    <td className="py-2 pr-3">
                      <div className="font-semibold">{f.flightNo}</div>
                      <div className="text-[11px] text-gray-500">
                        {f.airline}
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      {f.fromCode} → {f.toCode}
                    </td>
                    <td className="py-2 px-3">{f.date}</td>
                    <td className="py-2 px-3">
                      {f.departTime} – {f.arriveTime}
                    </td>
                    <td className="py-2 px-3 text-right">₹{f.economyPrice}</td>
                    <td className="py-2 px-3 text-right">₹{f.businessPrice}</td>
                    <td className="py-2 pl-3 text-right space-x-1">
                      <button
                        onClick={() => handleEditClick(f)}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(f._id)}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    
    </>
  );
}

/* ---------------- Bookings overview ---------------- */

function AdminBookings({ token }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState("booked");
  const [editPassengers, setEditPassengers] = useState(1);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await getAdminBookings(token);
      setBookings(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadBookings();
  }, [token]);

  const startEdit = (b) => {
    setEditingId(b._id);
    setEditStatus(b.status);
    setEditPassengers(b.passengers);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id) => {
    try {
      await updateBooking(token, id, {
        status: editStatus,
        passengers: Number(editPassengers),
      });
      setEditingId(null);
      await loadBookings();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await deleteBooking(token, id);
      await loadBookings();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-4 w-4 text-[#0000cc]" />
        <h2 className="text-sm font-semibold text-gray-800">All Bookings</h2>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading bookings…</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="text-sm text-gray-500">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs md:text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="py-2 pr-3 text-left">User</th>
                <th className="py-2 px-3 text-left">Flight</th>
                <th className="py-2 px-3 text-left">Trip</th>
                <th className="py-2 px-3 text-left">Passengers</th>
                <th className="py-2 px-3 text-left">Dates</th>
                <th className="py-2 px-3 text-right">Total</th>
                <th className="py-2 px-3 text-left">Status</th>
                <th className="py-2 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const isEditing = editingId === b._id;
                return (
                  <tr key={b._id} className="border-b last:border-0">
                    <td className="py-2 pr-3">
                      <div className="font-semibold">
                        {b.user?.fullName || "Unknown"}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {b.user?.email}
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      {b.flight?.flightNo} • {b.flight?.fromCode} →{" "}
                      {b.flight?.toCode}
                    </td>
                    <td className="py-2 px-3">
                      {b.tripType} / {b.classType}
                    </td>
                    <td className="py-2 px-3">
                      {isEditing ? (
                        <input
                          type="number"
                          min="1"
                          className="w-16 border rounded px-1 text-xs"
                          value={editPassengers}
                          onChange={(e) => setEditPassengers(e.target.value)}
                        />
                      ) : (
                        b.passengers
                      )}
                    </td>
                    <td className="py-2 px-3">
                      {b.departureDate}
                      {b.returnDate ? ` → ${b.returnDate}` : ""}
                    </td>
                    <td className="py-2 px-3 text-right">₹{b.totalPrice}</td>
                    <td className="py-2 px-3">
                      {isEditing ? (
                        <select
                          className="border rounded px-1 py-0.5 text-xs"
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                        >
                          <option value="booked">booked</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      ) : (
                        <span className="capitalize">{b.status}</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-right space-x-1">
                      {isEditing ? (
                        <>
                          <Button
                            size="sm"
                            className="h-7 text-xs px-2"
                            onClick={() => saveEdit(b._id)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs px-2"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(b)}
                            className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(b._id)}
                            className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
