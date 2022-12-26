import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://yy-socail.onrender.com/api",
  withCredentials: true,
});

// const BASE_URL = "https://yy-socail.onrender.com/api";
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8800/api/"
    : "https://yy-socail.onrender.com/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = (TOKEN) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
  });
};
