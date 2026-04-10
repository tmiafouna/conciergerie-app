const API_URL = import.meta.env.VITE_API_URL || "/api";

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  const res = await fetch(`${API_URL}${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Une erreur est survenue");
  }

  return data;
};

// Auth
export const registerUser = (body) =>
  request("/auth/register", { method: "POST", body: JSON.stringify(body) });

export const loginUser = (body) =>
  request("/auth/login", { method: "POST", body: JSON.stringify(body) });

export const getMe = () => request("/auth/me");


// Orders
export const createOrder = (body) =>
  request("/orders", { method: "POST", body: JSON.stringify(body) });

export const getMyOrders = () => request("/orders");

export const getAllOrders = () => request("/orders/all");

export const updateOrderStatus = (id, status) =>
  request(`/orders/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });

export const deleteOrder = (id) =>
  request(`/orders/${id}`, { method: "DELETE" });

// Users (admin)
export const getAllUsers = () => request("/users");

export const deleteUser = (id) =>
  request(`/users/${id}`, { method: "DELETE" });

export const updateUserRole = (id, role) =>
  request(`/users/${id}/role`, { method: "PUT", body: JSON.stringify({ role }) });
