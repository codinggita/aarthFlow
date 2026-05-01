const BASE_URL = "http://localhost:5000/api";

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

// Reusable fetch wrapper
const request = async (endpoint, method = "GET", body = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// ─── AUTH ───────────────────────────────
export const registerUser = (formData) =>
  request("/auth/register", "POST", formData);

export const loginUser = (formData) =>
  request("/auth/login", "POST", formData);

export const sendOTP = (mobile) =>
  request("/auth/send-otp", "POST", { mobile });

export const verifyOTP = (mobile, otp) =>
  request("/auth/verify-otp", "POST", { mobile, otp });

export const getMe = () => request("/auth/me");

// ─── INVOICES ───────────────────────────
export const createInvoice = (data) =>
  request("/invoices", "POST", data);

export const getInvoices = (status = "") =>
  request(`/invoices${status ? `?status=${status}` : ""}`);

export const getInvoiceById = (id) =>
  request(`/invoices/${id}`);

export const updateInvoiceStatus = (id, status) =>
  request(`/invoices/${id}/status`, "PATCH", { status });

// ─── DASHBOARD ──────────────────────────
export const getDashboardStats = () =>
  request("/dashboard/stats");

export const getRecentInvoices = () =>
  request("/dashboard/recent-invoices");

export const getDashboardSummary = () =>
  request("/dashboard/summary");

// ─── BUYERS ─────────────────────────────
export const getBuyers = (params = "") =>
  request(`/buyers${params ? `?${params}` : ""}`);

export const addBuyer = (data) =>
  request("/buyers", "POST", data);

export const deleteBuyer = (id) =>
  request(`/buyers/${id}`, "DELETE");

// ─── PAYOUTS ────────────────────────────
export const initiatePayout = (data) =>
  request("/payouts/initiate", "POST", data);

export const getPayouts = () =>
  request("/payouts");

export const getPayoutById = (id) =>
  request(`/payouts/${id}`);