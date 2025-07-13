import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getItems = () => api.get("/items/");
export const getItemById = (id: number) => api.get(`/items/${id}`);
export const getPricesByItem = (itemId: number) =>
  api.get(`/items/${itemId}/prices/`);
export const createPrice = (itemId: number, data: any) =>
  api.post(`/items/${itemId}/prices/`, data);

export const getServers = () => {
  return axios.get("http://127.0.0.1:8000/api/v1/servers/");
};

export const getItemsByServer = (serverId: number) => {
  return axios.get(`http://127.0.0.1:8000/api/v1/items/by-server/${serverId}`);
};

export default api;
