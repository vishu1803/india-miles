import axios from "axios";

/**
 * Axios instance configured for the auth backend.
 * Sends cookies with every request (credentials: true).
 */
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Axios interceptor — automatically tries to refresh the access token
 * when a 401 TOKEN_EXPIRED response is received.
 */
let isRefreshing = false;
let refreshSubscribers = [];

function subscribeToRefresh(callback) {
  refreshSubscribers.push(callback);
}

function onRefreshed() {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 with TOKEN_EXPIRED and not already retrying
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await api.post("/auth/refresh");
          isRefreshing = false;
          onRefreshed();
          // Retry the original request with the new access token
          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = [];
          // Refresh failed — user needs to login again
          return Promise.reject(refreshError);
        }
      } else {
        // Another refresh is in progress — queue this request
        return new Promise((resolve) => {
          subscribeToRefresh(() => {
            resolve(api(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  },
);

export default api;
