import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export const httpClient = () => {
  const client = axios.create({
    baseURL: process.env.API_URL || "http://localhost:8006/api",
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

const axiosClient = httpClient();

export default axiosClient;
