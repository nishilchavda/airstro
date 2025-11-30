const API_BASE_URL = "http://localhost:5000";

export async function getMyBookings(token) {
  const res = await fetch(`${API_BASE_URL}/api/bookings/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to load bookings");
  return data;
}

export async function cancelBooking(id, token) {
  const res = await fetch(`${API_BASE_URL}/api/bookings/cancel/${id}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });

  const contentType = res.headers.get("content-type") || "";
  let data = null;
  if (contentType.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    throw new Error(
      (data && data.message) ||
        `Failed to cancel booking (status ${res.status})`
    );
  }

  return data || { success: true };
}

/* ---------- ADMIN APIS ---------- */

// GET /api/bookings/admin
export async function getAllBookings(token) {
  const res = await fetch(`${API_BASE_URL}/api/bookings/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to load bookings");
  return data;
}

// PATCH /api/bookings/admin/:id
export async function adminUpdateBooking(id, body, token) {
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

// DELETE /api/bookings/admin/:id
export async function adminDeleteBooking(id, token) {
  const res = await fetch(`${API_BASE_URL}/api/bookings/admin/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const contentType = res.headers.get("content-type") || "";
  let data = null;
  if (contentType.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    throw new Error(
      (data && data.message) ||
        `Failed to delete booking (status ${res.status})`
    );
  }

  return data || { success: true };
}
