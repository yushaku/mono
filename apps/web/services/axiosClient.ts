import axios from "axios";
import toast from "react-hot-toast";

export const httpClient = () => {
  const client = axios.create({
    baseURL: process.env.API_URL || "http://localhost:8005/api",
    withCredentials: true,
    headers: {
      Accept: "*",
      "Content-Type": "application/json",
    },
  });

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      throw error;
    }
  );

  return client;
};

export const httpServer = () => {
  const client = axios.create({
    baseURL: process.env.API_URL || "http://localhost:8005/api",
    withCredentials: process.env.WORKING_ENV !== "product" ? false : true,
    headers: {
      Accept: "*",
      "Content-Type": "application/json",
    },
  });

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      toast.error(error?.message);
    }
  );

  return client;
};

export const axiosClient = httpClient();
