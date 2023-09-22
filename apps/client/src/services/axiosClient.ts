import { getRefreshtoken } from ".";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";

export const httpClient = () => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8005/api",
    withCredentials: true,
    headers: {
      Accept: "*",
      "Content-Type": "application/json",
    },
  });

  client.interceptors.response.use(
    async (response: AxiosResponse) => {
      if (response.data.status === 401) {
        toast.error("unauthorized");
        const { access_token } = await getRefreshtoken();
        if (!access_token) window.location.replace("/auth/login");
      }
      return response;
    },
    (error) => {
      toast.error(error?.message);
    }
  );

  return client;
};

export const axiosClient = httpClient();
