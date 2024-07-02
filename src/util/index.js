import axios from "axios";
const client = axios.create({
  timeout: 1000,
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location = "/";
    }
  }
);

export default client;
