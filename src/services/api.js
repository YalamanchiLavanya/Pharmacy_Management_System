import axios from "axios";

const api = axios.create({
  baseURL: "https://pharmacy-backend-3-70rx.onrender.com"
});

export const getMedicines = () => api.get("/medicines");

export const getMedicine = (id) =>
  api.get(`/medicines/${id}`);

export const addMedicine = (medicine) =>
  api.post("/medicines", medicine);

export const updateMedicine = (id, medicine) =>
  api.put(`/medicines/${id}`, medicine);

export const deleteMedicine = (id) =>
  api.delete(`/medicines/${id}`);

export const getOrders = () =>
  api.get("/orders");

export const getOrder = (id) =>
  api.get(`/orders/${id}`);

export const createOrder = (order) =>
  api.post("/orders", order);

export const updateOrder = (id, order) =>
  api.put(`/orders/${id}`, order);

export const deleteOrder = (id) =>
  api.delete(`/orders/${id}`);

export default api;