import axios from "axios";

export const httpClient = () => {
  const client = axios.create({
    baseURL: process.env.API_URL || "http://localhost:8005/api",
    withCredentials: process.env.WORKING_ENV !== "product" ? false : true,
    headers: {
      Accept: "*",
      "Content-Type": "application/json",
    },
  });

  // client.interceptors.request.use(
  //   async (config) => {
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  //
  // client.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     throw error;
  //   }
  // );

  return client;
};

const axiosClient = httpClient();

export default axiosClient;
