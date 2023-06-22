/* eslint-disable no-undef */
import axios from "axios";
export const Axios = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    credentials: "include",
  },
});
