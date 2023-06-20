import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export const httpClient = ({
  responseType = "json",
  contentType = "application/json",
}: {
  responseType?: "json" | "stream" | "text" | "document";
  contentType?: "application/json" | "text/event-stream";
}) => {
  const client = axios.create({
    baseURL: process.env.API_URL || "http://localhost:8005/api",
    withCredentials: process.env.WORKING_ENV !== "product" ? false : true,
    headers: {
      Accept: "*",
      responseType: responseType,
      "Content-Type": contentType,
    },
  });

  client.interceptors.request.use(
    async (config) => {
      const session: Session | null = await getSession();
      // config.headers.Authorization = `Bearer ${session?.access_token ?? ""}`;
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

const axiosClient = httpClient({
  responseType: "json",
  contentType: "application/json",
});

export default axiosClient;
