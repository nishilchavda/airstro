const API_BASE_URL = "http://localhost:5000";

export async function getAdminFlights(token) {
  const res = await fetch(`${API_BASE_URL}/api/admin/flights`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch flights");
  return data;
}

export async function createFlight(token, flight) {
  const res = await fetch(`${API_BASE_URL}/api/admin/flights`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(flight),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create flight");
  return data;
}

export async function updateFlight(token, id, flight) {
  const res = await fetch(`${API_BASE_URL}/api/admin/flights/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(flight),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update flight");
  return data;
}

export async function deleteFlight(token, id) {
  const res = await fetch(`${API_BASE_URL}/api/admin/flights/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete flight");
  return data;
}

export async function getAdminBookings(token) {
  const res = await fetch(`${API_BASE_URL}/api/bookings/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");
  return data;
}

export async function updateBooking(token, id, body) {
  const res = await fetch(`${API_BASE_URL}/api/bookings/admin/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update booking");
  return data;
}

export async function deleteBooking(token, id) {
  const res = await fetch(`${API_BASE_URL}/api/bookings/admin/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete booking");
  return data;
}
