import axios from "axios";
import { getSession } from "next-auth/react";

const httpClient = () => {
  const client = axios.create({
    baseURL: process.env.API_URL || "http://localhost:8005/api",
    withCredentials: process.env.WORKING_ENV !== "product" ? false : true,
    headers: {
      Accept: "*",
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use(
    async (config) => {
      const session: any = await getSession();

      if (session?.access_token) {
        config.headers["Authorization"] = `Bearer ${session.access_token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

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

export const axiosClient = httpClient();
