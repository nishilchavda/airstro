import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useForm } from "react-hook-form";

export default function AdminPage() {
  // ----------------- Hooks (must be at top level) -----------------
  const { register, handleSubmit, reset } = useForm();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // ----------------- Fetch user role -----------------
  useEffect(() => {
    const fetchRole = async () => {
      if (!token) {
        setRole("unauthorized");
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const res = await axios.get(
          `http://localhost:5000/api/auth/role/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setRole(res.data.role);
      } catch (err) {
        console.error(err);
        setRole("unauthorized");
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [token]);

  // ----------------- Loading / Access check -----------------
  if (loading) return <p>Loading...</p>;
  if (role !== "admin") return <p>Access Denied: Admins only</p>;

  // ----------------- Form Handlers -----------------

  // Form 1: Update User Role
   const onSubmitUpdateRole = async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/role/${data.userId}`,
        { role: data.role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Success: ${res.data.user.name} is now ${res.data.user.role}`);
      reset();
    } catch (err) {
      console.error(err);
      alert("Error updating role");
    }
  };


  const onSubmitCreateFlight = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/flights",
        {
          airline: data.airline,
          from: data.from,
          to: data.to,
          departureTime: data.departureTime,
          arrivalTime: data.arrivalTime,
          price: parseFloat(data.price),
          seatsAvailable: parseInt(data.seatsAvailable),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Flight from ${res.data.from} to ${res.data.to} created successfully`);
      reset();
    } catch (err) {
      console.error(err);
      alert("Error creating flight");
    }
  };

  // ----------------- Render -----------------
  return (
    <>
      <div className="p-6 space-y-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h1>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Form 1: Update User Role */}
            <div className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Update User Role</h2>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmitUpdateRole)}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                  <input
                    {...register("userId")}
                    placeholder="User ID"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    {...register("role")}
                    className="w-full border border-gray-300 p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-semibold px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-200"
                >
                  Update Role
                </button>
              </form>
            </div>

            {/* Form 2: Create Flight */}
            <div className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Flight</h2>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmitCreateFlight)}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Airline</label>
                  <input
                    {...register("airline")}
                    placeholder="Airline"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <input
                      {...register("from")}
                      placeholder="From"
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input
                      {...register("to")}
                      placeholder="To"
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
                  <input
                    {...register("departureTime")}
                    type="datetime-local"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Time</label>
                  <input
                    {...register("arrivalTime")}
                    type="datetime-local"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seats Available</label>
                  <input
                    {...register("seatsAvailable")}
                    type="number"
                    placeholder="Seats Available"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    {...register("price")}
                    type="number"
                    placeholder="Price"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                </div>


                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white font-semibold px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-200"
                >
                  Create Flight
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
